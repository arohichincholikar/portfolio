/* ============================================================
   animations.js  —  Arohi Portfolio
   Drop this file next to index.html and add before </body>:
   <script src="animations.js"></script>
   ============================================================ */
 
document.addEventListener('DOMContentLoaded', () => {
 
  /* ── 1. ID CARD — 3D tilt on mouse move ───────────────── */
 
  const card = document.querySelector('.id-card');
 
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = (-dy * 12).toFixed(2);
      const rotY   = ( dx * 12).toFixed(2);
 
      card.style.transition = 'transform 0.05s ease';
      card.style.transform  =
        `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    });
 
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(.23,1,.32,1)';
      card.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
 
    /* sheen / glare overlay */
    const sheen = document.createElement('div');
    sheen.className = 'card-sheen';
    card.appendChild(sheen);
 
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      sheen.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
      sheen.style.opacity = '1';
    });
 
    card.addEventListener('mouseleave', () => {
      sheen.style.opacity = '0';
    });
  }
 
  /* ── 2. WINDOW — gentle float + wiggle on hover ────────── */
 
  const win = document.querySelector('.window');
 
  if (win) {
    /* continuous float */
    win.style.animation = 'windowFloat 4s ease-in-out infinite';
 
    /* wiggle the window-bar dots on hover */
    const dots = win.querySelectorAll('.dot');
    win.addEventListener('mouseenter', () => {
      dots.forEach((d, i) => {
        d.style.transition  = `transform 0.2s ease ${i * 60}ms`;
        d.style.transform   = 'scale(1.35)';
      });
    });
    win.addEventListener('mouseleave', () => {
      dots.forEach(d => {
        d.style.transition = 'transform 0.3s ease';
        d.style.transform  = 'scale(1)';
      });
    });
 
    /* drag-to-move the window for fun */
    let dragging = false, startX, startY, origX, origY;
 
    const bar = win.querySelector('.window-bar');
    if (bar) {
      bar.style.cursor = 'grab';
 
      bar.addEventListener('mousedown', (e) => {
        dragging = true;
        bar.style.cursor = 'grabbing';
        win.style.animation = 'none';
        win.style.position  = win.style.position || 'relative';
 
        const computed = getComputedStyle(win);
        origX  = parseInt(computed.marginLeft)  || 0;
        origY  = parseInt(computed.marginTop)   || 0;
        startX = e.clientX;
        startY = e.clientY;
        e.preventDefault();
      });
 
      document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        win.style.marginLeft = (origX + dx) + 'px';
        win.style.marginTop  = (origY + dy) + 'px';
      });
 
      document.addEventListener('mouseup', () => {
        if (!dragging) return;
        dragging = false;
        bar.style.cursor    = 'grab';
        win.style.animation = 'windowFloat 4s ease-in-out infinite';
      });
    }
  }
 
  /* ── 3. FOLDER TABS — scroll-in entrance ──────────────── */
 
  const folderSections = document.querySelectorAll('.folder-section');
  const folderTabs     = document.querySelectorAll('.folder-tab');
 
  /* start hidden */
  folderSections.forEach((s, i) => {
    s.style.opacity   = '0';
    s.style.transform = 'translateY(40px)';
    s.style.transition = `opacity 0.55s ease ${i * 0.1}s, transform 0.55s cubic-bezier(.23,1,.32,1) ${i * 0.1}s`;
  });
 
  folderTabs.forEach((t, i) => {
    t.style.opacity   = '0';
    t.style.transform = 'translateY(12px)';
    t.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
  });
 
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
 
  [...folderSections, ...folderTabs].forEach(el => revealObserver.observe(el));
 
  /* tab bounce on click */
  folderTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tab.style.transition = 'transform 0.12s ease';
      tab.style.transform  = 'translateY(-8px) scale(1.06)';
      setTimeout(() => {
        tab.style.transition = 'transform 0.3s cubic-bezier(.23,1,.32,1)';
        tab.style.transform  = 'translateY(-4px) scale(1)';
      }, 120);
    });
  });
 
  /* active tab highlight (scroll-driven) */
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        folderTabs.forEach(t => t.classList.remove('active'));
        const id     = entry.target.id;
        const active = document.querySelector(`.folder-tab[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
 
  folderSections.forEach(s => activeObserver.observe(s));
  document.addEventListener('DOMContentLoaded', () => {
 
  /* ── 1. ID CARD — 3D tilt on mouse move ───────────────── */
 
  const card = document.querySelector('.id-card');
 
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = (-dy * 12).toFixed(2);
      const rotY   = ( dx * 12).toFixed(2);
 
      card.style.transition = 'transform 0.05s ease';
      card.style.transform  =
        `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    });
 
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(.23,1,.32,1)';
      card.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
 
    /* sheen / glare overlay */
    const sheen = document.createElement('div');
    sheen.className = 'card-sheen';
    card.appendChild(sheen);
 
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      sheen.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
      sheen.style.opacity = '1';
    });
 
    card.addEventListener('mouseleave', () => {
      sheen.style.opacity = '0';
    });
  }
 
  /* ── 2. WINDOW — gentle float + wiggle on hover ────────── */
 
  const win = document.querySelector('.window');
 
  if (win) {
    /* continuous float */
    win.style.animation = 'windowFloat 4s ease-in-out infinite';
 
    /* wiggle the window-bar dots on hover */
    const dots = win.querySelectorAll('.dot');
    win.addEventListener('mouseenter', () => {
      dots.forEach((d, i) => {
        d.style.transition  = `transform 0.2s ease ${i * 60}ms`;
        d.style.transform   = 'scale(1.35)';
      });
    });
    win.addEventListener('mouseleave', () => {
      dots.forEach(d => {
        d.style.transition = 'transform 0.3s ease';
        d.style.transform  = 'scale(1)';
      });
    });
 
    /* drag-to-move the window for fun */
    let dragging = false, startX, startY, origX, origY;
 
    const bar = win.querySelector('.window-bar');
    if (bar) {
      bar.style.cursor = 'grab';
 
      bar.addEventListener('mousedown', (e) => {
        dragging = true;
        bar.style.cursor = 'grabbing';
        win.style.animation = 'none';
        win.style.position  = win.style.position || 'relative';
 
        const computed = getComputedStyle(win);
        origX  = parseInt(computed.marginLeft)  || 0;
        origY  = parseInt(computed.marginTop)   || 0;
        startX = e.clientX;
        startY = e.clientY;
        e.preventDefault();
      });
 
      document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        win.style.marginLeft = (origX + dx) + 'px';
        win.style.marginTop  = (origY + dy) + 'px';
      });
 
      document.addEventListener('mouseup', () => {
        if (!dragging) return;
        dragging = false;
        bar.style.cursor    = 'grab';
        win.style.animation = 'windowFloat 4s ease-in-out infinite';
      });
    }
  }
 
  /* ── 3. FOLDER TABS — scroll-in entrance ──────────────── */
 
  const folderSections = document.querySelectorAll('.folder-section');
  const folderTabs     = document.querySelectorAll('.folder-tab');
 
  /* start hidden */
  folderSections.forEach((s, i) => {
    s.style.opacity   = '0';
    s.style.transform = 'translateY(40px)';
    s.style.transition = `opacity 0.55s ease ${i * 0.1}s, transform 0.55s cubic-bezier(.23,1,.32,1) ${i * 0.1}s`;
  });
 
  folderTabs.forEach((t, i) => {
    t.style.opacity   = '0';
    t.style.transform = 'translateY(12px)';
    t.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
  });
 
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
 
  [...folderSections, ...folderTabs].forEach(el => revealObserver.observe(el));
 
  /* tab bounce on click */
  folderTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tab.style.transition = 'transform 0.12s ease';
      tab.style.transform  = 'translateY(-8px) scale(1.06)';
      setTimeout(() => {
        tab.style.transition = 'transform 0.3s cubic-bezier(.23,1,.32,1)';
        tab.style.transform  = 'translateY(-4px) scale(1)';
      }, 120);
    });
  });
 
  /* active tab highlight (scroll-driven) */
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        folderTabs.forEach(t => t.classList.remove('active'));
        const id     = entry.target.id;
        const active = document.querySelector(`.folder-tab[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
 
  folderSections.forEach(s => activeObserver.observe(s));
 
  /* ── 4. HERO ENTRANCE — stagger on load ───────────────── */
 
  const heroLeft  = document.querySelector('.left-side');
  const heroRight = document.querySelector('.right-side');
 
  if (heroLeft) {
    heroLeft.style.opacity   = '0';
    heroLeft.style.transform = 'translateX(-30px)';
    heroLeft.style.transition = 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.23,1,.32,1) 0.1s';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      heroLeft.style.opacity   = '1';
      heroLeft.style.transform = 'translateX(0)';
    }));
  }
 
  if (heroRight) {
    heroRight.style.opacity   = '0';
    heroRight.style.transform = 'translateX(30px)';
    heroRight.style.transition = 'opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(.23,1,.32,1) 0.3s';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      heroRight.style.opacity   = '1';
      heroRight.style.transform = 'translateX(0)';
    }));
  }
 
  /* ── 5. CHECKERBOARD — parallax on scroll ─────────────── */
 
  const checker = document.querySelector('.checkerboard');
 
  if (checker) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.35;
      checker.style.backgroundPosition =
        `${y * 0.5}px 0, ${y * 0.5}px 19px, ${19 + y * 0.5}px -19px, ${-19 + y * 0.5}px 0`;
    }, { passive: true });
  }
 
  /* ── 6. STICKY NOTE — typewriter effect ───────────────── */
 
  const hiText = document.querySelector('.hi-text');
 
  if (hiText) {
    const original = hiText.textContent.trim();
    hiText.textContent = '';
    hiText.style.borderRight = '2px solid #7a5c00';
 
    let i = 0;
    const type = () => {
      if (i < original.length) {
        hiText.textContent += original[i++];
        setTimeout(type, 55);
      } else {
        /* blinking cursor stops after typing */
        hiText.style.animation = 'cursorBlink 0.8s step-end 4';
        hiText.addEventListener('animationend', () => {
          hiText.style.borderRight = 'none';
        }, { once: true });
      }
    };
 
    /* start after hero entrance */
    setTimeout(type, 700);
  }
 
  /* ── 7. STAR in name — spin on hover ─────────────────── */
 
  const starEl = document.querySelector('.star');
 
  if (starEl) {
    const nameEl = document.querySelector('.name');
    if (nameEl) {
      nameEl.addEventListener('mouseenter', () => {
        starEl.style.transition = 'transform 0.5s cubic-bezier(.23,1,.32,1)';
        starEl.style.transform  = 'translate(-50%,-50%) rotate(180deg) scale(1.4)';
      });
      nameEl.addEventListener('mouseleave', () => {
        starEl.style.transition = 'transform 0.5s cubic-bezier(.23,1,.32,1)';
        starEl.style.transform  = 'translate(-50%,-50%) rotate(0deg) scale(1)';
      });
    }
  }
 
  /* ── 8. INJECT KEYFRAMES ──────────────────────────────── */
 
  const style = document.createElement('style');
  style.textContent = `
 
    /* window float */
    @keyframes windowFloat {
      0%, 100% { transform: translateY(0px);  }
      50%       { transform: translateY(-8px); }
    }
 
    /* cursor blink for typewriter */
    @keyframes cursorBlink {
      0%, 100% { border-color: #7a5c00; }
      50%       { border-color: transparent; }
    }
 
    /* sheen overlay on id-card */
    .card-sheen {
      position: absolute;
      inset: 0;
      opacity: 0;
      pointer-events: none;
      border-radius: inherit;
      transition: opacity 0.2s ease;
      z-index: 10;
    }
 
    /* smooth tab transition */
    .folder-tab {
      transition:
        opacity    0.4s ease,
        transform  0.4s ease,
        background 0.2s ease,
        box-shadow 0.2s ease !important;
    }
 
    /* folder section smooth reveal */
    .folder-section {
      will-change: opacity, transform;
    }
 
  `;
  document.head.appendChild(style);
 
});
 
