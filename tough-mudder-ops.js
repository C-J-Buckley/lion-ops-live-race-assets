(() => {
  'use strict';

  const C = {
    overlayId: 'tough-mudder-ops-overlay',
    styleId: 'tough-mudder-ops-overlay-style',
    host: 'robohub.apps.openai.org',
    apiUrl: 'https://robohub.apps.openai.org/api/collection_ops/shift?location=lion',
    refreshMs: 60000,
    announcerMs: 15 * 60 * 1000,
    announcerBubbleMs: 3 * 60 * 1000,
    dadJokeMs: 60 * 60 * 1000,
    courseGapPx: 10,
    startLineWidthPx: 35,
    finishLineWidthPx: 37,
    title: 'LION OPS LIVE RACE',
    crew: 'LION Nightshift Crew',
    assetBaseUrl: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/',
    robotSpriteUrl: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/robot-sprite-transparent.png',
    waterTextureUrl: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/Water.gif',
    mudTextureUrl: 'https://raw.githubusercontent.com/C-J-Buckley/lion-ops-live-race-assets/main/Assets/Mud-Course2.gif',
    grassBackgroundUrl: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/GrassBackground.png',
    electricGroundUrl: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/ElectricGround.png',
    thunderTextureUrl: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/Thunder_Transparent.gif',
    barbedWireUrl: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/BarbedWire.png',
    crowdCheerUrl: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/Crowd-Cheer.png',
    commentatorUrls: {
      excited: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/Commentator_Excited.png',
      thinking: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/Commentator_thinking.png',
      bored: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/Commentator_bored.png',
      shocked: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/Commentator_shocked.png',
      starry: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/Commentator_Starry_Eyes.png',
      laugh: 'https://c-j-buckley.github.io/lion-ops-live-race-assets/Assets/Commentator_laughing.png'
    },
    targetHours: 5,
    shiftStartHour: 22,
    shiftStartMinute: 45,
    showStartHour: 22,
    showStartMinute: 40,
    finishCountdownHour: 6,
    finishCountdownMinute: 25,
    shiftEndHour: 6,
    shiftEndMinute: 30,
    totalShiftHours: 8,
    productiveShiftHours: 6.5,
    minElapsedHours: 0.25,
    minCurrentHours: 0.05,
    inactiveMs: 45 * 60 * 1000,
    maxStations: 27,
    maxLockerNumber: 54,
    breaks: [
      { label: '1ST BREAK', message: 'LION OPS LIVE RACE will return after Break', hour: 0, minute: 30, durationMin: 15 },
      { label: 'LUNCH', message: 'LION OPS LIVE RACE will return after Lunch', hour: 2, minute: 30, durationMin: 30 },
      { label: '2ND BREAK', message: 'LION OPS LIVE RACE will return after Break', hour: 4, minute: 30, durationMin: 15 }
    ]
  };

  const LABEL_ENTRIES = [
    ['Myron Grant', '1'],
    ['Nathan Chang', '2'],
    ['Burak Avacik', '3'],
    ['William Mui', '4'],
    ['Bryan Sogelau', '5'],
    ["Ja'meisha R", '6'],
    ['Christian Surguy', '7'],
    ['Jasmine Martinez', '8'],
    ['Joshua Ahanonu', '9'],
    ['Diaviaun Agee', '10'],
    ['Eric Rodriguez', '11'],
    ['Eliezer Domingo', '12'],
    ['Jack Ellis', '13'],
    ['Jaime Monroy', '14'],
    ['Emiliano Ceja', '15'],
    ['Isaac Fineaso', '16'],
    ['Naing Tun', '17'],
    ['Jakari Wilson', '18'],
    ['Curtis Trahan', '19'],
    ['Dhanasekar Jayanthi', '20'],
    ['Casey Pollock', '21'],
    ['Nhung Do', '22'],
    ['Oscar Duran', '23'],
    ['William Robinson III', '24'],
    ['Andrew Flores', '25'],
    ['Mark Amirkhan', '26'],
    ['Kelvin Chung', '27'],
    ['Annalie Janelle', '28'],
    ['Edison Isaias Barrientos', '29'],
    ['Malik Holloway', '30'],
    ['Jaden James', '31'],
    ['Jasmine Jackson', '32'],
    ['Bobbi Brown', '33'],
    ['Ty-Reese Raney', '34'],
    ['Avantika Deo', '35'],
    ['Terryn Williams', '36'],
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
    ['Joel Polanco-Canales', '49'],
    ['Marion Morehead', '50'],
    ['Dimitric Robertson', '51'],
    ['Birhanu Hagos', '52'],
    ['Andre Ennon', '53'],
    ['Mukul Ved', '54']
  ];

  const ANNOUNCER_REMINDERS = [
    { expression: 'starry', text: "Today's Sponsor is the Inventory Team. We are here to remind you one bin at your station." },
    { expression: 'laugh', text: "Today's Race is brought to you by SNACK! Fuel Up, Don't Stock Up!" },
    { expression: 'starry', text: "Today's Race is brought to you by Shift Coordinators...The Task Experts!" }
  ];

  const DAD_JOKES = [
    'What type of bear is the most conceded? Pan-Duh!',
    'When does a joke become a dad joke? When it becomes apparent.',
    "I could tell a joke about pizza, but it's a little cheesy.",
    'What do you get when you cross a fish with an elephant? Swimming trunks.',
    'Why did the car take a nap? It was tired.',
    "What's the easiest building to lift? A lighthouse.",
    'What kind of felines can bowl? Alley cats.',
    'Where do birds stay when they travel? Someplace cheep.',
    'When is a car not a car? When it turns into a parking lot.',
    'Where do sheep go on vacation? The Baaaa-hamas.'
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
      parts.slice(1).forEach(part => {
        if (part.length > 1) addLabelLookup(lookup, `${parts[0]} ${part[0]}`, locker);
      });
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
    rankFireworksTimer: null,
    busy: false,
    lastPayload: null,
    previousValues: {},
    activity: {},
    spriteFrames: {},
    announcerBucket: null,
    announcerShownAt: 0,
    dadJokeHour: null,
    dadJokeIndex: null,
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

  function operatorLocker(operator) {
    const value = operator?.locker ??
      operator?.Locker ??
      operator?.lockerNumber ??
      operator?.LockerNumber ??
      operator?.locker_number ??
      operator?.['Locker Number'] ??
      operator?.station ??
      operator?.Station ??
      operator?.stationNumber ??
      operator?.StationNumber ??
      operator?.station_number ??
      operator?.['Station Number'] ??
      operator?.stationId ??
      operator?.StationId ??
      operator?.station_id ??
      operator?.['Station ID'];
    const match = String(value ?? '').match(/\d+/);
    if (!match) return null;
    const locker = Number(match[0]);
    if (!Number.isFinite(locker) || locker < 1 || locker > C.maxLockerNumber) return null;
    return String(locker);
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

  function unitFromMetricKey(key) {
    const text = String(key || '').toLowerCase();
    if (text.includes('second')) return 'seconds';
    if (text.includes('minute') || /\bmins?\b/.test(text)) return 'minutes';
    if (text.includes('hour') || /\bhrs?\b/.test(text)) return 'hours';
    return null;
  }

  function parseMetricValue(value, unitHint = null) {
    if (value === undefined || value === null || value === '') return null;
    if (typeof value === 'number') {
      if (!Number.isFinite(value)) return null;
      if (unitHint === 'minutes') return value / 60;
      if (unitHint === 'seconds') return value / 3600;
      return value;
    }
    if (typeof value === 'object') {
      return firstMetric(value, [
        'hours',
        'Hours',
        'timeHours',
        'TimeHours',
        'durationHours',
        'DurationHours',
        'totalHours',
        'TotalHours',
        'minutes',
        'Minutes',
        'timeMinutes',
        'TimeMinutes',
        'durationMinutes',
        'DurationMinutes',
        'totalMinutes',
        'TotalMinutes',
        'seconds',
        'Seconds',
        'timeSeconds',
        'TimeSeconds',
        'durationSeconds',
        'DurationSeconds',
        'totalSeconds',
        'TotalSeconds',
        'value',
        'Value',
        'time',
        'Time',
        'duration',
        'Duration',
        'total',
        'Total'
      ]);
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
      const parsed = parseMetricValue(value, unitFromMetricKey(key));
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
            const parsed = firstMetric(entry, ['hours', 'Hours', 'timeHours', 'TimeHours', 'durationHours', 'DurationHours', 'valueHours', 'ValueHours', 'minutes', 'Minutes', 'timeMinutes', 'TimeMinutes', 'durationMinutes', 'DurationMinutes', 'valueMinutes', 'ValueMinutes', 'seconds', 'Seconds', 'timeSeconds', 'TimeSeconds', 'durationSeconds', 'DurationSeconds', 'valueSeconds', 'ValueSeconds', 'value', 'Value', 'time', 'Time', 'duration', 'Duration', 'total', 'Total']);
            if (parsed !== null) return parsed;
          }
        }
        continue;
      }
      if (source && typeof source === 'object') {
        for (const [key, value] of Object.entries(source)) {
          if (includesAny(key, needles) || includesAny(entryName(value), needles)) {
            const parsed = parseMetricValue(value, unitFromMetricKey(key));
            if (parsed !== null) return parsed;
          }
        }
      }
    }
    return null;
  }

  function awayTime(operator) {
    return periodMixMetric(operator, ['gold', 'yellow', 'amber', 'orange'], ['away']) ?? firstMetric(operator, [
      'awayTime',
      'away_time',
      'AwayTime',
      'Away_Time',
      'Away Time',
      'awayHours',
      'away_hours',
      'AwayHours',
      'Away_Hours',
      'Away Hours',
      'awayMinutes',
      'away_minutes',
      'AwayMinutes',
      'Away_Minutes',
      'Away Minutes',
      'totalAwayMinutes',
      'total_away_minutes',
      'TotalAwayMinutes',
      'Total Away Minutes',
      'awaySeconds',
      'away_seconds',
      'AwaySeconds',
      'Away Seconds',
      'totalAway',
      'total_away',
      'TotalAway',
      'Total Away',
      'away',
      'Away'
    ]);
  }

  function setupTime(operator) {
    return periodMixMetric(operator, ['teal'], ['setup', 'block']) ?? firstMetric(operator, [
      'periodMixTeal',
      'period_mix_teal',
      'PeriodMixTeal',
      'Period Mix Teal',
      'Teal',
      'teal',
      'blockTime',
      'block_time',
      'BlockTime',
      'Block_Time',
      'Block Time',
      'blockHours',
      'block_hours',
      'BlockHours',
      'Block_Hours',
      'Block Hours',
      'setupTime',
      'setup_time',
      'setUpTime',
      'set_up_time',
      'SetupTime',
      'SetUpTime',
      'Setup_Time',
      'Set_Up_Time',
      'Setup Time',
      'Set Up Time',
      'setupHours',
      'setup_hours',
      'setUpHours',
      'set_up_hours',
      'SetupHours',
      'SetUpHours',
      'Setup Hours',
      'Set Up Hours',
      'setupMinutes',
      'setup_minutes',
      'setUpMinutes',
      'set_up_minutes',
      'SetupMinutes',
      'SetUpMinutes',
      'Setup Minutes',
      'Set Up Minutes',
      'blockMinutes',
      'block_minutes',
      'BlockMinutes',
      'Block Minutes',
      'setupSeconds',
      'setup_seconds',
      'setUpSeconds',
      'set_up_seconds',
      'SetupSeconds',
      'SetUpSeconds',
      'Setup Seconds',
      'Set Up Seconds',
      'blockSeconds',
      'block_seconds',
      'BlockSeconds',
      'Block Seconds',
      'setup',
      'Setup',
      'setUp',
      'Set Up',
      'block',
      'Block'
    ]);
  }

  function formatTimeMetric(value) {
    if (!Number.isFinite(value)) return '--';
    const minutes = Math.max(0, Math.round(value * 60));
    return `${minutes}m`;
  }

  function metricHoursFromText(value) {
    const parsed = parseMetricValue(value);
    return parsed !== null && Number.isFinite(parsed) ? parsed : null;
  }

  function textSources(element) {
    return [
      element?.getAttribute?.('aria-label'),
      element?.getAttribute?.('title'),
      element?.getAttribute?.('data-value'),
      element?.getAttribute?.('data-label'),
      element?.getAttribute?.('data-tooltip'),
      element?.textContent
    ].filter(Boolean);
  }

  function categoryHoursFromText(text, labels) {
    const normalized = String(text || '').replace(/\s+/g, ' ').trim();
    if (!normalized) return null;
    for (const label of labels) {
      const escaped = String(label).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const after = normalized.match(new RegExp(`${escaped}[^\\d]{0,40}(\\d+(?:\\.\\d+)?)\\s*([hms])\\b`, 'i'));
      if (after) return metricHoursFromText(`${after[1]}${after[2]}`);
      const before = normalized.match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*([hms])\\b[^a-z0-9]{0,40}${escaped}`, 'i'));
      if (before) return metricHoursFromText(`${before[1]}${before[2]}`);
    }
    return null;
  }

  function categoryHoursFromElement(element, labels) {
    for (const text of textSources(element)) {
      const parsed = categoryHoursFromText(text, labels);
      if (parsed !== null) return parsed;
    }
    return null;
  }

  function rgbFromCss(value) {
    const text = String(value || '').trim();
    if (!text || text === 'none' || text === 'transparent') return null;
    const hex = text.match(/^#([0-9a-f]{3,8})$/i);
    if (hex) {
      let raw = hex[1];
      if (raw.length === 3 || raw.length === 4) raw = raw.split('').map(char => char + char).join('');
      const alpha = raw.length === 8 ? Number.parseInt(raw.slice(6, 8), 16) / 255 : 1;
      if (alpha <= 0.05) return null;
      return {
        r: Number.parseInt(raw.slice(0, 2), 16),
        g: Number.parseInt(raw.slice(2, 4), 16),
        b: Number.parseInt(raw.slice(4, 6), 16)
      };
    }
    const match = text.match(/rgba?\(([^)]+)\)/i);
    if (!match) return null;
    const parts = match[1].split(',').map(part => Number.parseFloat(part.trim()));
    if (parts.length < 3 || parts.some((part, index) => index < 3 && !Number.isFinite(part))) return null;
    if (parts.length > 3 && parts[3] <= 0.05) return null;
    return { r: parts[0], g: parts[1], b: parts[2] };
  }

  function rgbToHsl({ r, g, b }) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lightness = (max + min) / 2;
    if (max === min) return { hue: 0, saturation: 0, lightness };
    const delta = max - min;
    const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    const hue = max === r
      ? ((g - b) / delta + (g < b ? 6 : 0)) * 60
      : max === g
        ? ((b - r) / delta + 2) * 60
        : ((r - g) / delta + 4) * 60;
    return { hue, saturation, lightness };
  }

  function periodRoleFromColor(color) {
    const rgb = rgbFromCss(color);
    if (!rgb) return null;
    const { hue, saturation, lightness } = rgbToHsl(rgb);
    if (saturation < 0.18) return null;
    if (hue >= 30 && hue <= 58) return 'away';
    if (hue >= 195 && hue <= 225) return 'eval';
    if (hue >= 148 && hue <= 178 && lightness >= 0.62) return 'setup';
    if (hue >= 130 && hue <= 175 && lightness < 0.62) return 'operating';
    return null;
  }

  function elementColor(element) {
    const style = getComputedStyle(element);
    return [
      style.backgroundColor,
      style.fill,
      style.stroke,
      element.getAttribute?.('fill'),
      element.getAttribute?.('stroke')
    ].find(value => rgbFromCss(value));
  }

  function colorStopsFromGradient(backgroundImage) {
    const text = String(backgroundImage || '');
    if (!text.includes('gradient')) return [];
    const colorRegex = /(rgba?\([^)]+\)|#[0-9a-f]{3,8}|[a-z]+)\s+([\d.]+)%/ig;
    const stops = [];
    let match;
    while ((match = colorRegex.exec(text))) {
      const role = periodRoleFromColor(match[1]);
      const position = Number.parseFloat(match[2]);
      if (Number.isFinite(position)) stops.push({ role, position });
    }
    return stops.sort((a, b) => a.position - b.position);
  }

  function ratiosFromGradient(backgroundImage) {
    const stops = colorStopsFromGradient(backgroundImage);
    if (stops.length < 2) return null;
    const widths = { away: 0, setup: 0, operating: 0, total: 0 };
    for (let index = 0; index < stops.length - 1; index += 1) {
      const current = stops[index];
      const next = stops[index + 1];
      const width = Math.max(0, next.position - current.position);
      widths.total += width;
      if (current.role) widths[current.role] += width;
    }
    if (widths.total <= 0 || (!widths.away && !widths.setup && !widths.operating)) return null;
    return {
      awayRatio: widths.away / widths.total,
      setupRatio: widths.setup / widths.total,
      operatingRatio: widths.operating / widths.total
    };
  }

  function rowOperatorName(row) {
    const firstCell = row.querySelector('td,[role="cell"]');
    const text = (firstCell?.innerText || firstCell?.textContent || '').trim();
    const lines = text.split(/\n+/).map(line => line.trim()).filter(Boolean);
    const name = lines.find(line => !/^id\b/i.test(line) && !/^operator$/i.test(line));
    return name || '';
  }

  function latestHoursFromRow(row) {
    const text = row.innerText || row.textContent || '';
    const matches = [...text.matchAll(/(\d+(?:\.\d+)?)\s*h\b/gi)].map(match => Number.parseFloat(match[1]));
    if (matches.length >= 2) return matches[1];
    return matches[0] || 0;
  }

  function periodMixRatiosFromRow(row) {
    const applyPeriodSegmentFallback = segments => {
      if (segments.some(segment => segment.role) || segments.length < 3) return segments;
      return segments.map((segment, index) => ({
        ...segment,
        role: index === 1
          ? 'away'
          : index === segments.length - 2
            ? 'operating'
            : index === segments.length - 1
              ? 'setup'
              : null
      }));
    };
    const candidates = [...row.querySelectorAll('*')].map(element => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 120 || rect.height < 4 || rect.height > 36) return null;
      const gradientRatios = ratiosFromGradient(getComputedStyle(element).backgroundImage);
      if (gradientRatios) {
        return {
          element,
          rect,
          segments: [],
          coloredWidth: rect.width,
          awayHours: categoryHoursFromElement(element, ['away']),
          setupHours: categoryHoursFromElement(element, ['setup', 'setup / blocked', 'blocked']),
          ...gradientRatios
        };
      }
      const segments = [...element.children].map(child => {
        const childRect = child.getBoundingClientRect();
        if (childRect.width < 1 || childRect.height < 3 || childRect.height > 36) return null;
        const colorValue = elementColor(child);
        const role = periodRoleFromColor(colorValue);
        const color = rgbFromCss(colorValue);
        if (!color && childRect.width < 3) return null;
        return {
          role,
          width: childRect.width,
          left: childRect.left,
          awayHours: categoryHoursFromElement(child, ['away']),
          setupHours: categoryHoursFromElement(child, ['setup', 'setup / blocked', 'blocked'])
        };
      }).filter(Boolean);
      const descendantSegments = segments.length ? [] : [...element.querySelectorAll('*')].map(child => {
        const childRect = child.getBoundingClientRect();
        if (childRect.width < 1 || childRect.height < 3 || childRect.height > 36) return null;
        if (childRect.left < rect.left - 1 || childRect.right > rect.right + 1) return null;
        const colorValue = elementColor(child);
        const role = periodRoleFromColor(colorValue);
        const color = rgbFromCss(colorValue);
        const tag = String(child.tagName || '').toLowerCase();
        const likelySegment = ['rect', 'path', 'div', 'span'].includes(tag) && childRect.width >= 3;
        if (!color && !likelySegment) return null;
        return {
          role,
          width: childRect.width,
          left: childRect.left,
          awayHours: categoryHoursFromElement(child, ['away']),
          setupHours: categoryHoursFromElement(child, ['setup', 'setup / blocked', 'blocked'])
        };
      }).filter(Boolean);
      const allSegments = applyPeriodSegmentFallback((segments.length ? segments : descendantSegments).sort((a, b) => a.left - b.left));
      const coloredWidth = allSegments.reduce((sum, segment) => sum + segment.width, 0);
      if (allSegments.length < 1 || coloredWidth < 8 || !allSegments.some(segment => segment.role)) return null;
      return {
        element,
        rect,
        segments: allSegments,
        coloredWidth: Math.max(rect.width, coloredWidth),
        awayHours: categoryHoursFromElement(element, ['away']) ?? allSegments.find(segment => segment.awayHours !== null)?.awayHours ?? null,
        setupHours: categoryHoursFromElement(element, ['setup', 'setup / blocked', 'blocked']) ?? allSegments.find(segment => segment.setupHours !== null)?.setupHours ?? null
      };
    }).filter(Boolean);
    const candidate = candidates.sort((a, b) => b.coloredWidth - a.coloredWidth)[0];
    if (!candidate) return null;
    if (Number.isFinite(candidate.awayRatio) || Number.isFinite(candidate.setupRatio)) {
      return {
        awayRatio: candidate.awayRatio || 0,
        setupRatio: candidate.setupRatio || 0,
        operatingRatio: candidate.operatingRatio || 0,
        awayHours: candidate.awayHours,
        setupHours: candidate.setupHours,
        latestHours: latestHoursFromRow(row)
      };
    }
    const awayWidth = candidate.segments
      .filter(segment => segment.role === 'away')
      .reduce((sum, segment) => sum + segment.width, 0);
    const setupWidth = candidate.segments
      .filter(segment => segment.role === 'setup')
      .reduce((sum, segment) => sum + segment.width, 0);
    const operatingWidth = candidate.segments
      .filter(segment => segment.role === 'operating')
      .reduce((sum, segment) => sum + segment.width, 0);
    return {
      awayRatio: awayWidth / candidate.coloredWidth,
      setupRatio: setupWidth / candidate.coloredWidth,
      operatingRatio: operatingWidth / candidate.coloredWidth,
      awayHours: candidate.awayHours,
      setupHours: candidate.setupHours,
      latestHours: latestHoursFromRow(row)
    };
  }

  function pagePeriodMixByName() {
    const rows = [...document.querySelectorAll('tr,[role="row"]')]
      .filter(row => !row.closest?.(`#${C.overlayId}`));
    const results = {};
    rows.forEach(row => {
      const name = rowOperatorName(row);
      if (!name) return;
      const ratios = periodMixRatiosFromRow(row);
      if (!ratios) return;
      const key = normalizeNameKey(name);
      if (!key) return;
      if (!results[key]) results[key] = [];
      results[key].push(ratios);
    });
    return results;
  }

  function pagePeriodMixForOperator(name, pageMix, seenCounts, totalHours) {
    const key = normalizeNameKey(name);
    const list = pageMix[key];
    if (!list?.length) return null;
    const index = seenCounts[key] || 0;
    seenCounts[key] = index + 1;
    const mix = list[Math.min(index, list.length - 1)];
    const operatingHours = Number.isFinite(mix.latestHours) && mix.latestHours > 0 ? mix.latestHours : totalHours;
    if (mix.awayHours !== null || mix.setupHours !== null) {
      return {
        away: mix.awayHours,
        setup: mix.setupHours
      };
    }
    if (!Number.isFinite(operatingHours) || operatingHours <= 0) return null;
    const observedHours = mix.operatingRatio > 0 ? operatingHours / mix.operatingRatio : operatingHours;
    return {
      away: mix.awayHours ?? (mix.awayRatio > 0 ? observedHours * mix.awayRatio : null),
      setup: mix.setupHours ?? (mix.setupRatio > 0 ? observedHours * mix.setupRatio : null)
    };
  }

  function operatorHours(operator) {
    const collectedRaw = operator.collectedHours ?? operator['Collected Hours'];
    const evalRaw = operator.EvalHours ?? operator['Eval Hours'] ?? operator.evalHours ?? operator.eval_hours;
    const hasCollectedOrEval = [collectedRaw, evalRaw].some(value => value !== undefined && value !== null && value !== '');
    if (hasCollectedOrEval) return num(collectedRaw) + num(evalRaw);
    const directTotal = operator.totalHours ??
      operator.total_hours ??
      operator.TotalHours ??
      operator['Total Hours'] ??
      operator.total ??
      operator.Total ??
      operator.hours ??
      operator.Hours;
    return num(directTotal);
  }

  function shiftStart(now) {
    const start = new Date(now);
    start.setHours(C.shiftStartHour, C.shiftStartMinute, 0, 0);
    const end = new Date(start);
    end.setHours(C.shiftEndHour, C.shiftEndMinute, 0, 0);
    if (end <= start) end.setDate(end.getDate() + 1);
    if (now < start) {
      const previousStart = new Date(start);
      previousStart.setDate(previousStart.getDate() - 1);
      const previousEnd = new Date(end);
      previousEnd.setDate(previousEnd.getDate() - 1);
      if (now <= previousEnd) return previousStart;
    }
    return start;
  }

  function projected(totalHours, timestamp) {
    const now = timestamp instanceof Date && !Number.isNaN(timestamp.getTime()) ? timestamp : new Date();
    const elapsedShiftHours = clamp((now - shiftStart(now)) / 3600000, 0, C.totalShiftHours);
    const elapsedProductiveHours = elapsedShiftHours / C.totalShiftHours * C.productiveShiftHours;
    if (elapsedProductiveHours < C.minElapsedHours || totalHours < C.minCurrentHours) return null;
    return clamp(totalHours / elapsedProductiveHours * C.productiveShiftHours, 0, 99.99);
  }

  function shiftWindow(now) {
    const start = shiftStart(now);
    const showStart = new Date(start);
    showStart.setHours(C.showStartHour, C.showStartMinute, 0, 0);
    const end = new Date(start);
    end.setHours(C.shiftEndHour, C.shiftEndMinute, 0, 0);
    if (end <= start) end.setDate(end.getDate() + 1);
    const finishCountdown = new Date(end);
    finishCountdown.setHours(C.finishCountdownHour, C.finishCountdownMinute, 0, 0);
    if (finishCountdown < start) finishCountdown.setDate(finishCountdown.getDate() + 1);
    return { showStart, start, finishCountdown, end };
  }

  function shiftMoment(start, hour, minute) {
    const moment = new Date(start);
    moment.setHours(hour, minute, 0, 0);
    if (moment < start) moment.setDate(moment.getDate() + 1);
    return moment;
  }

  function activeBreak(now, started) {
    if (!started) return null;
    for (const item of C.breaks) {
      const start = shiftMoment(shiftStart(now), item.hour, item.minute);
      const end = new Date(start.getTime() + item.durationMin * 60000);
      if (now >= start && now < end) return { ...item, start, end, remainingMs: end - now };
    }
    return null;
  }

  function courseHold(now, started) {
    const window = shiftWindow(now);
    if (now >= window.showStart && now < window.start) {
      return {
        label: 'START COUNTDOWN',
        message: 'LION OPS LIVE RACE starts in',
        remainingMs: window.start - now,
        durationMs: window.start - window.showStart
      };
    }
    const breakItem = activeBreak(now, started);
    if (breakItem) return breakItem;
    if (now >= window.finishCountdown && now < window.end) {
      return {
        label: 'FINISH COUNTDOWN',
        message: 'LION OPS LIVE RACE finish countdown',
        remainingMs: window.end - now,
        durationMs: window.end - window.finishCountdown
      };
    }
    return null;
  }

  function holdLabel(hold) {
    if (!hold) return '';
    if (String(hold.label || '').includes('LUNCH')) return 'LUNCH';
    if (String(hold.label || '').includes('BREAK')) return 'BREAK';
    return hold.label || 'COUNTDOWN';
  }

  function holdDurationMs(hold) {
    if (!hold) return 0;
    if (Number.isFinite(hold.durationMs)) return hold.durationMs;
    if (Number.isFinite(hold.durationMin)) return hold.durationMin * 60000;
    if (hold.start instanceof Date && hold.end instanceof Date) return hold.end - hold.start;
    return Math.max(hold.remainingMs || 0, 0);
  }

  function stopwatchAngle(hold) {
    const duration = holdDurationMs(hold);
    if (!duration) return 0;
    const elapsed = clamp(duration - hold.remainingMs, 0, duration);
    return elapsed / (30 * 60 * 1000) * 360;
  }

  function finalCountdownNumber(hold) {
    if (!hold || hold.remainingMs > 3000 || hold.remainingMs <= 0) return '';
    return String(Math.ceil(hold.remainingMs / 1000));
  }

  function formatCountdown(ms) {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function markActivity(operators) {
    if (localPreview) {
      return operators
        .map(operator => ({ ...operator, inactive: false }))
        .filter(operator => Number(operator.locker) >= 1 && Number(operator.locker) <= C.maxLockerNumber);
    }
    const nowMs = Date.now();
    const present = new Set();
    return operators.map(operator => {
      const key = String(operator.locker);
      present.add(key);
      const currentTotal = Number(operator.total || 0).toFixed(3);
      const currentSessions = String(Math.max(0, Math.round(operator.sessions || 0)));
      const previous = state.activity[key];
      if (!previous || previous.total !== currentTotal || previous.sessions !== currentSessions) {
        state.activity[key] = {
          total: currentTotal,
          sessions: currentSessions,
          lastChangedAt: nowMs,
          inactive: false
        };
      } else {
        previous.inactive = operator.total > 0 && nowMs - previous.lastChangedAt >= C.inactiveMs;
      }
      return { ...operator, inactive: Boolean(state.activity[key]?.inactive) };
    }).filter(operator => {
      return Number(operator.locker) >= 1 && Number(operator.locker) <= C.maxLockerNumber;
    });
  }

  function normalize(raw) {
    const timestamp = raw?.collectionOps?.timestamp ? new Date(raw.collectionOps.timestamp) : new Date();
    const labelCounts = {};
    const pageMix = pagePeriodMixByName();
    const pageMixCounts = {};
    const operators = (raw?.collectionOps?.operators || [])
      .map(operator => {
        const name = operatorName(operator);
        const total = operatorHours(operator);
        const pagePeriodMix = pagePeriodMixForOperator(name, pageMix, pageMixCounts, total);
        const directAway = awayTime(operator);
        const directSetup = setupTime(operator);
        const locker = operatorLocker(operator) ?? labelFor(name, labelCounts);
        return {
          name,
          locker,
          total,
          projected: projected(total, timestamp),
          sessions: sessions(operator),
          away: pagePeriodMix?.away ?? directAway,
          setup: pagePeriodMix?.setup ?? directSetup
        };
      })
      .filter(operator => operator.locker !== '--')
      .sort((a, b) => Number(a.locker) - Number(b.locker));
    if (!operators.length) throw new Error('No labeled operators were returned from the API.');
    return { timestamp, operators };
  }

  function demoRaw() {
    const seconds = Math.floor(Date.now() / 1000);
    const operators = LABEL_ENTRIES.slice(0, C.maxStations).map(([name], index) => {
      const wave = (Math.sin(seconds / 17 + index * 1.4) + 1) * 0.08;
      const base = clamp(4.9 - index * 0.16 + wave, 0.12, 5.65);
      return {
        operator: name,
        collectedHours: Math.max(base - 0.2, 0).toFixed(2),
        EvalHours: (0.08 + (index % 5) * 0.04).toFixed(2),
        collectSessions: 2 + index % 8,
        'Period Mix': [
          { color: 'Cyan', hours: index % 6 === 0 ? '--' : (0.04 + (index % 5) * 0.025).toFixed(2) },
          { color: 'Teal', hours: index % 7 === 0 ? '--' : (0.02 + (index % 4) * 0.018).toFixed(2) }
        ]
      };
    });
    return { collectionOps: { timestamp: new Date().toISOString(), operators } };
  }

  async function fetchShift() {
    if (localPreview) return normalize(demoRaw());
    const url = new URL(C.apiUrl);
    url.searchParams.set('_rolTs', String(Date.now()));
    const response = await fetch(url.toString(), { credentials: 'include', mode: 'cors', cache: 'no-store' });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return normalize(await response.json());
  }

  function rankedOperators(operators) {
    return operators
      .filter(operator => operator.total > 0)
      .sort((a, b) => b.total - a.total || Number(a.locker) - Number(b.locker));
  }

  function hasActivity(operator) {
    return operator.total > 0 || Number(operator.sessions || 0) > 0;
  }

  function paceStatus(projectedHours, totalHours) {
    if (projectedHours == null) return ['WAITING', 'waiting'];
    if (projectedHours >= C.targetHours) return ['ON PACE', 'good'];
    if (projectedHours >= 4.5 || totalHours >= 4.5) return ['CLOSE', 'close'];
    if (projectedHours >= 4) return ['WATCH', 'watch'];
    return ['NEEDS BOOST', 'risk'];
  }

  function trendClass(key, value) {
    const previous = state.previousValues[key];
    if (previous === undefined) return '';
    if (previous === value) return '';
    return ' changed';
  }

  function rankUpClass(locker, rank) {
    const previous = Number(state.previousValues[`${locker}:rank`]);
    const current = Number(rank);
    if (!Number.isFinite(previous) || !Number.isFinite(current)) return '';
    return current < previous ? ' is-rank-up' : '';
  }

  function hasRankUp(operators, rankByLocker) {
    return operators.some(operator => Boolean(rankUpClass(operator.locker, rankByLocker[operator.locker] || '--')));
  }

  function triggerRankFireworks() {
    const overlay = $(C.overlayId);
    if (!overlay) return;
    overlay.classList.remove('is-rank-fireworks');
    void overlay.offsetWidth;
    overlay.classList.add('is-rank-fireworks');
    clearTimeout(state.rankFireworksTimer);
    state.rankFireworksTimer = setTimeout(() => {
      overlay.classList.remove('is-rank-fireworks');
    }, 5600);
  }

  function rememberValues(operators, rankByLocker = {}) {
    state.previousValues = Object.fromEntries(operators.flatMap(operator => {
      const projectedText = operator.projected == null ? '--' : operator.projected.toFixed(2);
      const hourText = `${operator.total.toFixed(2)}/${projectedText}`;
      return [
        [`${operator.locker}:rank`, String(rankByLocker[operator.locker] || '--')],
        [`${operator.locker}:total`, hourText],
        [`${operator.locker}:projected`, projectedText],
        [`${operator.locker}:sessions`, String(Math.max(0, Math.round(operator.sessions || 0)))],
        [`${operator.locker}:away`, formatTimeMetric(operator.away)],
        [`${operator.locker}:setup`, formatTimeMetric(operator.setup)]
      ];
    }));
  }

  function formatUpdated(timestamp) {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = C.styleId;
    style.textContent = `
      @keyframes rolFade{from{opacity:0}to{opacity:1}}
      @keyframes rolFinalPop{0%{opacity:0;transform:scale(.55)}22%{opacity:1;transform:scale(1.18)}100%{opacity:1;transform:scale(1)}}
      @keyframes rolSpark{0%,72%,100%{opacity:0;transform:scale(.72) rotate(0deg)}76%,84%{opacity:1;transform:scale(1.15) rotate(18deg)}}
      @keyframes rolShock{0%,70%,100%{filter:none}76%,84%{filter:brightness(1.35) drop-shadow(0 0 10px #fde047)}}
      @keyframes rolChanged{0%{background:rgba(250,204,21,.35)}100%{background:transparent}}
      @keyframes rolAnnouncerPop{0%{opacity:0;transform:translateY(10px) scale(.9)}18%{opacity:1;transform:translateY(-2px) scale(1.03)}100%{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes rolBubblePop{0%{opacity:0;transform:translateY(5px) scale(.86)}25%{opacity:1;transform:translateY(-1px) scale(1.04)}100%{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes rolFinishFlash{0%,100%{filter:none}18%,42%{filter:brightness(1.6) drop-shadow(0 0 12px #facc15)}}
      @keyframes rolFinishRow{0%{background:rgba(250,204,21,.46)}100%{background:transparent}}
      @keyframes rolConfetti{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--confetti-x),var(--confetti-y)) scale(.3)}}
      @keyframes rolRankFireworks{0%,100%{opacity:0;transform:translateY(-50%) scale(.35) rotate(0deg)}12%,32%{opacity:1;transform:translateY(-50%) scale(1.45) rotate(12deg)}52%{opacity:.85;transform:translateY(-50%) scale(1.05) rotate(-8deg)}}
      @keyframes rolRankGlow{0%,18%{background:rgba(250,204,21,.72);box-shadow:inset 0 0 0 2px rgba(250,204,21,.95),0 0 16px rgba(250,204,21,.8)}100%{background:rgba(255,255,255,.045);box-shadow:none}}
      @keyframes rolRankNumberPop{0%,100%{transform:scale(1);filter:none}16%,48%{transform:scale(1.22);filter:drop-shadow(0 0 8px #facc15)}}
      @keyframes rolScoreFireworkBurst{0%{opacity:0;transform:translate(-50%,-50%) scale(.12)}10%{opacity:1;transform:translate(-50%,-50%) scale(.55)}58%{opacity:1;transform:translate(-50%,-50%) scale(1.12)}82%{opacity:.88;transform:translate(-50%,-50%) scale(1.24)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.36)}}
      @keyframes rolCrowdCheer{
        0%,12.49%{background-position:0 0}
        12.5%,24.99%{background-position:-82px 0}
        25%,37.49%{background-position:-164px 0}
        37.5%,49.99%{background-position:-246px 0}
        50%,62.49%{background-position:0 -82px}
        62.5%,74.99%{background-position:-82px -82px}
        75%,87.49%{background-position:-164px -82px}
        87.5%,100%{background-position:-246px -82px}
      }
      #${C.overlayId}{--rank-board-w:520px;--course-board-gap:100px;--announcer-size:clamp(180px,23vh,255px);--right-rail-right:12px;position:fixed;inset:0;z-index:2147483647;overflow:hidden;color:#12304a;background:#83b80d url("${C.grassBackgroundUrl}") 0 0/220px 220px repeat;image-rendering:pixelated;image-rendering:crisp-edges;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;animation:rolFade .16s ease}
      #${C.overlayId} *{box-sizing:border-box}
      #${C.overlayId} button{min-width:42px;height:9px;border:1px solid rgba(12,45,72,.34);border-radius:3px;padding:0 8px;color:#072033;background:rgba(255,255,255,.78);font:inherit;font-size:6px;line-height:7px;font-weight:1000;letter-spacing:.05em;text-transform:uppercase;cursor:pointer}
      #${C.overlayId} button:hover{background:#fff}
      #${C.overlayId} .controls button{display:grid;place-items:center;min-width:18px;width:18px;height:18px;padding:0;border:2px solid rgba(7,32,51,.78);border-radius:50%;color:#072033;background:rgba(255,255,255,.88);font-size:10px;line-height:1;letter-spacing:0;box-shadow:0 2px 0 rgba(2,6,23,.28)}
      #${C.overlayId} .controls button:hover{background:#fff;transform:translateY(-1px)}
      #${C.overlayId} .shell{position:relative;width:100vw;height:100vh;min-width:980px;min-height:620px;overflow:hidden}
      #${C.overlayId} .title-card{position:absolute;z-index:8;left:16px;top:14px;display:block;color:#09243a;text-shadow:0 1px 0 rgba(255,255,255,.65)}
      #${C.overlayId} .title{font-size:clamp(24px,2.7vw,42px);line-height:.9;font-weight:1000;letter-spacing:.01em;text-transform:uppercase}
      #${C.overlayId} .crew{display:block;margin-top:4px;font-size:10px;font-weight:1000;letter-spacing:.16em}
      #${C.overlayId} .controls{position:fixed;right:6px;top:5px;z-index:9;display:flex;width:var(--rank-board-w);justify-content:flex-end;gap:2px}
      #${C.overlayId} .crowd-cheer{--course-area-w:calc(100vw - var(--rank-board-w) - var(--course-board-gap) - 12px);--course-w:calc((var(--course-area-w) - ${C.startLineWidthPx + C.finishLineWidthPx + C.courseGapPx * 4}px) / 3);position:fixed;z-index:7;left:calc(${C.startLineWidthPx + C.courseGapPx * 2}px + var(--course-w));top:0;width:calc((var(--course-w) * 2) + ${C.courseGapPx}px);height:82px;overflow:hidden;background:transparent;pointer-events:none}
      #${C.overlayId} .crowd-cell{position:absolute;left:var(--x);bottom:0;width:82px;height:82px;background-image:url("${C.crowdCheerUrl}");background-repeat:no-repeat;background-size:328px 164px;background-position:0 0;image-rendering:auto;filter:drop-shadow(0 2px 0 rgba(15,23,42,.32));animation:rolCrowdCheer .9s step-end infinite;animation-delay:var(--delay)}
      #${C.overlayId} .course-wrap{position:absolute;left:0;right:calc(var(--rank-board-w) + var(--course-board-gap) + 12px);top:82px;bottom:10px;overflow:hidden;border:0;border-radius:0;background:#83b80d url("${C.grassBackgroundUrl}") 0 0/220px 220px repeat;image-rendering:pixelated;image-rendering:crisp-edges;box-shadow:none}
      #${C.overlayId} .course-track{--course-gap:${C.courseGapPx}px;--start-line-w:${C.startLineWidthPx}px;--finish-line-w:${C.finishLineWidthPx}px;--runner-size:clamp(31px,3.9vh,49px);--course-start:calc(var(--start-line-w) + var(--course-gap));--course-w:calc((100% - var(--start-line-w) - var(--finish-line-w) - (var(--course-gap) * 4)) / 3);position:absolute;left:0;right:0;top:0;bottom:12px;overflow:hidden;border-radius:0;background:#83b80d;background-image:linear-gradient(rgba(31,91,24,.18),rgba(31,91,24,.18)),url("${C.grassBackgroundUrl}");background-position:0 0,0 0;background-size:100% 100%,220px 220px;background-repeat:no-repeat,repeat;image-rendering:pixelated;image-rendering:crisp-edges;box-shadow:none}
      #${C.overlayId} .segment{position:absolute;z-index:1;top:0;bottom:0;border-left:0;border-right:0}
      #${C.overlayId} .segment.water{left:var(--course-start);width:var(--course-w);background:#22c5eb url("${C.waterTextureUrl}") 0 0/100% auto repeat-y;image-rendering:pixelated;image-rendering:crisp-edges}
      #${C.overlayId} .segment.mud{left:calc(var(--course-start) + var(--course-w) + var(--course-gap));width:var(--course-w);background:#4e2d18 url("${C.mudTextureUrl}") 0 0/112px 112px repeat;image-rendering:pixelated;image-rendering:crisp-edges;overflow:hidden}
      #${C.overlayId} .segment.electric{left:calc(var(--course-start) + var(--course-w) + var(--course-gap) + var(--course-w) + var(--course-gap));width:var(--course-w);background:#8b5a34 url("${C.electricGroundUrl}") 50% 50%/160px 160px repeat;image-rendering:pixelated;image-rendering:crisp-edges;overflow:hidden}
      #${C.overlayId} .segment.electric:before{content:"";position:absolute;inset:0;z-index:1;background:url("${C.thunderTextureUrl}") 16% 0/68px 188px repeat-y,url("${C.thunderTextureUrl}") 62% 42px/64px 178px repeat-y;opacity:.95;mix-blend-mode:screen;pointer-events:none}
      #${C.overlayId} .segment.electric:after{content:"";position:absolute;inset:4px 0;z-index:2;background:url("${C.barbedWireUrl}") 50% 0/190px 96px repeat;opacity:.78;pointer-events:none}
      #${C.overlayId} .start-line{position:absolute;z-index:1;left:0;top:0;bottom:0;width:var(--start-line-w);background:repeating-linear-gradient(0deg,#fef3c7 0 8px,#92400e 8px 16px)}
      #${C.overlayId} .hour-marker{position:absolute;z-index:1;top:0;bottom:0;width:0;border-left:0}
      #${C.overlayId} .marker-1{left:20%}#${C.overlayId} .marker-2{left:40%}#${C.overlayId} .marker-3{left:60%}#${C.overlayId} .marker-4{left:80%}
      #${C.overlayId} .finish-line{position:absolute;z-index:1;right:0;top:0;bottom:0;width:var(--finish-line-w);background:repeating-linear-gradient(0deg,#fff 0 8px,#111827 8px 16px)}
      #${C.overlayId}.is-finish-flash .finish-line{animation:rolFinishFlash 1.4s steps(4) 2}
      #${C.overlayId} .lane{position:absolute;left:0;right:0;height:12px;border-bottom:0}
      #${C.overlayId} .lane-label{display:none}
      #${C.overlayId} .runner{position:absolute;top:calc(var(--runner-size) * -.38);left:min(calc(var(--progress) * 1%),calc(100% - 11px));width:var(--runner-size);height:var(--runner-size);transform:translateX(-50%);z-index:5}
      #${C.overlayId} .locker-badge{position:absolute;left:calc(var(--runner-size) * -.55);top:calc(var(--runner-size) * .43);z-index:0;min-width:calc(var(--runner-size) * .55);height:calc(var(--runner-size) * .34);padding:0 4px;border:1px solid rgba(15,23,42,.52);border-radius:4px;color:#fff;background:rgba(15,23,42,.82);box-shadow:3px 3px 0 rgba(0,0,0,.32);font-size:clamp(7px,calc(var(--runner-size) * .23),10px);line-height:calc(var(--runner-size) * .31);font-weight:1000;text-align:center;text-shadow:1px 1px 0 #000}
      #${C.overlayId} .sprite{position:relative;z-index:1;width:var(--runner-size);height:var(--runner-size);background-image:url("${C.robotSpriteUrl}");background-repeat:no-repeat;background-size:400% 500%;background-position-x:var(--frame-x,0%);background-position-y:25%}
      #${C.overlayId} .state-idle .sprite{background-position-y:0}
      #${C.overlayId} .state-water .sprite{background-position-y:100%;clip-path:inset(6px 8px 6px 6px)}
      #${C.overlayId} .state-mud .sprite{background-position-y:25%}
      #${C.overlayId} .state-electric .sprite{background-position-y:50%;animation:rolShock 2.8s linear infinite}
      #${C.overlayId} .state-electric:before{content:"";position:absolute;right:-9px;top:-7px;width:17px;height:20px;background:#fde047;clip-path:polygon(42% 0,100% 0,62% 39%,100% 39%,24% 100%,42% 53%,0 53%);opacity:0;animation:rolSpark 2.8s linear infinite}
      #${C.overlayId} .state-finish .sprite{background-position-y:75%}
      #${C.overlayId} .finish-confetti{position:absolute;left:8px;top:-5px;z-index:4;width:4px;height:4px;background:#facc15;box-shadow:10px 4px #38bdf8,18px -2px #fb7185,28px 6px #a3e635,36px -5px #f97316,44px 3px #e879f9;animation:rolConfetti 1.5s ease-out both;--confetti-x:-24px;--confetti-y:-44px;pointer-events:none}
      #${C.overlayId} .course-hold{position:absolute;z-index:6;inset:0;display:none;place-items:center;background:rgba(20,83,45,.28);backdrop-filter:blur(2px);--watch-angle:0deg}
      #${C.overlayId}.is-paused .course-hold{display:grid}
      #${C.overlayId} .stopwatch{position:relative;display:grid;place-items:center;width:190px;height:190px;border:10px solid #111827;border-radius:50%;background:radial-gradient(circle at 50% 55%,#fff 0 55%,#f3f4f6 56%);box-shadow:0 18px 34px rgba(0,0,0,.28)}
      #${C.overlayId} .stopwatch:before{content:"";position:absolute;width:50px;height:18px;margin-top:-205px;border-radius:8px 8px 0 0;background:#111827}
      #${C.overlayId} .watch-ticks{position:absolute;inset:10px;border-radius:50%;pointer-events:none}
      #${C.overlayId} .watch-tick{position:absolute;left:50%;top:0;width:2px;height:8px;background:#111827;transform:translateX(-50%) rotate(calc(var(--tick-i) * 12deg));transform-origin:50% 75px}
      #${C.overlayId} .watch-tick.is-major{width:4px;height:13px;background:#020617}
      #${C.overlayId} .watch-hand{position:absolute;left:50%;top:31px;width:5px;height:58px;border-radius:999px;background:#dc2626;box-shadow:0 0 0 1px rgba(127,29,29,.7);transform:translateX(-50%) rotate(var(--watch-angle));transform-origin:50% 58px}
      #${C.overlayId} .watch-pin{position:absolute;left:50%;top:50%;width:14px;height:14px;border:3px solid #111827;border-radius:50%;background:#facc15;transform:translate(-50%,-50%)}
      #${C.overlayId} .hold-copy{position:relative;z-index:2;margin-top:38px;text-align:center;color:#111827;font-weight:1000;text-shadow:0 1px 0 #fff}
      #${C.overlayId} .hold-copy b{display:block;font-size:16px;text-transform:uppercase}#${C.overlayId} .hold-copy strong{display:block;margin-top:6px;font-size:32px;letter-spacing:.04em}
      #${C.overlayId} .final-countdown{position:absolute;inset:0;z-index:4;display:none;place-items:center;color:#facc15;font-size:92px;line-height:1;font-weight:1000;text-shadow:4px 4px 0 #111827,-2px -2px 0 #111827,0 0 18px rgba(250,204,21,.7);pointer-events:none}
      #${C.overlayId} .final-countdown.is-active{display:grid;animation:rolFinalPop .38s steps(3) both}
      #${C.overlayId} .board{position:fixed;z-index:6;right:var(--right-rail-right);top:calc(76px + var(--announcer-size));width:var(--rank-board-w);max-height:calc(100vh - var(--announcer-size) - 86px);overflow:hidden;border:3px solid rgba(125,211,252,.72);border-radius:8px;background:linear-gradient(180deg,rgba(7,27,46,.96),rgba(4,18,32,.92));color:#f8fafc;box-shadow:0 16px 30px rgba(0,0,0,.28),0 0 0 3px rgba(2,6,23,.48),0 0 22px rgba(56,189,248,.22)}
      #${C.overlayId} .board:before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px 14px),linear-gradient(0deg,rgba(255,255,255,.035) 0 1px,transparent 1px 14px);opacity:.35}
      #${C.overlayId} .board-title{position:relative;padding:8px 12px 6px;font-size:22px;line-height:1;font-weight:1000;text-transform:uppercase;letter-spacing:.08em;background:linear-gradient(90deg,rgba(2,6,23,.72),rgba(14,116,144,.38),rgba(2,6,23,.72));text-shadow:2px 2px 0 #020617}
      #${C.overlayId} .board-summary{display:grid;grid-template-columns:1fr 1fr 1fr;border-top:1px solid rgba(255,255,255,.16);border-bottom:1px solid rgba(255,255,255,.16)}
      #${C.overlayId} .board-summary div{padding:6px 9px;text-align:center;border-right:1px solid rgba(255,255,255,.14)}
      #${C.overlayId} .board-summary div:last-child{border-right:0}
      #${C.overlayId} .board-summary b{display:block;color:#a5f3fc;font-size:11px;letter-spacing:.08em;text-transform:uppercase}#${C.overlayId} .board-summary strong{display:block;font-size:25px;line-height:1.1}
      #${C.overlayId} .board-head,#${C.overlayId} .row{display:grid;grid-template-columns:54px 68px 130px 56px 86px 86px;align-items:center}
      #${C.overlayId} .board-head{position:relative;padding:5px 10px;color:#bae6fd;background:rgba(2,6,23,.62);font-size:11px;font-weight:1000;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.14)}
      #${C.overlayId} .rows{max-height:calc(100vh - var(--announcer-size) - 210px);overflow:hidden}
      #${C.overlayId} .row{position:relative;min-height:19px;padding:0 10px;border-bottom:1px solid rgba(255,255,255,.07);font-size:15px;line-height:19px;font-weight:900}
      #${C.overlayId} .row:nth-child(even){background:rgba(255,255,255,.045)}
      #${C.overlayId} .row.is-finished{animation:rolFinishRow 2.4s ease both}
      #${C.overlayId} .row.is-rank-up{animation:rolRankGlow 3.6s ease both}
      #${C.overlayId} .row.is-rank-up:before,#${C.overlayId} .row.is-rank-up:after{content:"";position:absolute;z-index:1;top:50%;width:7px;height:7px;background:#facc15;box-shadow:10px -10px #38bdf8,18px 7px #fb7185,30px -4px #a3e635,42px 9px #f97316,54px -8px #e879f9,66px 4px #fef08a;animation:rolRankFireworks 1.8s steps(3) 2;pointer-events:none}
      #${C.overlayId} .row.is-rank-up:before{left:6px}
      #${C.overlayId} .row.is-rank-up:after{right:78px}
      #${C.overlayId} .row.is-rank-up .rank{display:inline-block;color:#fff7ad;text-shadow:0 0 6px #facc15,2px 2px 0 #020617;animation:rolRankNumberPop 1.8s steps(2) 2}
      #${C.overlayId} .rank{color:#fef08a}#${C.overlayId} .hours{color:#d9f99d}#${C.overlayId} .time-value{color:#c4b5fd}
      #${C.overlayId} .changed{animation:rolChanged .7s ease}
      #${C.overlayId} .rank-fireworks-layer{position:fixed;right:var(--right-rail-right);top:calc(76px + var(--announcer-size));z-index:8;width:var(--rank-board-w);height:calc(100vh - var(--announcer-size) - 86px);overflow:visible;pointer-events:none}
      #${C.overlayId} .score-firework{position:absolute;left:var(--fw-left);top:var(--fw-top);width:12px;height:12px;border-radius:999px;opacity:0;background:radial-gradient(circle,#fff 0 26%,var(--fw-a) 27% 58%,transparent 68%);box-shadow:0 0 20px var(--fw-a),0 0 38px rgba(255,255,255,.58);filter:drop-shadow(0 0 10px var(--fw-a)) drop-shadow(0 0 18px rgba(255,255,255,.55));transform:translate(-50%,-50%) scale(.2)}
      #${C.overlayId} .score-firework:before,#${C.overlayId} .score-firework:after{content:"";position:absolute;left:50%;top:50%;width:7px;height:7px;border-radius:999px;background:var(--fw-a);box-shadow:0 -58px 0 var(--fw-a),41px -41px 0 var(--fw-b),58px 0 0 var(--fw-c),41px 41px 0 var(--fw-a),0 58px 0 var(--fw-b),-41px 41px 0 var(--fw-c),-58px 0 0 var(--fw-a),-41px -41px 0 var(--fw-b),22px -54px 0 #fff,-22px 54px 0 #fff;filter:drop-shadow(0 0 8px rgba(255,255,255,.75));transform:translate(-50%,-50%)}
      #${C.overlayId} .score-firework:after{width:5px;height:5px;box-shadow:0 -36px 0 var(--fw-c),25px -25px 0 var(--fw-a),36px 0 0 var(--fw-b),25px 25px 0 var(--fw-c),0 36px 0 var(--fw-a),-25px 25px 0 var(--fw-b),-36px 0 0 var(--fw-c),-25px -25px 0 var(--fw-a),13px -34px 0 #fff,-13px 34px 0 #fff;transform:translate(-50%,-50%) rotate(22deg)}
      #${C.overlayId}.is-rank-fireworks .score-firework{animation:rolScoreFireworkBurst 2.2s ease-out forwards;animation-delay:var(--fw-delay)}
      #${C.overlayId} .score-firework-a{--fw-left:12%;--fw-top:18%;--fw-delay:0s;--fw-a:#fde047;--fw-b:#f472b6;--fw-c:#38bdf8}
      #${C.overlayId} .score-firework-b{--fw-left:78%;--fw-top:22%;--fw-delay:.34s;--fw-a:#fb7185;--fw-b:#a7f3d0;--fw-c:#facc15}
      #${C.overlayId} .score-firework-c{--fw-left:42%;--fw-top:32%;--fw-delay:.68s;--fw-a:#93c5fd;--fw-b:#fef3c7;--fw-c:#f97316}
      #${C.overlayId} .score-firework-d{--fw-left:18%;--fw-top:47%;--fw-delay:1.02s;--fw-a:#86efac;--fw-b:#f9a8d4;--fw-c:#fde047}
      #${C.overlayId} .score-firework-e{--fw-left:88%;--fw-top:49%;--fw-delay:1.36s;--fw-a:#c084fc;--fw-b:#fef08a;--fw-c:#67e8f9}
      #${C.overlayId} .score-firework-f{--fw-left:54%;--fw-top:61%;--fw-delay:1.7s;--fw-a:#f97316;--fw-b:#bef264;--fw-c:#f9a8d4}
      #${C.overlayId} .score-firework-g{--fw-left:26%;--fw-top:73%;--fw-delay:2.04s;--fw-a:#67e8f9;--fw-b:#fef08a;--fw-c:#fb7185}
      #${C.overlayId} .score-firework-h{--fw-left:80%;--fw-top:78%;--fw-delay:2.38s;--fw-a:#bef264;--fw-b:#c084fc;--fw-c:#f97316}
      #${C.overlayId} .score-firework-i{--fw-left:48%;--fw-top:88%;--fw-delay:2.72s;--fw-a:#f9a8d4;--fw-b:#38bdf8;--fw-c:#fde047}
      #${C.overlayId} .score-firework-j{--fw-left:8%;--fw-top:88%;--fw-delay:3.06s;--fw-a:#fef08a;--fw-b:#fb7185;--fw-c:#86efac}
      #${C.overlayId} .announcer-panel{position:fixed;right:calc(var(--right-rail-right) + ((var(--rank-board-w) - var(--announcer-size)) / 2));top:48px;z-index:7;width:var(--announcer-size);height:var(--announcer-size);border-radius:50%;overflow:hidden;background:radial-gradient(circle at 42% 28%,rgba(23,59,120,.75) 0,rgba(7,26,58,.75) 58%,rgba(3,11,29,.75) 100%);border:4px solid rgba(191,219,254,.72);box-shadow:0 16px 26px rgba(0,0,0,.42),0 5px 0 rgba(2,6,23,.34),0 0 18px rgba(59,130,246,.24),inset 0 0 0 4px rgba(255,255,255,.07);animation:rolAnnouncerPop .45s ease both}
      #${C.overlayId} .announcer-panel:before{content:"";position:absolute;inset:7px;border-radius:50%;border:1px solid rgba(147,197,253,.34);pointer-events:none}
      #${C.overlayId} .announcer-bubble{position:absolute;left:11%;top:calc(10% + 5px);z-index:3;width:78%;min-height:24%;padding:8px 10px;border:2px solid #071a3a;border-radius:17px;background:#f8fbff;color:#071a3a;font-size:clamp(9px,calc(var(--announcer-size) * .045),13px);line-height:1.06;font-weight:1000;text-align:center;text-transform:none;letter-spacing:.01em;box-shadow:0 4px 0 rgba(2,6,23,.28);animation:rolBubblePop .36s ease both}
      #${C.overlayId} .announcer-bubble.is-hidden{display:none}
      #${C.overlayId} .announcer-bubble:after{content:"";position:absolute;left:45%;bottom:-10px;width:15px;height:15px;background:#f8fbff;border-right:2px solid #071a3a;border-bottom:2px solid #071a3a;transform:rotate(45deg)}
      #${C.overlayId} .announcer-title{position:absolute;left:0;right:0;bottom:5%;z-index:4;color:#bfdbfe;font-size:clamp(7px,calc(var(--announcer-size) * .034),10px);line-height:1.05;font-weight:1000;letter-spacing:.11em;text-align:center;text-transform:uppercase;text-shadow:0 2px 0 #020617}
      #${C.overlayId} .announcer-figure{position:absolute;left:50%;bottom:calc(1% - 18px);z-index:2;width:calc(80% + 3px);height:calc(72% + 3px);transform:translateX(-50%);background-image:url("${C.commentatorUrls.thinking}");background-repeat:no-repeat;background-position:center bottom;background-size:contain;filter:drop-shadow(0 8px 7px rgba(0,0,0,.38))}
      #${C.overlayId} .announcer-figure[data-expression="excited"]{background-image:url("${C.commentatorUrls.excited}")}
      #${C.overlayId} .announcer-figure[data-expression="thinking"]{background-image:url("${C.commentatorUrls.thinking}")}
      #${C.overlayId} .announcer-figure[data-expression="bored"]{background-image:url("${C.commentatorUrls.bored}")}
      #${C.overlayId} .announcer-figure[data-expression="shocked"]{background-image:url("${C.commentatorUrls.shocked}")}
      #${C.overlayId} .announcer-figure[data-expression="starry"]{bottom:calc(1% - 13px);width:calc(90% + 3px);height:calc(81% + 3px);background-image:url("${C.commentatorUrls.starry}")}
      #${C.overlayId} .announcer-figure[data-expression="laugh"]{bottom:calc(1% - 13px);width:calc(90% + 3px);height:calc(81% + 3px);background-image:url("${C.commentatorUrls.laugh}")}
      #${C.overlayId} .msg{position:fixed;right:14px;bottom:14px;z-index:6;max-width:440px;border:1px solid rgba(254,202,202,.82);border-radius:8px;padding:12px 14px;color:#fecaca;background:rgba(127,29,29,.96);font-size:13px;font-weight:900;box-shadow:0 14px 34px rgba(0,0,0,.32)}
      #${C.overlayId} .host-card{position:fixed;left:50%;top:50%;z-index:7;width:min(520px,calc(100vw - 32px));transform:translate(-50%,-50%);border:1px solid rgba(125,211,252,.32);border-radius:8px;padding:18px;color:#e0f2fe;background:#0b172a;box-shadow:0 22px 54px rgba(0,0,0,.45)}
      #${C.overlayId} .host-card h2{margin:0 0 8px;font-size:22px}
      #${C.overlayId} .host-card p{margin:0 0 14px;color:#b6c5d8;line-height:1.45}
      #${C.overlayId} .host-card a{color:#67e8f9;font-weight:900}
      @media(max-width:1120px){#${C.overlayId} .shell{min-width:1120px}}
      @media(prefers-reduced-motion:reduce){
        #${C.overlayId},#${C.overlayId} *{animation:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function cleanup() {
    clearInterval(state.timer);
    clearInterval(state.clockTimer);
    clearTimeout(state.resizeTimer);
    clearTimeout(state.rankFireworksTimer);
    document.getElementById(C.styleId)?.remove();
    document.getElementById(C.overlayId)?.remove();
    window.removeEventListener('resize', resized);
  }

  function createOverlay() {
    document.getElementById(C.overlayId)?.__cleanup?.();
    document.getElementById(C.overlayId)?.remove();
    const overlay = document.createElement('div');
    overlay.id = C.overlayId;
    overlay.__cleanup = cleanup;
    document.body.appendChild(overlay);
    return overlay;
  }

  function wrongHost(overlay) {
    overlay.innerHTML = `
      <div class="host-card">
        <h2>Open this on Robohub</h2>
        <p>Run this overlay while signed in on <a href="${dashboardUrl}">${C.host}</a> so it can use your existing session.</p>
        <button id="rol-host-close" type="button">Close</button>
      </div>
    `;
    $('rol-host-close')?.addEventListener('click', cleanup);
  }

  function stopwatchTicksHtml() {
    return Array.from({ length: 30 }, (_, index) => (
      `<span class="watch-tick${index % 5 === 0 ? ' is-major' : ''}" style="--tick-i:${index}"></span>`
    )).join('');
  }

  function crowdHtml() {
    return Array.from({ length: 18 }, (_, index) => {
      return `<span class="crowd-cell" style="--x:${index * 76}px;--delay:${(index % 4) * -0.08}s"></span>`;
    }).join('');
  }

  function scoreFireworksHtml() {
    return 'abcdefghij'.split('').map(letter => (
      `<span class="score-firework score-firework-${letter}"></span>`
    )).join('');
  }

  function shell(overlay) {
    overlay.innerHTML = `
      <div class="shell">
        <header class="title-card">
          <div class="title">${C.title}<span class="crew">${C.crew}</span></div>
          <div class="controls">
            <button id="rol-refresh" type="button" title="Refresh" aria-label="Refresh">R</button>
            <button id="rol-close" type="button" title="Close" aria-label="Close">X</button>
          </div>
        </header>
        <div class="crowd-cheer" aria-hidden="true">${crowdHtml()}</div>
        <main class="course-wrap" aria-label="LION OPS LIVE RACE course">
          <div class="course-track" id="rol-course">
            <div class="start-line"></div>
            <div class="hour-marker marker-1"></div>
            <div class="hour-marker marker-2"></div>
            <div class="hour-marker marker-3"></div>
            <div class="hour-marker marker-4"></div>
            <div class="segment water"></div>
            <div class="segment mud"></div>
            <div class="segment electric"></div>
            <div class="finish-line"></div>
          </div>
          <div class="course-hold" id="rol-course-hold">
            <div class="stopwatch">
              <div class="watch-ticks" aria-hidden="true">${stopwatchTicksHtml()}</div>
              <div class="watch-hand" aria-hidden="true"></div>
              <div class="watch-pin" aria-hidden="true"></div>
              <div class="hold-copy">
                <b id="rol-hold-message">LION OPS LIVE RACE</b>
                <strong id="rol-hold-countdown">00:00</strong>
              </div>
              <div class="final-countdown" id="rol-final-countdown" aria-hidden="true"></div>
            </div>
          </div>
        </main>
        <section class="board" aria-label="Operator score board">
          <div class="board-title">Score Board</div>
          <div class="board-summary">
            <div><b>Total Ops</b><strong id="rol-total-ops">0</strong></div>
            <div><b>Total Hrs.</b><strong id="rol-total-hours">0.00</strong></div>
            <div><b>Avg. Hrs.</b><strong id="rol-avg-hours">0.00</strong></div>
          </div>
          <div class="board-head">
            <span>Rank</span>
            <span>Locker</span>
            <span>Hrs/Proj.</span>
            <span>Ses.</span>
            <span>AWAY</span>
            <span>SETUP</span>
          </div>
          <div class="rows" id="rol-rows"></div>
        </section>
        <div class="rank-fireworks-layer" aria-hidden="true">${scoreFireworksHtml()}</div>
        <aside class="announcer-panel" aria-label="TV announcer commentary">
          <div class="announcer-bubble" id="rol-announcer-text">Race desk standing by.</div>
          <div class="announcer-figure" id="rol-announcer-figure" data-expression="thinking" aria-hidden="true"></div>
          <div class="announcer-title">Race<br>Commentator</div>
        </aside>
      </div>
    `;
    $('rol-close')?.addEventListener('click', cleanup);
    $('rol-refresh')?.addEventListener('click', update);
  }

  function courseSegmentBounds() {
    const trackWidth = $('rol-course')?.clientWidth || 1000;
    const segmentWidth = (trackWidth - C.startLineWidthPx - C.finishLineWidthPx - C.courseGapPx * 4) / 3;
    const waterStart = C.startLineWidthPx + C.courseGapPx;
    const waterEnd = waterStart + segmentWidth;
    const mudStart = waterEnd + C.courseGapPx;
    const mudEnd = mudStart + segmentWidth;
    const electricStart = mudEnd + C.courseGapPx;
    const electricEnd = electricStart + segmentWidth;
    return { trackWidth, waterStart, waterEnd, mudStart, mudEnd, electricStart, electricEnd };
  }

  function courseState(totalHours, progress = clamp(totalHours / C.targetHours * 100, 0, 100), runnerSize = 0) {
    if (totalHours >= C.targetHours) return 'finish';
    const bounds = courseSegmentBounds();
    const centerX = bounds.trackWidth * clamp(progress, 0, 100) / 100;
    const leadingX = centerX + runnerSize / 2;
    if (leadingX >= bounds.electricStart && centerX <= bounds.electricEnd) return 'electric';
    if (leadingX >= bounds.mudStart && centerX <= bounds.mudEnd) return 'mud';
    if (leadingX >= bounds.waterStart && centerX <= bounds.waterEnd) return 'water';
    return totalHours > 0 ? 'run' : 'idle';
  }

  function spriteFrameFor(operator, progress) {
    const key = String(operator.locker);
    const previous = state.spriteFrames[key];
    if (!previous) {
      state.spriteFrames[key] = { progress, frame: 0 };
      return 0;
    }
    if (progress > previous.progress + 0.01) {
      previous.frame = (previous.frame + 1) % 4;
    } else if (progress < previous.progress - 0.01) {
      previous.frame = 0;
    }
    previous.progress = progress;
    return previous.frame;
  }

  function framePosition(frame) {
    return ['0%', '33.333%', '66.666%', '100%'][frame] || '0%';
  }

  function updateFinishEvents(operators, now) {
    operators.forEach(operator => {
      const key = String(operator.locker);
      if (operator.total >= C.targetHours && !state.finishedLockers[key]) {
        state.finishedLockers[key] = true;
        state.finishEvents[key] = now.getTime();
        state.latestFinish = { locker: operator.locker, at: now.getTime() };
      }
    });
  }

  function finishEventActive(locker, now, durationMs = 2600) {
    const timestamp = state.finishEvents[String(locker)];
    return Boolean(timestamp && now.getTime() - timestamp <= durationMs);
  }

  function finishFlashActive(now) {
    return Object.values(state.finishEvents).some(timestamp => now.getTime() - timestamp <= 3000);
  }

  function courseHtml(operators) {
    const now = new Date();
    const rows = operators.slice(0, C.maxStations);
    if (!rows.length) return '<div class="lane" style="top:0"><span class="lane-label">--</span></div>';
    const courseNode = $('rol-course');
    const runnerSize = parseFloat(getComputedStyle(courseNode || document.documentElement).getPropertyValue('--runner-size')) || 49;
    const lanePad = rows.length > 1 ? 5.5 : 0;
    const laneGap = rows.length > 1 ? (100 - lanePad * 2) / (rows.length - 1) : 0;
    return rows.map((operator, index) => {
      const top = rows.length > 1 ? lanePad + index * laneGap : 50;
      const progress = clamp(operator.total / C.targetHours * 100, 0, 100);
      const stateClass = `state-${courseState(operator.total, progress, runnerSize)}`;
      const frameX = framePosition(spriteFrameFor(operator, progress));
      const confetti = finishEventActive(operator.locker, now) ? '<span class="finish-confetti"></span>' : '';
      return `
        <div class="lane" style="top:${top.toFixed(2)}%">
          <span class="lane-label">#${esc(operator.locker)}</span>
          <div class="runner ${stateClass}" style="--progress:${progress.toFixed(2)};--frame-x:${frameX}" title="Locker ${esc(operator.locker)} - ${operator.total.toFixed(2)}h">
            ${confetti}
            <span class="locker-badge">${esc(operator.locker)}</span>
            <div class="sprite" aria-hidden="true"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  function rowsHtml(operators, rankByLocker) {
    const now = new Date();
    const rows = operators
      .filter(operator => hasActivity(operator) && !operator.inactive)
      .sort((a, b) => (rankByLocker[a.locker] || 999) - (rankByLocker[b.locker] || 999) || Number(a.locker) - Number(b.locker));
    if (!rows.length) {
      return '<div class="row"><span style="grid-column:1/-1">Awaiting active operators.</span></div>';
    }
    return rows.map(operator => {
      const rank = rankByLocker[operator.locker] || '--';
      const projectedText = operator.projected == null ? '--' : operator.projected.toFixed(2);
      const hourText = `${operator.total.toFixed(2)}/${projectedText}`;
      const sessionText = String(Math.max(0, Math.round(operator.sessions || 0)));
      const awayText = formatTimeMetric(operator.away);
      const setupText = formatTimeMetric(operator.setup);
      return `
        <div class="row${finishEventActive(operator.locker, now) ? ' is-finished' : ''}${rankUpClass(operator.locker, rank)}">
          <span class="rank${trendClass(`${operator.locker}:rank`, String(rank))}">${esc(rank)}</span>
          <span>#${esc(operator.locker)}</span>
          <span class="hours${trendClass(`${operator.locker}:total`, hourText)}">${esc(hourText)}</span>
          <span class="${trendClass(`${operator.locker}:sessions`, sessionText)}">${esc(sessionText)}</span>
          <span class="time-value${trendClass(`${operator.locker}:away`, awayText)}">${esc(awayText)}</span>
          <span class="time-value${trendClass(`${operator.locker}:setup`, setupText)}">${esc(setupText)}</span>
        </div>
      `;
    }).join('');
  }

  function rankMap(operators) {
    const ranked = rankedOperators(operators.filter(operator => !operator.inactive));
    const rankByLocker = {};
    ranked.forEach((operator, index) => {
      rankByLocker[operator.locker] = index + 1;
    });
    return rankByLocker;
  }

  function courseLabelFor(totalHours) {
    const progress = clamp(totalHours / C.targetHours * 100, 0, 100);
    const stateName = courseState(totalHours, progress);
    if (stateName === 'water') return 'Water';
    if (stateName === 'mud') return 'Mud';
    if (stateName === 'electric') return 'Electricity';
    if (stateName === 'finish') return 'Finish';
    return totalHours > 0 ? 'Run' : 'Start';
  }

  function dadJokeForHour(now) {
    const hour = Math.floor(now.getTime() / C.dadJokeMs);
    if (state.dadJokeHour !== hour) {
      const previous = state.dadJokeIndex;
      let next = Math.floor(Math.random() * DAD_JOKES.length);
      if (DAD_JOKES.length > 1 && next === previous) {
        next = (next + 1 + Math.floor(Math.random() * (DAD_JOKES.length - 1))) % DAD_JOKES.length;
      }
      state.dadJokeHour = hour;
      state.dadJokeIndex = next;
    }
    return DAD_JOKES[state.dadJokeIndex] || DAD_JOKES[0];
  }

  function announcerCommentary(operators, rankByLocker, hold, now) {
    if (hold) {
      return {
        expression: 'shocked',
        text: hold.label === 'LUNCH' ? 'We will return after lunch.' : 'We will return after the commercial break.'
      };
    }
    if (state.latestFinish && now.getTime() - state.latestFinish.at <= 15000) {
      return { expression: 'excited', text: `Locker #${state.latestFinish.locker} crossed the finish line!` };
    }
    if (!operators.length) {
      return { expression: 'thinking', text: 'Race desk standing by for active lockers.' };
    }

    const ranked = rankedOperators(operators);
    const leader = ranked[0];
    const bucket = Math.floor(now.getTime() / C.announcerMs);
    if (bucket % Math.max(1, Math.round(C.dadJokeMs / C.announcerMs)) === 0) {
      return { expression: 'laugh', text: dadJokeForHour(now) };
    }
    const type = bucket % 9;

    if (type === 2 || type === 5 || type === 8) {
      return ANNOUNCER_REMINDERS[Math.floor(type / 3) % ANNOUNCER_REMINDERS.length];
    }

    if (type === 0 && leader) {
      return { expression: 'excited', text: `Locker #${leader.locker} leads with ${leader.total.toFixed(2)} hrs!` };
    }

    if (type === 1 && ranked.length > 1) {
      const chaser = ranked[1];
      const gap = Math.max(0, leader.total - chaser.total);
      return { expression: gap <= 0.25 ? 'shocked' : 'thinking', text: `Locker #${chaser.locker} is chasing #${leader.locker}. Gap: ${gap.toFixed(2)} hrs.` };
    }

    if (type === 3) {
      const projected = [...operators]
        .filter(operator => operator.projected != null)
        .sort((a, b) => b.projected - a.projected)[0] || leader;
      return { expression: 'excited', text: `Locker #${projected.locker} projected hours look amazing!` };
    }

    if (type === 4 || type === 7) {
      const spotlight = operators[bucket % operators.length];
      return { expression: 'thinking', text: `Locker #${spotlight.locker} is working through ${courseLabelFor(spotlight.total)}.` };
    }

    const behind = [...operators].sort((a, b) => a.total - b.total || Number(a.locker) - Number(b.locker))[0];
    const rank = rankByLocker[behind.locker] || '--';
    return { expression: 'bored', text: `Locker #${behind.locker} needs a comeback. Current rank: ${rank}.` };
  }

  function updateAnnouncer(operators, rankByLocker, hold, now) {
    const commentary = announcerCommentary(operators, rankByLocker, hold, now);
    const bucket = `${Math.floor(now.getTime() / C.announcerMs)}:${commentary.expression}:${commentary.text}`;
    const textNode = $('rol-announcer-text');
    const figure = $('rol-announcer-figure');
    if (!textNode || !figure) return;
    textNode.textContent = commentary.text;
    figure.dataset.expression = commentary.expression;
    if (state.announcerBucket !== bucket) {
      state.announcerBucket = bucket;
      state.announcerShownAt = now.getTime();
      const panel = textNode.closest('.announcer-panel');
      panel?.classList.remove('is-talking');
      void panel?.offsetWidth;
      panel?.classList.add('is-talking');
      textNode.style.animation = 'none';
      void textNode.offsetWidth;
      textNode.style.animation = '';
    }
    const forceVisible = Boolean(hold) || (state.latestFinish && now.getTime() - state.latestFinish.at <= 15000);
    textNode.classList.toggle('is-hidden', !forceVisible && now.getTime() - state.announcerShownAt >= C.announcerBubbleMs);
  }

  function showError(message) {
    let node = $('rol-error');
    if (!node) {
      node = document.createElement('div');
      node.id = 'rol-error';
      node.className = 'msg';
      $(C.overlayId)?.appendChild(node);
    }
    node.textContent = `Overlay warning: ${message}`;
  }

  function clearError() {
    $('rol-error')?.remove();
  }

  function render(payload) {
    state.lastPayload = payload;
    const timestamp = payload.timestamp;
    const operators = markActivity(payload.operators);
    const now = new Date();
    const started = operators.some(hasActivity);
    const activeOperators = operators.filter(operator => hasActivity(operator) && !operator.inactive);
    const totalHours = activeOperators.reduce((sum, operator) => sum + operator.total, 0);
    const averageHours = activeOperators.length ? totalHours / activeOperators.length : 0;
    const hold = courseHold(now, started);
    const ranks = rankMap(activeOperators);
    updateFinishEvents(activeOperators, now);

    $(C.overlayId)?.classList.toggle('is-paused', Boolean(hold));
    $(C.overlayId)?.classList.toggle('is-finish-flash', finishFlashActive(now));
    $('rol-total-ops').textContent = String(activeOperators.length);
    $('rol-total-hours').textContent = totalHours.toFixed(2);
    $('rol-avg-hours').textContent = averageHours.toFixed(2);
    $('rol-course').innerHTML = `
      <div class="start-line"></div>
      <div class="hour-marker marker-1"></div>
      <div class="hour-marker marker-2"></div>
      <div class="hour-marker marker-3"></div>
      <div class="hour-marker marker-4"></div>
      <div class="segment water"></div>
      <div class="segment mud"></div>
      <div class="segment electric"></div>
      <div class="finish-line"></div>
      ${courseHtml(activeOperators)}
    `;
    $('rol-rows').innerHTML = rowsHtml(activeOperators, ranks);
    if (hasRankUp(activeOperators, ranks)) triggerRankFireworks();
    updateAnnouncer(activeOperators, ranks, hold, now);
    if (hold) {
      $('rol-course-hold').style.setProperty('--watch-angle', `${stopwatchAngle(hold).toFixed(2)}deg`);
      $('rol-hold-message').textContent = holdLabel(hold);
      $('rol-hold-countdown').textContent = formatCountdown(hold.remainingMs);
      const finalNode = $('rol-final-countdown');
      const finalNumber = finalCountdownNumber(hold);
      finalNode.textContent = finalNumber;
      finalNode.classList.toggle('is-active', Boolean(finalNumber));
      if (finalNumber && finalNode.dataset.value !== finalNumber) {
        finalNode.dataset.value = finalNumber;
        finalNode.classList.remove('is-active');
        void finalNode.offsetWidth;
        finalNode.classList.add('is-active');
      }
    } else {
      $('rol-course-hold').style.setProperty('--watch-angle', '0deg');
      const finalNode = $('rol-final-countdown');
      if (finalNode) {
        finalNode.textContent = '';
        finalNode.dataset.value = '';
        finalNode.classList.remove('is-active');
      }
    }
    rememberValues(activeOperators, ranks);
  }

  async function update() {
    if (state.busy) return;
    state.busy = true;
    try {
      const payload = await fetchShift();
      clearError();
      render(payload);
    } catch (error) {
      showError(error?.message || String(error));
    } finally {
      state.busy = false;
    }
  }

  function resized() {
    clearTimeout(state.resizeTimer);
    state.resizeTimer = setTimeout(() => {
      if (state.lastPayload) render(state.lastPayload);
    }, 120);
  }

  installStyles();
  const overlay = createOverlay();
  if (location.hostname !== C.host && !localPreview) {
    wrongHost(overlay);
  } else {
    shell(overlay);
    update();
    state.timer = setInterval(update, C.refreshMs);
    state.clockTimer = setInterval(() => {
      if (state.lastPayload) render(state.lastPayload);
    }, 1000);
    window.addEventListener('resize', resized);
  }
})();
