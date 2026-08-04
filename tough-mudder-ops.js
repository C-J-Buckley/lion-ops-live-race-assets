      return { expression: 'excited', text: `Locker #${leader.locker} leads with ${leader.total.toFixed(2)} hrs!` };
    }

    if (type === 1 && ranked.length > 1) {
      const chaser = ranked[1];
      const gap = Math.max(0, leader.total - chaser.total);
      return { expression: gap <= 0.25 ? 'shocked' : 'thinking', text: `Locker #${chaser.locker} is chasing #${leader.locker}. Gap: ${gap.toFixed(2)} hrs.` };
    }

    if (type === 2) {
      const projected = [...operators]
        .filter(operator => operator.projected != null)
        .sort((a, b) => b.projected - a.projected)[0] || leader;
      return { expression: 'excited', text: `Locker #${projected.locker} projected hours look amazing!` };
    }

    if (type === 3) {
      const spotlight = operators[bucket % operators.length];
      return { expression: 'thinking', text: `Locker #${spotlight.locker} is working through ${courseLabelFor(spotlight.total)}.` };
    }

    const behind = [...operators].sort((a, b) => a.total - b.total || Number(a.locker) - Number(b.locker))[0];
    const rank = rankByLocker[behind.locker] || '--';
    return { expression: 'bored', text: `Locker #${behind.locker} needs a comeback. Current rank: ${rank}.` };
  }

  function updateAnnouncer(operators, rankByLocker, hold, now) {
    const commentary = announcerCommentary(operators, rankByLocker, hold, now);
    const bucket = `${Math.floor(now.getTime() / (15 * 60 * 1000))}:${commentary.expression}:${commentary.text}`;
    const textNode = $('rol-announcer-text');
    const figure = $('rol-announcer-figure');
    if (!textNode || !figure) return;
    textNode.textContent = commentary.text;
    figure.dataset.expression = commentary.expression;
    if (state.announcerBucket !== bucket) {
      state.announcerBucket = bucket;
      const panel = textNode.closest('.announcer-panel');
      panel?.classList.remove('is-talking');
      void panel?.offsetWidth;
      panel?.classList.add('is-talking');
      textNode.style.animation = 'none';
      void textNode.offsetWidth;
      textNode.style.animation = '';
    }
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
    const started = operators.some(operator => operator.total > 0);
    const activeOperators = operators.filter(operator => operator.total > 0 && !operator.inactive);
    const totalHours = activeOperators.reduce((sum, operator) => sum + operator.total, 0);
    const averageHours = activeOperators.length ? totalHours / activeOperators.length : 0;
    const hold = courseHold(now, started);
    const ranks = rankMap(activeOperators);
    updateFinishEvents(activeOperators, now);

    $(C.overlayId)?.classList.toggle('is-paused', Boolean(hold));
    $(C.overlayId)?.classList.toggle('is-finish-flash', finishFlashActive(now));
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
      <div class="segment ice"></div>
      <div class="finish-line"></div>
      ${courseHtml(activeOperators)}
    `;
    $('rol-rows').innerHTML = rowsHtml(activeOperators, ranks);
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
