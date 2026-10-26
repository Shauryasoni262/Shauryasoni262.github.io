
function revealToSpan() {
    document.querySelectorAll(".reveal")
        .forEach(function (elem) {
            var parent = document.createElement("span");
            var child = document.createElement("span");

            parent.classList.add("parent");
            child.classList.add("child");

            // Wrap content in <span> elements
            child.innerHTML = elem.innerHTML;
            parent.appendChild(child);

            elem.innerHTML = "";
            elem.appendChild(parent);

            // Ensure the text is visible when wrapping
            gsap.set(child, { opacity: 1, visibility: "visible" });
        });
}

function valueSetters() {
    gsap.set("#nav a", {
        y: "-100%", opacity: 0
    });
    gsap.set("#home .parent .child", { y: "100%" });
    gsap.set("#home .row img", { opacity: 0 });

    document.querySelectorAll("#Visual>g>g>path, #Visual>g>g>polyline").forEach(function (e) {
        var character = e;
        character.style.strokeDasharray = character.getTotalLength() + 'px';
        character.style.strokeDashoffset = character.getTotalLength() + 'px';
    });
}

function loaderAnimation() {
    var tl = gsap.timeline();
    tl
        .from("#loader .child span", {
            x: 100,
            stagger: .2,
            duration: 0.8,
            opacity: .4,
            ease: Power3.easeInout
        })
        .to("#loader .parent .child", {
            y: "-100%",
            duration: 1,
            ease: Circ.easeInout
        })
        .to("#loader .loader-container", {
            opacity: 0,
            duration: 0.5,
            ease: Circ.easeInOut,
        }, "-=0.5")
        .to("#loader", {
            height: 0,
            duration: 0.7,
            ease: Circ.easeInout
        })
        .to("#green", {
            top: 0,
            height: "100%",
            duration: 0.7,
            delay: -1.2,
            ease: Circ.easeInout
        })
        .to("#green", {
            height: "0%",
            delay: -.5,
            duration: 0.9,
            ease: Circ.easeInout,
            onComplete: function () {
                // Remove loading classes and enable scrolling
                document.body.classList.remove('loading');
                document.querySelector('#main').classList.remove('loading');
                // Initialize LocomotiveScroll after loader completes
                locoInitialize();
                animateHomepage();
            }
        });
}

function animateSvg() {
    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
        strokeDashoffset: 0,
        duration: 2,
        ease: Expo.easeInOut
    });
}

function animateHomepage() {
    var tl = gsap.timeline();
    tl
        .to("#nav a", {
            y: 0,
            opacity: 1,
            stagger: .03,
            ease: Expo.easeInOut
        })
        .to("#home .parent .child", {
            y: 0,
            stagger: 0.01,
            duration: 0.7,
            ease: Expo.easeInOut
        })
        .to("#home .row img", {
            opacity: 1,
            delay: -.5,
            ease: Expo.easeInOut,
            onComplete: function () {
                animateSvg();
            }
        });
}

function updateLocalTime() {
    const localTimeElement = document.getElementById('local-time');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    localTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}





function locoInitialize() {
    // Initialize LocomotiveScroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#main"), // Main scroll container
        smooth: true
    });

    // Sync ScrollTrigger with LocomotiveScroll
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? scroll.scrollTo(value, 0, 0) // Scroll to the specified position
                : scroll.scroll.instance.scroll.y; // Get current scroll position
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // Update ScrollTrigger and LocomotiveScroll on scroll events
    scroll.on("scroll", () => {
        ScrollTrigger.update();
    });

    ScrollTrigger.addEventListener("refresh", () => scroll.update());

    // Image rotation animations
    gsap.to("#imgrig .imgcntnr:nth-child(1)", {
        rotate: -40, // Rotate image
        scrollTrigger: {
            trigger: "#imgrig",
            start: "top 100%", // Trigger point
            end: "top 10%",   // End point
            scrub: true,      // Smooth scrolling effect
            scroller: "#main", // Pass LocomotiveScroll container here
            markers: false     // Debugging markers (remove in production)
        }
    });

    gsap.to("#imgrig .imgcntnr:nth-child(2)", {
        rotate: -15, // Rotate image
        scrollTrigger: {
            trigger: "#imgrig",
            start: "top 100%", // Trigger point
            end: "top 10%",   // End point
            scrub: true,      // Smooth scrolling effect
            scroller: "#main", // Pass LocomotiveScroll container here
            markers: false    // Debugging markers (remove in production)
        }
    });

    gsap.to("#imgrig .imgcntnr:nth-child(3)", {
        rotate: 5, // Rotate image
        scrollTrigger: {
            trigger: "#imgrig",
            start: "top 100%", // Trigger point
            end: "top 10%",   // End point
            scrub: true,      // Smooth scrolling effect
            scroller: "#main", // Pass LocomotiveScroll container here
            markers: false     // Debugging markers (remove in production)
        }
    });

    // Text animation example
    gsap.fromTo(
        ".animate-text span",
        {
            y: "100%",
            opacity: 0
        },
        {
            y: "0%",
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".h1-container",
                start: "top 60%",
                end: "bottom top",
                scroller: "#main"
            }
        }
    );

    // Refresh ScrollTrigger after initialization
    ScrollTrigger.refresh();
}

