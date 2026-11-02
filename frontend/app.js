/* Greeting Card Studio - Main Application */
const App = (function () {
  const D = window.GCS_DATA;
  let state = {
    page: 'home',
    design: null,
    selectedId: null,
    zoom: 0.45,
    history: [],
    historyIndex: -1,
    theme: localStorage.getItem('gcs_theme') || 'light',
    activeCategory: '',
  };

  function uid(p = 'el') {
    return p + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
  }

  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById('page-' + name);
    if (page) page.classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.page === name);
    });
    state.page = name;
    document.getElementById('navLinks')?.classList.remove('open');
    if (name === 'designs') renderDesigns();
    if (name === 'create' && !state.design) initEditor();
  }

  function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('open');
  }

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    document.getElementById('themeToggle').textContent = state.theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('gcs_theme', state.theme);
  }

  /* ---------- Home / Occasions / Templates ---------- */
  function renderHome() {
    const catEl = document.getElementById('homeCategories');
    catEl.innerHTML = D.OCCASION_CATEGORIES.map(c => `
      <div class="cat-card" onclick="App.filterByCategory('${c.id}')">
        <div class="icon">${c.icon}</div>
        <div>${c.name}</div>
      </div>`).join('');

    const tplEl = document.getElementById('homeTemplates');
    tplEl.innerHTML = D.TEMPLATES.slice(0, 8).map(t => templateCardHTML(t)).join('');
  }

  function templateCardHTML(t) {
    return `<div class="tpl-card" onclick="App.useTemplate('${t.id}')">
      <div class="tpl-preview" style="background:${t.background}">${t.name}</div>
      <div><strong>${t.name}</strong></div>
      <div class="muted" style="font-size:0.8rem">${t.style} · ${t.occasionId}</div>
    </div>`;
  }

  function renderOccasions() {
    const filters = document.getElementById('occasionFilters');
    filters.innerHTML = `<button class="chip ${!state.activeCategory ? 'active' : ''}" onclick="App.filterByCategory('')">All</button>` +
      D.OCCASION_CATEGORIES.map(c =>
        `<button class="chip ${state.activeCategory === c.id ? 'active' : ''}" onclick="App.filterByCategory('${c.id}')">${c.icon} ${c.name}</button>`
      ).join('');

    filterOccasions();
  }

  function filterByCategory(catId) {
    state.activeCategory = catId;
    showPage('occasions');
    renderOccasions();
  }

  function filterOccasions() {
    const q = (document.getElementById('occasionSearch')?.value || '').toLowerCase();
    let list = D.OCCASIONS;
    if (state.activeCategory) list = list.filter(o => o.category === state.activeCategory);
    if (q) list = list.filter(o => o.name.toLowerCase().includes(q) || o.id.includes(q));
    const grid = document.getElementById('occasionGrid');
    grid.innerHTML = list.map(o => `
      <div class="occ-card" onclick="App.selectOccasion('${o.id}')">
        <div class="icon">${o.icon}</div>
        <div>${o.name}</div>
      </div>`).join('') || '<p class="empty-state">No occasions found</p>';
  }

  function renderTemplates() {
    const sel = document.getElementById('templateOccasionFilter');
    if (sel.options.length <= 1) {
      D.OCCASIONS.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.id; opt.textContent = o.name;
        sel.appendChild(opt);
      });
    }
    filterTemplates();
  }

  function filterTemplates() {
    const q = (document.getElementById('templateSearch')?.value || '').toLowerCase();
    const occ = document.getElementById('templateOccasionFilter')?.value || '';
    const style = document.getElementById('templateStyleFilter')?.value || '';
    let list = D.TEMPLATES;
    if (occ) list = list.filter(t => t.occasionId === occ || t.occasionId === 'custom');
    if (style) list = list.filter(t => t.style === style);
    if (q) list = list.filter(t => t.name.toLowerCase().includes(q) || t.style.includes(q));
    document.getElementById('templateGrid').innerHTML =
      list.map(t => templateCardHTML(t)).join('') || '<p class="empty-state">No templates found</p>';
  }

  /* ---------- Editor ---------- */
  function initEditor() {
    const occSel = document.getElementById('selOccasion');
    occSel.innerHTML = D.OCCASIONS.map(o => `<option value="${o.id}">${o.icon} ${o.name}</option>`).join('');
    const fmtSel = document.getElementById('selFormat');
    fmtSel.innerHTML = Object.entries(D.CARD_FORMATS).map(([k, v]) =>
      `<option value="${k}">${v.name}</option>`).join('');
    document.getElementById('stickerGrid').innerHTML = D.STICKERS.map(s =>
      `<button type="button" onclick="App.addSticker('${s}')">${s}</button>`).join('');
    document.getElementById('bgPresets').innerHTML = D.BG_PRESETS.map(b =>
      `<div class="bg-swatch" style="background:${b.value}" title="${b.name}" onclick="App.setBackground('${b.value.replace(/'/g, "\\'")}')"></div>`
    ).join('');

    if (!state.design) {
      const fmt = D.CARD_FORMATS.portrait;
      state.design = createDesign('birthday', fmt.width, fmt.height, 'portrait');
    }
    pushHistory();
    renderCanvas();
    updateMiniTemplates();
  }

  function createDesign(occasionId, w, h, format) {
    return {
      id: uid('design'),
      name: 'Untitled Card',
      occasionId,
      format,
      width: w,
      height: h,
      background: '#FFFFFF',
      elements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  function startCreate() {
    showPage('create');
    if (!state.design) initEditor();
  }

  function selectOccasion(id) {
    showPage('create');
    if (!state.design) initEditor();
    document.getElementById('selOccasion').value = id;
    state.design.occasionId = id;
    updateMiniTemplates();
    toast('Occasion selected: ' + (D.OCCASIONS.find(o => o.id === id)?.name || id));
  }

  function useTemplate(tplId) {
    const tpl = D.TEMPLATES.find(t => t.id === tplId);
    if (!tpl) return;
    showPage('create');
    if (!state.design) initEditor();
    state.design.occasionId = tpl.occasionId;
    state.design.width = tpl.width;
    state.design.height = tpl.height;
    state.design.background = tpl.background;
    state.design.elements = tpl.elements.map(e => ({
      id: uid(),
      type: e.type || 'text',
      content: e.content || '',
      x: e.x || 100,
      y: e.y || 100,
      width: e.width || 400,
      height: e.height || 60,
      rotation: 0,
      opacity: e.opacity ?? 1,
      fontFamily: e.fontFamily || 'Arial',
      fontSize: e.fontSize || 32,
      fontWeight: e.fontWeight || 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      fill: e.fill || '#333333',
      textAlign: e.textAlign || 'center',
      zIndex: 1,
    }));
    document.getElementById('selOccasion').value = tpl.occasionId;
    // pick matching format
    const fmtKey = Object.keys(D.CARD_FORMATS).find(k =>
      D.CARD_FORMATS[k].width === tpl.width && D.CARD_FORMATS[k].height === tpl.height) || 'portrait';
    document.getElementById('selFormat').value = fmtKey;
    state.design.format = fmtKey;
    pushHistory();
    renderCanvas();
    updateMiniTemplates();
    toast('Template loaded: ' + tpl.name);
  }

  function startBlank() {
    const fmt = D.CARD_FORMATS[document.getElementById('selFormat').value] || D.CARD_FORMATS.portrait;
    state.design = createDesign(document.getElementById('selOccasion').value, fmt.width, fmt.height, document.getElementById('selFormat').value);
    pushHistory();
    renderCanvas();
    toast('Blank canvas ready');
  }

  function onOccasionChange() {
    state.design.occasionId = document.getElementById('selOccasion').value;
    updateMiniTemplates();
  }

  function onFormatChange() {
    const key = document.getElementById('selFormat').value;
    const fmt = D.CARD_FORMATS[key];
    if (!fmt || !state.design) return;
    state.design.width = fmt.width;
    state.design.height = fmt.height;
    state.design.format = key;
    pushHistory();
    renderCanvas();
  }

  function updateMiniTemplates() {
    const occ = state.design?.occasionId || 'birthday';
    const list = D.TEMPLATES.filter(t => t.occasionId === occ || t.occasionId === 'custom');
    document.getElementById('miniTemplates').innerHTML = list.map(t =>
      `<div class="mini-tpl" onclick="App.useTemplate('${t.id}')">${t.name} <span class="muted">(${t.style})</span></div>`
    ).join('') || '<p class="muted">No templates for this occasion</p>';
  }

  function switchTab(tab) {
    document.querySelectorAll('.sidebar-tabs .tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + tab));
  }

  /* Canvas rendering & interaction */
  function renderCanvas() {
    const canvas = document.getElementById('cardCanvas');
    if (!canvas || !state.design) return;
    const d = state.design;
    canvas.style.width = d.width + 'px';
    canvas.style.height = d.height + 'px';
    canvas.style.background = d.background;
    canvas.style.transform = `scale(${state.zoom})`;
    document.getElementById('zoomLabel').textContent = Math.round(state.zoom * 100) + '%';

    // sort by zIndex
    const els = [...d.elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    canvas.innerHTML = '';
    els.forEach(el => {
      const div = document.createElement('div');
      div.className = 'card-el ' + el.type + '-el' + (el.id === state.selectedId ? ' selected' : '');
      if (el.type === 'shape' && el.shapeType === 'circle') div.classList.add('circle');
      div.dataset.id = el.id;
      div.style.left = el.x + 'px';
      div.style.top = el.y + 'px';
      div.style.width = (el.width || 100) + 'px';
      div.style.height = (el.height || 40) + 'px';
      div.style.opacity = el.opacity ?? 1;
      div.style.transform = `rotate(${el.rotation || 0}deg)`;
      div.style.zIndex = el.zIndex || 1;

      if (el.type === 'text') {
        div.classList.add('text-el');
        div.contentEditable = el.id === state.selectedId;
        div.style.fontFamily = el.fontFamily || 'Arial';
        div.style.fontSize = (el.fontSize || 32) + 'px';
        div.style.fontWeight = el.fontWeight || 'normal';
        div.style.fontStyle = el.fontStyle || 'normal';
        div.style.textDecoration = el.textDecoration || 'none';
        div.style.color = el.fill || '#333';
        div.style.textAlign = el.textAlign || 'center';
        div.textContent = el.content || '';
        div.addEventListener('blur', () => {
          el.content = div.textContent;
          pushHistory();
        });
        div.addEventListener('input', () => { el.content = div.textContent; });
      } else if (el.type === 'image') {
        div.classList.add('img-el');
        const img = document.createElement('img');
        img.src = el.content;
        img.draggable = false;
        div.appendChild(img);
      } else if (el.type === 'sticker') {
        div.classList.add('sticker-el');
        div.style.fontSize = Math.min(el.width, el.height) * 0.85 + 'px';
        div.textContent = el.content;
      } else if (el.type === 'shape') {
        div.classList.add('shape-el');
        if (el.fill) div.style.background = el.fill;
      }

      // drag
      div.addEventListener('mousedown', (e) => startDrag(e, el, div));
      div.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement(el.id);
      });
      canvas.appendChild(div);
    });

    canvas.onclick = () => selectElement(null);
  }

  function selectElement(id) {
    state.selectedId = id;
    renderCanvas();
    updatePropsPanel();
  }

  function updatePropsPanel() {
    const el = state.design?.elements.find(e => e.id === state.selectedId);
    const content = document.getElementById('propsContent');
    if (!el) {
      content.innerHTML = '<p class="muted">Select an element on the card to edit its properties.</p>';
      return;
    }
    content.innerHTML = `<p><strong>${el.type}</strong></p>
      <label>X</label><input type="number" value="${Math.round(el.x)}" onchange="App.updateSelectedProp('x', +this.value)" />
      <label>Y</label><input type="number" value="${Math.round(el.y)}" onchange="App.updateSelectedProp('y', +this.value)" />
      <label>Width</label><input type="number" value="${Math.round(el.width)}" onchange="App.updateSelectedProp('width', +this.value)" />
      <label>Height</label><input type="number" value="${Math.round(el.height)}" onchange="App.updateSelectedProp('height', +this.value)" />`;
    if (el.type === 'text') {
      document.getElementById('propFont').value = el.fontFamily || 'Arial';
      document.getElementById('propFontSize').value = el.fontSize || 32;
      document.getElementById('fontSizeVal').textContent = el.fontSize || 32;
      document.getElementById('propColor').value = el.fill || '#333333';
    }
    document.getElementById('propOpacity').value = Math.round((el.opacity ?? 1) * 100);
    document.getElementById('opacityVal').textContent = Math.round((el.opacity ?? 1) * 100);
    document.getElementById('propRotation').value = el.rotation || 0;
    document.getElementById('rotVal').textContent = el.rotation || 0;
  }

  let dragState = null;
  function startDrag(e, el, div) {
    if (e.target.contentEditable === 'true' && e.target === div) return; // allow text editing
    e.preventDefault();
    selectElement(el.id);
    const scale = state.zoom;
    dragState = {
      el,
      startX: e.clientX,
      startY: e.clientY,
      origX: el.x,
      origY: el.y,
      scale,
    };
    const onMove = (ev) => {
      if (!dragState) return;
      const dx = (ev.clientX - dragState.startX) / dragState.scale;
      const dy = (ev.clientY - dragState.startY) / dragState.scale;
      dragState.el.x = dragState.origX + dx;
      dragState.el.y = dragState.origY + dy;
      div.style.left = dragState.el.x + 'px';
      div.style.top = dragState.el.y + 'px';
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      if (dragState) { pushHistory(); dragState = null; }
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  function updateSelectedProp(key, value) {
    const el = state.design?.elements.find(e => e.id === state.selectedId);
    if (!el) return;
    el[key] = value;
    renderCanvas();
  }

  function toggleStyle(prop, value) {
    const el = state.design?.elements.find(e => e.id === state.selectedId);
    if (!el || el.type !== 'text') return;
    el[prop] = el[prop] === value ? (prop === 'fontWeight' ? 'normal' : 'none') : value;
    if (prop === 'fontStyle' && value === 'italic') el.fontStyle = el.fontStyle === 'italic' ? 'normal' : 'italic';
    renderCanvas();
    pushHistory();
  }

  function addText() {
    if (!state.design) return;
    const el = {
      id: uid(), type: 'text', content: 'Double-click to edit',
      x: state.design.width / 2 - 150, y: state.design.height / 2 - 20,
      width: 300, height: 50, rotation: 0, opacity: 1,
      fontFamily: 'Arial', fontSize: 32, fontWeight: 'normal', fontStyle: 'normal',
      textDecoration: 'none', fill: '#333333', textAlign: 'center', zIndex: (state.design.elements.length + 1),
    };
    state.design.elements.push(el);
    state.selectedId = el.id;
    pushHistory();
    renderCanvas();
  }

  function addSticker(emoji) {
    if (!state.design) return;
    const el = {
      id: uid(), type: 'sticker', content: emoji,
      x: state.design.width / 2 - 40, y: state.design.height / 2 - 40,
      width: 80, height: 80, rotation: 0, opacity: 1, zIndex: state.design.elements.length + 1,
    };
    state.design.elements.push(el);
    state.selectedId = el.id;
    pushHistory();
    renderCanvas();
  }

  function addShape(kind) {
    if (!state.design) return;
    const el = {
      id: uid(), type: 'shape', shapeType: kind, content: '',
      x: state.design.width / 2 - 60, y: state.design.height / 2 - 40,
      width: 120, height: kind === 'circle' ? 120 : 80, rotation: 0, opacity: 0.6,
      fill: 'rgba(91,76,196,0.35)', zIndex: state.design.elements.length + 1,
    };
    state.design.elements.push(el);
    state.selectedId = el.id;
    pushHistory();
    renderCanvas();
  }

  function addPhoto(event) {
    const file = event.target.files?.[0];
    if (!file || !state.design) return;
    if (!file.type.startsWith('image/')) { toast('Please select an image file'); return; }
    if (file.size > 8 * 1024 * 1024) { toast('Image too large (max 8MB)'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const el = {
        id: uid(), type: 'image', content: reader.result,
        x: state.design.width / 2 - 150, y: state.design.height / 2 - 150,
        width: 300, height: 300, rotation: 0, opacity: 1, zIndex: state.design.elements.length + 1,
      };
      state.design.elements.push(el);
      state.selectedId = el.id;
      pushHistory();
      renderCanvas();
      toast('Photo added');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  function setBackground(value) {
    if (!state.design) return;
    state.design.background = value;
    pushHistory();
    renderCanvas();
  }

  function setBackgroundImage(event) {
    const file = event.target.files?.[0];
    if (!file || !state.design) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.design.background = `url(${reader.result}) center/cover no-repeat`;
      pushHistory();
      renderCanvas();
      toast('Background image set');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  function deleteSelected() {
    if (!state.selectedId || !state.design) return;
    state.design.elements = state.design.elements.filter(e => e.id !== state.selectedId);
    state.selectedId = null;
    pushHistory();
    renderCanvas();
  }

  function duplicateSelected() {
    const el = state.design?.elements.find(e => e.id === state.selectedId);
    if (!el) return;
    const copy = JSON.parse(JSON.stringify(el));
    copy.id = uid();
    copy.x += 20; copy.y += 20;
    copy.zIndex = state.design.elements.length + 1;
    state.design.elements.push(copy);
    state.selectedId = copy.id;
    pushHistory();
    renderCanvas();
  }

  function bringForward() {
    const el = state.design?.elements.find(e => e.id === state.selectedId);
    if (!el) return;
    el.zIndex = (el.zIndex || 1) + 1;
    pushHistory();
    renderCanvas();
  }

  function sendBackward() {
    const el = state.design?.elements.find(e => e.id === state.selectedId);
    if (!el) return;
    el.zIndex = Math.max(0, (el.zIndex || 1) - 1);
    pushHistory();
    renderCanvas();
  }

  function zoom(delta) {
    state.zoom = Math.min(1.5, Math.max(0.15, state.zoom + delta));
    renderCanvas();
  }

  /* History */
  function pushHistory() {
    if (!state.design) return;
    const snap = JSON.parse(JSON.stringify(state.design));
    state.history = state.history.slice(0, state.historyIndex + 1);
    state.history.push(snap);
    if (state.history.length > 40) state.history.shift();
    state.historyIndex = state.history.length - 1;
  }

  function undo() {
    if (state.historyIndex <= 0) return;
    state.historyIndex--;
    state.design = JSON.parse(JSON.stringify(state.history[state.historyIndex]));
    state.selectedId = null;
    renderCanvas();
  }

  function redo() {
    if (state.historyIndex >= state.history.length - 1) return;
    state.historyIndex++;
    state.design = JSON.parse(JSON.stringify(state.history[state.historyIndex]));
    state.selectedId = null;
    renderCanvas();
  }

  /* Messages */
  function generateMessage() {
    const tone = document.getElementById('msgTone').value;
    const lang = document.getElementById('msgLang').value;
    const recipient = document.getElementById('msgRecipient').value.trim();
    const occ = state.design?.occasionId || 'birthday';
    const msg = D.generateMessage(occ, tone, lang, recipient);
    document.getElementById('msgPreview').value = msg;
  }

  function insertMessage() {
    const text = document.getElementById('msgPreview').value.trim();
    if (!text || !state.design) return;
    const el = {
      id: uid(), type: 'text', content: text,
      x: 80, y: state.design.height * 0.55,
      width: state.design.width - 160, height: 200, rotation: 0, opacity: 1,
      fontFamily: 'Arial', fontSize: 26, fontWeight: 'normal', fontStyle: 'normal',
      textDecoration: 'none', fill: '#333333', textAlign: 'center', zIndex: state.design.elements.length + 1,
    };
    state.design.elements.push(el);
    state.selectedId = el.id;
    pushHistory();
    renderCanvas();
    toast('Message inserted');
  }

  /* Save / Load */
  function saveDesign() {
    if (!state.design) return;
    const name = prompt('Design name:', state.design.name || 'My Card');
    if (name === null) return;
    state.design.name = name || 'Untitled Card';
    state.design.updatedAt = new Date().toISOString();
    const all = JSON.parse(localStorage.getItem('gcs_designs') || '[]');
    const idx = all.findIndex(d => d.id === state.design.id);
    if (idx >= 0) all[idx] = state.design;
    else all.unshift(state.design);
    localStorage.setItem('gcs_designs', JSON.stringify(all));
    toast('Design saved!');
  }

  function renderDesigns() {
    const all = JSON.parse(localStorage.getItem('gcs_designs') || '[]');
    const grid = document.getElementById('designsGrid');
    if (!all.length) {
      grid.innerHTML = '<p class="empty-state">No saved designs yet. Create your first card!</p>';
      return;
    }
    grid.innerHTML = all.map(d => `
      <div class="design-card">
        <div class="tpl-preview" style="background:${d.background}">${d.name}</div>
        <div><strong>${d.name}</strong></div>
        <div class="muted" style="font-size:0.8rem">${new Date(d.updatedAt).toLocaleDateString()}</div>
        <div class="btn-row" style="justify-content:center;margin-top:0.5rem">
          <button class="btn btn-sm btn-primary" onclick="App.loadDesign('${d.id}')">Open</button>
          <button class="btn btn-sm" onclick="App.deleteDesign('${d.id}')">Delete</button>
        </div>
      </div>`).join('');
  }

  function loadDesign(id) {
    const all = JSON.parse(localStorage.getItem('gcs_designs') || '[]');
    const d = all.find(x => x.id === id);
    if (!d) return;
    state.design = JSON.parse(JSON.stringify(d));
    state.selectedId = null;
    state.history = [];
    state.historyIndex = -1;
    pushHistory();
    showPage('create');
    initEditor();
    document.getElementById('selOccasion').value = d.occasionId;
    document.getElementById('selFormat').value = d.format || 'portrait';
    renderCanvas();
    toast('Design loaded');
  }

  function deleteDesign(id) {
    if (!confirm('Delete this design?')) return;
    let all = JSON.parse(localStorage.getItem('gcs_designs') || '[]');
    all = all.filter(d => d.id !== id);
    localStorage.setItem('gcs_designs', JSON.stringify(all));
    renderDesigns();
    toast('Deleted');
  }

  /* Export */
  function openExport() { document.getElementById('exportModal').classList.add('open'); }
  function closeExport() { document.getElementById('exportModal').classList.remove('open'); }

  async function doExport(format) {
    closeExport();
    const canvas = document.getElementById('cardCanvas');
    if (!canvas) return;
    toast('Generating export…');
    // temporarily reset scale for accurate capture
    const prevZoom = state.zoom;
    state.zoom = 1;
    renderCanvas();
    // wait a tick for layout
    await new Promise(r => setTimeout(r, 100));

    try {
      if (typeof html2canvas === 'undefined') {
        toast('Export library not loaded. Check internet for first-time CDN load.');
        state.zoom = prevZoom; renderCanvas();
        return;
      }
      const scale = format === 'pdf-print' ? 3 : 2;
      const result = await html2canvas(canvas, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      const fname = (state.design?.name || 'greeting-card').replace(/[^a-z0-9]+/gi, '-').toLowerCase();

      if (format === 'png' || format === 'jpeg') {
        const mime = format === 'png' ? 'image/png' : 'image/jpeg';
        result.toBlob(blob => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = fname + '.' + (format === 'png' ? 'png' : 'jpg');
          a.click();
          URL.revokeObjectURL(a.href);
          toast('Downloaded ' + format.toUpperCase());
        }, mime, 0.95);
      } else {
        // PDF
        const { jsPDF } = window.jspdf;
        const imgData = result.toDataURL('image/jpeg', 0.92);
        const pxToMm = 0.264583;
        const w = result.width * pxToMm / scale;
        const h = result.height * pxToMm / scale;
        const pdf = new jsPDF({ orientation: w > h ? 'l' : 'p', unit: 'mm', format: [w, h] });
        pdf.addImage(imgData, 'JPEG', 0, 0, w, h);
        pdf.save(fname + '.pdf');
        toast('PDF downloaded');
      }
    } catch (err) {
      console.error(err);
      toast('Export failed: ' + err.message);
    }
    state.zoom = prevZoom;
    renderCanvas();
  }

  /* Init */
  function init() {
    document.documentElement.setAttribute('data-theme', state.theme);
    document.getElementById('themeToggle').textContent = state.theme === 'dark' ? '☀️' : '🌙';
    renderHome();
    renderOccasions();
    renderTemplates();
  }

  return {
    showPage, toggleMobileMenu, toggleTheme, startCreate, selectOccasion, useTemplate,
    filterByCategory, filterOccasions, filterTemplates, switchTab,
    onOccasionChange, onFormatChange, startBlank,
    addText, addSticker, addShape, addPhoto, setBackground, setBackgroundImage,
    updateSelectedProp, toggleStyle, deleteSelected, duplicateSelected,
    bringForward, sendBackward, zoom, undo, redo,
    generateMessage, insertMessage, saveDesign, loadDesign, deleteDesign,
    openExport, closeExport, doExport, init,
  };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
