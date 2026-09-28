/* ==========================================================================
   VA STATYBA — interactions
   ========================================================================== */
(function () {
  'use strict';

  const { EN, UI, SCENES, HERO, ABOUT, SVC_SCENES, SERVICES, PROJECTS } = window.VA;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  let lang = 'lt';
  const LT = {};
  $$('[data-i18n]').forEach((el) => { LT[el.dataset.i18n] = el.innerHTML; });
  const t = (key) => (lang === 'en' ? EN[key] : LT[key]) || LT[key] || key;
  const ui = (key) => UI[lang][key];

  /* ---- language -------------------------------------------------------- */
  function applyLang(next) {
    lang = next;
    document.documentElement.lang = next;
    $$('[data-i18n]').forEach((el) => {
      const v = t(el.dataset.i18n);
      if (v !== undefined) el.innerHTML = v;
    });
    $$('.lang__btn').forEach((b) => {
      const on = b.dataset.lang === next;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on);
    });
    renderServices();
    renderFilters();
    renderProjects();
    fillMarquee();
    store.set('va-lang', next);
  }
  $$('.lang__btn').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)));

  /* ---- header ---------------------------------------------------------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const burger = $('#burger');
  const nav = $('#nav');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
  }
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('a', nav).forEach((a) => a.addEventListener('click', () => setMenu(false)));

  // active nav link
  const sections = ['about', 'services', 'projects', 'process', 'contact'].map((id) => document.getElementById(id));
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      $$('a', nav).forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => s && navObs.observe(s));

  /* ---- marquee --------------------------------------------------------- */
  const track = $('#marquee');
  const baseItems = $$('span', track).map((s) => s.dataset.i18n);
  function fillMarquee() {
    const html = baseItems.map((k) => `<span>${t(k)}</span><i aria-hidden="true">✦</i>`).join('');
    track.innerHTML = `<div class="marquee__group">${html}</div><div class="marquee__group">${html}</div>`;
  }

  /* ---- hero scene ------------------------------------------------------ */
  const heroEl = $('#heroScene');
  const heroBounds = ISO.sceneBounds(HERO);
  heroBounds.minX -= 2; heroBounds.maxX += 3; heroBounds.minY -= 2;
  const groundLines = (() => {
    let s = '';
    for (let i = -2; i <= 24; i += 2) s += ISO.line([i, -2, 0.3], [i, 19, 0.3], 'rgba(255,255,255,.05)', 1);
    for (let j = -2; j <= 19; j += 2) s += ISO.line([-2, j, 0.3], [24, j, 0.3], 'rgba(255,255,255,.05)', 1);
    return s;
  })();
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const buildStart = performance.now() + 250;
  const heroProgress = (now) => (it, i) => {
    if (it.ground) return 1;
    if (reduceMotion) return 1;
    const delay = it.tree ? 1400 + i * 60 : i * 140;
    const dur = it.tree ? 600 : 1100;
    return ease(Math.max(0, Math.min(1, (now - buildStart - delay) / dur)));
  };
  function drawHero(now) {
    heroEl.innerHTML = ISO.render(HERO, {
      progress: heroProgress(now), bounds: heroBounds, pad: 0.5, time: now,
      aspect: 'xMidYMax meet', className: 'hero-svg',
      before: `<g class="iso-ground">${groundLines}</g>`
    });
  }
  let heroDone = false;
  let craneG = null;
  function heroLoop(now) {
    if (!heroDone) {
      drawHero(now);
      if (reduceMotion || now - buildStart > 3200) {
        heroDone = true;
        craneG = $('.iso-crane', heroEl);
      }
    } else if (craneG && !reduceMotion && heroVisible) {
      craneG.innerHTML = ISO.crane(HERO.crane, now);
    }
    if (!reduceMotion) requestAnimationFrame(heroLoop);
  }
  let heroVisible = true;
  new IntersectionObserver((e) => { heroVisible = e[0].isIntersecting; }).observe($('.hero'));
  requestAnimationFrame(heroLoop);

  // subtle parallax on the hero model
  if (!reduceMotion) {
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      heroEl.style.transform = `translate3d(${dx * -14}px, ${dy * -10}px, 0)`;
    });
  }

  /* ---- about scene ----------------------------------------------------- */
  $('#aboutScene').innerHTML = ISO.render(ABOUT, { pad: 1 });

  /* ---- counters -------------------------------------------------------- */
  const years = new Date().getFullYear() - 2007;
  $('#yearsCount').dataset.count = years;
  $('#yearsCount').textContent = years;
  $('#year').textContent = new Date().getFullYear();
  function countUp(el) {
    const target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target; return; }
    const from = el.hasAttribute('data-plain') ? target - 60 : 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(from + (target - from) * ease(p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---- reveal on scroll ------------------------------------------------ */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.remove('is-pending');
      $$('[data-count]', e.target).concat(e.target.matches('[data-count]') ? [e.target] : []).forEach(countUp);
      revObs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  // Only elements that start below the fold are hidden; everything visible
  // on load stays at rest so the first frame is complete.
  function observeReveals(root) {
    const vh = window.innerHeight;
    $$('.reveal', root).forEach((el, i) => {
      if (el.closest('.hero')) return;
      if (el.getBoundingClientRect().top > vh) {
        el.classList.add('is-pending');
        el.style.setProperty('--d', (i % 4) * 70 + 'ms');
      }
      revObs.observe(el);
    });
  }

  /* ---- services -------------------------------------------------------- */
  const svcList = $('#svcList');
  const svcScene = $('#svcScene');
  const svcTag = $('#svcTag');
  let svcActive = 0;
  svcScene.innerHTML = SVC_SCENES.map((sc, i) =>
    `<div class="svc-visual__layer${i === 0 ? ' is-active' : ''}">${ISO.render(sc, { pad: 1.5 })}</div>`).join('');

  function setService(i) {
    svcActive = i;
    $$('.svc', svcList).forEach((el, j) => {
      el.classList.toggle('is-active', j === i);
      $('button', el).setAttribute('aria-expanded', j === i);
    });
    $$('.svc-visual__layer', svcScene).forEach((el, j) => el.classList.toggle('is-active', j === i));
    svcTag.textContent = `${String(i + 1).padStart(2, '0')} / ${String(SERVICES.length).padStart(2, '0')}`;
  }
  function renderServices() {
    svcList.innerHTML = SERVICES.map((s, i) => {
      const c = s[lang];
      return `<li class="svc${i === svcActive ? ' is-active' : ''}">
        <button type="button" class="svc__head" aria-expanded="${i === svcActive}">
          <span class="svc__n mono">${String(i + 1).padStart(2, '0')}</span>
          <span class="svc__t">${c.t}</span>
          <span class="svc__plus" aria-hidden="true"></span>
        </button>
        <div class="svc__body"><div>
          <p>${c.d}</p>
          <ul class="tags">${c.tags.map((tg) => `<li>${tg}</li>`).join('')}</ul>
        </div></div>
      </li>`;
    }).join('');
    $$('.svc', svcList).forEach((el, i) => {
      $('button', el).addEventListener('click', () => setService(i));
      el.addEventListener('mouseenter', () => { if (window.matchMedia('(hover: hover) and (min-width: 960px)').matches) setService(i); });
    });
  }

  /* ---- projects -------------------------------------------------------- */
  const cats = ['all', 'residential', 'commercial', 'industrial', 'public', 'heritage'];
  let filter = 'all';
  const filtersEl = $('#filters');
  const grid = $('#projGrid');
  const artCache = {};
  const art = (p) => p.image
    ? `<img src="${p.image}" alt="" loading="lazy">`
    : (artCache[p.scene] = artCache[p.scene] || ISO.render({ palette: 'light', items: SCENES[p.scene] }, { pad: 1.6 }));

  function renderFilters() {
    filtersEl.innerHTML = cats.map((c) => {
      const n = c === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c).length;
      return `<button type="button" role="tab" class="filter${c === filter ? ' is-active' : ''}" data-cat="${c}" aria-selected="${c === filter}">${ui(c)}<sup>${n}</sup></button>`;
    }).join('');
    $$('.filter', filtersEl).forEach((b) => b.addEventListener('click', () => {
      filter = b.dataset.cat;
      $$('.filter', filtersEl).forEach((x) => {
        x.classList.toggle('is-active', x === b);
        x.setAttribute('aria-selected', x === b);
      });
      applyFilter();
    }));
  }
  function renderProjects() {
    grid.innerHTML = PROJECTS.map((p, i) => {
      const c = p[lang];
      return `<article class="card card--${p.size || 'std'} card--${p.cat}" data-cat="${p.cat}" data-i="${i}">
        <button type="button" class="card__btn" aria-label="${c.t} — ${ui('view')}">
          <div class="card__art">${art(p)}</div>
          <div class="card__top mono"><span>P—${String(i + 1).padStart(2, '0')}</span><span>${ui(p.cat)}</span></div>
          <div class="card__info">
            <div>
              <h3 class="card__t">${c.t}</h3>
              <p class="card__m mono">${c.place}</p>
            </div>
            <span class="card__go" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8"/></svg></span>
          </div>
        </button>
      </article>`;
    }).join('');
    $$('.card', grid).forEach((el) => $('.card__btn', el).addEventListener('click', () => openModal(+el.dataset.i)));
    applyFilter(true);
  }
  function applyFilter(instant) {
    $$('.card', grid).forEach((el) => {
      const show = filter === 'all' || el.dataset.cat === filter;
      if (instant) { el.hidden = !show; el.classList.toggle('is-out', !show); return; }
      if (show) {
        el.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('is-out')));
      } else {
        el.classList.add('is-out');
        setTimeout(() => { if (el.classList.contains('is-out')) el.hidden = true; }, 280);
      }
    });
    grid.classList.toggle('is-filtered', filter !== 'all');
  }

  /* ---- modal ----------------------------------------------------------- */
  const modal = $('#modal');
  let lastFocus = null;
  function openModal(i) {
    const p = PROJECTS[i];
    const c = p[lang];
    lastFocus = document.activeElement;
    $('#modalArt').innerHTML = art(p);
    $('#modalArt').className = `modal__art card--${p.cat}`;
    $('#modalKicker').textContent = `P—${String(i + 1).padStart(2, '0')} · ${ui(p.cat)}`;
    $('#modalTitle').textContent = c.t;
    $('#modalDesc').textContent = c.d;
    $('#modalMeta').innerHTML =
      `<div><dt class="mono">${ui('category')}</dt><dd>${ui(p.cat)}</dd></div>` +
      `<div><dt class="mono">${ui('location')}</dt><dd>${c.place}</dd></div>` +
      `<div class="wide"><dt class="mono">${ui('works')}</dt><dd>${c.works}</dd></div>`;
    $('.modal__close', modal).setAttribute('aria-label', ui('close'));
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(() => $('.modal__close', modal).focus(), 50);
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$('[data-close]', modal).forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (modal.classList.contains('is-open')) closeModal(); setMenu(false); }
    if (e.key === 'Tab' && modal.classList.contains('is-open')) {
      const f = $$('button, a[href]', $('.modal__panel', modal));
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---- process line ---------------------------------------------------- */
  const steps = $('#steps');
  const fill = $('#stepsFill');
  function onProcess() {
    const r = steps.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.max(0, Math.min(1, (vh * 0.8 - r.top) / (r.height + vh * 0.3)));
    fill.style.transform = `scaleX(${p})`;
    fill.parentElement.style.setProperty('--p', p);
    $$('.step', steps).forEach((s, i, all) => s.classList.toggle('is-lit', p >= (i + 0.2) / all.length));
  }
  window.addEventListener('scroll', onProcess, { passive: true });
  window.addEventListener('resize', onProcess);

  /* ---- contact form ---------------------------------------------------- */
  const form = $('#contactForm');
  const status = $('#formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    const invalid = ['name', 'email', 'message'].filter((k) => !String(d[k] || '').trim() || (k === 'email' && !/^\S+@\S+\.\S+$/.test(d[k])));
    $$('.field', form).forEach((f) => f.classList.toggle('is-error', invalid.includes(($('input,textarea', f) || {}).name)));
    if (invalid.length) {
      status.textContent = ui('formErr');
      status.className = 'form__status is-error';
      return;
    }
    const body = [
      `${t('form.name')}: ${d.name}`,
      d.company ? `${t('form.company')}: ${d.company}` : '',
      `${t('form.email')}: ${d.email}`,
      d.phone ? `${t('form.phone')}: ${d.phone}` : '',
      `${t('form.type')}: ${d.type}`,
      '',
      d.message
    ].filter((x, i) => x || i === 5).join('\n');
    window.location.href = `mailto:info@vastatyba.lt?subject=${encodeURIComponent(ui('mailSubject') + ' — ' + d.name)}&body=${encodeURIComponent(body)}`;
    status.textContent = ui('formOk');
    status.className = 'form__status is-ok';
  });

  /* ---- init ------------------------------------------------------------ */
  const saved = store.get('va-lang');
  applyLang(saved === 'en' ? 'en' : 'lt');
  observeReveals(document);
  onProcess();
  requestAnimationFrame(() => document.body.classList.add('is-ready'));
})();
