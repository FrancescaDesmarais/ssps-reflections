// ─── Config ───────────────────────────────────────────────────────────────
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbykLGfLi1R6qo2C6F-M7PdRikXDuVAvvcyfngysf1z0qncfXn_7hSq__9HwO2DJmDl0/exec';

// ─── State ────────────────────────────────────────────────────────────────
const formData = {
  selectedFuture:      null,
  selectedFutureLabel: '',
  signals:             '',
  aiGrowth:            0,
  aiCollapse:          0,
  aiTransformation:    0,
  aiConstraint:        0,
  questionCategory:    '',
  dynamicQuestion:     '',
  reflection:          '',
  additionalInfo:      ''
};

let previousPage  = 1;
let carouselIndex = 0;
let hasSubmitted  = false;

// ─── SSP data ──────────────────────────────────────────────────────────────
const sspIds = ['ssp1', 'ssp2', 'ssp3', 'ssp4', 'ssp5'];

const sspData = {
  ssp1: {
    label:    'SSP1: Sustainability',
    subtitle: 'Taking the Green Road',
    color:    '#3d7a5a',
    narrative: `
      <p>[Placeholder: In this future, the world shifts toward sustainable development. Societies globally prioritise environmental stewardship alongside human well-being. Inequalities reduce. Consumption patterns shift towards lower resource intensity.]</p>
      <p>[Placeholder: Fossil fuels are phased out rapidly. Education, healthcare, and living standards improve across the board. International cooperation is strong — global institutions hold and function.]</p>
      <p>[Placeholder: Climate impacts, while still present due to historical emissions, are managed through both ambitious mitigation and proactive adaptation. This pathway requires significant global political will but represents a hopeful and coherent trajectory.]</p>
      <div class="carousel-meta">
        <span><strong>Climate impact:</strong> Low</span>
        <span><strong>Cooperation:</strong> High</span>
        <span><strong>Emissions:</strong> Rapidly declining</span>
      </div>`
  },
  ssp2: {
    label:    'SSP2: Middle of the Road',
    subtitle: 'A World of Gradual Progress',
    color:    '#6688aa',
    narrative: `
      <p>[Placeholder: In this future, social, economic, and technological trends do not shift markedly from historical patterns. Development and income growth proceed unevenly. Some countries make progress on sustainability; others lag behind.]</p>
      <p>[Placeholder: Global emissions follow a moderate path — not the catastrophic worst case, but far from the ambitious best. Environmental policies improve slowly. Technology advances, but deployment is uneven.]</p>
      <p>[Placeholder: Climate impacts grow and are partially managed. This is often called the 'business as usual' pathway — a continuation of current trends without major transformation in either direction.]</p>
      <div class="carousel-meta">
        <span><strong>Climate impact:</strong> Medium</span>
        <span><strong>Cooperation:</strong> Moderate</span>
        <span><strong>Emissions:</strong> Slowly declining</span>
      </div>`
  },
  ssp3: {
    label:    'SSP3: Regional Rivalry',
    subtitle: 'A Rocky Road',
    color:    '#bf5c38',
    narrative: `
      <p>[Placeholder: In this future, resurgent nationalism and regional conflicts push countries inward. Global trade declines. Investment in education and technology slows. Governments focus on domestic security and food production at the expense of environmental goals.]</p>
      <p>[Placeholder: Development is slow and deeply unequal. Fossil fuel use continues strongly in many regions. Climate policies are weak or non-existent. Emissions remain high.]</p>
      <p>[Placeholder: Climate impacts are severe and unevenly distributed. Vulnerable regions face extreme consequences with little international support. Adaptation becomes the primary — and often insufficient — strategy.]</p>
      <div class="carousel-meta">
        <span><strong>Climate impact:</strong> High</span>
        <span><strong>Cooperation:</strong> Low</span>
        <span><strong>Emissions:</strong> Persistently high</span>
      </div>`
  },
  ssp4: {
    label:    'SSP4: Inequality',
    subtitle: 'A Road Divided',
    color:    '#7a6aaa',
    narrative: `
      <p>[Placeholder: In this future, power becomes increasingly concentrated in the hands of a global elite. A well-educated, internationally connected minority drives rapid technological development and benefits from low-emissions energy systems.]</p>
      <p>[Placeholder: Large populations — particularly in the global south — remain dependent on fossil fuels, low-skilled labour, and poorly governed states. International cooperation exists but primarily serves powerful interests.]</p>
      <p>[Placeholder: Climate impacts diverge sharply. Wealthy regions invest in adaptation and survive. Poorer regions face compounding crises with minimal resources to respond. This is a world of islands in a rising tide.]</p>
      <div class="carousel-meta">
        <span><strong>Climate impact:</strong> Mixed</span>
        <span><strong>Cooperation:</strong> Stratified</span>
        <span><strong>Emissions:</strong> Uneven</span>
      </div>`
  },
  ssp5: {
    label:    'SSP5: Fossil-fueled Development',
    subtitle: 'Taking the Highway',
    color:    '#aa3838',
    narrative: `
      <p>[Placeholder: In this future, the world bets everything on technological solutions and economic growth. Fossil fuel development accelerates massively. Energy is abundant and cheap. GDP grows strongly across much of the world.]</p>
      <p>[Placeholder: Human development improves in many ways — health, income, education — but at the cost of extreme carbon emissions. The assumption is that future technology (carbon capture, geoengineering) will manage the consequences.]</p>
      <p>[Placeholder: Climate impacts are the most severe of any pathway. Temperatures rise significantly. The gamble on future technology is a high-stakes bet that may not pay off. This is the highway — fast, powerful, and with no clear off-ramp.]</p>
      <div class="carousel-meta">
        <span><strong>Climate impact:</strong> Very high</span>
        <span><strong>Cooperation:</strong> Moderate</span>
        <span><strong>Emissions:</strong> Very high</span>
      </div>`
  }
};