const projectData = {
  digit: {
    title: "Handwritten Digit Recognition",
    image: "images/digit.png",
    desc: "A machine learning model that classifies handwritten digits using the sklearn digits dataset.",
    stack: "Python • scikit-learn • NumPy • Pandas • Matplotlib",
    github: "https://github.com/arohichincholikar/handwritten-digit-recognition.git"
  },
  
  sorting: {
    title: "Sorting Visualizer",
    image: "images/sorting.png",
    desc: "An interactive visualizer that demonstrates sorting algorithms step-by-step with animations.",
    stack: "HTML • CSS • JavaScript • DSA",
    github: "https://github.com/arohichincholikar/sorting-visualiser.git"
  },

  canteen: {
    title: "Smart College Canteen App",
    image: "images/canteen.png",
    desc:"A web-based food ordering and payment platform developed for college canteens. Designed for users as well as canteen admins.",
    stack:"HTML • CSS • JavaScript • Firebase Authentication • Firestore",
    github:"https://github.com/gnits-smart-canteen/college-canteen-app.git"
  },

  movie: {
    title: "Mood-Based Movie Recommender",
    image: "images/movie.png",
    desc:"A movie recommendation website that suggests films based on user mood, preferred runtime, and viewing preferences.",
    stack:"HTML • CSS • JavaScript • TMDB API",
    github:"https://github.com/arohichincholikar/movie-mood-randomiser.git"
  },

  cyberdeck: {
    title:"Cyberdeck OS for Raspberry Pi",
    image: "images/cyberdeck.png",
    desc:"Retro-inspired desktop environment built using Python and Pygame, designed as the software layer for a future handheld cyberdeck",
    stack:"Python • Pygame • JSON • PyMuPDF",
    github:"https://github.com/arohichincholikar/pixeldeck-os.git"
  }
};

