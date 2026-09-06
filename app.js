let C=[],S=JSON.parse(localStorage.getItem("joeV2")||'{"d":0,"s":0,"done":[],"tries":0,"stars":0,"react":0}'),last="";const $=x=>document.getElementById(x);fetch("course.json").then(r=>r.json()).then(x=>{C=x;render()}).catch(()=>{$("en").textContent="请用本地服务器或部署后的网址打开 V2。"});function save(){localStorage.setItem("joeV2",JSON.stringify(S))}function talk(t,cb){
  last=t;
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  let u=new SpeechSynthesisUtterance(t);
  u.lang="en-GB";
  u.rate=.72;
  u.pitch=1.02;
  u.volume=1;

  const voices=speechSynthesis.getVoices();
  const preferred=[
    "Serena",
    "Daniel",
    "Sonia",
    "Google UK English Female",
    "Google UK English Male",
    "Microsoft Sonia Online (Natural) - English (United Kingdom)",
    "Microsoft Ryan Online (Natural) - English (United Kingdom)"
  ];
  let voice=null;
  for(const name of preferred){
    voice=voices.find(v=>v.name===name && /^en-GB/i.test(v.lang));
    if(voice) break;
  }
  if(!voice) voice=voices.find(v=>/^en-GB/i.test(v.lang));
  if(!voice) voice=voices.find(v=>/^en/i.test(v.lang));
  if(voice) u.voice=voice;
  if(cb) u.onend=cb;
  speechSynthesis.speak(u);
}function render(){let d=C[S.d],s=d.steps[S.s];$("day").textContent=`Day ${S.d+1} · ${S.s+1}/10`;$("title").textContent=d.title;$("goal").textContent=d.goal;$("prog").value=S.s+1;$("en").textContent=s.en;$("zh").textContent=s.zh;$("mic").style.display=s.say?"inline":"none";$("stars").textContent="";$("status").textContent="";let w=$("week");w.innerHTML="";for(let i=0;i<7;i++){let e=document.createElement("div");e.className="pill "+(S.done.includes(i)?"done ":"")+(i===S.d?"today":"");e.textContent=`Day ${i+1}${S.done.includes(i)?" ✓":""}`;w.appendChild(e)}report()}function report(){$("report").innerHTML=`完成 <b>${S.done.length}/7</b> 天 · 跟读 <b>${S.tries}</b> 次 · 鼓励星 <b>${S.stars}</b> 颗 · 听力/动作反应 <b>${S.react}</b> 次`}function next(){if(S.s<9)S.s++;else{if(!S.done.includes(S.d))S.done.push(S.d);if(S.d<6){S.d++;S.s=0}}save();render();setTimeout(()=>talk(C[S.d].steps[S.s].en),250)}function listen(){let R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R){$("status").textContent="当前浏览器不支持网页语音识别；仍可听和跟读。";return}let r=new R();r.lang="en-US";r.maxAlternatives=3;$("status").textContent="🎤 正在听 Joe 说…";r.onresult=e=>{S.tries++;let t=e.results[0][0].transcript.toLowerCase(),target=last.toLowerCase().replace(/[^a-z ]/g," ").split(/\s+/).filter(x=>x.length>2),hit=target.filter(x=>t.includes(x)).length,sc=target.length?hit/target.length:0,n=sc>=.55?3:sc>=.25?2:1;S.stars+=n;save();$("stars").textContent="⭐".repeat(n);$("status").textContent=n>=2?`Wonderful, Joe! 我听到：“${t}”`:"Good try, Joe! 再听一次也可以。";talk(n>=2?"Wonderful, Joe! Great speaking!":"Good try, Joe!");report()};r.onerror=()=>$("status").textContent="没有听清楚，没关系，可以再试或下一步。";r.start()}$("play").onclick=()=>talk(C[S.d].steps[S.s].en);$("again").onclick=()=>talk(last||C[S.d].steps[S.s].en);$("mic").onclick=()=>talk(C[S.d].steps[S.s].en,()=>setTimeout(listen,300));$("yes").onclick=()=>{S.react++;save();talk("Great job, Joe!");setTimeout(next,700)};$("next").onclick=next;$("stop").onclick=()=>{talk("Bye-bye, Joe! See you next time!");$("zh").textContent="今天完成。10–15 分钟左右就很好，不需要强行做完。"};
let installPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;let b=document.getElementById("install");if(b)b.style.display="inline-block"});
document.getElementById("install").onclick=async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null}};
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));

const pref=JSON.parse(localStorage.getItem("joePrefs")||'{"interest":"Cars 🚗","minutes":"12"}');
document.getElementById("interest").value=pref.interest;document.getElementById("minutes").value=pref.minutes;
function savePrefs(){let p={interest:document.getElementById("interest").value,minutes:document.getElementById("minutes").value};localStorage.setItem("joePrefs",JSON.stringify(p));showAdaptive()}
document.getElementById("interest").onchange=savePrefs;document.getElementById("minutes").onchange=savePrefs;
function showAdaptive(){
 let p=JSON.parse(localStorage.getItem("joePrefs")||'{"interest":"Cars 🚗","minutes":"12"}');
 let msg=S.tries===0?`本周以 Family 为主线，并会把 Joe 喜欢的 ${p.interest} 当作奖励和复习素材。目标约 ${p.minutes} 分钟/天。`:
 `Joe 已主动跟读 ${S.tries} 次、获得 ${S.stars} 颗鼓励星。后续课程会优先重复他已经愿意开口的家庭表达，并穿插 ${p.interest}。`;
 document.getElementById("adaptive").textContent=msg
}
setTimeout(showAdaptive,500);
