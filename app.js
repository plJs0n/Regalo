// Personaliza aquí los mensajes, las fotos y sus pequeños títulos.
const memories = [
  { photos: ['TuyYo.jpeg', 'YoyTu.jpeg'], captions: ['Tu sonrisa lo ilumina todo', 'Así de especial eres'], message: 'Hoy celebramos tu vida y la suerte de tenerte cerca. Que este nuevo año te encuentre rodeada de amor, de sueños cumplidos y de momentos que quieras guardar para siempre.' },
  { photos: ['Maria1.jpeg', 'Sasuke.jpeg'], captions: ['Instantes que se quedan', 'Mi parte favorita: tú'], message: 'Hay personas que hacen más bonitos los días con solo estar. Tú eres una de ellas, MARIA. Gracias por cada risa, cada historia y cada recuerdo compartido.' },
  { photos: ['Maria4.jpeg', 'Nosotros.jpeg'], captions: ['Más aventuras por vivir', 'Siempre brillando'], message: 'Deseo que nunca te falten motivos para sonreír, abrazos donde sentirte en casa y valor para ir detrás de todo lo que sueñas. Te mereces cosas muy bonitas.' },
  { photos: ['Maria2.jpeg', 'Maria5.jpeg'], captions: ['Por todo lo que viene', 'Feliz vuelta al sol ♡'], message: 'Que este sea el comienzo de un año inolvidable. Sigue siendo tú, con esa luz tan tuya. Feliz cumpleaños, MARIA. Esta pequeña sorpresa está hecha con todo mi cariño. ♡' }
];
const $ = id => document.getElementById(id);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let scene = 'welcome', page = 0, sequence = 0;
function show(id) { document.querySelectorAll('.scene').forEach(el => el.classList.toggle('active', el.id === id)); scene = id; document.body.classList.toggle('intro', id === 'intro'); window.scrollTo({top:0,behavior:'instant'}); }
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function setPhoto(img, file) { img.onerror = () => { img.onerror = null; img.src = 'assets/images/placeholder.svg'; }; img.src = 'assets/images/' + file; }
function renderAlbum() { const item = memories[page]; ['a','b'].forEach((key,i) => setPhoto($('photo-'+key), item.photos[i])); $('page-number').textContent = `${page+1} / ${memories.length}`; $('previous').disabled = page === 0; $('next').disabled = page === memories.length-1; }
async function begin() { if(scene !== 'welcome') return; const run = ++sequence; show('intro'); if (musicEnabled) tryMusic(); for (const word of ['3','2','1','HAPPY','BIRTHDAY','MARIA']) { if(run !== sequence) return; $('intro-text').textContent = word; await delay(reduced ? 450 : 1100); } show('cake'); }
$('begin').onclick = begin; $('start').onclick = begin;
$('wish').onclick = async () => { if($('cake').classList.contains('blown')) return; $('cake').classList.add('blown'); $('wish-text').textContent = 'Que todo lo bonito que deseas se haga realidad ♡'; $('wish').textContent = 'Un deseo para ti ♡'; burst(); await delay(2200); show('envelope'); };
$('open-letter').onclick = () => {page=0;renderAlbum();show('album');};
const book = $('memory-book');
let turning = false, gesture = null;
async function turnPage(direction) {
  const target = page + direction;
  if (turning || target < 0 || target >= memories.length) return;
  turning = true;
  // Hoja de dos caras que gira sobre el lomo central.
  const leaf = document.createElement('div');
  leaf.className = 'turning-leaf ' + (direction > 0 ? 'from-right' : 'from-left');
  leaf.setAttribute('aria-hidden', 'true');
  const front = document.createElement('div'), back = document.createElement('div');
  front.className = 'leaf-face leaf-front';
  back.className = 'leaf-face leaf-back';
  const oldPhoto = $(direction > 0 ? 'photo-b' : 'photo-a').cloneNode();
  oldPhoto.removeAttribute('id'); oldPhoto.alt = '';
  const newPhoto = document.createElement('img');
  newPhoto.alt = '';
  setPhoto(newPhoto, memories[target].photos[direction > 0 ? 0 : 1]);
  front.append(oldPhoto); back.append(newPhoto); leaf.append(front, back);
  book.append(leaf);
  page = target;
  renderAlbum();
  if (!reduced) {
    const animation = leaf.animate([
      { transform: 'rotateY(0deg)', filter: 'brightness(1)' },
      { transform: `rotateY(${-direction * 90}deg)`, filter: 'brightness(.8)', offset: .5 },
      { transform: `rotateY(${-direction * 180}deg)`, filter: 'brightness(1)' }
    ], { duration: 850, easing: 'cubic-bezier(.35,.05,.2,1)', fill: 'forwards' });
    await animation.finished;
  }
  leaf.remove();
  turning = false;
}
$('previous').onclick = () => turnPage(-1);
$('next').onclick = () => turnPage(1);
book.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0 || turning) return;
  gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
  book.setPointerCapture(event.pointerId);
  book.classList.add('dragging');
});
book.addEventListener('pointermove', event => {
  if (!gesture || gesture.id !== event.pointerId) return;
  const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
  if (Math.abs(dx) > Math.abs(dy)) book.style.setProperty('--drag', `${Math.max(-12, Math.min(12, dx / 12))}deg`);
});
function endGesture(event) {
  if (!gesture || gesture.id !== event.pointerId) return;
  const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
  gesture = null;
  book.classList.remove('dragging');
  book.style.removeProperty('--drag');
  if (book.hasPointerCapture(event.pointerId)) book.releasePointerCapture(event.pointerId);
  if (event.type === 'pointerup' && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) turnPage(dx < 0 ? 1 : -1);
}
book.addEventListener('pointerup', endGesture);
book.addEventListener('pointercancel', endGesture);
book.addEventListener('lostpointercapture', endGesture);
book.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    turnPage(event.key === 'ArrowRight' ? 1 : -1);
  }
});
$('finale').onclick = () => {show('heart');burst();};
$('replay').onclick = () => {sequence++;$('cake').classList.remove('blown');$('wish-text').textContent='Cierra los ojos, pide un deseo…';$('wish').textContent='Sopla las velitas ✧';show('welcome');};
for(let i=0;i<30;i++){const t=i/30*Math.PI*2;const x=16*Math.sin(t)**3;const y=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);const img=document.createElement('img');setPhoto(img,memories.flatMap(m=>m.photos)[i%8]);img.alt='Recuerdo de Maria '+(i%8+1);img.style.cssText=`left:${44+x*2.5}%;top:${40-y*2.4}%;--delay:${i*35}ms;--rotation:${Math.sin(i*3)*12}deg`; $('photo-heart').append(img);}
let playing = false, musicEnabled = true;
const music = $('music');
function syncMusicButton() {
  playing = !music.paused;
  $('sound').classList.toggle('playing', musicEnabled);
  $('sound').setAttribute('aria-pressed', String(musicEnabled));
  const label = musicEnabled ? 'Pausar música' : 'Activar música';
  $('sound').setAttribute('aria-label', label);
  $('sound').title = label;
}
async function tryMusic(manual = false) {
  if (!musicEnabled) return;
  try { await music.play(); }
  catch {
    if (manual) {
      $('audio-notice').textContent = 'Coloca tu canción en assets/audio/cumple.mp3';
      setTimeout(() => $('audio-notice').textContent = '', 4500);
    }
  }
  syncMusicButton();
}
$('sound').onclick = () => {
  musicEnabled = !musicEnabled;
  if (musicEnabled) tryMusic(true);
  else music.pause();
  syncMusicButton();
};
// Reintentar tras una interacción si el navegador bloqueó el inicio automático.
function unlockMusic(event) {
  if (event.target.closest?.('#sound')) return;
  if (musicEnabled && music.paused) tryMusic();
}
document.addEventListener('pointerdown', unlockMusic);
document.addEventListener('keydown', unlockMusic);
music.addEventListener('play', syncMusicButton);
music.addEventListener('pause', syncMusicButton);
syncMusicButton();
tryMusic();

