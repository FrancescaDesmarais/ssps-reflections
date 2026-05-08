// Replace with your deployed Apps Script URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwbituNMr_1L08CACjg5TDbNhaVXdrGRqxpYvioG9OR5zm5lnU_VNEqGdPdmcbzh75K/exec';

// ─── DATA ───────────────────────────────────────────────────────────────────

const FUTURES = [
  {
    id: 'sustainability',
    title: 'Sustainability',
    color: '#c35839',
    description: 'In this future, the world shifts toward sustainable development. Societies globally prioritise environmental stewardship alongside human well-being. Inequalities reduce. Consumption patterns shift towards lower resource intensity. Fossil fuels are phased out rapidly. Education, healthcare, and living standards improve across the board. International cooperation is strong — global institutions hold and function. Climate impacts, while still present due to historical emissions, are managed through both ambitious mitigation and proactive adaptation. This pathway requires significant global political will but represents a hopeful and coherent trajectory.',
    ai: [
      { id: 'aiGrowth',         icon: 'growth',         title: 'AI Growth',         text: '[Placeholder: How rapid AI development accelerates or complicates the sustainability transition in this pathway]' },
      { id: 'aiCollapse',       icon: 'collapse',       title: 'AI Collapse',       text: '[Placeholder: How an AI collapse disrupts the cooperative global institutions this pathway depends on]' },
      { id: 'aiConstraint',     icon: 'constraint',     title: 'AI Constraint',     text: '[Placeholder: How deliberately constrained AI shapes the sustainability pathway and its institutions]' },
      { id: 'aiTransformation', icon: 'transformation', title: 'AI Transformation', text: '[Placeholder: How AI fundamentally transforms what sustainability looks like by 2100]' },
    ]
  },
  {
    id: 'middle-of-the-road',
    title: 'Middle of the Road',
    color: '#c13e36',
    description: 'In this future, social, economic, and technological trends do not shift markedly from historical patterns. Development and income growth proceed unevenly. Some countries make progress on sustainability; others lag behind. Global emissions follow a moderate path — not the catastrophic worst case, but far from the ambitious best. Environmental policies improve slowly. Technology advances, but deployment is uneven. Climate impacts grow and are partially managed. This is often called the \'business as usual\' pathway — a continuation of current trends without major transformation in either direction.',
    ai: [
      { id: 'aiGrowth',         icon: 'growth',         title: 'AI Growth',         text: '[Placeholder: How AI growth accelerates or disrupts the uneven, moderate trajectory of this pathway]' },
      { id: 'aiCollapse',       icon: 'collapse',       title: 'AI Collapse',       text: '[Placeholder: How AI collapse compounds the already uneven development patterns of this pathway]' },
      { id: 'aiConstraint',     icon: 'constraint',     title: 'AI Constraint',     text: '[Placeholder: How constrained AI fits within the business-as-usual patterns of this pathway]' },
      { id: 'aiTransformation', icon: 'transformation', title: 'AI Transformation', text: '[Placeholder: How AI transformation breaks or reinforces the middle-of-the-road trajectory]' },
    ]
  },
  {
    id: 'regional-rivalry',
    title: 'Regional Rivalry',
    color: '#990043',
    description: 'In this future, resurgent nationalism and regional conflicts push countries inward. Global trade declines. Investment in education and technology slows. Governments focus on domestic security and food production at the expense of environmental goals. Development is slow and deeply unequal. Fossil fuel use continues strongly in many regions. Climate policies are weak or non-existent. Emissions remain high. Climate impacts are severe and unevenly distributed. Vulnerable regions face extreme consequences with little international support. Adaptation becomes the primary — and often insufficient — strategy.',
    ai: [
      { id: 'aiGrowth',         icon: 'growth',         title: 'AI Growth',         text: '[Placeholder: How AI growth interacts with the nationalist, fragmented world of Regional Rivalry]' },
      { id: 'aiCollapse',       icon: 'collapse',       title: 'AI Collapse',       text: '[Placeholder: How AI collapse compounds the instability of a regionally fragmented world]' },
      { id: 'aiConstraint',     icon: 'constraint',     title: 'AI Constraint',     text: '[Placeholder: How AI constraint maps onto a world already pulling back from global cooperation]' },
      { id: 'aiTransformation', icon: 'transformation', title: 'AI Transformation', text: '[Placeholder: How AI transformation reshapes regional rivalries and shifts the balance of power]' },
    ]
  },
  {
    id: 'inequality',
    title: 'Inequality',
    color: '#c03137',
    description: 'In this future, power becomes increasingly concentrated in the hands of a global elite. A well-educated, internationally connected minority drives rapid technological development and benefits from low-emissions energy systems. Large populations — particularly in the global south — remain dependent on fossil fuels, low-skilled labour, and poorly governed states. International cooperation exists but primarily serves powerful interests. Climate impacts diverge sharply. Wealthy regions invest in adaptation and survive. Poorer regions face compounding crises with minimal resources to respond. This is a world of islands in a rising tide.',
    ai: [
      { id: 'aiGrowth',         icon: 'growth',         title: 'AI Growth',         text: '[Placeholder: How AI growth widens or reshapes the divide between elites and marginalised populations in this pathway]' },
      { id: 'aiCollapse',       icon: 'collapse',       title: 'AI Collapse',       text: '[Placeholder: How AI collapse affects elite and marginalised populations differently in this pathway]' },
      { id: 'aiConstraint',     icon: 'constraint',     title: 'AI Constraint',     text: '[Placeholder: Who controls AI constraint in a world governed by powerful elites, and who is left out]' },
      { id: 'aiTransformation', icon: 'transformation', title: 'AI Transformation', text: '[Placeholder: How AI transformation reshapes the power dynamics and inequalities of this pathway]' },
    ]
  },
  {
    id: 'fossil-fueled',
    title: 'Fossil-fueled Development',
    color: '#340041',
    description: 'In this future, the world bets everything on technological solutions and economic growth. Fossil fuel development accelerates massively. Energy is abundant and cheap. GDP grows strongly across much of the world. Human development improves in many ways — health, income, education — but at the cost of extreme carbon emissions. The assumption is that future technology (carbon capture, geoengineering) will manage the consequences. Climate impacts are the most severe of any pathway. Temperatures rise significantly. The gamble on future technology is a high-stakes bet that may not pay off. This is the highway — fast, powerful, and with no clear off-ramp.',
    ai: [
      { id: 'aiGrowth',         icon: 'growth',         title: 'AI Growth',         text: '[Placeholder: How AI growth accelerates the fossil-fueled gamble, or provides the technological salvation the pathway is betting on]' },
      { id: 'aiCollapse',       icon: 'collapse',       title: 'AI Collapse',       text: '[Placeholder: How AI collapse shatters the technological optimism this pathway is built on]' },
      { id: 'aiConstraint',     icon: 'constraint',     title: 'AI Constraint',     text: '[Placeholder: How AI constraint affects a world betting everything on unconstrained technological development]' },
      { id: 'aiTransformation', icon: 'transformation', title: 'AI Transformation', text: '[Placeholder: How AI transformation changes what fossil-fueled development means for climate outcomes this century]' },
    ]
  }
];