// Initialize everything


 







// Add loading classes to prevent scrolling during loader
document.body.classList.add('loading');
document.querySelector('#main').classList.add('loading');

revealToSpan();
valueSetters();
loaderAnimation();
setInterval(updateLocalTime, 1000);
// LocomotiveScroll will be initialized after loader completes



// Prevent default action for links with class 'prevent-default'
document.querySelectorAll('.prevent-default').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
    });
});



// Update the local time every second



// Show the overlay when the "Credits" link is clicked
document.getElementById('credits-link').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('credits-overlay').style.display = 'block';
});

// Hide the overlay when the close button is clicked
document.getElementById('close-overlay').addEventListener('click', function () {
  document.getElementById('credits-overlay').style.display = 'none';
});

/* ==========================================================================
   Centralized Portfolio Data Renderer & Secret Admin Editor Logic
   ========================================================================== */

let currentPortfolioData = null;
let clickCount = 0;
let clickTimer = null;

// Default fallback portfolio data schema
const defaultPortfolioSchema = {
  "passcode": "shaurya2025",
  "personal": {
    "firstName": "Shaurya",
    "lastName": "Soni",
    "title": "Full-Stack Developer | React & Node.js Expert | Lucknow",
    "bioHeadline": "I AM SHAURYA SONI, I CREATE Unconventional YET FUNCTIONAL & VISUALLY PLEASING INTERFACES FOR THE MOBILE AND WEB.",
    "aboutMe": "I'm Shaurya Soni, a passionate full-stack developer from Lucknow, India. Beyond coding, I'm passionate about exploring the mysteries of space, capturing the beauty of life through photography, and expressing creativity through art. As a professional developer, I combine technical expertise with creative vision to build innovative web applications and mobile solutions.",
    "availability": "CURRENTLY AVAILABLE FOR FREELANCE WORLDWIDE",
    "email": "shauryasoni262@gmail.com",
    "location": "Lucknow, Uttar Pradesh, India",
    "resumeLink": "https://drive.google.com/file/d/1MfAwIEYODknAkQA2HJp5Re9v_r9dYv3N/view?usp=sharing"
  },
  "socials": {
    "instagram": { "url": "https://www.instagram.com/_shaurya.262_/", "handle": "@_shaurya.262_" },
    "github": { "url": "https://github.com/Shauryasoni262/", "handle": "@Shauryasoni" },
    "linkedin": { "url": "https://www.linkedin.com/in/shaurya-soni-484589237/", "handle": "@Shaurya_Soni" },
    "twitter": { "url": "https://x.com/shauryasoni262", "handle": "@shauryasoni262" }
  },
  "projects": [
    {
      "id": "clouddrive",
      "title": "CloudDrive App",
      "titleFormatted": "C<span class=\"fonting\">l</span>oudDrive App",
      "year": "2025",
      "role": "Back-End Dev",
      "image": "images/jug.jpg",
      "altText": "CloudDrive App - Backend Development Project by Shaurya Soni",
      "link": "https://clouddrive-s75j.onrender.com"
    },
    {
      "id": "articia",
      "title": "Articia App",
      "titleFormatted": "A<span class=\"fonting\">r</span>ticia App",
      "year": "2023",
      "role": "Front-End Dev",
      "image": "images/ayumi.jpg",
      "altText": "Articia App - Frontend Development Project by Shaurya Soni",
      "link": "https://shauryasoni262.github.io/Articia/"
    },
    {
      "id": "rbac-ui",
      "title": "RBAC UI",
      "titleFormatted": "R<span class=\"fonting\">B</span>AC UI",
      "year": "2024",
      "role": "React",
      "image": "images/Imageing.jpg",
      "altText": "RBAC UI - React Role-Based Access Control Project by Shaurya Soni",
      "link": "https://vrv-security-assignment.netlify.app/"
    },
    {
      "id": "todo-list",
      "title": "Todo-List",
      "titleFormatted": "T<span class=\"fonting\">o</span>do-List",
      "year": "2024",
      "role": "React & Redux",
      "image": "images/Imgs.jpg",
      "altText": "Todo-List App - React and Redux Project by Shaurya Soni",
      "link": "https://todo-list-shauryas.netlify.app/"
    },
    {
      "id": "wedding-invitation",
      "title": "Wedding-Invitation",
      "titleFormatted": "Wedding-Invitation",
      "year": "2023",
      "role": "Front-End Dev",
      "image": "images/flowers.jpg",
      "altText": "Wedding Invitation Website - Frontend Development Project by Shaurya Soni",
      "link": "https://shauryasoni262.github.io/Wedding-Invitation/"
    }
  ],
  "expertise": [
    { "id": "frontend", "name": "Frontend Development", "description": "React • JavaScript • GSAP • Bootstrap • Redux • HTML/CSS" },
    { "id": "backend", "name": "Backend Development", "description": "Node.js • Express.js • MongoDB • RESTful APIs • Database Design" },
    { "id": "mobile", "name": "Mobile App Development", "description": "Flutter • Dart • Cross-platform • Mobile UI/UX • App Deployment" }
  ]
};