const aiScenarioLabels = ['AI Growth', 'AI Collapse', 'AI Transformation', 'AI Constraint'];

// ─── Navigation ───────────────────────────────────────────────────────────
function goToPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pageId = (n === 'about') ? 'page-about' : 'page-' + n;
  document.getElementById(pageId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });

  const bc = document.getElementById('breadcrumb');
  if (typeof n === 'number' && n >= 2 && n <= 5) {
    bc.style.display = 'block';
    document.querySelectorAll('.bc-step').forEach(el => {
      const step = parseInt(el.dataset.step);
      const isDone = step < n;
      el.classList.toggle('active', step === n);
      el.classList.toggle('done',   isDone);
      el.onclick = isDone ? function() { goToPage(step); } : null;
    });
  } else {
    bc.style.display = 'none';
  }

  if (n === 'about') updateAboutBackBtn();
}

function goNext(fromPage) {
  if (fromPage === 1) {
    if (!formData.selectedFuture) return;
    document.getElementById('page2-context').textContent = 'You selected: ' + formData.selectedFutureLabel;
    goToPage(2);

  } else if (fromPage === 2) {
    formData.signals = document.getElementById('signals-input').value.trim();
    goToPage(3);

  } else if (fromPage === 3) {
    const vals = [0,1,2,3].map(i => parseInt(document.getElementById('input-' + i).value) || 0);
    if (vals.reduce((a,b) => a+b, 0) !== 100) return;
    formData.aiGrowth         = vals[0];
    formData.aiCollapse       = vals[1];
    formData.aiTransformation = vals[2];
    formData.aiConstraint     = vals[3];
    setPage4Question();
    goToPage(4);

  } else if (fromPage === 4) {
    formData.reflection = document.getElementById('reflection-input').value.trim();
    resetStep5();
    goToPage(5);
  }
}

function goBack(fromPage) {
  if (fromPage === 'about') {
    goToPage(previousPage);
  } else {
    goToPage(fromPage - 1);
  }
}

function updateAboutBackBtn() {
  const btn = document.getElementById('about-back-btn');
  btn.style.display = (previousPage >= 2 && !hasSubmitted) ? 'inline-block' : 'none';
}

function goToAbout() {
  const active = document.querySelector('.page.active');
  if (active && active.id !== 'page-about') {
    const num = active.id.replace('page-', '');
    previousPage = isNaN(num) ? 1 : parseInt(num);
  }
  goToPage('about');
}

// ─── Page 1: Card click & carousel ────────────────────────────────────────
function handleCardClick(id) {
  carouselIndex = sspIds.indexOf(id);
  openCarousel();
}

function openCarousel() {
  renderCarouselSlide();
  document.getElementById('carousel-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCarousel() {
  document.getElementById('carousel-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function carouselPrev() {
  carouselIndex = (carouselIndex - 1 + 5) % 5;
  renderCarouselSlide();
}

function carouselNext() {
  carouselIndex = (carouselIndex + 1) % 5;
  renderCarouselSlide();
}

function renderCarouselSlide() {
  const id  = sspIds[carouselIndex];
  const ssp = sspData[id];

  document.getElementById('carousel-color').style.background = ssp.color;
  document.getElementById('carousel-content').innerHTML =
    '<h2>' + ssp.label + '</h2>' +
    '<p class="carousel-subtitle">' + ssp.subtitle + '</p>' +
    ssp.narrative;
  document.getElementById('carousel-counter').textContent = (carouselIndex + 1) + ' / 5';

  const selectBtn = document.getElementById('carousel-select-btn');
  selectBtn.textContent = (formData.selectedFuture === id)
    ? 'Selected ✓'
    : 'Select this future →';
}

function selectFromCarousel() {
  const id  = sspIds[carouselIndex];
  const ssp = sspData[id];

  formData.selectedFuture      = id;
  formData.selectedFutureLabel = ssp.label;

  document.querySelectorAll('.future-card').forEach(c => c.classList.remove('selected'));
  document.querySelector('[data-id="' + id + '"]').classList.add('selected');

  document.getElementById('start-status').textContent = 'You think we are in ' + ssp.label + '.';
  document.getElementById('btn-add-predictions').disabled = false;

  document.getElementById('carousel-select-btn').textContent = 'Selected ✓';
  closeCarousel();
}

// Keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
  if (!document.getElementById('carousel-overlay').classList.contains('open')) return;
  if (e.key === 'Escape')      closeCarousel();
  if (e.key === 'ArrowLeft')   carouselPrev();
  if (e.key === 'ArrowRight')  carouselNext();
});