function openProject(id){
  const project = projectData[id];

  document.getElementById("popupImage").src = project.image;
  document.getElementById("popupTitle").textContent = project.title;
  document.getElementById("popupDesc").textContent = project.desc;
  document.getElementById("popupStack").textContent = project.stack;

  const githubBtn = document.getElementById("popupGithub");
  githubBtn.href = project.github;

  document.getElementById("projectPopup").classList.add("active");
}

function closeProject(){
  document.getElementById("projectPopup").classList.remove("active");
}
 
  /* ── 4. HERO ENTRANCE — stagger on load ───────────────── */
 
  const heroLeft  = document.querySelector('.left-side');
  const heroRight = document.querySelector('.right-side');
 
  if (heroLeft) {
    heroLeft.style.opacity   = '0';
    heroLeft.style.transform = 'translateX(-30px)';
    heroLeft.style.transition = 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.23,1,.32,1) 0.1s';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      heroLeft.style.opacity   = '1';
      heroLeft.style.transform = 'translateX(0)';
    }));
  }
 
  if (heroRight) {
    heroRight.style.opacity   = '0';
    heroRight.style.transform = 'translateX(30px)';
    heroRight.style.transition = 'opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(.23,1,.32,1) 0.3s';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      heroRight.style.opacity   = '1';
      heroRight.style.transform = 'translateX(0)';
    }));
  }
 
 
  /* ── 5. CHECKERBOARD — parallax on scroll ─────────────── */
  const checker = document.querySelector('.checkerboard');

