'use strict';
const meals = {
  breakfast: {name:'BỮA SÁNG', foods:[
    ['Phở bò','🍜','Nước dùng nóng hổi, thơm mùi quế hồi.','common'],
    ['Bánh mì','🥖','Giòn rụm, đầy nhân, gọn cho buổi sáng.','common'],
    ['Xôi khúc','🍙','Dẻo thơm và chắc bụng.','common'],
    ['Bánh cuốn','🥟','Bánh mỏng mềm, thêm hành phi thơm lừng.','common'],
    ['Cháo gà','🥣','Nhẹ bụng mà vẫn ấm lòng.','common'],
    ['Bún bò Huế','🍲','Đậm đà, cay nhẹ, tỉnh cả buổi sáng.','rare'],
    ['Bánh bao','🥟','Vỏ mềm nóng hổi, nhân đậm đà, no vừa đủ.','rare'],
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
const mealKeys=Object.keys(meals);
const allFoods=mealKeys.flatMap((meal,mi)=>meals[meal].foods.map((f,fi)=>({id:mi*8+fi,meal,name:f[0],description:f[2],rarity:f[3]})));
const foodById=id=>allFoods.find(f=>f.id===id);
const STORE='angi.fooddrop.v2';
let storageAvailable=true;
function validIds(value){return Array.isArray(value)?[...new Set(value.filter(id=>Number.isInteger(id)&&id>=0&&id<24))]:[];}
function readState(){
 let data={};try{data=JSON.parse(localStorage.getItem(STORE)||'{}')||{};}catch{storageAvailable=false;}
 return {excluded:validIds(data.excluded),discovered:validIds(data.discovered),cycles:Object.fromEntries(mealKeys.map(m=>[m,validIds(data.cycles?.[m]).filter(id=>foodById(id).meal===m)])),mode:data.mode==='explore'?'explore':'random',quick:data.quick===true,sound:data.sound!==false,volume:Number.isFinite(data.volume)?Math.max(0,Math.min(100,data.volume)):55,history:Array.isArray(data.history)?data.history.filter(h=>h&&foodById(h.id)&&Number.isFinite(h.time)&&h.time>0).slice(0,20):[],total:Number.isSafeInteger(data.total)&&data.total>=0?data.total:0};
}
const state=readState();
const sound=new FoodAudio();
let currentMeal='breakfast',selectedFood=null,spinning=false,coordinates=null,frame=null,spinTimer=null,toastTimer=null,confettiTimer=null,spinStart=0,spinDuration=5600,lastTick=-1,step=200,targetIndex=38;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function save(){try{localStorage.setItem(STORE,JSON.stringify(state));}catch{storageAvailable=false;}if(!storageAvailable)$('storageNote').textContent='Trình duyệt không cho lưu. Dữ liệu chỉ giữ trong phiên này.';}
function randomIndex(n){if(!Number.isInteger(n)||n<1)throw new Error('Empty pool');const a=new Uint32Array(1),limit=Math.floor(4294967296/n)*n;do{crypto.getRandomValues(a);}while(a[0]>=limit);return a[0]%n;}
function enabledFoods(meal=currentMeal){return allFoods.filter(f=>f.meal===meal&&!state.excluded.includes(f.id));}
function eligibleFoods(meal=currentMeal){const enabled=enabledFoods(meal);if(state.mode!=='explore')return enabled;const remaining=enabled.filter(f=>!state.cycles[meal].includes(f.id));return remaining.length?remaining:enabled;}
function toast(text){clearTimeout(toastTimer);$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3400);}
function photo(node,food){node.style.setProperty('--px',((food.id%4)/3*100)+'%');node.style.setProperty('--py',(Math.floor(food.id/4)/5*100)+'%');node.setAttribute('aria-label',food.name);}
function createPhoto(food){const p=document.createElement('div');p.className='dish-photo';p.setAttribute('role','img');photo(p,food);return p;}
function card(food,compact=false){
 const node=document.createElement(compact?'article':'div');node.className=(compact?'pool-card ':'food-card ')+food.rarity;node.dataset.foodId=food.id;
 node.append(createPhoto(food));const info=document.createElement('div');info.className='card-info';const name=document.createElement('strong');name.textContent=food.name;info.append(name);
 const detail=document.createElement('small');detail.textContent=rarityLabels[food.rarity];info.append(detail);node.append(info);
 if(compact){
  const enabled=!state.excluded.includes(food.id),eligible=eligibleFoods().some(f=>f.id===food.id);
  node.classList.toggle('excluded',!enabled);
  const toggle=document.createElement('button');toggle.className='food-toggle';toggle.type='button';toggle.textContent=enabled?'✓':'+';toggle.setAttribute('aria-label',(enabled?'Bỏ món ':'Bật món ')+food.name);toggle.setAttribute('aria-pressed',String(enabled));toggle.disabled=spinning;toggle.addEventListener('click',()=>toggleFood(food));node.append(toggle);
  const badge=document.createElement('span');badge.className='card-odds';badge.textContent=!enabled?'Đã bỏ':!eligible?'Đã quay vòng này':(100/eligibleFoods().length).toLocaleString('vi-VN',{maximumFractionDigits:1})+'%';node.append(badge);
  if(state.discovered.includes(food.id)){const found=document.createElement('span');found.className='found-badge';found.textContent='✦';found.title='Đã có trong bộ sưu tập';node.append(found);}
 }
 return node;
}
function measure(){step=($('reel').firstElementChild?.getBoundingClientRect().width||190)+10;}
function offset(index){return $('reelViewport').clientWidth/2-(index*step+(step-10)/2);}
function place(index){$('reel').style.transform=`translateX(${offset(index)}px)`;}
function paintIdle(){const foods=eligibleFoods();$('reel').replaceChildren(...Array.from({length:13},(_,i)=>card(foods[i%foods.length])));measure();place(4);}
function updateControls(){
 document.querySelectorAll('[data-mode]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.mode===state.mode));b.disabled=spinning;});
 document.querySelectorAll('[data-meal]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.meal===currentMeal));b.disabled=spinning;});
 $('quick').checked=state.quick;$('quick').disabled=spinning;$('spin').disabled=spinning;$('skip').hidden=!spinning;$('restore').disabled=spinning;
 $('sound').setAttribute('aria-pressed',String(state.sound));$('sound').setAttribute('aria-label',state.sound?'Tắt âm thanh':'Bật âm thanh');$('sound').querySelector('span').textContent=state.sound?'Âm thanh: bật':'Âm thanh: tắt';$('volume').value=state.volume;
 sound.set(state.sound,state.volume/100);
 const count=eligibleFoods().length;$('poolCount').textContent=enabledFoods().length+'/8 ĐANG BẬT';
 $('oddsNote').textContent=count+' món trong lượt tiếp theo · Cơ hội bằng nhau · Miễn phí';
 $('modeHelp').textContent=state.mode==='explore'?'Khám phá: không lặp món trong mỗi vòng. Thử hết các món đang bật để bắt đầu vòng mới.':'Ngẫu nhiên: mỗi món đang bật có cơ hội như nhau. Màu thẻ chỉ phân nhóm món.';
}
function renderPool(){$('foodPool').replaceChildren(...allFoods.filter(f=>f.meal===currentMeal).map(f=>card(f,true)));updateControls();}
function toggleFood(food){
 if(spinning)return;
 const excluded=state.excluded.includes(food.id);
 if(!excluded&&enabledFoods().length===1){toast('Giữ lại ít nhất một món trong hòm nhé.');return;}
 state.excluded=excluded?state.excluded.filter(id=>id!==food.id):[...state.excluded,food.id];save();renderPool();if(!selectedFood)paintIdle();sound.unlock();sound.tap();
}
function changeMeal(meal){
 if(spinning||!mealKeys.includes(meal))return;
 currentMeal=meal;selectedFood=null;$('result').hidden=true;$('caseName').textContent='HÒM '+meals[meal].name;$('spinLabel').textContent='MỞ HÒM NGAY';$('spinStatus').textContent='Một lượt quay, một món ngon. Sẵn sàng chưa?';
 $('nearbyMeal').textContent='Quay một món, tìm một quán ngon.';photo($('nearbyPhoto'),allFoods.find(f=>f.meal===meal));renderPool();paintIdle();updateMapLink();
}
function level(){const n=state.discovered.length;return n>=24?'Bậc thầy ẩm thực':n>=16?'Nhà thám hiểm vị giác':n>=8?'Tín đồ ăn ngon':'Tân binh ẩm thực';}
function renderProgress(){
 const n=state.discovered.length;$('discoveryCount').textContent=String(n).padStart(2,'0');$('albumBadge').textContent=n+'/24';$('levelName').textContent=level();$('albumMeter').value=n;$('albumProgress').textContent=n+'/24 món · '+level();$('spinCount').textContent=state.total+' LƯỢT';
 $('albumGrid').replaceChildren(...allFoods.map(food=>{const tile=document.createElement('div');const unlocked=state.discovered.includes(food.id);tile.className='album-tile'+(unlocked?'':' locked');tile.append(createPhoto(food));const text=document.createElement('span');text.textContent=(unlocked?'✓ ':'')+food.name;tile.append(text);const status=document.createElement('small');status.textContent=unlocked?'Đã khám phá':'Chưa mở';tile.append(status);return tile;}));
 $('historyEmpty').hidden=state.history.length>0;$('history').replaceChildren(...state.history.slice(0,6).map(h=>{const food=foodById(h.id),li=document.createElement('li');li.append(createPhoto(food));const text=document.createElement('div'),name=document.createElement('strong'),time=document.createElement('small');name.textContent=food.name;time.textContent=new Date(h.time).toLocaleString('vi-VN',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});text.append(name,time);li.append(text);const link=document.createElement('a');link.href=mapsUrl(food);link.target='_blank';link.rel='noopener noreferrer';link.textContent='↗';link.setAttribute('aria-label','Tìm quán '+food.name);li.append(link);return li;}));
}
function celebrate(special){
 clearTimeout(confettiTimer);$('confetti').replaceChildren();if(reducedMotion.matches)return;
 for(let i=0;i<(special?30:16);i++){const bit=document.createElement('i');bit.style.setProperty('--x',((i%2?1:-1)*(40+randomIndex(300)))+'px');bit.style.setProperty('--r',(randomIndex(720)-360)+'deg');bit.style.setProperty('--delay',(randomIndex(15)/100)+'s');bit.style.background=['#ff8845','#efbf63','#b590ed','#fff3d7'][i%4];$('confetti').append(bit);}
 confettiTimer=setTimeout(()=>$('confetti').replaceChildren(),1800);
}
function finishSpin(){
 if(!spinning)return;
 cancelAnimationFrame(frame);clearTimeout(spinTimer);measure();place(targetIndex);$('reel').children[targetIndex].classList.add('landed');spinning=false;document.body.classList.remove('spinning');
 const isNew=!state.discovered.includes(selectedFood.id);if(isNew)state.discovered.push(selectedFood.id);
 if(state.mode==='explore'){const enabled=enabledFoods();if(!enabled.some(f=>!state.cycles[currentMeal].includes(f.id)))state.cycles[currentMeal]=[];state.cycles[currentMeal].push(selectedFood.id);}
 state.total++;state.history.unshift({id:selectedFood.id,time:Date.now()});state.history=state.history.slice(0,20);save();
 $('spinLabel').textContent='MỞ THÊM MỘT HÒM';$('spinStatus').textContent='Chốt món: '+selectedFood.name+'!';
 photo($('resultPhoto'),selectedFood);$('resultTag').textContent=isNew?'✦ MÓN MỚI TRONG BỘ SƯU TẬP':'VŨ TRỤ ĐÃ CHỐT';$('resultName').textContent=selectedFood.name;$('resultDescription').textContent=selectedFood.description;$('result').hidden=false;$('result').classList.toggle('special-result',selectedFood.rarity==='special');
 photo($('nearbyPhoto'),selectedFood);$('nearbyMeal').textContent='Tìm '+selectedFood.name+' gần bạn.';updateMapLink();renderPool();renderProgress();sound.win(selectedFood.rarity==='special');celebrate(selectedFood.rarity==='special');
 if(isNew&&[8,16,24].includes(state.discovered.length))toast('Mở khóa danh hiệu: '+level()+'!');
}
function spin(){
 if(spinning)return;sound.unlock();spinning=true;$('result').hidden=true;document.body.classList.add('spinning');
 const foods=eligibleFoods();selectedFood=foods[randomIndex(foods.length)];
 const tiles=Array.from({length:46},()=>foods[randomIndex(foods.length)]);tiles[targetIndex]=selectedFood;
 $('reel').replaceChildren(...tiles.map(f=>card(f)));measure();place(3);renderPool();
 $('spinStatus').textContent='Vũ trụ đang chọn… đợi món ngon xuất hiện!';$('spinLabel').textContent='ĐANG MỞ HÒM…';
 spinDuration=state.quick?1600:5600;spinStart=performance.now();lastTick=3;
 // AudioContext resume is asynchronous; allow one frame before the opening cue.
 requestAnimationFrame(()=>{if(spinning)sound.open();});
 if(reducedMotion.matches){finishSpin();return;}
 function animate(now){
  if(!spinning)return;const t=Math.min(1,(now-spinStart)/spinDuration),ease=1-Math.pow(1-t,5),position=3+(targetIndex-3)*ease;
  place(position);const passed=Math.floor(position+.5);if(passed!==lastTick){sound.tick(t>.6);lastTick=passed;}
  if(t>=1)finishSpin();else frame=requestAnimationFrame(animate);
 }
 frame=requestAnimationFrame(animate);spinTimer=setTimeout(finishSpin,spinDuration+250);
}
function mapsUrl(food=selectedFood){const name=food?food.name:'quán ăn',area=$('area').value.trim(),place=area||(coordinates?coordinates.latitude+', '+coordinates.longitude:'đây');return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(name+(area?' tại ':' gần ')+place);}
function updateMapLink(){$('resultMaps').href=mapsUrl();}
document.querySelectorAll('[data-meal]').forEach(b=>b.addEventListener('click',()=>changeMeal(b.dataset.meal)));
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(spinning)return;state.mode=b.dataset.mode;save();renderPool();if(!selectedFood)paintIdle();}));
$('spin').addEventListener('click',spin);$('skip').addEventListener('click',finishSpin);
$('quick').addEventListener('change',()=>{state.quick=$('quick').checked;save();});
$('restore').addEventListener('click',()=>{if(spinning)return;state.excluded=state.excluded.filter(id=>foodById(id).meal!==currentMeal);save();renderPool();if(!selectedFood)paintIdle();toast('Đã bật lại 8 món trong hòm này.');});
$('sound').addEventListener('click',()=>{state.sound=!state.sound;updateControls();if(state.sound){sound.unlock();setTimeout(()=>sound.tap(),60);}save();});
$('volume').addEventListener('input',()=>{state.volume=Number($('volume').value);sound.set(state.sound,state.volume/100);save();});
$('albumOpen').addEventListener('click',()=>{$('album').showModal();});$('albumClose').addEventListener('click',()=>$('album').close());
$('album').addEventListener('click',e=>{if(e.target===$('album')){const r=$('album').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('album').close();}});
$('share').addEventListener('click',async()=>{if(!selectedFood)return;const text='Hôm nay ăn '+selectedFood.name+'! '+mapsUrl();try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);toast('Đã sao chép món và link tìm quán.');}catch{toast('Không sao chép được. Bạn có thể chọn và sao chép tên món.');}});
$('area').addEventListener('input',()=>{$('locationStatus').textContent=$('area').value.trim()?'Sẽ tìm theo khu vực bạn nhập.':coordinates?'Đã có vị trí. Sẵn sàng tìm quán.':'Chỉ lấy vị trí khi bạn cho phép.';updateMapLink();renderProgress();});
$('nearbyForm').addEventListener('submit',e=>{e.preventDefault();window.open(mapsUrl(),'_blank','noopener,noreferrer');});
$('locate').addEventListener('click',()=>{
 if(!navigator.geolocation||!window.isSecureContext){$('locationStatus').textContent='Không lấy được vị trí tại đây. Hãy nhập khu vực bên dưới.';$('area').focus();return;}
 $('locate').disabled=true;$('locationStatus').textContent='Đang xác định vị trí…';
 navigator.geolocation.getCurrentPosition(p=>{coordinates={latitude:Number(p.coords.latitude.toFixed(4)),longitude:Number(p.coords.longitude.toFixed(4))};$('area').value='';$('locate').disabled=false;$('locationStatus').textContent='Đã có vị trí. Chỉ gửi đến Google Maps khi bạn tìm quán.';updateMapLink();renderProgress();},e=>{$('locate').disabled=false;$('locationStatus').textContent=e.code===1?'Bạn chưa cho phép vị trí. Hãy nhập khu vực bên dưới.':'Chưa lấy được vị trí. Thử lại hoặc nhập khu vực.';},{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
});
window.addEventListener('resize',()=>{measure();if(!spinning)place(selectedFood?targetIndex:4);});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&spinning&&performance.now()-spinStart>=spinDuration)finishSpin();});
// Recover from malformed storage that excluded an entire meal.
for(const m of mealKeys){if(!enabledFoods(m).length)state.excluded=state.excluded.filter(id=>foodById(id).meal!==m);}
changeMeal(currentMeal);renderProgress();updateControls();if(!storageAvailable)$('storageNote').textContent='Dữ liệu chỉ giữ trong phiên này vì trình duyệt không cho lưu.';