// 1. Fetch & Initialize Portfolio Data
async function initPortfolioData() {
  try {
    const response = await fetch('data/portfolio.json?t=' + Date.now());
    if (response.ok) {
      currentPortfolioData = await response.json();
    } else {
      console.warn('data/portfolio.json not found via fetch, loading default schema.');
      currentPortfolioData = JSON.parse(JSON.stringify(defaultPortfolioSchema));
    }
  } catch (err) {
    console.warn('Error fetching portfolio.json:', err);
    currentPortfolioData = JSON.parse(JSON.stringify(defaultPortfolioSchema));
  }

  // Render DOM with active dataset
  renderPortfolioDOM(currentPortfolioData);
  initAdminModalEvents();
}

// 2. DOM Rendering Function
function renderPortfolioDOM(data) {
  if (!data) return;

  // Render Projects Gallery
  const imagesContainer = document.getElementById('images');
  if (imagesContainer && data.projects && Array.isArray(data.projects)) {
    imagesContainer.innerHTML = '';
    data.projects.forEach((proj, idx) => {
      const projIndexClass = `cnt cnt${idx + 1}`;
      const projDiv = document.createElement('div');
      projDiv.className = projIndexClass;
      projDiv.setAttribute('data-scroll', '');
      
      const formattedTitle = proj.titleFormatted || proj.title;

      projDiv.innerHTML = `
        <div class="image-container" data-scroll>
          <a href="${proj.link}" target="_blank" rel="noopener noreferrer">
            <img data-scroll data-scroll-speed="-2" src="${proj.image}" alt="${proj.altText || proj.title}">
          </a>
          <div class="text-overlay" data-scroll>
            <div class="year" data-scroll>Year: ${proj.year || ''}</div>
            <div class="role" data-scroll>Role: ${proj.role || ''}</div>
            <div class="contain">
              <div class="website-name" data-scroll>${formattedTitle}</div>
            </div>
          </div>
        </div>
      `;
      imagesContainer.appendChild(projDiv);
    });

    // Update Project Counter Badge
    const miniCounter = document.querySelector('.workrow .mini');
    if (miniCounter) {
      const formattedCount = data.projects.length < 10 ? `(0${data.projects.length})` : `(${data.projects.length})`;
      miniCounter.textContent = formattedCount;
    }
  }

  // Render About Me Text
  const aboutMeSection = document.getElementById('about-me');
  if (aboutMeSection && data.personal) {
    const aboutHeading = aboutMeSection.querySelector('h1');
    const aboutDesc = aboutMeSection.querySelector('p');
    if (aboutHeading) aboutHeading.textContent = `@More About Me - ${data.personal.title || 'Full-Stack Developer'}`;
    if (aboutDesc && data.personal.aboutMe) aboutDesc.textContent = data.personal.aboutMe;
  }

  // Render Expertise / Skills
  const servicesContainer = document.querySelector('#expertise .services');
  if (servicesContainer && data.expertise && Array.isArray(data.expertise)) {
    servicesContainer.innerHTML = '';
    data.expertise.forEach(item => {
      const box = document.createElement('div');
      box.className = 'service-box';
      box.setAttribute('itemprop', 'knowsAbout');
      box.setAttribute('itemscope', '');
      box.setAttribute('itemtype', 'https://schema.org/Thing');
      box.innerHTML = `
        <h3 itemprop="name">${item.name}</h3>
        <p itemprop="description">${item.description}</p>
      `;
      servicesContainer.appendChild(box);
    });
  }

  // Render Social Links in Nav & Footer
  if (data.socials) {
    const navDropdown = document.querySelector('#nav .dropdown');
    if (navDropdown) {
      navDropdown.innerHTML = `
        <a href="${data.socials.instagram.url}" target="_blank">Instagram</a>
        <a href="${data.socials.github.url}" target="_blank">GitHub</a>
        <a href="${data.socials.linkedin.url}" target="_blank">LinkedIn</a>
        <a href="${data.socials.twitter.url}" target="_blank">Twitter</a>
      `;
    }

    const connectLinks = document.querySelectorAll('#connect .links a');
    if (connectLinks.length >= 4) {
      // Instagram
      connectLinks[0].href = data.socials.linkedin.url;
      connectLinks[0].querySelector('span').textContent = data.socials.linkedin.handle;
      // GitHub
      connectLinks[1].href = data.socials.github.url;
      connectLinks[1].querySelector('span').textContent = data.socials.github.handle;
      // Twitter
      connectLinks[2].href = data.socials.twitter.url;
      connectLinks[2].querySelector('span').textContent = data.socials.twitter.handle;
      // Instagram
      connectLinks[3].href = data.socials.instagram.url;
      connectLinks[3].querySelector('span').textContent = data.socials.instagram.handle;
    }
  }

  // Update Resume Link in Nav
  if (data.personal && data.personal.resumeLink) {
    const resumeNav = document.querySelector('#nav a[target="_blank"]');
    if (resumeNav) resumeNav.href = data.personal.resumeLink;
  }
}

