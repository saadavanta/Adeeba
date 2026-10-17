(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------------- helpers ---------------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const checkSvg = '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8.4l3.2 3.2L14 3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- plans ---------------- */
  function planCard(p) {
    return `<article class="plan ${p.featured ? 'featured' : ''}">
      <div class="plan-tier">${esc(p.tier)}${p.badge ? `<span class="plan-tag">${esc(p.badge)}</span>` : ''}</div>
      <h3>${esc(p.name)}</h3>
      <div class="price">${esc(p.price)}<small>PKR · Pakistani rupees</small></div>
      <p class="plan-desc">${esc(p.desc)}</p>
      <ul>${p.features.map((f) => `<li>${checkSvg}<span>${esc(f)}</span></li>`).join('')}</ul>
      <a class="btn ${p.featured ? '' : 'btn-outline'}" href="#/consultation">Book a consultation</a>
    </article>`;
  }
  const homePlans = $('#homePlans');
  const plansFull = $('#plansFull');
  if (homePlans) homePlans.innerHTML = PLANS.map(planCard).join('');
  if (plansFull) plansFull.innerHTML = PLANS.map(planCard).join('');

  /* ---------------- doorways ---------------- */
  const doorways = $('#doorways');
  if (doorways) {
    doorways.innerHTML = DOORWAYS.map((d) => `
      <a class="doorway" href="${d.go}" data-go="${d.go}" ${d.scroll ? `data-scroll-to="${d.scroll}"` : ''}>
        <span class="d-num">${d.num}</span>
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.text)}</p>
        <small>${esc(d.sub)}</small>
      </a>`).join('');
    doorways.addEventListener('click', (e) => {
      const btn = e.target.closest('.doorway');
      if (!btn) return;
      e.preventDefault();
      const dest = btn.dataset.go;
      const scrollTo = btn.dataset.scrollTo;
      if (currentPath() === dest) {
        const el = scrollTo && document.getElementById(scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate(dest);
        if (scrollTo) setTimeout(() => {
          const el = document.getElementById(scrollTo);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 140);
      }
    });
  }

  /* ---------------- parent topics ---------------- */
  const parentTopics = $('#parentTopics');
  if (parentTopics) {
    parentTopics.innerHTML = PARENT_TOPICS.map((t) => `
      <a class="topic-card" href="#/library" data-book="${t.book}">
        <span class="tag">${esc(t.tag)}</span>
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.text)}</p>
        <span class="more">Open the volume</span>
      </a>`).join('');
    parentTopics.addEventListener('click', (e) => {
      const card = e.target.closest('.topic-card');
      if (!card) return;
      e.preventDefault();
      const idx = +card.dataset.book;
      if (currentPath() !== '/library') navigate('/library');
      setTimeout(() => {
        const stage = document.getElementById('libStage');
        if (stage) stage.scrollIntoView({ block: 'center', behavior: 'auto' });
        setTimeout(() => LIB.open(idx), 220);
      }, 620);
    });
  }

  /* =========================================================
     GENIE — canvas slice-warp transition
     ========================================================= */
  const Genie = (function () {
    const canvas = $('#genie');
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    function size() {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    }
    size();
    window.addEventListener('resize', size);

    function drawCover(c, book, W, H) {
      c.save();
      c.clearRect(0, 0, W, H);
      const g = c.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, book.c1);
      g.addColorStop(.55, book.c2);
      g.addColorStop(1, book.c1);
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);

      const hl = c.createRadialGradient(W * .3, H * .14, 0, W * .3, H * .14, W * 1.1);
      hl.addColorStop(0, 'rgba(255,255,255,.11)');
      hl.addColorStop(.45, 'rgba(255,255,255,.02)');
      hl.addColorStop(1, 'rgba(0,0,0,.34)');
      c.fillStyle = hl;
      c.fillRect(0, 0, W, H);

      /* leather grain */
      let seed = (book.volume.charCodeAt(0) + 11) * 7919;
      const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      c.globalAlpha = .05;
      for (let i = 0; i < 520; i++) {
        c.fillStyle = rand() > .5 ? '#ffffff' : '#000000';
        c.fillRect(rand() * W, rand() * H, Math.max(1, W * .003), Math.max(1, W * .003));
      }
      c.globalAlpha = 1;

      /* spine shadow */
      const sp = c.createLinearGradient(0, 0, W * .15, 0);
      sp.addColorStop(0, 'rgba(0,0,0,.6)');
      sp.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = sp;
      c.fillRect(0, 0, W * .15, H);

      /* gold frames */
      c.strokeStyle = 'rgba(232,211,160,.85)';
      c.lineWidth = Math.max(2.4, W * .0065);
      c.strokeRect(W * .072, H * .042, W * .856, H * .916);
      c.strokeStyle = 'rgba(232,211,160,.42)';
      c.lineWidth = 1;
      c.strokeRect(W * .092, H * .058, W * .816, H * .884);

      const dia = (x, y, s) => {
        c.beginPath();
        c.moveTo(x, y - s); c.lineTo(x + s, y); c.lineTo(x, y + s); c.lineTo(x - s, y);
        c.closePath(); c.fillStyle = 'rgba(232,211,160,.7)'; c.fill();
      };
      dia(W * .092, H * .058, 4.4); dia(W * .908, H * .058, 4.4);
      dia(W * .092, H * .942, 4.4); dia(W * .908, H * .942, 4.4);

      c.textAlign = 'center';
      c.textBaseline = 'middle';

      /* top ornament */
      c.strokeStyle = 'rgba(232,211,160,.62)';
      c.lineWidth = 1.3;
      c.beginPath(); c.arc(W / 2, H * .155, W * .05, 0, Math.PI * 2); c.stroke();
      dia(W / 2, H * .155, W * .016);
      c.beginPath();
      c.moveTo(W * .2, H * .155); c.lineTo(W * .41, H * .155);
      c.moveTo(W * .59, H * .155); c.lineTo(W * .8, H * .155);
      c.stroke();

      /* title */
      c.fillStyle = '#f5e8c8';
      const tSize = W * .082;
      c.font = `600 ${tSize}px Georgia, "Times New Roman", serif`;
      if ('letterSpacing' in c) c.letterSpacing = `${(W * .004).toFixed(1)}px`;
      const maxW = W * .74;
      const words = book.title.toUpperCase().split(' ');
      const lines = [];
      let line = '';
      words.forEach((wd) => {
        const test = line ? line + ' ' + wd : wd;
        if (c.measureText(test).width > maxW && line) { lines.push(line); line = wd; }
        else line = test;
      });
      if (line) lines.push(line);
      const lineH = tSize * 1.24;
      let ty = H * .40 - ((lines.length - 1) * lineH) / 2;
      lines.forEach((l) => { c.fillText(l, W / 2, ty); ty += lineH; });
      if ('letterSpacing' in c) c.letterSpacing = '0px';

      /* rule + diamond */
      const ruleY = H * .60;
      c.strokeStyle = 'rgba(232,211,160,.6)';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(W * .28, ruleY); c.lineTo(W * .455, ruleY);
      c.moveTo(W * .545, ruleY); c.lineTo(W * .72, ruleY);
      c.stroke();
      dia(W / 2, ruleY, 3.1);

      /* category */
      c.fillStyle = 'rgba(240,226,189,.78)';
      c.font = `${W * .031}px Georgia, serif`;
      if ('letterSpacing' in c) c.letterSpacing = `${(W * .011).toFixed(1)}px`;
      c.fillText(book.cat.toUpperCase(), W / 2, H * .655);
      if ('letterSpacing' in c) c.letterSpacing = '0px';

      /* author */
      c.fillStyle = 'rgba(240,226,189,.9)';
      c.font = `${W * .030}px Georgia, serif`;
      if ('letterSpacing' in c) c.letterSpacing = `${(W * .013).toFixed(1)}px`;
      c.fillText('WELLNESS JOURNEY', W / 2, H * .855);
      if ('letterSpacing' in c) c.letterSpacing = '0px';
      c.fillStyle = 'rgba(240,226,189,.6)';
      c.font = `italic ${W * .033}px Georgia, serif`;
      c.fillText('Adeeba Asif', W / 2, H * .897);

      c.restore();
    }

    function makeCover(book) {
      const cv = document.createElement('canvas');
      cv.width = 520;
      cv.height = 720;
      drawCover(cv.getContext('2d'), book, 520, 720);
      return cv;
    }

    const easeInOut = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const lerp = (a, b, t) => a + (b - a) * t;

    function warp(bitmap, from, to, opts) {
      opts = opts || {};
      const mode = opts.mode || 'open';
      const duration = opts.duration || 900;
      const onDone = opts.onDone;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (onDone) onDone();
        return;
      }

      cancelAnimationFrame(raf);
      canvas.style.display = 'block';
      const start = performance.now();
      const N = 70;
      const particles = [];
      for (let i = 0; i < 26; i++) {
        particles.push({ u: Math.random(), side: Math.random() < .5 ? -1 : 1, r: 1 + Math.random() * 2.6, drift: 8 + Math.random() * 26, delay: Math.random() * .35 });
      }

      function frame(now) {
        const p = Math.min(1, (now - start) / duration);
        const t = easeInOut(p);
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, vw, vh);

        const x = lerp(from.x, to.x, t);
        const y = lerp(from.y, to.y, t);
        const W = Math.max(2, lerp(from.width, to.width, t));
        const H = Math.max(2, lerp(from.height, to.height, t));
        const cx = x + W / 2;
        const bow = Math.sin(Math.PI * p);
        const pinch = bow * (mode === 'open' ? .30 : .42);

        /* warm bloom */
        if (bow > .01) {
          const rr = Math.max(W, H) * .95;
          const bg = ctx.createRadialGradient(cx, y + H * .5, 0, cx, y + H * .5, rr);
          bg.addColorStop(0, 'rgba(232,199,106,' + (.15 * bow).toFixed(3) + ')');
          bg.addColorStop(.55, 'rgba(232,199,106,' + (.05 * bow).toFixed(3) + ')');
          bg.addColorStop(1, 'rgba(232,199,106,0)');
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, vw, vh);
        }

        const sliceH = H / N;
        for (let i = 0; i < N; i++) {
          const u = i / (N - 1);
          const sy = (bitmap.height * i) / N;
          const sh = bitmap.height / N;
          const squash = 1 - pinch * Math.pow(u, 1.7);
          const drawW = W * squash;
          const curve = Math.sin(Math.PI * u) * bow * (mode === 'open' ? 24 : -24);
          const dx = cx - drawW / 2 + curve;
          const dy = y + i * sliceH + Math.sin(Math.PI * u) * bow * (mode === 'open' ? -9 : 9);
          ctx.globalAlpha = mode === 'open' ? Math.min(1, p * 4) : Math.min(1, (1 - p) * 1.7);
          ctx.drawImage(bitmap, 0, sy, bitmap.width, sh, dx, dy, drawW, sliceH + 1.4);
        }
        ctx.globalAlpha = 1;

        /* gold dust */
        particles.forEach((pt) => {
          const pp = Math.max(0, Math.min(1, (p - pt.delay) / (1 - pt.delay)));
          if (pp <= 0 || pp >= 1) return;
          const a = Math.sin(Math.PI * pp) * .75;
          const px = cx + pt.side * (W * .42 + pt.drift * pp * 2);
          const py = y + H * pt.u - 34 * pp + Math.sin(pp * 6 + pt.u * 8) * 8;
          ctx.beginPath();
          ctx.fillStyle = 'rgba(240,214,150,' + a.toFixed(3) + ')';
          ctx.arc(px, py, Math.max(.4, pt.r * (1 - pp * .5)), 0, Math.PI * 2);
          ctx.fill();
        });

        if (p < 1) {
          raf = requestAnimationFrame(frame);
        } else {
          canvas.style.display = 'none';
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (onDone) onDone();
        }
      }
      raf = requestAnimationFrame(frame);
    }

    function cancel() {
      cancelAnimationFrame(raf);
      canvas.style.display = 'none';
    }

    return { warp: warp, makeCover: makeCover, drawCover: drawCover, cancel: cancel };
  })();

  /* =========================================================
     THE LIBRARY
     ========================================================= */
  const LIB = (function () {
    const shelf1 = $('#shelfRow1');
    const shelf2 = $('#shelfRow2');
    const catList = $('#catalogueList');
    const reader = $('#reader');
    const coverEl = $('#bookCover');
    const coverCanvas = $('#coverCanvas');
    const leftCat = $('#leftCat');
    const leftTitle = $('#leftTitle');
    const leftMeta = $('#leftMeta');
    const chapterList = $('#chapterList');
    const chapEyebrow = $('#chapEyebrow');
    const chapTitle = $('#chapTitle');
    const chapBody = $('#chapBody');
    const pageChapter = $('#pageChapter');
    const pageFolio = $('#pageFolio');
    const dotsWrap = $('#chapterDots');
    const prevBtn = $('#prevChap');
    const nextBtn = $('#nextChap');
    const closeBtn = $('#readerClose');
    const meta = $('#readerMeta');

    let current = -1;
    let chapter = 0;
    let busy = false;
    let isOpen = false;
    let lastFocus = null;
    let closeTimer = 0;

    const ordinals = ['Chapter one', 'Chapter two', 'Chapter three', 'Chapter four', 'Chapter five'];

    const thumbs = BOOKS.map((b) => {
      const c = document.createElement('canvas');
      c.width = 280; c.height = 388;
      Genie.drawCover(c.getContext('2d'), b, 280, 388);
      return c.toDataURL('image/jpeg', .82);
    });

    function makeBookEl(b, i) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'book';
      btn.dataset.index = i;
      btn.style.setProperty('--w', b.w + 'px');
      btn.style.setProperty('--h', b.h + 'px');
      btn.style.setProperty('--c1', b.c1);
      btn.style.setProperty('--c2', b.c2);
      btn.setAttribute('aria-label', 'Open volume ' + b.volume + ': ' + b.title);
      btn.innerHTML =
        '<span class="peek" aria-hidden="true"><img src="' + thumbs[i] + '" alt=""></span>' +
        '<span class="spine">' +
          '<span class="band b1"></span><span class="band b2"></span>' +
          '<span class="spine-orn" aria-hidden="true">❖</span>' +
          '<span class="spine-title">' + esc(b.short) + '</span>' +
          '<span class="spine-mark" aria-hidden="true">W · J</span>' +
        '</span>';
      btn.addEventListener('click', () => open(i, btn));
      return btn;
    }

    BOOKS.forEach((b, i) => {
      (b.shelf === 1 ? shelf1 : shelf2).appendChild(makeBookEl(b, i));
    });

    [shelf1, shelf2].forEach((row) => {
      const be = document.createElement('span');
      be.className = 'bookend';
      be.setAttribute('aria-hidden', 'true');
      row.appendChild(be);
    });

    /* catalogue */
    catList.innerHTML = BOOKS.map((b, i) =>
      '<button class="cat-row" type="button" data-i="' + i + '" aria-label="Open volume ' + b.volume + ': ' + esc(b.title) + '">' +
        '<span class="cat-num">' + b.volume + '</span>' +
        '<span class="cat-title">' + esc(b.title) + '</span>' +
        '<span class="cat-cat">' + esc(b.cat) + '</span>' +
        '<span class="cat-open">Open volume</span>' +
      '</button>').join('');

    catList.addEventListener('click', (e) => {
      const row = e.target.closest('.cat-row');
      if (row) open(+row.dataset.i, row);
    });

    function paintChapter() {
      const b = BOOKS[current];
      const c = b.chapters[chapter];
      chapEyebrow.textContent = ordinals[chapter] || 'Chapter ' + (chapter + 1);
      chapTitle.textContent = c.title;
      let html = c.paragraphs.map((p) => '<p>' + p + '</p>').join('');
      if (c.practice) {
        html += '<div class="practice"><b>A small practice</b><p>' + esc(c.practice) + '</p></div>';
      }
      chapBody.innerHTML = html;
      chapBody.scrollTop = 0;
      pageChapter.textContent = 'Chapter ' + (chapter + 1) + ' of ' + b.chapters.length;
      pageFolio.textContent = String(chapter + 1);
      prevBtn.disabled = chapter === 0;
      nextBtn.disabled = chapter === b.chapters.length - 1;
      Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('on', i === chapter));
      Array.from(chapterList.querySelectorAll('.chapter-btn')).forEach((btn, i) => btn.classList.toggle('on', i === chapter));
    }

    function showChapter(i, animate) {
      if (!BOOKS[current]) return;
      if (i < 0 || i >= BOOKS[current].chapters.length) return;
      chapter = i;
      if (animate) {
        chapBody.classList.remove('turning');
        void chapBody.offsetWidth;
      }
      paintChapter();
      if (animate) chapBody.classList.add('turning');
    }

    function open(index, trigger) {
      if (busy || isOpen) return;
      current = index;
      chapter = 0;
      const b = BOOKS[index];
      lastFocus = trigger || document.activeElement;

      leftCat.textContent = b.cat;
      leftTitle.textContent = b.title;
      leftMeta.innerHTML = 'Volume ' + b.volume + '<br>Wellness Journey · ' + new Date().getFullYear();
      meta.textContent = 'Volume ' + b.volume + ' · ' + b.cat;
      chapterList.innerHTML = b.chapters.map((c, i) =>
        '<button class="chapter-btn" type="button" data-c="' + i + '"><span class="cnum">' + (i + 1) + '.</span><span>' + esc(c.title) + '</span></button>').join('');
      Array.from(chapterList.querySelectorAll('.chapter-btn')).forEach((btn) => {
        btn.addEventListener('click', () => showChapter(+btn.dataset.c, true));
      });
      dotsWrap.innerHTML = b.chapters.map((_, i) =>
        '<button class="dot" type="button" data-c="' + i + '" aria-label="Chapter ' + (i + 1) + '"></button>').join('');
      Array.from(dotsWrap.querySelectorAll('.dot')).forEach((d) => {
        d.addEventListener('click', () => showChapter(+d.dataset.c, true));
      });
      paintChapter();

      Genie.drawCover(coverCanvas.getContext('2d'), b, 520, 720);

      reader.classList.remove('is-open', 'is-closing', 'is-warping');
      reader.classList.add('is-live');
      reader.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('reader-open');
      document.body.classList.add('no-scroll');

      void reader.offsetWidth;
      const from = trigger ? trigger.getBoundingClientRect() : coverEl.getBoundingClientRect();
      const to = coverEl.getBoundingClientRect();

      const bitmap = Genie.makeCover(b);
      coverEl.style.opacity = '0';
      busy = true;

      requestAnimationFrame(() => {
        Genie.warp(bitmap, from, to, {
          mode: 'open',
          duration: 950,
          onDone() {
            coverEl.style.opacity = '';
            reader.classList.add('is-open');
            busy = false;
            isOpen = true;
            setTimeout(() => { try { closeBtn.focus({ preventScroll: true }); } catch (e) {} }, 420);
          }
        });
      });
    }

    function close() {
      if (!isOpen || busy) return;
      busy = true;
      reader.classList.add('is-closing');
      coverEl.style.opacity = '1';
      reader.classList.remove('is-open');

      const b = BOOKS[current];
      const spine = document.querySelector('.book[data-index="' + current + '"]');

      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        const from = coverEl.getBoundingClientRect();
        const to = spine ? spine.getBoundingClientRect() : from;
        reader.classList.add('is-warping');
        const bitmap = Genie.makeCover(b);
        Genie.warp(bitmap, from, to, {
          mode: 'close',
          duration: 820,
          onDone() {
            finishClose();
            if (lastFocus && lastFocus.focus) {
              try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
            }
          }
        });
      }, 640);
    }

    function finishClose() {
      reader.classList.remove('is-live', 'is-open', 'is-closing');
      coverEl.style.opacity = '';
      reader.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('reader-open');
      document.body.classList.remove('no-scroll');
      setTimeout(() => reader.classList.remove('is-warping'), 520);
      busy = false;
      isOpen = false;
      current = -1;
    }

    function forceClose() {
      if (!isOpen && !busy) return;
      clearTimeout(closeTimer);
      Genie.cancel();
      finishClose();
    }

    /* interactions */
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => showChapter(chapter - 1, true));
    nextBtn.addEventListener('click', () => showChapter(chapter + 1, true));

    document.addEventListener('keydown', (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); showChapter(chapter + 1, true); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); showChapter(chapter - 1, true); return; }
      if (e.key === 'Tab') {
        const f = [closeBtn, prevBtn, nextBtn]
          .concat(Array.from(dotsWrap.querySelectorAll('.dot')))
          .concat(Array.from(chapterList.querySelectorAll('.chapter-btn')))
          .filter((el) => !el.disabled);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    return { open: open, close: close, forceClose: forceClose };
  })();

  /* =========================================================
     TOAST
     ========================================================= */
  let toastTimer = 0;
  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3400);
  }

  /* =========================================================
     CONSULTATION FORM
     ========================================================= */
  const form = $('#consultForm');
  if (form) {
    const stepbar = $('#stepbar');
    const errorEl = $('#formError');
    const backBtn = $('#backBtn');
    const nextBtn = $('#nextBtn');
    const success = $('#consultSuccess');
    const card = $('#consultCard');
    const labels = ['Who', 'Support', 'Context', 'Contact', 'Timing'];
    let step = 1;

    function paintBar() {
      stepbar.innerHTML = labels.map((l, i) => {
        const n = i + 1;
        const state = n < step ? 'done' : n === step ? 'active' : '';
        return '<span class="s ' + state + '"><b>' + (n < step ? '✓' : n) + '</b>' + l + '</span>';
      }).join('<span class="sep"></span>');
      backBtn.hidden = step === 1;
      nextBtn.innerHTML = step < 5
        ? 'Continue <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true"><path d="M1 6h12M9 1l4.4 5L9 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : 'Send consultation request <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true"><path d="M1 6h12M9 1l4.4 5L9 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }

    function showStep() {
      $$('.form-step', form).forEach((p) => { p.hidden = +p.dataset.step !== step; });
      errorEl.classList.remove('show');
      paintBar();
    }

    function validateStep() {
      const panel = $('.form-step[data-step="' + step + '"]', form);
      if (!panel) return true;
      let ok = true;
      Array.from(panel.querySelectorAll('input, select, textarea')).forEach((f) => {
        const valid = f.checkValidity() && String(f.value).trim() !== '';
        f.classList.toggle('invalid', !valid);
        if (!valid && ok) { ok = false; f.focus(); }
      });
      return ok;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateStep()) { errorEl.classList.add('show'); return; }
      if (step < 5) { step += 1; showStep(); return; }

      const data = new FormData(form);
      const request = {
        id: 'req-' + Date.now(),
        supportFor: String(data.get('supportFor') || ''),
        needs: String(data.get('needs') || ''),
        context: String(data.get('context') || ''),
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        phone: String(data.get('phone') || ''),
        preferredDate: String(data.get('preferredDate') || ''),
        preferredTime: String(data.get('preferredTime') || ''),
        timezone: String(data.get('timezone') || ''),
        status: 'new',
        createdAt: new Date().toISOString()
      };
      let list = [];
      try { list = JSON.parse(localStorage.getItem('wj_requests') || '[]'); } catch (err) { list = []; }
      list.unshift(request);
      try { localStorage.setItem('wj_requests', JSON.stringify(list)); } catch (err) {}
      form.hidden = true;
      success.hidden = false;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast('Request saved — review it under Admin in this browser.');
    });

    backBtn.addEventListener('click', () => {
      if (step > 1) { step -= 1; showStep(); }
    });

    showStep();
  }

  /* =========================================================
     PORTAL / ADMIN (local demo)
     ========================================================= */
  const DEFAULT_BIO = (() => {
    const bio = $('#aboutBio');
    if (!bio) return '';
    return Array.from(bio.querySelectorAll('p')).map((p) => p.textContent.trim()).join('\n\n');
  })();

  function applyBio() {
    const bio = $('#aboutBio');
    if (!bio) return;
    let saved = null;
    try { saved = localStorage.getItem('wj_bio'); } catch (e) {}
    if (saved) {
      bio.innerHTML = saved.split(/\n\n+/).map((p) => '<p>' + esc(p) + '</p>').join('');
    }
  }

  function emblemSvg() {
    return '<svg viewBox="0 0 64 64" aria-hidden="true" style="width:100%;height:100%">' +
      '<circle cx="32" cy="32" r="30" fill="none" stroke="#c8a45c" stroke-width="1.6"/>' +
      '<circle cx="32" cy="32" r="25" fill="none" stroke="rgba(200,164,92,.35)" stroke-width=".8"/>' +
      '<circle cx="24" cy="22.5" r="5.4" fill="#f0a98f"/>' +
      '<path d="M17.5 47.5C25.5 41 21 33 30.2 29c9-4 5 7 15 4.4" fill="none" stroke="#7b9a72" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M40.5 45c-1-6.2 3.1-9.6 9.3-9.5-.2 6.2-3.5 10.2-9.3 9.5z" fill="#4f6a4a"/>' +
      '</svg>';
  }

  function signInCard(kind) {
    const admin = kind === 'admin';
    return '<div class="portal-shell">' +
      '<div class="portal-emblem">' + emblemSvg() + '</div>' +
      '<p class="eyebrow center" style="margin-bottom:14px">' + (admin ? 'Admin space' : 'Client portal') + '</p>' +
      '<h2>A private place to <em>continue.</em></h2>' +
      '<p>' + (admin
        ? 'Sign in with the practice owner account to manage content and consultation requests.'
        : 'Sign in to access your resources, messages and progress content.') + '</p>' +
      '<button class="btn" type="button" id="' + (admin ? 'adminSignIn' : 'portalSignIn') + '">Sign in securely</button>' +
      '<p class="portal-footnote">This build is a static preview. Signing in opens a local demo stored only in this browser — no account is created and no real client data exists here.</p>' +
      '</div>';
  }

  function getRequests() {
    try { return JSON.parse(localStorage.getItem('wj_requests') || '[]'); } catch (e) { return []; }
  }

  function renderPortal() {
    const root = $('#portalRoot');
    if (!root) return;
    let unlocked = false;
    try { unlocked = localStorage.getItem('wj_demo_portal') === '1'; } catch (e) {}
    if (!unlocked) { root.innerHTML = signInCard('portal'); bindSignIn('portalSignIn', 'wj_demo_portal', renderPortal); return; }

    root.innerHTML =
      '<p class="eyebrow">Client portal</p>' +
      '<div class="dash-head"><div><h2>Welcome back, <em>friend.</em></h2><p style="color:var(--muted);margin:0">Your resources, messages and progress — kept in one quiet place.</p></div>' +
      '<div class="dash-actions"><span class="badge-demo">Demo mode</span><button class="btn btn-outline btn-sm" type="button" id="portalOut">Sign out</button></div></div>' +
      '<div class="stat-grid">' +
        '<div class="stat-card"><span>Resources</span><strong>3</strong></div>' +
        '<div class="stat-card"><span>Messages</span><strong>0</strong></div>' +
        '<div class="stat-card"><span>Progress notes</span><strong>0</strong></div>' +
      '</div>' +
      '<div class="admin-panel"><h3>Your resources</h3><p class="sub">Prepared for the family table. In the live practice these become available as your journey begins.</p>' +
        '<div class="request-row"><div><strong>Family Mealtime Reflection Sheet</strong><small>Printable worksheet · coming soon</small></div><span class="cat-open" style="border-color:var(--line);color:var(--muted)">Preview</span></div>' +
        '<div class="request-row"><div><strong>Food Variety Conversation Guide</strong><small>Parent guide · coming soon</small></div><span class="cat-open" style="border-color:var(--line);color:var(--muted)">Preview</span></div>' +
        '<div class="request-row"><div><strong>Wellness Journey Starter Notes</strong><small>PDF guide · coming soon</small></div><span class="cat-open" style="border-color:var(--line);color:var(--muted)">Preview</span></div>' +
      '</div>' +
      '<div class="admin-panel"><h3>Messages &amp; progress</h3><p class="empty-note">No messages yet. Your private space stays quiet until a conversation begins.</p></div>';

    $('#portalOut').addEventListener('click', () => {
      try { localStorage.removeItem('wj_demo_portal'); } catch (e) {}
      renderPortal();
      toast('Signed out of the portal demo.');
    });
  }

  function renderAdmin() {
    const root = $('#adminRoot');
    if (!root) return;
    let unlocked = false;
    try { unlocked = localStorage.getItem('wj_demo_admin') === '1'; } catch (e) {}
    if (!unlocked) { root.innerHTML = signInCard('admin'); bindSignIn('adminSignIn', 'wj_demo_admin', renderAdmin); return; }

    const requests = getRequests();
    let savedBio = null;
    try { savedBio = localStorage.getItem('wj_bio'); } catch (e) {}

    root.innerHTML =
      '<p class="eyebrow">Admin space</p>' +
      '<div class="dash-head"><div><h2>Welcome back, <em>ADEEBA ASIF.</em></h2><p style="color:var(--muted);margin:0">Review requests and edit practice data — stored locally in this preview.</p></div>' +
      '<div class="dash-actions"><span class="badge-demo">Demo mode</span><button class="btn btn-outline btn-sm" type="button" id="adminOut">Sign out</button></div></div>' +
      '<div class="stat-grid">' +
        '<div class="stat-card"><span>Consultation requests</span><strong id="reqCount">' + requests.length + '</strong></div>' +
        '<div class="stat-card"><span>Resources</span><strong>3</strong></div>' +
        '<div class="stat-card"><span>Library volumes</span><strong>8</strong></div>' +
      '</div>' +
      '<div class="admin-panel"><h3>Consultation requests</h3><p class="sub">Reviewed manually; there is no automatic booking.</p><div id="reqList"></div></div>' +
      '<div class="admin-panel"><h3>About Adeeba Asif</h3><p class="sub">Edit the biography shown on the About page. Separate paragraphs with a blank line.</p>' +
        '<textarea class="admin-textarea" id="bioEdit" aria-label="About biography">' + esc(savedBio || DEFAULT_BIO) + '</textarea>' +
        '<div style="display:flex;gap:10px;align-items:center;margin-top:14px"><button class="btn btn-sm" type="button" id="bioSave">Save biography</button><button class="btn btn-outline btn-sm" type="button" id="bioReset">Reset</button></div>' +
      '</div>' +
      '<div class="admin-panel"><h3>Testimonials</h3><p class="sub">Unpublished by default. Only words with written permission may be published — nothing is fabricated.</p><p class="empty-note">No approved testimonials yet.</p></div>';

    const list = $('#reqList');
    if (!requests.length) {
      list.innerHTML = '<p class="empty-note">No consultation requests yet. <a href="#/consultation" style="color:var(--gold-deep)">Submit a test request →</a></p>';
    } else {
      list.innerHTML = requests.map((r) =>
        '<div class="request-row" data-id="' + esc(r.id) + '"><div>' +
          '<strong>' + esc(r.name) + '</strong>' +
          '<small>' + esc(r.email) + ' · ' + esc(r.phone) + '</small>' +
          '<small>' + esc(r.supportFor) + ' · ' + esc(r.preferredDate) + ' at ' + esc(r.preferredTime) + ' (' + esc(r.timezone) + ')</small>' +
          '<p><strong style="font-weight:500">Needs:</strong> ' + esc(r.needs) + '</p>' +
          '<p style="font-size:.82rem;color:var(--muted)">' + esc(r.context) + '</p>' +
        '</div>' +
        '<select class="status-select" aria-label="Status for ' + esc(r.name) + '">' +
          ['new', 'reviewing', 'contacted', 'closed'].map((s) => '<option value="' + s + '"' + (r.status === s ? ' selected' : '') + '>' + s + '</option>').join('') +
        '</select></div>').join('');

      list.addEventListener('change', (e) => {
        const sel = e.target.closest('.status-select');
        if (!sel) return;
        const row = sel.closest('.request-row');
        const id = row.dataset.id;
        const all = getRequests().map((r) => r.id === id ? Object.assign({}, r, { status: sel.value }) : r);
        try { localStorage.setItem('wj_requests', JSON.stringify(all)); } catch (err) {}
        toast('Status updated to “' + sel.value + '”.');
      });
    }

    $('#bioSave').addEventListener('click', () => {
      const val = $('#bioEdit').value.trim();
      try { localStorage.setItem('wj_bio', val); } catch (e) {}
      applyBio();
      toast('Biography saved for this browser.');
    });
    $('#bioReset').addEventListener('click', () => {
      try { localStorage.removeItem('wj_bio'); } catch (e) {}
      $('#bioEdit').value = DEFAULT_BIO;
      applyBio();
      toast('Biography reset to the published text.');
    });
    $('#adminOut').addEventListener('click', () => {
      try { localStorage.removeItem('wj_demo_admin'); } catch (e) {}
      renderAdmin();
      toast('Signed out of the admin demo.');
    });
  }

  function bindSignIn(id, key, rerender) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      try { localStorage.setItem(key, '1'); } catch (e) {}
      rerender();
      toast('Demo mode — everything stays in this browser.');
    });
  }

  /* =========================================================
     ROUTER
     ========================================================= */
  const pages = $$('[data-page]');
  const TITLES = {
    '/': 'Wellness Journey — Pediatric & Behavioral Nutrition',
    '/specialization': 'Specialization — Wellness Journey',
    '/approach': 'Approach — Wellness Journey',
    '/how-it-works': 'How it works — Wellness Journey',
    '/plans': 'Plans — Wellness Journey',
    '/about': 'About Adeeba Asif — Wellness Journey',
    '/parents': 'For parents — Wellness Journey',
    '/library': 'The Wellness Library — Wellness Journey',
    '/consultation': 'Consultation — Wellness Journey',
    '/contact': 'Contact — Wellness Journey',
    '/portal': 'Client portal — Wellness Journey',
    '/admin': 'Admin — Wellness Journey',
    '/legal': 'Privacy & terms — Wellness Journey'
  };

  const mobileNav = $('#mobileNav');
  const menuBtn = $('#menuBtn');
  const mobileClose = $('#mobileClose');

  function closeMenu() {
    if (!mobileNav || !mobileNav.classList.contains('open')) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    if (!document.documentElement.classList.contains('reader-open')) document.body.classList.remove('no-scroll');
  }
  if (menuBtn) menuBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  });
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  $$('#mobileNav a').forEach((a) => a.addEventListener('click', closeMenu));

  function activate(path) {
    let target = pages.find((p) => p.dataset.page === path);
    if (!target) target = pages.find((p) => p.dataset.page === '/');
    if (!target) return;
    pages.forEach((p) => p.classList.toggle('is-active', p === target));
    document.title = TITLES[target.dataset.page] || TITLES['/'];
    document.documentElement.classList.toggle('on-library', target.dataset.page === '/library');

    $$('[data-nav]').forEach((a) => {
      if (a.getAttribute('href') === '#' + target.dataset.page) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    if (LIB) LIB.forceClose();
    closeMenu();
    window.scrollTo(0, 0);
    applyBio();
    renderPortal();
    renderAdmin();
    observeReveals();
  }

  function currentPath() {
    const h = location.hash;
    if (!h) return '/';
    if (!h.startsWith('#/')) return null; /* non-route anchor — leave the page alone */
    return h.slice(1).split('?')[0];
  }

  function renderRoute() {
    const p = currentPath();
    if (p === null) return;
    activate(p);
  }

  function navigate(path) {
    if (currentPath() === path) { renderRoute(); return; }
    try {
      history.pushState(null, '', '#' + path);
    } catch (err) {
      try { location.hash = path; } catch (e2) {}
    }
    renderRoute();
  }

  /* intercept in-page route links so navigation works even in sandboxed previews */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    e.preventDefault();
    closeMenu();
    navigate(a.getAttribute('href').slice(1));
  });

  window.addEventListener('hashchange', renderRoute);
  window.addEventListener('popstate', renderRoute);

  /* =========================================================
     REVEALS / HEADER / TO TOP
     ========================================================= */
  let io = null;
  function observeReveals() {
    if (!('IntersectionObserver' in window)) {
      $$('[data-reveal]').forEach((el) => el.classList.add('is-in'));
      return;
    }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { threshold: .1, rootMargin: '0px 0px -6% 0px' });
    }
    $$('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
  }

  const header = $('#siteHeader');
  const toTop = $('#toTop');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    if (toTop) toTop.classList.toggle('show', window.scrollY > 720);
  }, { passive: true });
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------------- boot ---------------- */
  applyBio();
  renderPortal();
  renderAdmin();
  renderRoute();
  observeReveals();
})();
