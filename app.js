'use strict';
const memories = [
  {id:'01',category:'together',title:'Vanja coming home',lang:'en',caption:'तिमीलाई भेट्नुअघि नै, तिम्रो पर्खाइमा माया थियो।',alt:'इभान जन्मिनुअघि आमा र उहाँको भाइको सँगैको फोटो',shape:'square'},
  {id:'02',category:'tiny',title:'हाम्रो पहिलो भेट',caption:'गुलाबी टोपीभित्रको सानो अनुहार। हाम्रो कथाको पहिलो पाना।',alt:'गुलाबी टोपी लगाएको नवजात इभान'},
  {id:'03',category:'tiny',title:'एक महिनाका दिन',caption:'तिमी एक महिनाको भयौ। हामी हरेक सानो कुरा साँच्दै थियौँ।',alt:'एक महिनाको सम्झना बोर्ड र नीलो बेलुनसँग इभान'},
  {id:'04',category:'tiny',title:'त्यो सानो मुस्कान',caption:'यो मुस्कान हेरेपछि, फेरि एकपटक हेर्न मन लाग्छ।',alt:'खैरो धर्से लुगामा मुस्कुराएको इभान'},
  {id:'05',category:'tiny',title:'दुई महिनाका दिन',caption:'कति चाँडै बदलिँदै थियौ तिमी। हरेक भेटमा अलि नयाँ।',alt:'दुई महिनाको बेलुनसँग नीलो लुगामा इभान'},
  {id:'06',category:'tiny',title:'आफ्नै धुनमा',caption:'तिम्रा साना हात र आफ्नै संसार। हेरेरै बसूँजस्तो।',alt:'नीलो लुगामा बेलुनतिर हात बढाइरहेको इभान'},
  {id:'07',category:'tiny',title:'कति जिज्ञासु आँखा',caption:'तिम्रा लागि सबै कुरा नयाँ थियो। हाम्रा लागि तिमी।',alt:'छाप भएको सेतो लुगामा माथितिर हेरिरहेको इभान'},
  {id:'08',category:'tiny',title:'संसार हेर्दै',caption:'के सोच्दै थियौ होला? त्यो कुरा एकदिन तिमीलाई नै सोधूँला।',alt:'सिरानीमा सुतेर जिज्ञासु आँखाले हेरिरहेको इभान'},
  {id:'09',category:'tiny',title:'रातो लुगा, सानो मुस्कान',caption:'खास दिनभन्दा पनि, तिम्रो मुस्कान नै खास थियो।',alt:'रातो कुर्तामा हाँसिरहेको इभान'},
  {id:'10',category:'tiny',title:'हात फैलाएर',caption:'सानो शरीर, पूरै ओछ्यानभरि आफ्नो संसार।',alt:'रातो कुर्ता लगाएर हात फैलाउँदै सुतेको इभान'},
  {id:'11',category:'tiny',title:'यस्तै रहोस् यो मुस्कान',caption:'तिमी हुर्किँदै गए पनि, यो मुस्कान यहीँ साँचिएको छ।',alt:'रातो कुर्तामा मुस्कानसहित इभान'},
  {id:'12',category:'together',title:'नजिक हुँदा',caption:'तिम्रो निधारमा आफ्नो निधार जोड्दा, समय अलि रोकिन्छ।',alt:'मामाको निधारसँग निधार जोडेर हेरिरहेको इभान'},
  {id:'13',category:'calls',title:'स्क्रिनपारिको भेट',caption:'दूरी थियो। तर तिमी देखिँदा नजिकै भएजस्तो लाग्थ्यो।',alt:'इभान र परिवारको भिडियो कलको सम्झना',shape:'call'},
  {id:'14',category:'calls',title:'मामासँग कुरा',caption:'तिमी बोल्न जान्दैनथ्यौ। तैपनि हाम्रा कुरा भइरहन्थे।',alt:'मामासँग भिडियो कलमा जिज्ञासु अनुहारको इभान',shape:'call'},
  {id:'15',category:'calls',title:'कलको त्यो मुस्कान',caption:'स्क्रिनमै भए पनि, तिम्रो मुस्कानले दिन उज्यालो बनाउँथ्यो।',alt:'मामा र इभान दुवै मुस्कुराएको भिडियो कल',shape:'call'}
];
const categoryNames={tiny:'साना दिन',together:'सँगैका पल',calls:'टाढैबाट भेट'};
const number = new Intl.NumberFormat('ne-NP',{numberingSystem:'deva'});
const grid=document.getElementById('memory-grid');
const dialog=document.getElementById('lightbox');
const fullImage=document.getElementById('lightbox-image');
const playButton=document.getElementById('play-slideshow');
let currentFilter='all', activeMemories=[...memories], currentIndex=0, returnFocus=null, slideshow=null;
const imagePath=(id,small=false)=>`./assets/memory-${id}${small?'-small':''}.webp`;

