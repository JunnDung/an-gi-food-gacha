'use strict';
const meals = {
  breakfast: {name:'BỮA SÁNG', foods:[
    ['Phở bò','🍜','Nước dùng nóng hổi, thơm mùi quế hồi.','common'],
    ['Bánh mì','🥖','Giòn rụm, đầy nhân, gọn cho buổi sáng.','common'],
    ['Xôi mặn','🍙','Dẻo thơm và chắc bụng.','common'],
    ['Bánh cuốn','🥟','Bánh mỏng mềm, thêm hành phi thơm lừng.','common'],
    ['Cháo gà','🥣','Nhẹ bụng mà vẫn ấm lòng.','common'],
    ['Bún bò Huế','🍲','Đậm đà, cay nhẹ, tỉnh cả buổi sáng.','rare'],
    ['Bánh ướt lòng gà','🍗','Mềm mát, chua ngọt, đổi vị một chút.','rare'],
    ['Bò né','🥩','Chảo bò xèo xèo cho một buổi sáng đặc biệt.','special']
  ]},
  lunch: {name:'BỮA TRƯA', foods:[
    ['Cơm tấm','🍛','Sườn nướng thơm lừng, thêm chút mỡ hành.','common'],
    ['Cơm gà','🍗','Cơm thơm, thịt gà mềm, no vừa đủ.','common'],
    ['Bún thịt nướng','🥗','Rau mát, thịt thơm, nước mắm chua ngọt.','common'],
    ['Bún chả','🍜','Chả nướng và bún trắng, ăn là mê.','common'],
    ['Cơm chiên','🍚','Hạt cơm tơi, nóng hổi, đầy năng lượng.','common'],
    ['Mì Quảng','🍲','Sợi mì mềm, đậu phộng giòn, vị đậm đà.','rare'],
    ['Bánh xèo','🥞','Vỏ giòn, cuốn rau, chấm một miếng thật đã.','rare'],
    ['Sushi','🍣','Một chút tươi mới cho buổi trưa.','special']
  ]},
  dinner: {name:'BỮA TỐI', foods:[
    ['Hủ tiếu','🍜','Một tô nóng hổi để khép lại ngày dài.','common'],
    ['Cơm niêu','🍚','Cơm nóng, món nhà, bữa tối tròn vị.','common'],
    ['Bún riêu','🍲','Chua thanh, thơm riêu, thêm chút rau tươi.','common'],
    ['Gỏi cuốn','🥬','Cuốn tươi mát cho bữa tối nhẹ nhàng.','common'],
    ['Mì xào','🥡','Mì nóng cùng rau và món ăn kèm giòn ngon.','common'],
    ['Pizza','🍕','Phô mai kéo sợi, vui hơn khi chia sẻ.','rare'],
    ['Đồ nướng','🍢','Xiên nướng thơm lừng, rủ bạn đi cùng.','rare'],
    ['Lẩu','🥘','Một nồi nghi ngút, một buổi tối quây quần.','special']
  ]}
};
const rarityLabels={common:'Quen thuộc',rare:'Đổi vị',special:'Đặc biệt'};
const $=id=>document.getElementById(id);
let currentMeal='breakfast', selectedFood=null, spinning=false, soundOn=false, audioContext=null, coordinates=null;
let spinAnimation=null, ticker=null, fallback=null, targetIndex=0;
function randomIndex(length){
  if(!Number.isInteger(length)||length<1) throw new Error('Empty food pool');
  const buffer=new Uint32Array(1), limit=Math.floor(4294967296/length)*length;
  do{crypto.getRandomValues(buffer);}while(buffer[0]>=limit);
  return buffer[0]%length;
}
function card(food,compact=false){
  const node=document.createElement('div'); node.className=(compact?'pool-card ':'food-card ')+food[3];
  const emoji=document.createElement('span'); emoji.className='food-emoji';emoji.textContent=food[1];emoji.setAttribute('aria-hidden','true');node.append(emoji);
  const title=document.createElement('strong');title.textContent=food[0];node.append(title);
  if(!compact){const label=document.createElement('small');label.textContent=rarityLabels[food[3]];node.append(label);}
  return node;
}
function stride(){const first=$('reel').firstElementChild;return first?first.getBoundingClientRect().width+10:166;}
function centerOffset(index){return $('reelViewport').clientWidth/2-(index*stride()+(stride()-10)/2);}
function paintIdle(){
  $('reel').replaceChildren(...Array.from({length:15},(_,i)=>card(meals[currentMeal].foods[i%8])));
  $('reel').style.transform=`translateX(${centerOffset(4)}px)`;
}
function changeMeal(meal){
  if(spinning)return;
  currentMeal=meal;selectedFood=null;$('result').hidden=true;
  document.querySelectorAll('[data-meal]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.meal===meal)));
  $('caseName').textContent='HÒM '+meals[meal].name;
  $('foodPool').replaceChildren(...meals[meal].foods.map(food=>card(food,true)));
  $('poolCount').textContent=String(meals[meal].foods.length).padStart(2,'0')+' MÓN';
  $('chance').textContent=(100/meals[meal].foods.length).toLocaleString('vi-VN')+'%';
  $('spinStatus').textContent='Món ngon đang chờ. Bạn sẵn sàng chưa?';$('spinLabel').textContent='MỞ HÒM NGAY';paintIdle();
}
function tone(frequency=500,duration=.025,volume=.028){
  if(!soundOn||!audioContext||audioContext.state!=='running')return;
  try{const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();oscillator.type='triangle';oscillator.frequency.value=frequency;gain.gain.setValueAtTime(volume,audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+duration);oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start();oscillator.stop(audioContext.currentTime+duration);}catch{/* Audio is optional. */}
}
function stopTicking(){cancelAnimationFrame(ticker);clearTimeout(fallback);ticker=null;fallback=null;}
function finishSpin(){
  if(!spinning)return;
  stopTicking();if(spinAnimation){spinAnimation.cancel();spinAnimation=null;}
  $('reel').style.transform=`translateX(${centerOffset(targetIndex)}px)`;
  $('reel').children[targetIndex].classList.add('landed');
  spinning=false;document.body.classList.remove('spinning');$('spin').disabled=false;
  document.querySelectorAll('[data-meal]').forEach(button=>button.disabled=false);
  $('spinLabel').textContent='QUAY THÊM LƯỢT NỮA';$('spinStatus').textContent='Chốt đơn tinh thần: '+selectedFood[0]+'!';
  $('resultEmoji').textContent=selectedFood[1];$('resultName').textContent=selectedFood[0];$('resultDescription').textContent=selectedFood[2];$('result').hidden=false;updateMapLink();
  tone(660,.13,.06);setTimeout(()=>tone(880,.2,.05),120);
}
function spin(){
  if(spinning)return;
  spinning=true;document.body.classList.add('spinning');$('spin').disabled=true;$('result').hidden=true;
  document.querySelectorAll('[data-meal]').forEach(button=>button.disabled=true);
  $('spinStatus').textContent='Vũ trụ đang cân nhắc thực đơn của bạn…';$('spinLabel').textContent='ĐANG MỞ HÒM…';
  const foods=meals[currentMeal].foods;selectedFood=foods[randomIndex(foods.length)];targetIndex=42;
  const sequence=Array.from({length:50},()=>foods[randomIndex(foods.length)]);sequence[targetIndex]=selectedFood;
  $('reel').replaceChildren(...sequence.map(food=>card(food)));
  const start=centerOffset(3),end=centerOffset(targetIndex);$('reel').style.transform=`translateX(${start}px)`;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced||!$('reel').animate){finishSpin();return;}
  const duration=5600;spinAnimation=$('reel').animate([{transform:`translateX(${start}px)`},{transform:`translateX(${end}px)`}],{duration,easing:'cubic-bezier(.12,.72,.12,1)',fill:'forwards'});
  let lastCard=-1;
  function tick(){if(!spinning)return;const transform=getComputedStyle($('reel')).transform;const offset=new DOMMatrixReadOnly(transform).m41;const index=Math.floor(($('reelViewport').clientWidth/2-offset)/stride());if(index!==lastCard){tone(520+index%4*65);lastCard=index;}ticker=requestAnimationFrame(tick);}
  ticker=requestAnimationFrame(tick);spinAnimation.onfinish=finishSpin;fallback=setTimeout(finishSpin,duration+500);
}
function mapsUrl(){
  const food=selectedFood?selectedFood[0]:'quán ăn';const area=$('area').value.trim();
  const place=area||(coordinates?`${coordinates.latitude}, ${coordinates.longitude}`:'đây');
  const query=area?`${food} tại ${area}`:`${food} gần ${place}`;
  return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query);
}
function updateMapLink(){$('resultMaps').href=mapsUrl();}
document.querySelectorAll('[data-meal]').forEach(button=>button.addEventListener('click',()=>changeMeal(button.dataset.meal)));
$('spin').addEventListener('click',spin);
$('sound').addEventListener('click',async()=>{
  soundOn=!soundOn;
  if(soundOn){try{const AudioAPI=window.AudioContext||window.webkitAudioContext;if(!AudioAPI)throw new Error('Audio unavailable');audioContext=audioContext||new AudioAPI();await audioContext.resume();}catch{soundOn=false;}}
  $('sound').setAttribute('aria-pressed',String(soundOn));$('sound').setAttribute('aria-label',soundOn?'Tắt âm thanh':'Bật âm thanh');$('sound').querySelector('span').textContent=soundOn?'Âm thanh: bật':'Âm thanh: tắt';tone();
});
$('area').addEventListener('input',()=>{
  if($('area').value.trim()){$('locationStatus').textContent='Sẽ tìm theo khu vực bạn nhập.';}
  else{$('locationStatus').textContent=coordinates?'Đã có vị trí. Sẵn sàng tìm quán.':'Chỉ lấy vị trí khi bạn cho phép.';}updateMapLink();
});
$('nearbyForm').addEventListener('submit',event=>{event.preventDefault();window.open(mapsUrl(),'_blank','noopener,noreferrer');});
$('locate').addEventListener('click',()=>{
  if(!navigator.geolocation||!window.isSecureContext){$('locationStatus').textContent='Không lấy được vị trí tại đây. Hãy nhập khu vực bên dưới.';$('area').focus();return;}
  $('locate').disabled=true;$('locationStatus').textContent='Đang xác định vị trí…';
  navigator.geolocation.getCurrentPosition(position=>{
    coordinates={latitude:Number(position.coords.latitude.toFixed(4)),longitude:Number(position.coords.longitude.toFixed(4))};$('area').value='';$('locate').disabled=false;
    $('locationStatus').textContent='Đã có vị trí. Khi tìm quán, vị trí sẽ được gửi đến Google Maps.';updateMapLink();
  },error=>{
    $('locate').disabled=false;$('locationStatus').textContent=error.code===1?'Bạn chưa cho phép vị trí. Hãy nhập khu vực bên dưới.':'Chưa xác định được vị trí. Thử lại hoặc nhập khu vực.';
  },{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
});
window.addEventListener('resize',()=>{if(spinning){finishSpin();}else if(selectedFood){$('reel').style.transform=`translateX(${centerOffset(targetIndex)}px)`;}else{paintIdle();}});
changeMeal(currentMeal);
