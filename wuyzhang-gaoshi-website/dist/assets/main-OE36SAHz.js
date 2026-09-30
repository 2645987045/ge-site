import"./main-Bw_99Llk.js";const c=document.getElementById("promoStage"),p=document.getElementById("promoNote"),h=4500,S=[`
    <p class="reel-kicker">四川大学吴玉章学院 出品</p>
    <p class="reel-sub">一部关于教育家与革命家的舞台正剧</p>
  `,`
    <h3 class="reel-title">吴玉章在高师</h3>
    <span class="reel-seal" aria-hidden="true">话剧</span>
  `,`
    <p class="reel-quote">人生最有趣味的事情，就是送旧迎新，<br>因为人类最高的欲求，是在时时创造新生活。</p>
    <p class="reel-sub">—— 吴玉章</p>
  `,`
    <p class="reel-vertical">成都高等师范学校</p>
    <p class="reel-sub">一九二〇年代 · 激情燃烧的岁月</p>
  `,`
    <p class="reel-date">2025.05.16 / 05.18 · 2026.09.28</p>
    <p class="reel-sub">三场公演圆满落幕 · 江安校区 艺术学院教学实验剧场</p>
  `];c&&fetch("./videos/promo.mp4",{method:"HEAD"}).then(t=>t.ok?x():u()).catch(()=>u());function x(){c.innerHTML="";const t=document.createElement("video");t.controls=!0,t.playsInline=!0,t.preload="metadata",t.poster="./images/posters/promo-poster.jpg";const l=document.createElement("source");l.src="./videos/promo.mp4",l.type="video/mp4",t.append(l);const r=()=>u();t.addEventListener("error",r,{once:!0}),l.addEventListener("error",r,{once:!0}),c.append(t),p&&(p.textContent="《吴玉章在高师》官方宣传片 · 四川大学吴玉章学院出品")}function u(){c.innerHTML=`
    <div class="reel" id="promoReel">
      <div class="reel-sweep" aria-hidden="true"></div>
      ${S.map(e=>`<div class="reel-scene">${e}</div>`).join("")}
      <div class="reel-grain" aria-hidden="true"></div>
      <div class="reel-bar">
        <button class="reel-toggle" id="reelToggle" aria-label="暂停">❚❚</button>
        <div class="reel-progress" id="reelProgress">
          ${S.map(()=>"<span><i></i></span>").join("")}
        </div>
        <span class="reel-time" id="reelTime"></span>
      </div>
    </div>`;const t=c.querySelector("#promoReel");t.style.setProperty("--scene-ms",`${h}ms`);const l=[...t.querySelectorAll(".reel-scene")],r=[...t.querySelectorAll(".reel-progress span")],b=t.querySelector("#reelTime"),a=t.querySelector("#reelToggle");let i=0,d=null,m=!1;const v=e=>String(e).padStart(2,"0"),E=e=>{r.forEach((s,o)=>{const n=s.querySelector("i");n.style.transition="",n.style.transform="",s.classList.toggle("done",o<e),s.classList.remove("playing")}),r[e].offsetWidth,r[e].classList.add("playing")},g=e=>{i=e,l.forEach((s,o)=>s.classList.toggle("active",o===e)),E(e),b.textContent=`${v(e+1)} / ${v(l.length)}`},y=()=>{clearInterval(d),d=setInterval(()=>g((i+1)%l.length),h)},f=()=>{m=!0,clearInterval(d),d=null;const e=r[i].querySelector("i"),s=getComputedStyle(e).transform;let o=0;if(s&&s!=="none"){const n=s.match(/matrix\(([-\d.e]+),/);n&&(o=Math.max(0,Math.min(1,parseFloat(n[1]))))}e.style.transition="none",e.style.transform=`scaleX(${o})`,a.textContent="▶",a.setAttribute("aria-label","播放")},L=()=>{m=!1;const e=r[i],s=e.querySelector("i");s.style.transition="",s.style.transform="",e.classList.remove("playing"),e.offsetWidth,e.classList.add("playing"),y(),a.textContent="❚❚",a.setAttribute("aria-label","暂停")};a.addEventListener("click",()=>m?L():f());const q=window.matchMedia("(prefers-reduced-motion: reduce)").matches;g(0),q?f():y(),p&&(p.textContent="动态海报宣传片 · 将 promo.mp4 放入 public/videos/ 后自动切换为真实视频")}