// Touch swipe for carousel
(function() {
  let startX = null;
  const overlay = document.getElementById('carousel-overlay');
  overlay.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  }, { passive: true });
  overlay.addEventListener('touchend', function(e) {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) dx < 0 ? carouselNext() : carouselPrev();
    startX = null;
  }, { passive: true });
})();

// ─── Page 3: Number inputs & total ────────────────────────────────────────
function updateTotal() {
  const vals  = [0,1,2,3].map(i => parseInt(document.getElementById('input-' + i).value) || 0);
  const total = vals.reduce((a,b) => a+b, 0);

  document.getElementById('total-val').textContent = total;

  const bar  = document.getElementById('total-bar');
  const note = document.getElementById('total-note');
  const btn  = document.getElementById('btn-next-3');

  if (total === 100) {
    bar.className  = 'total-bar done';
    note.textContent = '✓';
    btn.disabled   = false;
  } else if (total > 100) {
    bar.className  = 'total-bar over';
    note.textContent = '— over 100%, adjust your values';
    btn.disabled   = true;
  } else {
    bar.className  = 'total-bar';
    note.textContent = '— must reach 100%';
    btn.disabled   = true;
  }
}

// ─── Page 4: Dynamic question ─────────────────────────────────────────────
function setPage4Question() {
  const vals   = [formData.aiGrowth, formData.aiCollapse, formData.aiTransformation, formData.aiConstraint];
  const sorted = vals.map((v,i) => ({v,i})).sort((a,b) => b.v - a.v);
  const spread = sorted[0].v - sorted[sorted.length - 1].v;
  const future = formData.selectedFutureLabel;

  let category, question;

  if (spread <= 10) {
    category = 'equal';
    question = 'You predict that all of these futures are equally possible. What could accelerate change towards the future you prefer?';

  } else if (sorted[0].v > 55) {
    category = 'winner';
    question  = 'You predict that <em>' + future + ' + ' + aiScenarioLabels[sorted[0].i] + '</em> is most likely. What do you think could accelerate or reverse this future direction?';

  } else if (Math.abs(sorted[0].v - sorted[1].v) <= 10 && sorted[0].v > 35 && sorted[1].v > 35) {
    category = 'tie';
    question  = 'You predict that <em>' + future + ' + ' + aiScenarioLabels[sorted[0].i] + '</em> or <em>' + aiScenarioLabels[sorted[1].i] + '</em> are equally possible. What do you think could accelerate towards the future you prefer?';

  } else {
    category = 'winner';
    question  = 'You predict that <em>' + future + ' + ' + aiScenarioLabels[sorted[0].i] + '</em> is most likely. What do you think could accelerate or reverse this future direction?';
  }

  formData.questionCategory = category;
  formData.dynamicQuestion  = question;
  document.getElementById('page4-question').innerHTML = question;
}

// ─── Page 5: Two-step submit ───────────────────────────────────────────────
function resetStep5() {
  document.getElementById('page-5-step1').style.display = 'block';
  document.getElementById('page-5-step2').style.display = 'none';
}

function showStep2() {
  document.getElementById('page-5-step1').style.display = 'none';
  document.getElementById('page-5-step2').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function submitForm(includeOptional) {
  formData.additionalInfo = includeOptional
    ? document.getElementById('optional-input').value.trim()
    : '';

  const payload = {
    selectedFuture:   formData.selectedFutureLabel,
    signals:          formData.signals,
    aiGrowth:         formData.aiGrowth,
    aiCollapse:       formData.aiCollapse,
    aiTransformation: formData.aiTransformation,
    aiConstraint:     formData.aiConstraint,
    questionCategory: formData.questionCategory,
    reflection:       formData.reflection,
    additionalInfo:   formData.additionalInfo
  };

  hasSubmitted = true;

  if (SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    fetch(SCRIPT_URL + '?' + new URLSearchParams(payload).toString()).catch(function() {});
  }

  previousPage = 5;
  goToPage('about');
}
