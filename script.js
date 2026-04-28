// ─── Config ───────────────────────────────────────────────────────────────
// Replace with your deployed Google Apps Script web app URL
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// ─── State ────────────────────────────────────────────────────────────────
const formData = {
  selectedFuture:      null,
  selectedFutureLabel: '',
  signals:             '',
  aiGrowth:            25,
  aiCollapse:          25,
  aiTransformation:    25,
  aiConstraint:        25,
  questionCategory:    '',
  dynamicQuestion:     '',
  reflection:          '',
  additionalInfo:      ''
};

let sliderValues = [25, 25, 25, 25];

// ─── Content: SSP deep dives ──────────────────────────────────────────────
const modalContent = {
  ssp1: {
    title:    'SSP1: Sustainability',
    subtitle: 'Taking the Green Road',
    body: `
      <p>[Placeholder: In this future, the world shifts toward sustainable development. Societies globally prioritise environmental stewardship alongside human well-being. Inequalities reduce. Consumption patterns shift towards lower resource intensity.]</p>
      <p>[Placeholder: Fossil fuels are phased out rapidly. Education, healthcare, and living standards improve across the board. International cooperation is strong — global institutions hold and function.]</p>
      <p>[Placeholder: Climate impacts, while still present due to historical emissions, are managed through both ambitious mitigation and proactive adaptation. This pathway requires significant global political will but represents a hopeful and coherent trajectory.]</p>
      <div class="modal-meta">
        <span><strong>Climate impact:</strong> Low</span>
        <span><strong>Cooperation:</strong> High</span>
        <span><strong>Emissions:</strong> Rapidly declining</span>
      </div>
    `
  },
  ssp2: {
    title:    'SSP2: Middle of the Road',
    subtitle: 'A World of Gradual Progress',
    body: `
      <p>[Placeholder: In this future, social, economic, and technological trends do not shift markedly from historical patterns. Development and income growth proceed unevenly. Some countries make progress on sustainability; others lag behind.]</p>
      <p>[Placeholder: Global emissions follow a moderate path — not the catastrophic worst case, but far from the ambitious best. Environmental policies improve slowly. Technology advances, but deployment is uneven.]</p>
      <p>[Placeholder: Climate impacts grow and are partially managed. This is often called the 'business as usual' pathway — a continuation of current trends without major transformation in either direction.]</p>
      <div class="modal-meta">
        <span><strong>Climate impact:</strong> Medium</span>
        <span><strong>Cooperation:</strong> Moderate</span>
        <span><strong>Emissions:</strong> Slowly declining</span>
      </div>
    `
  },
  ssp3: {
    title:    'SSP3: Regional Rivalry',
    subtitle: 'A Rocky Road',
    body: `
      <p>[Placeholder: In this future, resurgent nationalism and regional conflicts push countries inward. Global trade declines. Investment in education and technology slows. Governments focus on domestic security and food production at the expense of environmental goals.]</p>
      <p>[Placeholder: Development is slow and deeply unequal. Fossil fuel use continues strongly in many regions. Climate policies are weak or non-existent. Emissions remain high.]</p>
      <p>[Placeholder: Climate impacts are severe and unevenly distributed. Vulnerable regions face extreme consequences with little international support. Adaptation becomes the primary — and often insufficient — strategy.]</p>
      <div class="modal-meta">
        <span><strong>Climate impact:</strong> High</span>
        <span><strong>Cooperation:</strong> Low</span>
        <span><strong>Emissions:</strong> Persistently high</span>
      </div>
    `
  },
  ssp4: {
    title:    'SSP4: Inequality',
    subtitle: 'A Road Divided',
    body: `
      <p>[Placeholder: In this future, power becomes increasingly concentrated in the hands of a global elite. A well-educated, internationally connected minority drives rapid technological development and benefits from low-emissions energy systems.]</p>
      <p>[Placeholder: Large populations — particularly in the global south — remain dependent on fossil fuels, low-skilled labour, and poorly governed states. International cooperation exists but primarily serves powerful interests.]</p>
      <p>[Placeholder: Climate impacts diverge sharply. Wealthy regions invest in adaptation and survive. Poorer regions face compounding crises with minimal resources to respond. This is a world of islands in a rising tide.]</p>
      <div class="modal-meta">
        <span><strong>Climate impact:</strong> Mixed</span>
        <span><strong>Cooperation:</strong> Stratified</span>
        <span><strong>Emissions:</strong> Uneven</span>
      </div>
    `
  },
  ssp5: {
    title:    'SSP5: Fossil-fueled Development',
    subtitle: 'Taking the Highway',
    body: `
      <p>[Placeholder: In this future, the world bets everything on technological solutions and economic growth. Fossil fuel development accelerates massively. Energy is abundant and cheap. GDP grows strongly across much of the world.]</p>
      <p>[Placeholder: Human development improves in many ways — health, income, education — but at the cost of extreme carbon emissions. The assumption is that future technology (carbon capture, geoengineering) will manage the consequences.]</p>
      <p>[Placeholder: Climate impacts are the most severe of any pathway. Temperatures rise significantly. The gamble on future technology is a high-stakes bet that may not pay off. This is the highway — fast, powerful, and with no clear off-ramp.]</p>
      <div class="modal-meta">
        <span><strong>Climate impact:</strong> Very high</span>
        <span><strong>Cooperation:</strong> Moderate</span>
        <span><strong>Emissions:</strong> Very high</span>
      </div>
    `
  }
};

