'use strict';
// Original procedural audio; no third-party samples.
class FoodAudio {
 constructor(){this.context=null;this.master=null;this.enabled=true;this.volume=.55;this.noiseBuffer=null;}
 unlock(){if(!this.enabled)return;try{
  if(!this.context){const API=window.AudioContext||window.webkitAudioContext;if(!API)return;this.context=new API();this.master=this.context.createGain();const comp=this.context.createDynamicsCompressor();comp.threshold.value=-16;comp.ratio.value=5;this.master.connect(comp);comp.connect(this.context.destination);this.noiseBuffer=this.context.createBuffer(1,this.context.sampleRate*2,this.context.sampleRate);const data=this.noiseBuffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;}
  this.master.gain.setTargetAtTime(this.volume*.45,this.context.currentTime,.02);this.context.resume().catch(()=>{});
 }catch{/* Sound failure never blocks a spin. */}}
 set(enabled,volume){this.enabled=enabled;this.volume=volume;if(this.master)this.master.gain.setTargetAtTime(enabled?volume*.45:0,this.context.currentTime,.02);}
 ready(){return this.enabled&&this.context&&this.context.state==='running';}
 note(freq,delay=0,duration=.12,type='sine',gain=.3,end=freq){if(!this.ready())return;const c=this.context,t=c.currentTime+delay,o=c.createOscillator(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,end),t+duration);e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(gain,t+.004);e.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(e);e.connect(this.master);o.start(t);o.stop(t+duration+.01);}
 noise(delay,duration,freq,gain=.18,sweep=freq){if(!this.ready())return;const c=this.context,t=c.currentTime+delay,s=c.createBufferSource(),f=c.createBiquadFilter(),e=c.createGain();s.buffer=this.noiseBuffer;f.type='bandpass';f.Q.value=.9;f.frequency.setValueAtTime(freq,t);f.frequency.exponentialRampToValueAtTime(sweep,t+duration);e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(gain,t+Math.min(.035,duration/5));e.gain.exponentialRampToValueAtTime(.0001,t+duration);s.connect(f);f.connect(e);e.connect(this.master);s.start(t);s.stop(t+duration+.01);}
 open(){this.note(145,0,.24,'sine',.65,48);this.noise(0,.09,1800,.38);this.note(1550,.035,.065,'triangle',.15,800);this.noise(.06,.55,300,.26,4500);}
 tick(slow=false){this.noise(0,slow?.028:.018,slow?3200:2600,.23);this.note(slow?1500:1800,0,.028,'sine',.11,900);}
 win(special=false){this.note(110,0,.32,'sine',.5,55);this.noise(0,.14,4200,.24);const notes=special?[523.25,659.25,783.99,1046.5,1318.51]:[523.25,659.25,783.99,1046.5];notes.forEach((f,i)=>{this.note(f,.08+i*.085,.6,'sine',.23);this.note(f*2,.08+i*.085,.25,'triangle',.045);});if(special)this.noise(.05,.8,1200,.12,7000);}
 tap(){this.note(700,0,.065,'sine',.12,1050);}
}
