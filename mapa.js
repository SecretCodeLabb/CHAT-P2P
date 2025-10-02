/* ========= Configuración de hotspots =========
 * x,y en PORCENTAJE respecto al contenedor .map (0–100)
 */
const HOTSPOTS = [
  {
    id: 'parque_principal',
    titulo: 'Parque Principal',
    x: 35, y: 42,
    proyectoUrl: 'talleres.html#parque',
    video: 'media/videos/parque_clip.mp4',  // o null
    fotos: [
      'media/fotos/parque_01.jpg',
      'media/fotos/parque_02.jpg',
      'media/fotos/parque_03.jpg'
    ],
    texto: 'Taller de collage y fanzine con realidad aumentada. 25 asistentes, 3 líderes culturales invitados.'
  },
  {
    id: 'biblioteca_veredal',
    titulo: 'Biblioteca',
    x: 68, y: 58,
    proyectoUrl: 'talleres.html#biblioteca',
    video: null,
    fotos: [
      'media/fotos/biblio_01.jpg',
      'media/fotos/biblio_02.jpg'
    ],
    texto: 'Laboratorio de videomapping: captura de texturas del entorno y composición sonora con MIDI.'
  },
  {
    id: 'casa_cultura',
    titulo: 'Casa de la Cultura',
    x: 55, y: 24,
    proyectoUrl: 'talleres.html#cultura',
    video: 'talleres imagenes/DSC_0599.MOV',
    fotos: [],
    texto: 'Juguete custom con reencauche: reparación creativa y narrativa de objetos afectivos.'
  }
];

/* ========= Render del mapa ========= */
const map = document.getElementById('mapa');
const bg = document.getElementById('mapaBg');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const btnProyecto = document.getElementById('btnProyecto');

const tabVideo = document.getElementById('tabVideo');
const tabFotos = document.getElementById('tabFotos');
const tabTexto = document.getElementById('tabTexto');

const panelVideo = document.getElementById('panelVideo');
const panelFotos = document.getElementById('panelFotos');
const panelTexto = document.getElementById('panelTexto');

// Fondo del mapa desde data-attribute
(function initBackground(){
  const url = map.getAttribute('data-bg');
  if(url) bg.style.backgroundImage = `url('${url}')`;
})();

// Crea un hotspot
function createHotspot(h){
  const wrap = document.createElement('div');
  wrap.className = 'hotspot';
  wrap.style.left = h.x + '%';
  wrap.style.top  = h.y + '%';

  const btn = document.createElement('button');
  btn.className = 'hotspot__btn';
  btn.type = 'button';
  btn.innerHTML = `<span class="hotspot__dot"></span> ${h.titulo}`;
  btn.addEventListener('click', () => openModal(h));

  wrap.appendChild(btn);
  map.appendChild(wrap);
}

// Render inicial
HOTSPOTS.forEach(createHotspot);

/* ========= Modal ========= */
function openModal(h){
  modalTitle.textContent = h.titulo;
  btnProyecto.href = h.proyectoUrl || '#';

  // VIDEO
  panelVideo.innerHTML = '';
  if(h.video){
    const vw = document.createElement('div');
    vw.className = 'video-wrap';
    const v = document.createElement('video');
    v.src = h.video; v.controls = true; v.playsInline = true; v.preload = 'none';
    vw.appendChild(v); panelVideo.appendChild(vw);
    tabVideo.disabled = false;
  } else {
    panelVideo.innerHTML = '<p style="color:#666">Sin video para este lugar.</p>';
    tabVideo.disabled = true;
  }

  // FOTOS (carrusel simple)
  panelFotos.innerHTML = '';
  if(h.fotos && h.fotos.length){
    const car = document.createElement('div');
    car.className = 'carousel';
    const btnL = document.createElement('button'); btnL.className = 'carousel__btn'; btnL.textContent = '‹';
    const btnR = document.createElement('button'); btnR.className = 'carousel__btn'; btnR.textContent = '›';
    const track = document.createElement('div'); track.className = 'carousel__track';

    h.fotos.forEach(src=>{
      const img = document.createElement('img');
      img.className = 'carousel__img'; img.loading = 'lazy'; img.src = src; img.alt = h.titulo;
      track.appendChild(img);
    });

    btnL.addEventListener('click', ()=> track.scrollBy({left:-320, behavior:'smooth'}));
    btnR.addEventListener('click', ()=> track.scrollBy({left: 320, behavior:'smooth'}));

    car.append(btnL, track, btnR);
    panelFotos.appendChild(car);
    tabFotos.disabled = false;
  } else {
    panelFotos.innerHTML = '<p style="color:#666">Sin fotos por ahora.</p>';
    tabFotos.disabled = true;
  }

  // TEXTO
  panelTexto.innerHTML = `<p>${h.texto || 'Sin descripción.'}</p>`;

  // Abre modal y activa tab inicial
  modal.showModal();
  selectTab(h.video ? 'video' : (h.fotos?.length ? 'fotos' : 'texto'));
  // enfoque
  setTimeout(()=>modalClose.focus(), 0);
}

function closeModal(){
  // Pausar cualquier video
  modal.querySelectorAll('video').forEach(v=> v.pause());
  modal.close();
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.open) closeModal(); });

/* ========= Tabs ========= */
function selectTab(kind){
  const mapTab = {video: tabVideo, fotos: tabFotos, texto: tabTexto};
  const mapPanel = {video: panelVideo, fotos: panelFotos, texto: panelTexto};

  Object.entries(mapTab).forEach(([k, btn])=>{
    const selected = (k === kind);
    btn.setAttribute('aria-selected', selected ? 'true':'false');
  });
  Object.entries(mapPanel).forEach(([k, panel])=>{
    panel.setAttribute('aria-hidden', (k === kind) ? 'false':'true');
  });
}
tabVideo.addEventListener('click', ()=> selectTab('video'));
tabFotos.addEventListener('click', ()=> selectTab('fotos'));
tabTexto.addEventListener('click', ()=> selectTab('texto'));
