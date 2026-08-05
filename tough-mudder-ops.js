
  const LABEL_ENTRIES = [
    ['Myron Grant', '1'],
    ['Burak Avacik', '3'],
    ['William Mui', '4'],
    ['Bryan Sogelau', '5'],
    ["Ja'meisha R", '6'],
    ['Christian Surguy', '7'],
    ['Jasmine Martinez', '8'],
    ['Eric Rodriguez', '11'],
    ['Adrian Galloway', '12'],
    ['Jack Ellis', '13'],
    ['Abraham Avalos', '14'],
    ['Emiliano Ceja', '15'],
    ['Isaac Fineaso', '16'],
    ['Naing Tun', '17'],
    ['Jakari Wilson', '18'],
    ['Curtis Trahan', '19'],
    ['Dhanasekar Jayanthi', '20'],
    ['Casey Pollock', '21'],
    ['Jadrien Malakai Lopez', '22'],
    ['William Robinson III', '24'],
    ['Matthew Nguyen', '25'],
    ['Kanishka Tikoo', '26'],
    ['Kelvin Chung', '27'],
    ['Annalie Janelle', '28'],
    ['Edison Isaias Barrientos', '29'],
    ['Omar Latif', '30'],
    ['Jaden James', '31'],
    ['Jasmine Jackson', '32'],
    ['Bobbi Brown', '33'],
    ['Ty-Reese Raney', '34'],
    ['Avantika Deo', '35'],
    ['Nathan Chang', '36'],
    ['Jamir Brown-Anderson', '37'],
    ['Prasidhu Loya', '38'],
    ['Andrew Trujillo', '39'],
    ['Lavelle Shah-Marquis', '40'],
    ['Tauane Tome', '41'],
    ['Arman Ara Apoyan', '42'],
    ['Timothy Keller', '43'],
    ['Ethan Hiew', '44'],
    ['Lovedeep Singh', '45'],
    ['Osato Uwoghiren', '46'],
    ['Harold Mark Esguerra', '47'],
    ['Jason Thomas', '48'],
    ['Joel Polanco-Canales', '49']
  ];

  const ANNOUNCER_REMINDERS = [
    { expression: 'starry', text: "Today's sponsor is the Inventory Team. Keep the pit lane clean: only one bin per station!" },
    { expression: 'laugh', text: "Today's race is brought to you by SNACK! Fuel up, don't stock up. The snack table has a pit crew too!" },
    { expression: 'starry', text: "Today's race is brought to you by Shift Coordinators, the task experts keeping this track moving!" }
  ];

  const normalizeNameKey = value => String(value ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
  const normalizePath = value => String(value || '').replace(/\/$/, '');
  const $ = id => document.getElementById(id);
  const num = value => Number.parseFloat(value) || 0;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const localPreview = location.protocol === 'file:' || ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
  const dashboardUrl = `${location.protocol === 'https:' ? 'https:' : 'https:'}//${C.host}/dashboards/collection-ops`;
  const esc = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);

  function addLabelLookup(lookup, name, locker) {
    const key = normalizeNameKey(name);
    if (!key) return;
    if (!lookup[key]) lookup[key] = [];
    lookup[key].push(locker);
  }

  const NORMALIZED_LABELS = (() => {
    const lookup = {};
    LABEL_ENTRIES.forEach(([name, locker]) => {
      addLabelLookup(lookup, name, locker);
      const parts = name.trim().split(/\s+/);
      if (parts.length === 2 && parts[1].length > 1) addLabelLookup(lookup, `${parts[0]} ${parts[1][0]}`, locker);
    });
    return lookup;
  })();

  const old = document.getElementById(C.overlayId);
  if (old) {
    try {
      old.__cleanup?.();
    } catch {}
    old.remove();
    document.getElementById(C.styleId)?.remove();
  }

  const state = {
    timer: null,
    clockTimer: null,
    resizeTimer: null,
    busy: false,
    lastPayload: null,
    previousValues: {},
    activity: {},
    spriteFrames: {},
    announcerBucket: null,
    finishedLockers: {},
    finishEvents: {},
    latestFinish: null
  };

  function labelFor(name, seenCounts) {
    const key = normalizeNameKey(name);
    const lockers = NORMALIZED_LABELS[key];
    if (!lockers?.length) return '--';
    if (!seenCounts) return lockers[0];
    const index = seenCounts[key] || 0;
    seenCounts[key] = index + 1;
    return lockers[Math.min(index, lockers.length - 1)];
  }

  function operatorName(operator) {
    return String(
      operator?.operator ??
      operator?.Operator ??
      operator?.name ??
      operator?.Name ??
      operator?.operatorName ??
      operator?.OperatorName ??
      operator?.['Operator Name'] ??
      ''
    ).trim().replace(/\s+/g, ' ');
  }

  function sessions(operator) {
    return num(
      operator.sessions ??
      operator.Sessions ??
      operator.sessionCount ??
      operator.SessionCount ??
      operator['Sessions'] ??
      operator['Session Count'] ??
      operator['Session_Count'] ??
      operator.collectSessions ??
      operator.collect_sessions ??
      operator.collectedSessions ??
      operator.collected_sessions ??
      operator.CollectSessions ??
      operator.Collect_Sessions ??
      operator.CollectedSessions ??
      operator.Collected_Sessions ??
      operator['Collect Sessions'] ??
      operator['Collected Sessions'] ??
      operator['Collect_Sessions'] ??
      operator['Collected_Sessions']
    );
  }

  function parseMetricValue(value) {
    if (value === undefined || value === null || value === '') return null;
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;
    if (typeof value === 'object') {
      return firstMetric(value, ['value', 'Value', 'hours', 'Hours', 'time', 'Time', 'duration', 'Duration', 'total', 'Total', 'minutes', 'Minutes', 'seconds', 'Seconds']);
    }
    const text = String(value).trim();
    if (!text || ['--', 'n/a', 'na', 'not started'].includes(text.toLowerCase())) return null;
    if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(text)) {
      const parts = text.split(':').map(part => Number.parseFloat(part) || 0);
      if (parts.length === 2) return parts[0] + parts[1] / 60;
      return parts[0] + parts[1] / 60 + parts[2] / 3600;
    }
    const hourMatch = text.match(/([\d.]+)\s*h/i);
    const minuteMatch = text.match(/([\d.]+)\s*m/i);
    const secondMatch = text.match(/([\d.]+)\s*s/i);
    if (hourMatch || minuteMatch || secondMatch) {
      return (hourMatch ? Number.parseFloat(hourMatch[1]) : 0) +
        (minuteMatch ? Number.parseFloat(minuteMatch[1]) / 60 : 0) +
        (secondMatch ? Number.parseFloat(secondMatch[1]) / 3600 : 0);
    }
    const parsed = Number.parseFloat(text);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function firstMetric(operator, keys) {
    for (const key of keys) {
      const value = operator[key];
      const parsed = parseMetricValue(value);
      if (parsed !== null) return parsed;
    }
    return null;
  }

  function periodMixSources(operator) {
    return [
      operator.periodMix,
      operator.period_mix,
      operator.PeriodMix,
      operator.Period_Mix,
      operator['Period Mix'],
      operator.periods,
      operator.Periods,
      operator.periodBreakdown,
      operator.period_breakdown,
      operator['Period Breakdown']
    ].filter(Boolean);
  }

  function includesAny(value, needles) {
    const text = String(value ?? '').toLowerCase();
    return needles.some(needle => text.includes(needle));
  }

  function entryName(entry) {
    return [
      entry?.color,
      entry?.Color,
      entry?.colour,
      entry?.Colour,
      entry?.name,
      entry?.Name,
      entry?.label,
      entry?.Label,
      entry?.title,
      entry?.Title,
      entry?.key,
      entry?.Key,
      entry?.category,
      entry?.Category,
      entry?.status,
      entry?.Status,
      entry?.period,
      entry?.Period
    ].filter(value => value !== undefined && value !== null).join(' ');
  }

  function periodMixMetric(operator, colorNames, labelNames = []) {
    const needles = [...colorNames, ...labelNames].map(value => String(value).toLowerCase());
    for (const source of periodMixSources(operator)) {
      if (Array.isArray(source)) {
        for (const entry of source) {
          if (includesAny(entryName(entry), needles)) {
            const parsed = firstMetric(entry, ['value', 'Value', 'hours', 'Hours', 'time', 'Time', 'duration', 'Duration', 'total', 'Total', 'minutes', 'Minutes', 'seconds', 'Seconds']);
            if (parsed !== null) return parsed;
          }
        }
        continue;
      }
      if (source && typeof source === 'object') {
        for (const [key, value] of Object.entries(source)) {
          if (includesAny(key, needles) || includesAny(entryName(value), needles)) {