const ICONS = {
  growth: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>`,
  collapse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/>
    <polyline points="16 17 22 17 22 11"/>
  </svg>`,
  constraint: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>`,
  transformation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>`
};

// ─── STATE ───────────────────────────────────────────────────────────────────

let shuffledFutures = [];
let carouselIndex   = 0;
let selectedFuture  = null;
let aiValues        = {};
let shuffledAI      = [];

// ─── INIT ────────────────────────────────────────────────────────────────────

function init() {
  shuffledFutures = shuffle([...FUTURES]);
  renderFutureCards();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── RENDER CARDS ────────────────────────────────────────────────────────────

function renderFutureCards() {
  const list = document.getElementById('futures-list');
  list.innerHTML = '';

  shuffledFutures.forEach((future, index) => {
    const card = document.createElement('div');
    card.className = `future-card pan-${index + 1}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Explore ${future.title} pathway`);
    card.innerHTML = `
      <div class="card-bg"></div>
      <div class="card-overlay" style="background-color: ${future.color};"></div>
      <span class="card-label">${future.title}</span>
    `;
    card.addEventListener('click', () => openCarousel(index));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCarousel(index);
      }
    });
    list.appendChild(card);
  });
}

// ─── OPEN CAROUSEL ───────────────────────────────────────────────────────────