// 3. Secret Admin Editor Modal Events & Controls
function initAdminModalEvents() {
  const overlay = document.getElementById('admin-modal-overlay');
  const closeBtn = document.getElementById('admin-modal-close');
  const copyrightTrigger = document.getElementById('copyright-trigger');

  // Trigger 1: Keyboard Shortcut (Ctrl + Shift + E or Cmd + Shift + E)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
      e.preventDefault();
      openAdminModal();
    }
  });

  // Trigger 2: Triple Click on Footer Copyright
  if (copyrightTrigger) {
    copyrightTrigger.addEventListener('click', () => {
      clickCount++;
      if (clickCount === 1) {
        clickTimer = setTimeout(() => { clickCount = 0; }, 800);
      } else if (clickCount >= 3) {
        clearTimeout(clickTimer);
        clickCount = 0;
        openAdminModal();
      }
    });
  }

  // Close Modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeAdminModal);
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAdminModal();
    });
  }

  // Passcode Auth Form Submit
  const authForm = document.getElementById('admin-auth-form');
  const passInput = document.getElementById('admin-passcode-input');
  const authError = document.getElementById('admin-auth-error');

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPass = passInput.value.trim();
      const validPass = (currentPortfolioData && currentPortfolioData.passcode) ? currentPortfolioData.passcode : 'shaurya2025';

      if (enteredPass === validPass) {
        authError.classList.add('hidden');
        document.getElementById('admin-auth-screen').classList.add('hidden');
        document.getElementById('admin-editor-screen').classList.remove('hidden');
        populateAdminEditorForm();
      } else {
        authError.classList.remove('hidden');
        passInput.value = '';
        passInput.focus();
      }
    });
  }

  // Tab Switching
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetPanel = document.getElementById(btn.getAttribute('data-tab'));
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Project CRUD buttons
  document.getElementById('admin-add-project-btn').addEventListener('click', () => {
    showProjectForm();
  });

  document.getElementById('admin-cancel-project-btn').addEventListener('click', () => {
    document.getElementById('admin-project-form-container').classList.add('hidden');
  });

  document.getElementById('admin-save-project-btn').addEventListener('click', saveProjectForm);

  // Footer Action Buttons
  document.getElementById('admin-live-preview-btn').addEventListener('click', () => {
    syncFormToDataState();
    renderPortfolioDOM(currentPortfolioData);
    alert('✨ Live Preview updated successfully!');
  });

  document.getElementById('admin-download-json-btn').addEventListener('click', () => {
    syncFormToDataState();
    downloadJSONFile(currentPortfolioData, 'portfolio.json');
  });

  document.getElementById('admin-copy-json-btn').addEventListener('click', () => {
    syncFormToDataState();
    navigator.clipboard.writeText(JSON.stringify(currentPortfolioData, null, 2))
      .then(() => alert('📋 portfolio.json copied to clipboard!'))
      .catch(err => alert('Failed to copy: ' + err));
  });

  document.getElementById('admin-gh-push-btn').addEventListener('click', pushJSONToGitHub);
}