function initCheckerboard(){

  if(window.innerWidth <= 700) return;

  window.addEventListener('scroll', () => {

    const y = window.scrollY * 0.35;

    checker.style.backgroundPosition =
      `${y * 0.5}px 0,
       ${y * 0.5}px 19px,
       ${19 + y * 0.5}px -19px,
       ${-19 + y * 0.5}px 0`;

  }, { passive:true });

}

initCheckerboard();
 
  /* ── 6. STICKY NOTE — typewriter effect ───────────────── */
 
  const hiText = document.querySelector('.hi-text');
 
  if (hiText) {
    const original = hiText.textContent.trim();
    hiText.textContent = '';
    hiText.style.borderRight = '2px solid #7a5c00';
 
    let i = 0;
    const type = () => {
      if (i < original.length) {
        hiText.textContent += original[i++];
        setTimeout(type, 55);
      } else {
        /* blinking cursor stops after typing */
        hiText.style.animation = 'cursorBlink 0.8s step-end 4';
        hiText.addEventListener('animationend', () => {
          hiText.style.borderRight = 'none';
        }, { once: true });
      }
    };
 
    /* start after hero entrance */
    setTimeout(type, 700);
  }
 
  /* ── 7. STAR in name — spin on hover ─────────────────── */
 
  const starEl = document.querySelector('.star');
 
  if (starEl) {
    const nameEl = document.querySelector('.name');
    if (nameEl) {
      nameEl.addEventListener('mouseenter', () => {
        starEl.style.transition = 'transform 0.5s cubic-bezier(.23,1,.32,1)';
        starEl.style.transform  = 'translate(-50%,-50%) rotate(180deg) scale(1.4)';
      });
      nameEl.addEventListener('mouseleave', () => {
        starEl.style.transition = 'transform 0.5s cubic-bezier(.23,1,.32,1)';
        starEl.style.transform  = 'translate(-50%,-50%) rotate(0deg) scale(1)';
      });
    }
  }
 
  /* ── 8. INJECT KEYFRAMES ──────────────────────────────── */
 
  const style = document.createElement('style');
  style.textContent = `
 
    /* window float */
    @keyframes windowFloat {
      0%, 100% { transform: translateY(0px);  }
      50%       { transform: translateY(-8px); }
    }
 
    /* cursor blink for typewriter */
    @keyframes cursorBlink {
      0%, 100% { border-color: #7a5c00; }
      50%       { border-color: transparent; }
    }
 
    /* sheen overlay on id-card */
    .card-sheen {
      position: absolute;
      inset: 0;
      opacity: 0;
      pointer-events: none;
      border-radius: inherit;
      transition: opacity 0.2s ease;
      z-index: 10;
    }
 
    /* smooth tab transition */
    .folder-tab {
      transition:
        opacity    0.4s ease,
        transform  0.4s ease,
        background 0.2s ease,
        box-shadow 0.2s ease !important;
    }
 
    /* folder section smooth reveal */
    .folder-section {
      will-change: opacity, transform;
    }
 
  `;
  document.head.appendChild(style);
 
});
 