const futureLabels = {
  ssp1: 'SSP1: Sustainability',
  ssp2: 'SSP2: Middle of the Road',
  ssp3: 'SSP3: Regional Rivalry',
  ssp4: 'SSP4: Inequality',
  ssp5: 'SSP5: Fossil-fueled Development'
};

const aiScenarioLabels = ['AI Growth', 'AI Collapse', 'AI Transformation', 'AI Constraint'];

// ─── Navigation ───────────────────────────────────────────────────────────
function goToPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + n).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });

  const nav = document.getElementById('progress-nav');
  if (n <= 4) {
    nav.style.display = 'block';
    document.querySelectorAll('.progress-step').forEach((el, i) => {
      el.classList.toggle('active', i + 1 === n);
    });
  } else {
    nav.style.display = 'none';
  }
}

function goNext(fromPage) {
  if (fromPage === 1) {
    if (!formData.selectedFuture) return;
    const ctx = document.getElementById('page2-context');
    ctx.textContent = 'You chose: ' + formData.selectedFutureLabel;
    goToPage(2);

  } else if (fromPage === 2) {
    formData.signals = document.getElementById('signals-input').value.trim();
    goToPage(3);

  } else if (fromPage === 3) {
    formData.aiGrowth        = sliderValues[0];
    formData.aiCollapse      = sliderValues[1];
    formData.aiTransformation = sliderValues[2];
    formData.aiConstraint    = sliderValues[3];
    setPage4Question();
    goToPage(4);

  } else if (fromPage === 4) {
    formData.reflection = document.getElementById('reflection-input').value.trim();
    populateReview();
    goToPage(5);

  } else if (fromPage === 5) {
    goToPage(6);
  }
}

function goBack(fromPage) {
  goToPage(fromPage - 1);
}

// ─── Page 1: Future selection ─────────────────────────────────────────────
function handleCardClick(id) {
  document.querySelectorAll('.future-card').forEach(c => c.classList.remove('selected'));
  document.querySelector('[data-id="' + id + '"]').classList.add('selected');

  formData.selectedFuture      = id;
  formData.selectedFutureLabel = futureLabels[id];

  document.getElementById('btn-next-1').disabled = false;
  document.getElementById('hint-1').textContent  = 'You\'ve selected ' + futureLabels[id] + '. Click Next when ready.';

  openModal(id);
}