function openAdminModal() {
  const overlay = document.getElementById('admin-modal-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    const passInput = document.getElementById('admin-passcode-input');
    if (passInput) passInput.focus();
  }
}

function closeAdminModal() {
  const overlay = document.getElementById('admin-modal-overlay');
  if (overlay) overlay.classList.add('hidden');
}

// Populate Editor Fields from Data State
function populateAdminEditorForm() {
  if (!currentPortfolioData) return;

  // Personal Info Tab
  const p = currentPortfolioData.personal || {};
  document.getElementById('admin-per-fname').value = p.firstName || '';
  document.getElementById('admin-per-lname').value = p.lastName || '';
  document.getElementById('admin-per-title').value = p.title || '';
  document.getElementById('admin-per-availability').value = p.availability || '';
  document.getElementById('admin-per-bioheadline').value = p.bioHeadline || '';
  document.getElementById('admin-per-aboutme').value = p.aboutMe || '';
  document.getElementById('admin-per-email').value = p.email || '';
  document.getElementById('admin-per-location').value = p.location || '';
  document.getElementById('admin-per-resumelink').value = p.resumeLink || '';
  document.getElementById('admin-per-passcode').value = currentPortfolioData.passcode || 'shaurya2025';

  // Social Links Tab
  const s = currentPortfolioData.socials || {};
  if (s.instagram) {
    document.getElementById('admin-soc-insta-url').value = s.instagram.url || '';
    document.getElementById('admin-soc-insta-handle').value = s.instagram.handle || '';
  }
  if (s.github) {
    document.getElementById('admin-soc-gh-url').value = s.github.url || '';
    document.getElementById('admin-soc-gh-handle').value = s.github.handle || '';
  }
  if (s.linkedin) {
    document.getElementById('admin-soc-li-url').value = s.linkedin.url || '';
    document.getElementById('admin-soc-li-handle').value = s.linkedin.handle || '';
  }
  if (s.twitter) {
    document.getElementById('admin-soc-tw-url').value = s.twitter.url || '';
    document.getElementById('admin-soc-tw-handle').value = s.twitter.handle || '';
  }

  // Skills Tab
  const skillsContainer = document.getElementById('admin-skills-container');
  skillsContainer.innerHTML = '';
  (currentPortfolioData.expertise || []).forEach((exp, idx) => {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'admin-field admin-field-full';
    skillDiv.innerHTML = `
      <label>${exp.name}</label>
      <input type="text" id="admin-skill-desc-${idx}" value="${exp.description || ''}" />
    `;
    skillsContainer.appendChild(skillDiv);
  });

  // GitHub Push Tab
  const savedToken = localStorage.getItem('shauryaportal_gh_token');
  if (savedToken) document.getElementById('admin-gh-token').value = savedToken;

  // Render Projects List
  renderAdminProjectList();
}