const canvas=$('universe'),ctx=canvas.getContext('2d'),matrix=$('matrix'),mx=matrix.getContext('2d');let w,h,stars=[],drops=[],particles=[];
function resize(){w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,2);for(const c of [canvas,matrix]){c.width=w*d;c.height=h*d;c.getContext('2d').setTransform(d,0,0,d,0,0);}stars=Array.from({length:Math.min(220,w/5)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.3,p:Math.random()*6}));drops=Array.from({length:Math.ceil(w/18)},()=>Math.random()*-60);}
addEventListener('resize',resize);resize();
function burst(){if(reduced)return;particles=Array.from({length:100},()=>({x:w/2,y:h/2,vx:(Math.random()-.5)*12,vy:(Math.random()-.8)*12,life:100,color:['#f58bbd','#fff1cf','#cba6ec'][Math.floor(Math.random()*3)]}));}
let last=0;function animate(now){requestAnimationFrame(animate);if(now-last<40)return;last=now;ctx.clearRect(0,0,w,h);const glow=ctx.createRadialGradient(w/2,h*.45,0,w/2,h*.45,w*.6);glow.addColorStop(0,'#32172b44');glow.addColorStop(1,'#08081200');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);for(const s of stars){ctx.globalAlpha=.3+(Math.sin((reduced?0:now*.0006)+s.p)+1)*.3;ctx.fillStyle='#e8d6ed';ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.1;p.life--;ctx.globalAlpha=Math.max(0,p.life/100);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,4,7);}particles=particles.filter(p=>p.life>0);ctx.globalAlpha=1;if(scene==='intro'){mx.fillStyle='rgba(8,8,18,.12)';mx.fillRect(0,0,w,h);mx.font='13px monospace';drops.forEach((y,i)=>{mx.fillStyle=Math.random()>.97?'#ffe0f1':'#bd387b';mx.fillText('MARIA♡ HAPPY BIRTHDAY'[Math.floor(Math.random()*21)],i*18,y*17);if(y*17>h&&Math.random()>.97)drops[i]=0;else drops[i]+=reduced?.1:.6;});}else mx.clearRect(0,0,w,h);}
requestAnimationFrame(animate);
