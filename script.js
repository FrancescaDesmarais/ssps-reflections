// Replace with your deployed Apps Script URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyv7aNmW4_9BHuZUPWnkNW26_fi8tXNWgbpBLK8zfcfHFfN80fTX-Hb45xNwJkt1X6b/exec';


// ─── DATA ───────────────────────────────────────────────────────────────────

const FUTURES = [
  {
    id: 'sustainability',
    title: 'Sustainability',
    color: '#c35839',
    image: 'Images/Sustainability-mangroves.webp',
    description: `In this future, the world shifts toward sustainable development. Societies globally prioritise environmental stewardship alongside human well-being. Inequalities reduce. Consumption patterns shift towards lower resource intensity.\n\nFossil fuels are phased out rapidly. Education, healthcare, and living standards improve across the board. International cooperation is strong — global institutions hold and function.\n\nClimate impacts, while still present due to historical emissions, are managed through both ambitious mitigation and proactive adaptation. This pathway requires significant global political will but represents a hopeful and coherent trajectory.`,
    ai: [
      { id: 'aiGrowth',         icon: 'growth',         title: 'AI Growth',         text: '<strong>AI accelerates the post-growth transition</strong> already underway — sparking advancements in clean energy, healthcare, and education and globally diffusing the gains faster than any previous technology. AI becomes the shared mechanism through which solutions leap borders and contexts, from microgrid design in Mozambique to medical breakthroughs in Manila. The 21st century stops growing and starts flourishing.' },
      { id: 'aiCollapse',       icon: 'collapse',       title: 'AI Collapse',       text: '<strong>AI collapses collective action</strong>, as models trained on a consumerist, patriarchal world quietly erode the critical thinking, social bonds, and collective capacity that this sustainable future depends on. Global cooperation falters and splinters, and individualism reasserts itself. The 21st century achieves its green transition and loses its humanity in the same breath.' },
      { id: 'aiConstraint',     icon: 'constraint',     title: 'AI Constraint',     text: '<strong>AI is carefully steered</strong> as strong institutions channel its development toward known problems — optimisation and pattern recognition in well-understood systems — but slow progress in areas of genuine uncertainty. The climate goals are met. The medical breakthroughs take longer. The 21st century is managed well and leaves some cures on the table.' },
      { id: 'aiTransformation', icon: 'transformation', title: 'AI Transformation', text: '<strong>AI transforms employment</strong> as efficiency gains compress the working week, freeing time for the work markets never valued: tending food systems, ecological recovery, and human health. Young people spend their 20s and 30s as stewards and explorers; older workers contribute into their 70s, their accumulated wisdom suddenly the scarcest resource in the economy. The 21st century finally makes room for a full human life.' },
    ]
  },
  {
    id: 'middle-of-the-road',
    title: 'Middle of the Road',
    color: '#c13e36',
    image: 'Images/MiddleOfTheRoad.webp',
    description: `In this future, social, economic, and technological trends do not shift markedly from historical patterns. Development and income growth proceed unevenly. Some countries make progress on sustainability; others lag behind.\n\nGlobal emissions follow a moderate path — not the catastrophic worst case, but far from the ambitious best. Environmental policies improve slowly. Technology advances, but deployment is uneven.\n\nClimate impacts grow and are partially managed. This is often called the 'business as usual' pathway — a continuation of current trends without major transformation in either direction.`,
    ai: [
      { id: 'aiGrowth',         icon: 'growth',         title: 'AI Growth',         text: '<strong>AI accelerates progress unevenly</strong>, delivering genuine advances in clean energy, healthcare, and productivity while concentrating the gains in wealthy, data-connected areas. The world improves and grows more unequal at the same time. The 21st century gets better. Just not for everyone, and not quite enough.' },
      { id: 'aiCollapse',       icon: 'collapse',       title: 'AI Collapse',       text: '<strong>AI amplifies fragility</strong> as uneven development leaves critical systems — energy grids, internet infrastructure, supply chains — weighed down by complexity and technical debt. A slow erosion of human capital leaves fewer people sharp enough to maintain what was built. Quality of life gains reverse quietly, then suddenly. The 21st century lurches forward, fragile and unresolved.' },
      { id: 'aiConstraint',     icon: 'constraint',     title: 'AI Constraint',     text: '<strong>AI mania dries up</strong> as the tech bubble bursts and a patchwork of regulation fills the vacuum — enough to prevent the worst AI nightmares, not enough to deliver the promise. AI settles into the background, a utility like electricity. Regions with clean energy and strong education pull ahead quietly; everywhere else it hums, underdelivering. The 21st century got a useful tool when it was promised a revolution.' },
      { id: 'aiTransformation', icon: 'transformation', title: 'AI Transformation', text: '<strong>AI rewrites the social contract</strong> as 3-day working weeks and abundant AI tools promise liberation — but freed time fills with consumption, endless optimisation, and AI-assisted side hustles rather than rest or community. Some people flourish, others drift, and many hustle harder and call it freedom. The 21st century gets more time and doesn\'t know what to do with it.' },
    ]
  },
  {
    id: 'regional-rivalry',
    title: 'Regional Rivalry',
    color: '#990043',
    image: 'Images/RegionalRivalry-tanks.webp',
    description: `In this future, resurgent nationalism and regional conflicts push countries inward. Global trade declines. Investment in education and technology slows. Governments focus on domestic security and food production at the expense of environmental goals.\n\nDevelopment is slow and deeply unequal. Fossil fuel use continues strongly in many regions. Climate policies are weak or non-existent. Emissions remain high.\n\nClimate impacts are severe and unevenly distributed. Vulnerable regions face extreme consequences with little international support. Adaptation becomes the primary — and often insufficient — strategy.`,
    ai: [
      { id: 'aiGrowth',         icon: 'growth',         title: 'AI Growth',         text: '<strong>AI accelerates the rivalry</strong> as governments race to nationalise and weaponise models, each convinced that AI dominance is the only guarantee of survival in an already fragmenting world. The green transition stalls, not for lack of technology but lack of cooperation. The gaps between nations widen; the gaps between states and the people they surveil widen further. The 21st century turns inward and hardens.' },
      { id: 'aiCollapse',       icon: 'collapse',       title: 'AI Collapse',       text: '<strong>AI weaponises scarcity</strong> as regional powers deploy models to identify, secure, and deny access to diminishing natural resources — water, energy, critical minerals — with a precision that turns competition into open conflict. The fighting destroys what it was fought over; the ecological base that all human life depends on deteriorates with each exchange. The 21st century strips the earth to the bone.' },
      { id: 'aiConstraint',     icon: 'constraint',     title: 'AI Constraint',     text: '<strong>AI never awakens</strong> as siloed supply chains, low investment in human capital, and strongmen threatened by the connective power of general intelligence keep development narrow and slow. AI becomes another tool of political control rather than a general purpose technology. The 21st century is run by people playing political games in the ruins of globalisation.' },
      { id: 'aiTransformation', icon: 'transformation', title: 'AI Transformation', text: '<strong>AI deepens the strangeness of a fractured world</strong> as isolated models — each reinforcing its own diverging culture — refract each other along trade routes and climate migration corridors, producing forms nobody designed or anticipated. Vastly different cultures, shaped by decades of algorithmic isolation, collide and misread each other. Strange, resilient communities form in the gaps. The 21st century fractures and something plural and unruly takes root.' },
    ]
  },
  {
    id: 'inequality',
    title: 'Inequality',
    color: '#c03137',
    image: 'Images/Inequality-hill.webp',
    description: `In this future, power becomes increasingly concentrated in the hands of a global elite. A well-educated, internationally connected minority drives rapid technological development and benefits from low-emissions energy systems.\n\nLarge populations — particularly in the global south — remain dependent on fossil fuels, low-skilled labour, and poorly governed states. International cooperation exists but primarily serves powerful interests.\n\nClimate impacts diverge sharply. Wealthy regions invest in adaptation and survive. Poorer regions face compounding crises with minimal resources to respond. This is a world of islands in a rising tide.`,
    ai: [
      { id: 'aiGrowth',         icon: 'growth',         title: 'AI Growth',         text: '<strong>AI widens the divide</strong>, with AI advancements in health and green technology fuelling an ever richer global elite, while the majority of the global population face stagnating quality of life, more intense weather, and more fragmented natural ecosystems. The 21st century erases any gains in equality.' },
      { id: 'aiCollapse',       icon: 'collapse',       title: 'AI Collapse',       text: '<strong>AI collapses global society</strong> as the astronomical returns from this all-purpose technology accelerates the concentration of wealth and power until society reaches a breaking point. Revolts and wars erupt to destroy the AI infrastructure, bring down corrupted governments, and fight for dwindling access to resources. The 21st century unravels.' },
      { id: 'aiConstraint',     icon: 'constraint',     title: 'AI Constraint',     text: '<strong>AI hits a ceiling</strong> after the tech bubble of the 2020s pops and models reach a plateau of development. Technological interfaces become more conversational and it\'s common to have personal AI assistants, coaches, and entertainers—but no radical benefits to society emerge. The 21st century doesn\'t get worse. It just doesn\'t get better.' },
      { id: 'aiTransformation', icon: 'transformation', title: 'AI Transformation', text: '<strong>AI transforms the social contract</strong> as algorithmic systems deliver genuine comfort and the mirage of personal sovereignty while quietly orchestrating both from the inside. Clean energy and AI access are enshrined as rights — real victories, real enough — underwriting a social contract that asks nothing in return except acquiescence to a world whose ownership is never quite on the ballot. The 21st century is the most democratic-feeling and least democratic in history.' },
    ]
  },
  {
    id: 'fossil-fueled',
    title: 'Fossil-fueled Development',
    color: '#340041',
    image: 'Images/FossilFueledDevelopment.webp',
    description: `In this future, the world bets everything on technological solutions and economic growth. Fossil fuel development accelerates massively. Energy is abundant and cheap. GDP grows strongly across much of the world.\n\nHuman development improves in many ways — health, income, education — but at the cost of extreme carbon emissions. The assumption is that future technology (carbon capture, geoengineering) will manage the consequences.\n\nClimate impacts are the most severe of any pathway. Temperatures rise significantly. The gamble on future technology is a high-stakes bet that may not pay off. This is the highway — fast, powerful, and with no clear off-ramp.`,
    ai: [
      { id: 'aiGrowth',         icon: 'growth',         title: 'AI Growth',         text: '<strong>AI fuels relentless development</strong>, turbocharging an already high-growth world into something wilder and more audacious. Geoengineering is everywhere; data centres are in space: the answer to unforeseen consequences is more technology. The mood is genuinely excited, genuinely innovative, and genuinely uncontrolled. The 21st century is turbulent, optimistic, and impossible to look away from.' },
      { id: 'aiCollapse',       icon: 'collapse',       title: 'AI Collapse',       text: '<strong>AI arms its own opposition</strong> as the same tools driving boundless growth empower those living downstream of it — the climate-displaced, the overwhelmed, the morally opposed — to strike back at the infrastructure they never consented to. Cascading failures in energy and communications systems collapse a world that was too confident in its own resilience. The 21st century\'s most optimistic civilisation discovers its brittleness all at once.' },
      { id: 'aiConstraint',     icon: 'constraint',     title: 'AI Constraint',     text: '<strong>AI is pulled back from the brink</strong> as global powers agree to keep it out of warfare — a narrow but load-bearing constraint that stabilises a furiously competitive world without slowing it down. The race continues everywhere else: resources, supply chains, influence over climate-devastated regions. The 21st century is a Cold War at planetary scale, interconnected enough to avoid destruction, unequal enough to never quite be at peace.' },
      { id: 'aiTransformation', icon: 'transformation', title: 'AI Transformation', text: '<strong>AI dissolves the boundary between state and corporation</strong> as governments and dominant models merge into hybrid entities with no clean name in existing political vocabulary — part sovereign, part infrastructure, part military, part front door to everything. Wealthy AI-hub cities draw the skilled and mobile from a climate-disrupted world; vast regions are administered algorithmically from afar. The 21st century doesn\'t know what to call what it has become.' },
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

let shuffledFutures       = [];
let carouselIndex         = 0;
let selectedFuture        = null;
let aiValues              = {};
let shuffledAI            = [];
let carouselTransitioning = false;

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
      <div class="card-bg" style="background-image: url('${future.image}');"></div>
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

async function openCarousel(startIndex) {
  carouselIndex = startIndex;
  const future    = shuffledFutures[carouselIndex];
  const overlay   = document.getElementById('active-overlay');
  const overlayBg = document.getElementById('overlay-bg');

  // Capture card bounds before any DOM changes
  const card         = document.querySelectorAll('.future-card')[startIndex];
  const rect         = card.getBoundingClientRect();
  const cardBgImage  = window.getComputedStyle(card.querySelector('.card-bg')).backgroundImage;

  document.body.style.overflow = 'hidden';

  // — Phase 1: clone the card (image + colour overlay) and expand to fullscreen —
  const expandEl = document.createElement('div');
  expandEl.style.cssText = `
    position: fixed;
    top: ${rect.top}px;
    left: ${rect.left}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    background-image: ${cardBgImage};
    background-size: cover;
    background-position: center;
    z-index: 99;
    overflow: hidden;
    will-change: top, left, width, height;
    transition: top 0.75s cubic-bezier(0.4,0,0.2,1),
                left 0.75s cubic-bezier(0.4,0,0.2,1),
                width 0.75s cubic-bezier(0.4,0,0.2,1),
                height 0.75s cubic-bezier(0.4,0,0.2,1);
  `;
  const expandColor = document.createElement('div');
  expandColor.style.cssText = `
    position: absolute;
    inset: 0;
    background-color: ${future.color};
    opacity: 0.86;
    transition: opacity 0.65s ease;
  `;
  expandEl.appendChild(expandColor);
  document.body.appendChild(expandEl);

  expandEl.getBoundingClientRect(); // force reflow
  expandEl.style.top    = '0';
  expandEl.style.left   = '0';
  expandEl.style.width  = '100vw';
  expandEl.style.height = '100vh';

  await delay(800);

  // — Phase 2: fade colour overlay to fully opaque —
  expandColor.style.opacity = '1';
  document.documentElement.style.backgroundColor = future.color;

  await delay(700);

  // — Phase 3: swap to real overlay (seamless — same solid colour) —
  overlayBg.style.transition      = 'none';
  overlayBg.style.opacity         = '1';
  overlayBg.style.backgroundColor = future.color;
  overlay.style.opacity           = '1';
  overlay.style.transition        = 'none';
  overlay.classList.remove('hidden');

  expandEl.remove();

  overlayBg.style.transition = 'background-color 0.85s ease';

  // — Phase 3: materialise the popup —
  updateCarouselSlide(true);
  showPopup('form-page-1');
}

// ─── CAROUSEL ────────────────────────────────────────────────────────────────

async function updateCarouselSlide(instant = false) {
  const future    = shuffledFutures[carouselIndex];
  const titleEl   = document.getElementById('carousel-future-title');
  const descEl    = document.getElementById('carousel-future-desc');
  const overlayBg = document.getElementById('overlay-bg');

  if (instant) {
    overlayBg.style.backgroundColor = future.color;
    document.documentElement.style.backgroundColor = future.color;
    titleEl.textContent = future.title;
    descEl.innerHTML    = renderDesc(future.description);
    document.getElementById('carousel-counter').textContent =
      `${carouselIndex + 1} / ${shuffledFutures.length}`;
    return;
  }

  // Swap content and start colour transition simultaneously
  titleEl.textContent = future.title;
  descEl.innerHTML    = renderDesc(future.description);
  document.getElementById('carousel-counter').textContent =
    `${carouselIndex + 1} / ${shuffledFutures.length}`;
  overlayBg.style.backgroundColor = future.color;
  document.documentElement.style.backgroundColor = future.color;
}

async function carouselPrev() {
  if (carouselTransitioning) return;
  carouselTransitioning = true;
  carouselIndex = (carouselIndex - 1 + shuffledFutures.length) % shuffledFutures.length;
  await updateCarouselSlide();
  carouselTransitioning = false;
}

async function carouselNext() {
  if (carouselTransitioning) return;
  carouselTransitioning = true;
  carouselIndex = (carouselIndex + 1) % shuffledFutures.length;
  await updateCarouselSlide();
  carouselTransitioning = false;
}

// ─── SELECT FUTURE → PAGE 2 ──────────────────────────────────────────────────

async function selectFuture() {
  selectedFuture = shuffledFutures[carouselIndex];

  aiValues  = {};
  selectedFuture.ai.forEach(s => { aiValues[s.id] = 0; });
  shuffledAI = shuffle([...selectedFuture.ai]);

  hidePopup('form-page-1');
  renderPage2();
  showPopup('form-page-2');
}

// ─── RENDER PAGE 2 ───────────────────────────────────────────────────────────

function renderPage2() {
  const grid = document.getElementById('ai-scenarios-grid');
  grid.innerHTML = '';

  shuffledAI.forEach(scenario => {
    const box = document.createElement('div');
    box.className = 'ai-scenario-box';
    box.innerHTML = `
      <span class="ai-scenario-icon">${ICONS[scenario.icon]}</span>
      <p class="ai-scenario-text">${scenario.text}</p>
      <div class="ai-input-row">
        <input
          type="number"
          min="0"
          max="100"
          value="0"
          id="input-${scenario.id}"
          aria-label="${scenario.title} probability percentage"
          onfocus="if(this.value==='0')this.value=''"
          onblur="if(this.value==='')this.value='0';updateTally()"
          oninput="updateTally()"
        >
        <span class="pct-label">% chance of happening</span>
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

async function goBackToPage1() {
  hidePopup('form-page-2');
  updateCarouselSlide(true);
  showPopup('form-page-1');
}

// ─── CLOSE FORM ──────────────────────────────────────────────────────────────

function closeForm() {
  const overlay   = document.getElementById('active-overlay');
  const overlayBg = document.getElementById('overlay-bg');

  hidePopup('form-page-1');
  hidePopup('form-page-2');

  overlay.style.transition = 'opacity 0.5s ease';
  overlay.style.opacity    = '0';

  setTimeout(() => {
    overlay.classList.add('hidden');
    overlay.style.opacity      = '';
    overlay.style.transition   = '';
    overlayBg.style.opacity    = '';
    overlayBg.style.transition = '';
    document.documentElement.style.backgroundColor = '';
    document.body.style.overflow = '';
  }, 500);

  selectedFuture = null;
}

// ─── SUBMIT ──────────────────────────────────────────────────────────────────

async function submitForm() {
  // Capture before any async work
  const chosenTitle = selectedFuture.title;
  selectedFuture    = null;

  // Send to Google Sheets (fire and forget)
  const params = new URLSearchParams({
    selectedFuture:   chosenTitle,
    aiGrowth:         aiValues['aiGrowth']         || 0,
    aiCollapse:       aiValues['aiCollapse']       || 0,
    aiConstraint:     aiValues['aiConstraint']     || 0,
    aiTransformation: aiValues['aiTransformation'] || 0,
  });
  fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, { mode: 'no-cors' }).catch(() => {});

  const overlay   = document.getElementById('active-overlay');
  const overlayBg = document.getElementById('overlay-bg');

  // — Phase 1: black overlay fades in over everything —
  const blackEl = document.createElement('div');
  blackEl.style.cssText = `
    position: fixed;
    inset: 0;
    background: #000;
    z-index: 200;
    opacity: 0;
    transition: opacity 1.2s ease;
  `;
  document.body.appendChild(blackEl);

  blackEl.getBoundingClientRect(); // force reflow
  blackEl.style.opacity = '1';

  await delay(1300);

  // — Phase 2: swap to completed state while black —
  overlay.classList.add('hidden');
  overlay.style.opacity      = '';
  overlay.style.transition   = '';
  overlayBg.style.opacity    = '';
  overlayBg.style.transition = '';
  document.documentElement.style.backgroundColor = '';
  document.body.style.overflow = '';

  document.getElementById('form-page-1').classList.add('hidden');
  document.getElementById('form-page-2').classList.add('hidden');
  document.getElementById('title-section').classList.add('hidden');
  document.getElementById('state-not-started').classList.add('hidden');
  document.getElementById('state-completed').classList.remove('hidden');

  await delay(200);

  // — Phase 3: black overlay fades out, revealing completed state —
  blackEl.style.opacity = '0';
  fetchSummary(chosenTitle);

  await delay(1300);
  blackEl.remove();
}

// ─── FETCH SUMMARY ───────────────────────────────────────────────────────────

async function fetchSummary(chosenFuture) {
  const headlineEl = document.getElementById('completed-headline');

  const COMMON_TEXT    = "You're reading the same signals as many others. There's something in the air.";
  const VISIONARY_TEXT = "You're seeing something others aren't. That's worth paying attention to.";
  const FALLBACK_TEXT  = "Well, that's an interesting perspective.";

  try {
    const res = await Promise.race([
      fetch(APPS_SCRIPT_URL),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 12000))
    ]);

    const data = await res.json();

    if (data.status === 'success' && data.total >= 1) {
      const chosenCount = data.counts[chosenFuture] || 0;
      const pct         = chosenCount / data.total;
      headlineEl.textContent = pct >= 0.4 ? COMMON_TEXT : VISIONARY_TEXT;
    } else {
      headlineEl.textContent = FALLBACK_TEXT;
    }
  } catch (err) {
    headlineEl.textContent = FALLBACK_TEXT;
  }

  headlineEl.classList.add('visible');
}

// ─── UTILITY ─────────────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function renderDesc(text) {
  return text.split('\n\n').map(p => `<p>${p}</p>`).join('');
}

function showPopup(id) {
  const popup = document.getElementById(id);
  popup.classList.remove('hidden');
  document.getElementById('active-overlay').scrollTop = 0;
}

function hidePopup(id) {
  const popup   = document.getElementById(id);
  const content = popup.querySelector('.popup-content');
  content.classList.remove('visible');
  popup.classList.add('hidden');
}

// ─── START ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