const projectData = {
  digit: {
    title: "Handwritten Digit Recognition",
    image: "images/projects/digit.png",
    desc: "A machine learning model that classifies handwritten digits using the sklearn digits dataset.",
    stack: "Python • scikit-learn • NumPy • Pandas • Matplotlib",
    github: "https://github.com/arohichincholikar/handwritten-digit-recognition.git"
  },
  
  sorting: {
    title: "Sorting Visualizer",
    image: "images/projects/sorting.png",
    desc: "An interactive visualizer that demonstrates sorting algorithms step-by-step with animations.",
    stack: "HTML • CSS • JavaScript • DSA",
    github: "https://github.com/arohichincholikar/sorting-visualiser.git"
  },

  canteen: {
    title: "Smart College Canteen App",
    image: "images/projects/canteen.png",
    desc:"A web-based food ordering and payment platform developed for college canteens. Designed for users as well as canteen admins.",
    stack:"HTML • CSS • JavaScript • Firebase Authentication • Firestore",
    github:"https://github.com/gnits-smart-canteen/college-canteen-app.git"
  },

  movie: {
    title: "Mood-Based Movie Recommender",
    image: "images/projects/movie.png",
    desc:"A movie recommendation website that suggests films based on user mood, preferred runtime, and viewing preferences.",
    stack:"HTML • CSS • JavaScript • TMDB API",
    github:"https://github.com/arohichincholikar/movie-mood-randomiser.git"
  },

  cyberdeck: {
    title:"Cyberdeck OS for Raspberry Pi",
    image: "images/projects/cyberdeck.png",
    desc:"Retro-inspired desktop environment built using Python and Pygame, designed as the software layer for a future handheld cyberdeck",
    stack:"Python • Pygame • JSON • PyMuPDF",
    github:"https://github.com/arohichincholikar/pixeldeck-os.git"
  },

  attendance: {
    title:"Smart Attendance Planner using ML",
    image: "images/projects/attendance.png",
    desc:"A smart attendance management tool that predicts attendance risk, calculates safe absences, and helps plan for attendance goals.",
    stack:"Python • Scikit-learn • Pandas • Streamlit • Joblib",
    github:"https://github.com/arohichincholikar/attendsense.git"
  }
};

