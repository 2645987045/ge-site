import"./main-Bw_99Llk.js";const g=[{id:1,src:"/images/behind/photo1.jpg?v=20260831",caption:"舞台群像"},{id:2,src:"/images/behind/photo2.jpg?v=20260831",caption:"双人对手戏"},{id:3,src:"/images/behind/photo3.jpg?v=20260831",caption:"主角对峙"},{id:4,src:"/images/behind/photo4.jpg?v=20260831",caption:"慷慨陈词"},{id:5,src:"/images/behind/photo5.jpg?v=20260831",caption:"席地谈心"},{id:6,src:"/images/behind/photo6.jpg?v=20260831",caption:"探讨剧本"},{id:7,src:"/images/behind/photo7.jpg?v=20260831",caption:"集体排练"},{id:8,src:"/images/behind/photo8.jpg?v=20260831",caption:"动情独白"},{id:9,src:"/images/behind/photo9.jpg?v=20260831",caption:"井边生活"},{id:10,src:"/images/behind/photo10.jpg?v=20260831",caption:"生活特写"},{id:11,src:"/images/behind/photo11.jpg?v=20260831",caption:"挑担启程"},{id:12,src:"/images/behind/photo12.jpg?v=20260831",caption:"紧张对峙"},{id:13,src:"/images/behind/photo13.jpg?v=20260831",caption:"家中群戏"},{id:14,src:"/images/behind/photo14.jpg?v=20260831",caption:"长凳对谈"},{id:15,src:"/images/behind/photo15.jpg?v=20260831",caption:"众生百态"},{id:16,src:"/images/behind/photo16.jpg?v=20260831",caption:"静夜倾谈"},{id:17,src:"/images/behind/photo17.jpg?v=20260831",caption:"天下为公"},{id:18,src:"/images/behind/photo18.jpg?v=20260831",caption:"历史握手"},{id:19,src:"/images/behind/photo19.jpg?v=20260831",caption:"集会场景"}],l=[{id:1,title:"创作历程",author:"导演组",date:"2025-05-01",content:"<p>《吴玉章在高师》的创作历时半年，从剧本创作到最终排演，凝聚了全体主创人员的心血。</p><p>我们深入研究了吴玉章先生的生平事迹，力求在舞台上真实再现那段历史。</p>"},{id:2,title:"演员心声",author:"主演",date:"2025-05-10",content:"<p>饰演吴玉章先生是一次难得的经历。为了塑造好这个角色，我阅读了大量历史资料，努力理解那个时代知识分子的精神世界。</p>"}],p={photos:g,stories:l},s=document.getElementById("galleryGrid"),a=document.getElementById("storiesList"),i=document.getElementById("lightbox"),h=document.getElementById("lightboxClose"),c=document.getElementById("lightboxImage"),m=document.getElementById("lightboxCaption"),d=e=>{const t=new Image;t.onload=()=>{c.src=e.src,c.alt=e.caption,m.textContent=e.caption,i.classList.add("open"),document.body.style.overflow="hidden"},t.src=e.src},n=()=>{i.classList.remove("open"),document.body.style.overflow=""};s&&p.photos.forEach(e=>{const t=document.createElement("figure");t.className="gallery-item",t.tabIndex=0;const r=e.caption.charAt(0);t.innerHTML=`
      <div class="media-frame frame-4x3">
        <div class="ph" aria-hidden="true">
          <span class="ph-glyph">${r}</span>
          <span class="ph-label">Photo Coming Soon</span>
        </div>
        <img src="${e.src}" alt="${e.caption}">
      </div>
      <figcaption class="gallery-caption">${e.caption}</figcaption>`,t.querySelector("img").addEventListener("error",o=>o.target.remove(),{once:!0}),t.addEventListener("click",()=>d(e)),t.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),d(e))}),s.append(t)});a&&p.stories.forEach(e=>{const t=document.createElement("article");t.className="story",t.innerHTML=`
      <div class="story-meta">
        <span class="story-date">${e.date}</span>
        <span class="story-author">${e.author}</span>
      </div>
      <div class="story-content">
        <h3>${e.title}</h3>
        ${e.content}
      </div>`,a.append(t)});i&&(h.addEventListener("click",n),i.addEventListener("click",e=>{e.target===i&&n()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&i.classList.contains("open")&&n()}));