// ─── Modal ────────────────────────────────────────────────────────────────
function openModal(id) {
  const c = modalContent[id];
  document.getElementById('modal-body').innerHTML =
    '<h2>' + c.title + '</h2>' +
    '<p class="modal-subtitle">' + c.subtitle + '</p>' +
    c.body;

  const note = document.getElementById('modal-selected-note');
  note.textContent = (formData.selectedFuture === id)
    ? '✓ You have selected this future'
    : '';

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// ─── Page 3: Sliders ──────────────────────────────────────────────────────
function updateSliders(changedIndex, rawVal) {
  const newVal       = parseInt(rawVal, 10);
  const remaining    = 100 - newVal;
  const others       = [0, 1, 2, 3].filter(i => i !== changedIndex);
  const currentOtherSum = others.reduce((sum, i) => sum + sliderValues[i], 0);

  if (currentOtherSum === 0) {
    // All other sliders at 0 — distribute remaining equally
    const base  = Math.floor(remaining / 3);
    const extra = remaining - base * 3;
    others.forEach((i, idx) => {
      sliderValues[i] = base + (idx === 0 ? extra : 0);
    });
  } else {
    // Distribute proportionally, last one absorbs rounding
    let assigned = 0;
    others.forEach((i, idx) => {
      if (idx === others.length - 1) {
        sliderValues[i] = Math.max(0, remaining - assigned);
      } else {
        const val = Math.round(remaining * (sliderValues[i] / currentOtherSum));
        sliderValues[i] = val;
        assigned += val;
      }
    });
  }

  sliderValues[changedIndex] = newVal;

  // Verify total is exactly 100 and correct rounding drift if needed
  const total = sliderValues.reduce((a, b) => a + b, 0);
  if (total !== 100) {
    const drift = 100 - total;
    // Apply drift to the non-changed slider with the highest value
    const target = others.reduce((best, i) =>
      sliderValues[i] > sliderValues[best] ? i : best, others[0]);
    sliderValues[target] = Math.max(0, sliderValues[target] + drift);
  }

  // Sync all slider UI
  [0, 1, 2, 3].forEach(i => {
    document.getElementById('slider-' + i).value        = sliderValues[i];
    document.getElementById('val-' + i).textContent     = sliderValues[i] + '%';
  });

  const finalTotal = sliderValues.reduce((a, b) => a + b, 0);
  document.getElementById('total-val').textContent = finalTotal;
  document.getElementById('total-bar').classList.toggle('over', finalTotal !== 100);
}

// ─── Page 4: Dynamic question ─────────────────────────────────────────────
function setPage4Question() {
  const vals   = sliderValues.slice();
  const sorted = vals
    .map((v, i) => ({ v, i }))
    .sort((a, b) => b.v - a.v);

  const spread = sorted[0].v - sorted[sorted.length - 1].v;
  const future = formData.selectedFutureLabel;

  let category, question;

  if (spread <= 10) {
    // All four scenarios within 10% of each other
    category = 'equal';
    question = 'You predict that all of these futures are equally possible. What could accelerate change towards the future you prefer?';

  } else if (sorted[0].v > 55) {
    // One clear winner above 55%
    category = 'winner';
    const winnerLabel = aiScenarioLabels[sorted[0].i];
    question = 'You predict that <em>' + future + ' + ' + winnerLabel + '</em> is most likely. What do you think could accelerate or reverse this future direction?';

  } else if (
    Math.abs(sorted[0].v - sorted[1].v) <= 10 &&
    sorted[0].v > 35 &&
    sorted[1].v > 35
  ) {
    // Two-way tie: top two within 10%, both above 35%
    category = 'tie';
    const label1 = aiScenarioLabels[sorted[0].i];
    const label2 = aiScenarioLabels[sorted[1].i];
    question = 'You predict that <em>' + future + ' + ' + label1 + '</em> or <em>' + label2 + '</em> are equally possible. What do you think could accelerate towards the future you prefer?';

  } else {
    // Default: treat highest as the prediction
    category = 'winner';
    const winnerLabel = aiScenarioLabels[sorted[0].i];
    question = 'You predict that <em>' + future + ' + ' + winnerLabel + '</em> is most likely. What do you think could accelerate or reverse this future direction?';
  }

  formData.questionCategory = category;
  formData.dynamicQuestion  = question;

  document.getElementById('page4-question').innerHTML = question;
}

// ─── Page 5: Review ───────────────────────────────────────────────────────
function populateReview() {
  document.getElementById('review-future').textContent         = formData.selectedFutureLabel || '—';
  document.getElementById('review-signals').textContent        = formData.signals    || '(no response)';
  document.getElementById('review-growth').textContent         = sliderValues[0] + '%';
  document.getElementById('review-collapse').textContent       = sliderValues[1] + '%';
  document.getElementById('review-transformation').textContent = sliderValues[2] + '%';
  document.getElementById('review-constraint').textContent     = sliderValues[3] + '%';
  document.getElementById('review-reflection').textContent     = formData.reflection || '(no response)';
}

// ─── Page 6 & 7: Submit ───────────────────────────────────────────────────
function submitForm(includeOptional) {
  if (includeOptional) {
    formData.additionalInfo = document.getElementById('optional-input').value.trim();
  } else {
    formData.additionalInfo = '';
  }

  const payload = {
    selectedFuture:   formData.selectedFutureLabel,
    signals:          formData.signals,
    aiGrowth:         sliderValues[0],
    aiCollapse:       sliderValues[1],
    aiTransformation: sliderValues[2],
    aiConstraint:     sliderValues[3],
    questionCategory: formData.questionCategory,
    reflection:       formData.reflection,
    additionalInfo:   formData.additionalInfo
  };

  // Send to Google Sheets. mode: 'no-cors' means we can't read the response
  // but the data goes through. We navigate to thank you regardless.
  const params = new URLSearchParams();
  params.append('data', JSON.stringify(payload));

  if (SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    fetch(SCRIPT_URL, {
      method: 'POST',
      mode:   'no-cors',
      body:   params
    }).catch(function() {
      // Silent fail — still show thank you page
    });
  }

  goToPage(7);
}