function openProject(id){
  const project = projectData[id];

  document.getElementById("popupImage").src = project.image;
  document.getElementById("popupTitle").textContent = project.title;
  document.getElementById("popupDesc").textContent = project.desc;
  document.getElementById("popupStack").textContent = project.stack;

  const githubBtn = document.getElementById("popupGithub");
  githubBtn.href = project.github;

  document.getElementById("projectPopup").classList.add("active");
}

function closeProject(){
  document.getElementById("projectPopup").classList.remove("active");
}

let designHistory = [];

const designPages = {
  club: {
    title: "club work",
    desc: "art club work organized into branding, posters and event visuals.",
    items: [
      { type:"folder", id:"club-branding", title:"branding", image:"images/design/folders/club-branding.png" },
      { type:"folder", id:"club-posters", title:"posters", image:"images/design/folders/club-posters.png" },
      { type:"folder", id:"club-events", title:"event visuals", image:"images/design/folders/club-events.png" }
    ]
  },

  "club-branding": {
    title: "club work / branding",
    desc: "theme pitches, visual direction and identity explorations.",
    items: [
      { type:"project", id:"pixelverse", title:"pixelverse pitch", image:"images/design/covers/pixelverse-cover.png" }
    ]
  },

  "club-posters": {
    title: "club work / posters",
    desc: "poster designs and promotional graphics for club events.",
    items: []
  },

  "club-events": {
    title: "club work / event visuals",
    desc: "photos, event identity and visuals used during club activities.",
    items: []
  },

  uiweb: {
    title: "ui & web design",
    desc: "websites, interfaces and visual identity projects.",
    items: [
      { type:"folder", id:"ui-websites", title:"websites", image:"images/design/folders/ui-websites.png" },
      { type:"folder", id:"ui-interfaces", title:"interfaces", image:"images/design/folders/ui-interfaces.png" },
      { type:"folder", id:"ui-identities", title:"visual identities", image:"images/design/folders/ui-visuals.png" }
    ]
  },

  "ui-websites": {
    title: "ui & web design / websites",
    desc: "websites designed and developed for personal, academic and professional use.",
    items: [
      { type:"project", id:"portfolio", title:"portfolio website", image:"images/design/covers/portfolio-cover.png" },
      { type:"project", id:"dakshah", title:"dakshah redesign", image:"images/design/covers/dakshah-cover.png" }
    ]
  },

  "ui-interfaces": {
    title: "ui & web design / interfaces",
    desc: "interface layouts, app flows and interaction-focused design work.",
    items: [
      { type:"project", id:"amazon", title:"amazon case study", image:"images/design/covers/amazon-cover.png" },
      { type:"project", id:"canteen-ui", title:"canteen app ui", image:"images/design/covers/canteen-cover.png" }
    ]
  },

  "ui-identities": {
    title: "ui & web design / visual identities",
    desc: "branding, packaging and editorial-style visual systems.",
    items: [
      { type:"project", id:"zauq", title:"zauq cafe branding", image:"images/design/covers/zauq-cover.png" },
      { type:"project", id:"packaging", title:"3d packaging design", image:"images/design/covers/packaging-cover.png" },
      { type:"project", id:"magazine", title:"magazine layouts", image:"images/design/covers/magazine-cover.png" }
    ]
  },

  archive: {
    title: "personal archive",
    desc: "illustrations, sketches, posters and visual experiments.",
    items: [
      { type:"folder", id:"archive-illustrations", title:"illustrations", image:"images/design/folders/personal-illustrations.png" },
      { type:"folder", id:"archive-sketchbook", title:"sketches", image:"images/design/folders/personal-sketchbook.png" },
      { type:"folder", id:"archive-animation", title:"animation", image:"images/design/folders/personal-animations.png" },
      { type:"folder", id:"archive-posters", title:"posters", image:"images/design/folders/personal-posters.png" },
      { type:"folder", id:"archive-experiments", title:"experiments", image:"images/design/folders/personal-experiments.png" },
      { type:"folder", id:"archive-crafts", title:"crafts & diys", image:"images/design/folders/personal-crafts.png" }
    ]
  },

  "archive-illustrations": {
    title: "personal archive / illustrations",
    desc: "digital drawings, character art and visual experiments.",
    items: []
  },

  "archive-sketchbook": {
    title: "personal archive / sketches",
    desc: "pencil sketches, studies and rough visual ideas.",
    items: []
  },

  "archive-animation": {
    title: "personal archive / animation",
    desc: "short motion experiments and animated pieces.",
    items: []
  },

  "archive-posters": {
    title: "personal archive / posters",
    desc: "personal-use posters and visual layouts made for fun.",
    items: []
  },

  "archive-experiments": {
    title: "personal archive / experiments",
    desc: "typography, layouts, textures and random creative tests.",
    items: []
  },

  "archive-crafts": {
    title: "personal archive / crafts & diys",
    desc: "hands-on creative experiments, handmade work and DIYs.",
    items: []
  }
};