function renderAdminProjectList() {
  const projListContainer = document.getElementById('admin-project-list');
  const projCountSpan = document.getElementById('admin-proj-count');
  
  if (!projListContainer || !currentPortfolioData) return;

  const projects = currentPortfolioData.projects || [];
  projCountSpan.textContent = projects.length;
  projListContainer.innerHTML = '';

  projects.forEach((proj, idx) => {
    const card = document.createElement('div');
    card.className = 'admin-project-card';
    card.innerHTML = `
      <div class="admin-project-info">
        <img class="admin-project-thumb" src="${proj.image}" alt="${proj.title}" onerror="this.src='images/shaurya-favicons.png'">
        <div class="admin-project-details">
          <h5>${proj.title}</h5>
          <p>${proj.year} • ${proj.role}</p>
        </div>
      </div>
      <div class="admin-project-actions">
        <button class="admin-btn admin-btn-sm admin-btn-secondary" onclick="moveProjectItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}><i class="fa-solid fa-arrow-up"></i></button>
        <button class="admin-btn admin-btn-sm admin-btn-secondary" onclick="moveProjectItem(${idx}, 1)" ${idx === projects.length - 1 ? 'disabled' : ''}><i class="fa-solid fa-arrow-down"></i></button>
        <button class="admin-btn admin-btn-sm admin-btn-info" onclick="editProjectItem(${idx})"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="admin-btn admin-btn-sm admin-btn-danger" onclick="deleteProjectItem(${idx})"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    projListContainer.appendChild(card);
  });
}

function showProjectForm(editIdx = null) {
  const formBox = document.getElementById('admin-project-form-container');
  const formTitle = document.getElementById('admin-project-form-title');
  formBox.classList.remove('hidden');

  if (editIdx !== null && currentPortfolioData.projects[editIdx]) {
    const p = currentPortfolioData.projects[editIdx];
    formTitle.textContent = `Edit Project: ${p.title}`;
    document.getElementById('admin-proj-id').value = editIdx;
    document.getElementById('admin-proj-title').value = p.title || '';
    document.getElementById('admin-proj-title-formatted').value = p.titleFormatted || '';
    document.getElementById('admin-proj-year').value = p.year || '';
    document.getElementById('admin-proj-role').value = p.role || '';
    document.getElementById('admin-proj-image').value = p.image || '';
    document.getElementById('admin-proj-link').value = p.link || '';
    document.getElementById('admin-proj-alt').value = p.altText || '';
  } else {
    formTitle.textContent = 'Add New Project';
    document.getElementById('admin-proj-id').value = '-1';
    document.getElementById('admin-proj-title').value = '';
    document.getElementById('admin-proj-title-formatted').value = '';
    document.getElementById('admin-proj-year').value = new Date().getFullYear();
    document.getElementById('admin-proj-role').value = 'Front-End Dev';
    document.getElementById('admin-proj-image').value = '';
    document.getElementById('admin-proj-link').value = '';
    document.getElementById('admin-proj-alt').value = '';
  }
}

window.editProjectItem = function(idx) {
  showProjectForm(idx);
};

window.deleteProjectItem = function(idx) {
  if (confirm(`Are you sure you want to delete "${currentPortfolioData.projects[idx].title}"?`)) {
    currentPortfolioData.projects.splice(idx, 1);
    renderAdminProjectList();
  }
};

window.moveProjectItem = function(idx, direction) {
  const projects = currentPortfolioData.projects;
  const newIdx = idx + direction;
  if (newIdx >= 0 && newIdx < projects.length) {
    const temp = projects[idx];
    projects[idx] = projects[newIdx];
    projects[newIdx] = temp;
    renderAdminProjectList();
  }
};

function saveProjectForm() {
  const idVal = parseInt(document.getElementById('admin-proj-id').value);
  const title = document.getElementById('admin-proj-title').value.trim();
  const image = document.getElementById('admin-proj-image').value.trim();
  const link = document.getElementById('admin-proj-link').value.trim();

  if (!title || !image || !link) {
    alert('Please fill out Title, Image Source, and Project Link.');
    return;
  }

  const projObj = {
    id: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: title,
    titleFormatted: document.getElementById('admin-proj-title-formatted').value.trim() || title,
    year: document.getElementById('admin-proj-year').value.trim(),
    role: document.getElementById('admin-proj-role').value.trim(),
    image: image,
    altText: document.getElementById('admin-proj-alt').value.trim() || `${title} Project by Shaurya Soni`,
    link: link
  };

  if (idVal >= 0 && currentPortfolioData.projects[idVal]) {
    currentPortfolioData.projects[idVal] = projObj;
  } else {
    currentPortfolioData.projects.push(projObj);
  }

  document.getElementById('admin-project-form-container').classList.add('hidden');
  renderAdminProjectList();
}

function syncFormToDataState() {
  if (!currentPortfolioData) return;

  // Sync Passcode
  const pass = document.getElementById('admin-per-passcode').value.trim();
  if (pass) currentPortfolioData.passcode = pass;

  // Sync Personal Info
  currentPortfolioData.personal.firstName = document.getElementById('admin-per-fname').value.trim();
  currentPortfolioData.personal.lastName = document.getElementById('admin-per-lname').value.trim();
  currentPortfolioData.personal.title = document.getElementById('admin-per-title').value.trim();
  currentPortfolioData.personal.availability = document.getElementById('admin-per-availability').value.trim();
  currentPortfolioData.personal.bioHeadline = document.getElementById('admin-per-bioheadline').value.trim();
  currentPortfolioData.personal.aboutMe = document.getElementById('admin-per-aboutme').value.trim();
  currentPortfolioData.personal.email = document.getElementById('admin-per-email').value.trim();
  currentPortfolioData.personal.location = document.getElementById('admin-per-location').value.trim();
  currentPortfolioData.personal.resumeLink = document.getElementById('admin-per-resumelink').value.trim();

  // Sync Socials
  currentPortfolioData.socials.instagram = {
    url: document.getElementById('admin-soc-insta-url').value.trim(),
    handle: document.getElementById('admin-soc-insta-handle').value.trim()
  };
  currentPortfolioData.socials.github = {
    url: document.getElementById('admin-soc-gh-url').value.trim(),
    handle: document.getElementById('admin-soc-gh-handle').value.trim()
  };
  currentPortfolioData.socials.linkedin = {
    url: document.getElementById('admin-soc-li-url').value.trim(),
    handle: document.getElementById('admin-soc-li-handle').value.trim()
  };
  currentPortfolioData.socials.twitter = {
    url: document.getElementById('admin-soc-tw-url').value.trim(),
    handle: document.getElementById('admin-soc-tw-handle').value.trim()
  };

  // Sync Skills
  (currentPortfolioData.expertise || []).forEach((exp, idx) => {
    const input = document.getElementById(`admin-skill-desc-${idx}`);
    if (input) exp.description = input.value.trim();
  });
}

function downloadJSONFile(data, filename) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// GitHub API Direct Push
async function pushJSONToGitHub() {
  syncFormToDataState();

  const token = document.getElementById('admin-gh-token').value.trim();
  const owner = document.getElementById('admin-gh-owner').value.trim();
  const repo = document.getElementById('admin-gh-repo').value.trim();
  const branch = document.getElementById('admin-gh-branch').value.trim();

  if (!token) {
    alert('Please enter your GitHub Personal Access Token (PAT).');
    return;
  }

  localStorage.setItem('shauryaportal_gh_token', token);
  const filePath = 'data/portfolio.json';
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;

  try {
    // 1. Get current file SHA
    let sha = '';
    const getRes = await fetch(apiUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // 2. Base64 encode updated JSON content (Unicode safe)
    const jsonString = JSON.stringify(currentPortfolioData, null, 2);
    const utf8Bytes = new TextEncoder().encode(jsonString);
    let binaryString = '';
    for (let i = 0; i < utf8Bytes.length; i++) {
      binaryString += String.fromCharCode(utf8Bytes[i]);
    }
    const base64Content = btoa(binaryString);

    // 3. Send PUT request to GitHub API
    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Update data/portfolio.json via Secret Admin Manager',
        content: base64Content,
        sha: sha || undefined,
        branch: branch
      })
    });

    if (putRes.ok) {
      alert('🎉 Successfully committed and pushed portfolio.json directly to GitHub!');
    } else {
      const errData = await putRes.json();
      alert(`GitHub API Error: ${errData.message || 'Failed to push file.'}`);
    }
  } catch (err) {
    alert(`Error pushing to GitHub: ${err.message}`);
  }
}

// Start Data Fetch & Initialization
initPortfolioData();