for(const [index,memory] of memories.entries()){
  const article=document.createElement('article');article.className=`memory-card ${memory.shape||''}`;article.dataset.category=memory.category;
  const button=document.createElement('button');button.type='button';button.dataset.photo=memory.id;button.setAttribute('aria-label',`${memory.title} — फोटो ठूलो गरी हेर्नुहोस्`);
  const photo=document.createElement('div');photo.className='memory-photo';
  const image=document.createElement('img');
  const fullWidth=memory.shape==='call'?923:memory.id==='01'?1600:memory.id==='02'?1200:memory.id==='04'?960:1500;
  image.src=imagePath(memory.id,true);image.srcset=`${imagePath(memory.id,true)} ${memory.shape==='call'?461:700}w, ${imagePath(memory.id)} ${fullWidth}w`;image.sizes='(max-width: 480px) calc(100vw - 40px), (max-width: 900px) 45vw, 30vw';image.loading='lazy';image.decoding='async';image.alt=memory.alt;image.width=memory.shape==='square'?1755:memory.shape==='call'?945:1536;image.height=memory.shape==='square'?1737:2048;
  const affordance=document.createElement('span');affordance.className='photo-open';affordance.setAttribute('aria-hidden','true');affordance.textContent='↗';
  photo.append(image,affordance);
  const caption=document.createElement('div');caption.className='memory-caption';const title=document.createElement('h3');title.textContent=memory.title;if(memory.lang)title.lang=memory.lang;const count=document.createElement('span');count.textContent=number.format(index+1).padStart(2,'०');caption.append(title,count);
  const category=document.createElement('p');category.className='memory-subtitle';category.textContent=categoryNames[memory.category];
  button.append(photo,caption,category);article.append(button);grid.append(article);
}

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  currentFilter=button.dataset.filter;
  activeMemories=memories.filter(memory=>currentFilter==='all'||memory.category===currentFilter);
  document.querySelectorAll('.filter').forEach(filter=>{const selected=filter===button;filter.classList.toggle('active',selected);filter.setAttribute('aria-pressed',String(selected));});
  document.querySelectorAll('.memory-card').forEach(card=>{card.hidden=currentFilter!=='all'&&card.dataset.category!==currentFilter;});
  document.getElementById('gallery-status').textContent=`${number.format(activeMemories.length)} सम्झनाहरू देखाइएका छन्।`;
}));

function renderPhoto(){
  const memory=activeMemories[currentIndex];
  fullImage.src=imagePath(memory.id);fullImage.alt=memory.alt;
  document.getElementById('lightbox-count').textContent=`${number.format(currentIndex+1)} / ${number.format(activeMemories.length)}`;
  document.getElementById('lightbox-title').textContent=memory.title;
  document.getElementById('lightbox-title').lang=memory.lang||'ne';
  document.getElementById('lightbox-caption').textContent=memory.caption;
  document.getElementById('lightbox-category').textContent=categoryNames[memory.category];
  document.getElementById('lightbox-status').textContent=`${memory.title}, ${number.format(currentIndex+1)} / ${number.format(activeMemories.length)}`;
  const next=new Image();next.src=imagePath(activeMemories[(currentIndex+1)%activeMemories.length].id);
}
function openPhoto(id,trigger){
  returnFocus=trigger||document.activeElement;
  if(!activeMemories.some(memory=>memory.id===id))activeMemories=[...memories];
  currentIndex=activeMemories.findIndex(memory=>memory.id===id);renderPhoto();
  dialog.showModal();document.body.style.overflow='hidden';document.getElementById('close-lightbox').focus();
}
function movePhoto(direction){currentIndex=(currentIndex+direction+activeMemories.length)%activeMemories.length;renderPhoto();}
function stopSlideshow(){
  if(slideshow){clearInterval(slideshow);slideshow=null;}
  playButton.setAttribute('aria-pressed','false');playButton.innerHTML='आफैँ पल्टाउँदै हेर्नू <span aria-hidden="true">▷</span>';
}
function playSlideshow(){
  stopSlideshow();slideshow=setInterval(()=>movePhoto(1),5000);
  playButton.setAttribute('aria-pressed','true');playButton.innerHTML='पल्टाउन रोक्नू <span aria-hidden="true">Ⅱ</span>';
}
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>openPhoto(button.dataset.photo,button)));
document.getElementById('close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{stopSlideshow();document.body.style.overflow='';if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});activeMemories=memories.filter(memory=>currentFilter==='all'||memory.category===currentFilter);});
document.getElementById('previous-photo').addEventListener('click',()=>{stopSlideshow();movePhoto(-1);});
document.getElementById('next-photo').addEventListener('click',()=>{stopSlideshow();movePhoto(1);});
playButton.addEventListener('click',()=>slideshow?stopSlideshow():playSlideshow());
document.getElementById('start-slideshow').addEventListener('click',event=>openPhoto(activeMemories[0].id,event.currentTarget));
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();stopSlideshow();movePhoto(event.key==='ArrowRight'?1:-1);}});
let touchStart=null;
const swipeArea=document.getElementById('swipe-area');
swipeArea.addEventListener('touchstart',event=>{if(event.touches.length===1)touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY};else touchStart=null;},{passive:true});
swipeArea.addEventListener('touchend',event=>{if(!touchStart||event.changedTouches.length!==1)return;const dx=event.changedTouches[0].clientX-touchStart.x,dy=event.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3){stopSlideshow();movePhoto(dx<0?1:-1);}},{passive:true});
swipeArea.addEventListener('touchcancel',()=>{touchStart=null;},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSlideshow();});

// Keep a failed request visible and offer recovery rather than hiding a missing memory.
document.querySelectorAll('.memory-photo img').forEach(image=>image.addEventListener('error',()=>{
  if(image.parentElement.querySelector('.photo-error'))return;
  const message=document.createElement('span');message.className='photo-error';message.textContent='फोटो खुलेन। फेरि खोलेर हेर्नू।';image.parentElement.append(message);
}));