function openCarousel(startIndex) {
  carouselIndex = startIndex;

  const overlay   = document.getElementById('active-overlay');
  const overlayBg = document.getElementById('overlay-bg');

  // Set initial state: transparent, then fade in
  overlay.style.opacity    = '0';
  overlay.style.transition = 'none';
  overlayBg.style.backgroundColor = shuffledFutures[carouselIndex].color;
  overlay.classList.remove('hidden');

  // Force reflow so browser registers the initial opacity before transitioning
  overlay.getBoundingClientRect();

  overlay.style.transition = 'opacity 0.55s ease';
  overlay.style.opacity    = '1';

  // Materialise the popup after the overlay has settled
  setTimeout(() => {
    updateCarouselSlide(true);
    document.getElementById('form-page-1').classList.remove('hidden');
  }, 520);

  document.body.style.overflow = 'hidden';
}

// ─── CAROUSEL ────────────────────────────────────────────────────────────────

function updateCarouselSlide(instant = false) {
  const future   = shuffledFutures[carouselIndex];
  const titleEl  = document.getElementById('carousel-future-title');
  const descEl   = document.getElementById('carousel-future-desc');
  const overlayBg = document.getElementById('overlay-bg');

  overlayBg.style.backgroundColor = future.color;

  if (instant) {
    titleEl.textContent = future.title;
    descEl.textContent  = future.description;
  } else {
    // Fade text out → swap → fade back in
    titleEl.style.opacity = '0';
    descEl.style.opacity  = '0';
    setTimeout(() => {
      titleEl.textContent = future.title;
      descEl.textContent  = future.description;
      titleEl.style.opacity = '1';
      descEl.style.opacity  = '1';
    }, 220);
  }

  document.getElementById('carousel-counter').textContent =
    `${carouselIndex + 1} / ${shuffledFutures.length}`;
}

function carouselPrev() {
  carouselIndex = (carouselIndex - 1 + shuffledFutures.length) % shuffledFutures.length;
  updateCarouselSlide();
}

function carouselNext() {
  carouselIndex = (carouselIndex + 1) % shuffledFutures.length;
  updateCarouselSlide();
}

// ─── SELECT FUTURE → PAGE 2 ──────────────────────────────────────────────────

function selectFuture() {
  selectedFuture = shuffledFutures[carouselIndex];

  aiValues  = {};
  selectedFuture.ai.forEach(s => { aiValues[s.id] = 0; });
  shuffledAI = shuffle([...selectedFuture.ai]);

  document.getElementById('form-page-1').classList.add('hidden');
  renderPage2();
  document.getElementById('form-page-2').classList.remove('hidden');
}

// ─── RENDER PAGE 2 ───────────────────────────────────────────────────────────

function renderPage2() {
  document.getElementById('page2-subheader').textContent =
    `You think we are on the ${selectedFuture.title} pathway`;

  const grid = document.getElementById('ai-scenarios-grid');
  grid.innerHTML = '';

  shuffledAI.forEach(scenario => {
    const box = document.createElement('div');
    box.className = 'ai-scenario-box';
    box.innerHTML = `
      <span class="ai-scenario-icon">${ICONS[scenario.icon]}</span>
      <div class="ai-scenario-title">${scenario.title}</div>
      <p class="ai-scenario-text">${scenario.text}</p>
      <div class="ai-input-row">
        <input
          type="number"
          min="0"
          max="100"
          value="0"
          id="input-${scenario.id}"
          aria-label="${scenario.title} probability percentage"
          oninput="updateTally()"
        >
        <span class="pct-label">%</span>
      </div>
    `;
    grid.appendChild(box);
  });

  updateTally();
}

