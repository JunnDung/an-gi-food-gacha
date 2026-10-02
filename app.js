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
const extraFoods={"breakfast":[["Bánh mì chảo","🍳","Chảo nóng hơn deadline, chấm bánh mì là hết suy.","rare"],["Bánh mì trứng phô mai","🧀","Ngoài giòn trong kéo sợi. Mood sáng nay: cheesy.","rare"],["Bagel cá hồi","🥯","Ăn sáng kiểu nhân vật chính, họp sớm vẫn có gu.","special"],["Pancake chuối","🥞","Một chồng bánh, một chồng hy vọng hôm nay không trễ.","rare"],["Croissant trứng","🥐","Vỏ bánh nhiều lớp như những tab đang mở trong đầu.","rare"],["Cơm nắm cá ngừ","🍙","Nắm cơm trong tay, tạm nắm quyền kiểm soát cuộc đời.","common"],["Sandwich gà","🥪","Gọn một tay, tay còn lại tắt báo thức lần thứ năm.","common"],["Bún quậy","🍜","Tên là quậy, nhưng ăn xong nhớ ngoan với chiếc bụng.","special"],["Bánh căn","🍳","Team thích bé bé xinh xinh nhưng gọi hai đĩa.","rare"],["Mì trộn trứng lòng đào","🍜","Trộn một vòng, gỡ rối một buổi sáng.","special"]],"lunch":[["Cơm gà sốt phô mai","🧀","Phô mai kéo sợi, kéo luôn mood ra khỏi giờ làm.","special"],["Cơm trộn Hàn Quốc","🍲","Trộn đều trước khi ăn, đừng trộn việc vào giờ nghỉ.","rare"],["Mì cay","🌶️","Chọn độ cay vừa sức. Nước mắt nên dành cho phim.","rare"],["Tokbokki","🍡","Bánh gạo dẻo dai, tình yêu đồ ăn cũng vậy.","rare"],["Kimbap","🍙","Cuộn gọn bữa trưa, không cuộn theo drama.","common"],["Gà rán sốt Hàn","🍗","Giòn một miếng, tiếng deadline nhỏ đi một chút.","rare"],["Burger bò","🍔","Hai tay ôm bánh, tạm buông chuyện overthinking.","common"],["Mì Ý sốt kem","🍝","Hôm nay cho phép bản thân sến như sốt kem.","rare"],["Cơm cà ri Nhật","🍛","Một đĩa cơm ấm, nạp lại thanh năng lượng.","rare"],["Bún đậu mắm tôm","🥢","Món ăn kiểm tra độ hợp cạ của cả nhóm.","special"]],"dinner":[["Lẩu tokbokki","🥘","Cả hội nhúng bánh gạo, nhúng luôn câu chuyện chưa kể.","special"],["Lẩu mala","🌶️","Tê tê đầu lưỡi, tỉnh tỉnh tâm hồn. Chọn cay vừa thôi.","special"],["Ốc sốt trứng muối","🐚","Sốt cuốn hơn tập cuối, nhớ gọi bánh mì chấm.","special"],["Bánh tráng nướng","🍕","Pizza hệ Đà Lạt, ngồi ghế nhựa vẫn rất có vibe.","rare"],["Bánh tráng trộn","🥗","Trộn là dính, dính là gọi thêm. Ăn nhẹ rồi chốt bữa chính nhé.","common"],["Xiên que","🍢","Một xiên để thử, thêm vài xiên vì tình bạn.","common"],["Chân gà sả tắc","🍋","Chua cay giòn giòn, món nhâm nhi của hội kể chuyện.","rare"],["Mì trộn tóp mỡ","🍜","Giòn rụm như tiếng bàn phím lúc chốt kèo ăn.","rare"],["Bánh tráng cuốn bơ","🌯","Cuốn bánh thì dễ, cuốn khỏi cuộc hẹn ăn mới khó.","rare"],["Kem xôi","🍨","Plot twist cuối bữa: nóng lạnh gặp nhau, chiếc bụng vỗ tay.","special"]]};
const rarityLabels={common:'Quen thuộc',rare:'Đổi vị',special:'Đặc biệt'};
const $=id=>document.getElementById(id);
const mealKeys=Object.keys(meals);
const allFoods=mealKeys.flatMap((meal,mi)=>meals[meal].foods.map((f,fi)=>({id:mi*8+fi,meal,name:f[0],description:f[2],rarity:f[3]})));
allFoods.forEach(f=>f.emoji=meals[f.meal].foods[f.id%8][1]);
let nextFoodId=24;
for(const meal of mealKeys) for(const f of extraFoods[meal]) allFoods.push({id:nextFoodId++,meal,name:f[0],emoji:f[1],description:f[2],rarity:f[3]});
allFoods.push(...[{"id":54,"meal":"lunch","name":"Jollibee · Gà Giòn Vui Vẻ","brand":"Jollibee","description":"Gà giòn vui vẻ, cả hội bớt suy. Chốt kèo đi ăn thôi!","rarity":"special"},{"id":55,"meal":"lunch","name":"Jollibee · Mì Ý Jolly","brand":"Jollibee","description":"Mì Ý sốt ngọt quen thuộc. Một vé về tuổi thơ, không cần xin nghỉ phép.","rarity":"special"},{"id":56,"meal":"dinner","name":"Dookki · Buffet tokbokki","brand":"Dookki","description":"Tự pha sốt, tự chọn topping. Hôm nay bạn là bếp trưởng của hội bạn thân.","rarity":"special"},{"id":57,"meal":"lunch","name":"KFC · Gà rán","brand":"KFC","description":"Giòn tan một miếng, chốt nhanh một kèo. Rủ đồng đội chia phần nào.","rarity":"special"},{"id":58,"meal":"dinner","name":"Lotteria · Gà rán","brand":"Lotteria","description":"Kèo gà rán cho buổi tối lười nghĩ. Bàn ăn có bạn là đủ vui.","rarity":"special"},{"id":59,"meal":"dinner","name":"Pizza Hut · Pizza","brand":"Pizza Hut","description":"Chia pizza, chia chuyện vui. Miếng cuối để ai thì oẳn tù tì nhé.","rarity":"special"}]);
const photoNotes={"25":"Ảnh minh họa sandwich trứng phô mai.","33":"Ảnh minh họa mì trứng; cách chế biến có thể khác.","34":"Ảnh minh họa set gà phô mai Hàn Quốc.","46":"Ảnh minh họa ốc hương sốt me; sốt trứng muối có màu khác.","50":"Ảnh minh họa chân gà nướng; món sả tắc có cách chế biến khác.","51":"Ảnh minh họa mì trộn tương đen.","52":"Ảnh minh họa nguyên liệu bánh tráng cuốn.","55":"Ảnh minh họa mì Ý kiểu Philippines, không phải ảnh sản phẩm Jollibee.","56":"Ảnh minh họa lẩu tokbokki, không phải ảnh tại Dookki.","59":"Ảnh minh họa pizza, không phải ảnh sản phẩm Pizza Hut."};
allFoods.forEach(f=>f.photoNote=photoNotes[f.id]||'Ảnh chụp minh họa món ăn.');
const FOOD_COUNT=allFoods.length;
const foodById=id=>allFoods.find(f=>f.id===id);
const STORE='angi.fooddrop.v2';
let storageAvailable=true;
function validIds(value){return Array.isArray(value)?[...new Set(value.filter(id=>Number.isInteger(id)&&id>=0&&id<FOOD_COUNT))]:[];}
function readState(){
 let data={};try{data=JSON.parse(localStorage.getItem(STORE)||'{}')||{};}catch{storageAvailable=false;}
 return {excluded:validIds(data.excluded),discovered:validIds(data.discovered),cycles:Object.fromEntries(mealKeys.map(m=>[m,validIds(data.cycles?.[m]).filter(id=>foodById(id).meal===m)])),mode:data.mode==='explore'?'explore':'random',quick:data.quick===true,sound:data.sound!==false,volume:Number.isFinite(data.volume)?Math.max(0,Math.min(100,data.volume)):55,history:Array.isArray(data.history)?data.history.filter(h=>h&&foodById(h.id)&&Number.isFinite(h.time)&&h.time>0).slice(0,20):[],total:Number.isSafeInteger(data.total)&&data.total>=0?data.total:0};
}
const state=readState();
// Keep v2 food IDs and storage key so existing collections survive this update.
let prior={};try{prior=JSON.parse(localStorage.getItem(STORE)||'{}')||{};}catch{}
state.xp=Number.isSafeInteger(prior.xp)&&prior.xp>=0?Math.min(prior.xp,1000000000):Math.min(state.total*20,1000000000);
let sessionSpins=0;
function rank(xp=state.xp){const level=Math.floor(Math.sqrt(xp/50))+1;const floor=50*(level-1)**2,next=50*level**2;return {level,floor,next,title:level>=20?'Trùm cuối chiếc bụng':level>=10?'Chiến thần chốt kèo':level>=5?'Hệ điều hành ăn uống':level>=3?'Mỏ hỗn bụng hiền':'Tân binh săn món'};}
const sound=new FoodAudio();
let currentMeal='breakfast',selectedFood=null,spinning=false,coordinates=null,frame=null,spinTimer=null,toastTimer=null,confettiTimer=null,spinStart=0,spinDuration=5600,lastTick=-1,step=200,targetIndex=38;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function save(){try{localStorage.setItem(STORE,JSON.stringify(state));}catch{storageAvailable=false;}if(!storageAvailable)$('storageNote').textContent='Trình duyệt không cho lưu. Dữ liệu chỉ giữ trong phiên này.';}
function randomIndex(n){if(!Number.isInteger(n)||n<1)throw new Error('Empty pool');const a=new Uint32Array(1),limit=Math.floor(4294967296/n)*n;do{crypto.getRandomValues(a);}while(a[0]>=limit);return a[0]%n;}
function enabledFoods(meal=currentMeal){return allFoods.filter(f=>f.meal===meal&&!state.excluded.includes(f.id));}
function eligibleFoods(meal=currentMeal){const enabled=enabledFoods(meal);if(state.mode!=='explore')return enabled;const remaining=enabled.filter(f=>!state.cycles[meal].includes(f.id));return remaining.length?remaining:enabled;}
function toast(text){clearTimeout(toastTimer);$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3400);}
function photo(node,food){
 const extra=food.id>=24,index=extra?food.id-24:food.id,columns=extra?6:4;
 node.classList.toggle('extra-photo',extra);node.textContent='';
 node.style.setProperty('--px',((index%columns)/(columns-1)*100)+'%');node.style.setProperty('--py',(Math.floor(index/columns)/5*100)+'%');node.setAttribute('aria-label',food.name);node.title=food.photoNote||food.name;
}
function createPhoto(food){const p=document.createElement('div');p.className='dish-photo';p.setAttribute('role','img');photo(p,food);return p;}
function card(food,compact=false){
 const node=document.createElement(compact?'article':'div');node.className=(compact?'pool-card ':'food-card ')+food.rarity;node.dataset.foodId=food.id;
 node.append(createPhoto(food));const info=document.createElement('div');info.className='card-info';const name=document.createElement('strong');name.textContent=food.name;info.append(name);
 const detail=document.createElement('small');detail.textContent=food.brand?'✦ Kèo '+food.brand:rarityLabels[food.rarity];info.append(detail);node.append(info);
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
 const count=eligibleFoods().length;$('poolCount').textContent=enabledFoods().length+'/'+allFoods.filter(f=>f.meal===currentMeal).length+' ĐANG BẬT';
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
 const r=rank();$('playerLevel').textContent='LV. '+r.level;$('rankTitle').textContent=r.title;
 $('xpMeter').max=r.next-r.floor;$('xpMeter').value=state.xp-r.floor;$('xpText').textContent=(state.xp-r.floor)+' / '+(r.next-r.floor)+' XP · Còn '+(r.next-state.xp)+' XP lên cấp';
 $('comboText').textContent=sessionSpins+' lượt trong phiên · '+(sessionSpins%5===0?5:5-sessionSpins%5)+' lượt nữa nhận +30 XP';
 const n=state.discovered.length;$('albumMeter').max=FOOD_COUNT;$('discoveryCount').textContent=String(n).padStart(2,'0');$('albumBadge').textContent=n+'/'+FOOD_COUNT;$('levelName').textContent=level();$('albumMeter').value=n;$('albumProgress').textContent=n+'/'+FOOD_COUNT+' món · '+level();$('spinCount').textContent=state.total+' LƯỢT';
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
 const beforeLevel=rank().level;sessionSpins++;
 const gained=20+(isNew?15:0)+(sessionSpins%5===0?30:0);
 state.xp=Math.min(1000000000,state.xp+gained);
 $('xpReward').textContent='+'+gained+' XP'+(isNew?' · Món mới +15':'')+(sessionSpins%5===0?' · Chuỗi 5 lượt +30':'')+(rank().level>beforeLevel?' · LÊN CẤP '+rank().level+'!':'');
 state.total++;state.history.unshift({id:selectedFood.id,time:Date.now()});state.history=state.history.slice(0,20);save();
 $('spinLabel').textContent='MỞ THÊM MỘT HÒM';$('spinStatus').textContent='Chốt món: '+selectedFood.name+'!';
 photo($('resultPhoto'),selectedFood);$('resultTag').textContent=isNew?'✦ MÓN MỚI TRONG BỘ SƯU TẬP':'VŨ TRỤ ĐÃ CHỐT';$('resultName').textContent=selectedFood.name;$('resultDescription').textContent=selectedFood.description+' '+selectedFood.photoNote+(selectedFood.brand?' Ảnh tham khảo; thực đơn có thể khác theo chi nhánh.':'');$('result').hidden=false;$('result').classList.toggle('special-result',selectedFood.rarity==='special');
 photo($('nearbyPhoto'),selectedFood);$('nearbyMeal').textContent='Tìm '+(selectedFood.brand||selectedFood.name)+' gần bạn.';updateMapLink();renderPool();renderProgress();sound.win(selectedFood.rarity==='special');celebrate(selectedFood.rarity==='special');
 if(rank().level>beforeLevel)toast('🎉 Lên cấp '+rank().level+' · '+rank().title);
 else if(isNew&&[8,16,24].includes(state.discovered.length))toast('Mở khóa danh hiệu: '+level()+'!');
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
function mapsUrl(food=selectedFood){const name=food?(food.brand||food.name):'quán ăn',area=$('area').value.trim(),place=area||(coordinates?coordinates.latitude+', '+coordinates.longitude:'đây');return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(name+(area?' tại ':' gần ')+place);}
function updateMapLink(){$('resultMaps').href=mapsUrl();}
document.querySelectorAll('[data-meal]').forEach(b=>b.addEventListener('click',()=>changeMeal(b.dataset.meal)));
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(spinning)return;state.mode=b.dataset.mode;save();renderPool();if(!selectedFood)paintIdle();}));
$('spin').addEventListener('click',spin);$('skip').addEventListener('click',finishSpin);
$('quick').addEventListener('change',()=>{state.quick=$('quick').checked;save();});
$('restore').addEventListener('click',()=>{if(spinning)return;state.excluded=state.excluded.filter(id=>foodById(id).meal!==currentMeal);save();renderPool();if(!selectedFood)paintIdle();toast('Đã bật lại tất cả món trong hòm này.');});
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