function openDesignCategory(pageId){
  designHistory = [];
  renderDesignPage(pageId);
  document.getElementById("designPopup").classList.add("active");
}

function renderDesignPage(pageId){
  const page = designPages[pageId];

  if(!page) return;

  document.getElementById("designPopupTitle").textContent = page.title;
  document.getElementById("designPopupDesc").textContent = page.desc;

  const grid = document.getElementById("designFolderGrid");
  grid.innerHTML = "";

  page.items.forEach(item => {
    const card = document.createElement("div");

    card.className = item.type === "folder"
      ? "mini-folder-card"
      : "mini-project-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <p>${item.title}</p>
    `;

    card.onclick = () => {
      if(item.type === "folder"){
        designHistory.push(pageId);
        renderDesignPage(item.id);
      } else {
        openDesignProject(item.id);
      }
    };

    grid.appendChild(card);
  });

  document.getElementById("designBackBtn").style.display =
    designHistory.length ? "block" : "none";
}

function goBackDesign(){
  const previousPage = designHistory.pop();

  if(previousPage){
    renderDesignPage(previousPage);
  }
}

function closeDesignPopup(){
  document.getElementById("designPopup").classList.remove("active");
  designHistory = [];
}

function openDesignProject(projectId){
  console.log("open design project:", projectId);

  // next step:
  // here we’ll open a case study / project details view
}