// ─── TALLY ───────────────────────────────────────────────────────────────────

function updateTally() {
  let total = 0;

  selectedFuture.ai.forEach(s => {
    const input = document.getElementById(`input-${s.id}`);
    if (!input) return;
    const val = Math.max(0, Math.min(100, parseInt(input.value, 10) || 0));
    aiValues[s.id] = val;
    total += val;
  });

  const tallyText  = document.getElementById('tally-text');
  const tallyHint  = document.getElementById('tally-hint');
  const tallyBar   = document.querySelector('.tally-bar');
  const submitBtn  = document.getElementById('btn-submit');

  tallyText.textContent = `Total: ${total}%`;

  if (total === 100) {
    tallyHint.textContent = '✓ Ready to submit';
    tallyBar.classList.add('tally-complete');
    submitBtn.disabled = false;
  } else if (total > 100) {
    tallyHint.textContent = `Over by ${total - 100}% — adjust your values`;
    tallyBar.classList.remove('tally-complete');
    submitBtn.disabled = true;
  } else {
    tallyHint.textContent = `${100 - total}% remaining`;
    tallyBar.classList.remove('tally-complete');
    submitBtn.disabled = true;
  }
}

// ─── BACK TO PAGE 1 ──────────────────────────────────────────────────────────

function goBackToPage1() {
  document.getElementById('form-page-2').classList.add('hidden');
  document.getElementById('form-page-1').classList.remove('hidden');
  updateCarouselSlide(true);
}

// ─── CLOSE FORM ──────────────────────────────────────────────────────────────

function closeForm() {
  const overlay = document.getElementById('active-overlay');

  document.getElementById('form-page-1').classList.add('hidden');
  document.getElementById('form-page-2').classList.add('hidden');

  overlay.style.transition = 'opacity 0.5s ease';
  overlay.style.opacity    = '0';

  setTimeout(() => {
    overlay.classList.add('hidden');
    overlay.style.opacity    = '';
    overlay.style.transition = '';
    document.body.style.overflow = '';
  }, 500);

  selectedFuture = null;
}

// ─── SUBMIT ──────────────────────────────────────────────────────────────────

async function submitForm() {
  // Send to Google Sheets (fire and forget — no-cors means we can't read the response)
  const params = new URLSearchParams({
    selectedFuture:   selectedFuture.title,
    aiGrowth:         aiValues['aiGrowth']         || 0,
    aiCollapse:       aiValues['aiCollapse']       || 0,
    aiConstraint:     aiValues['aiConstraint']     || 0,
    aiTransformation: aiValues['aiTransformation'] || 0,
  });

  fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, { mode: 'no-cors' }).catch(() => {});

  // Dissolve pop-up
  const overlay = document.getElementById('active-overlay');
  const page2   = document.getElementById('form-page-2');

  page2.style.transition = 'opacity 0.4s ease';
  page2.style.opacity    = '0';

  await delay(420);

  // Fade out the color wash
  overlay.style.transition = 'opacity 0.85s ease';
  overlay.style.opacity    = '0';

  await delay(870);

  // Clean up overlay
  overlay.classList.add('hidden');
  page2.classList.add('hidden');
  page2.style.opacity    = '';
  page2.style.transition = '';
  overlay.style.opacity    = '';
  overlay.style.transition = '';
  document.body.style.overflow = '';

  // Show completed state
  document.getElementById('state-not-started').classList.add('hidden');
  document.getElementById('state-completed').classList.remove('hidden');

  selectedFuture = null;
}

// ─── UTILITY ─────────────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── START ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
