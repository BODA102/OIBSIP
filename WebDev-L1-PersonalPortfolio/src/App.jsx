import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, Award, Brain,
  Check, Code2, Download, ExternalLink, GitBranch, GraduationCap,
  Mail, Menu, MessageCircle, Phone, ShieldCheck,
  X,
} from 'lucide-react';

const skills = [
  ['React', 'Frontend'], ['JavaScript ES6+', 'Frontend'], ['TypeScript', 'Frontend'],
  ['HTML5', 'Frontend'], ['CSS3', 'Frontend'], ['Tailwind CSS', 'Frontend'],
  ['Bootstrap', 'Frontend'], ['Responsive UI', 'Frontend'], ['UX / UI Principles', 'Frontend'],
  ['Component Architecture', 'Frontend'], ['Node.js', 'Backend'], ['Express.js', 'Backend'],
  ['REST APIs', 'Backend'], ['MongoDB', 'Backend'], ['SQLite', 'Backend'], ['Supabase', 'Backend'],
  ['Git & GitHub', 'Tools'],
  ['Docker Basics', 'Tools'], ['Kubernetes Fundamentals', 'Tools'],
  ['Unit Testing', 'Tools'], ['Data Structures & Algorithms', 'Tools'],
  ['Web Security Basics', 'Tools'], ['OpenAI', 'AI'], ['Google Gemini', 'AI'],
  ['Prompt Engineering', 'AI'], ['CS50 Foundations', 'Learning'],
];

const softSkills = [
  'Analytical problem-solving', 'Clear technical communication', 'Collaborative teamwork',
  'Ownership & accountability', 'Adaptability and fast learning', 'Attention to detail',
  'Time management', 'Growth mindset',
];

const projects = [
  {
    number: '01', eyebrow: 'HEALTH TECH · GRADUATION MEGA PROJECT', title: 'proCura',
    subtitle: 'Health Risk Predictor & Tracker', status: 'IN DEVELOPMENT', image: '/procura.png.jpeg',
    description: 'A collaborative DEPI graduation mega project developed with a React Front-End team and a machine-learning team. The team is building an AI-powered health monitoring experience, with the front end focused on responsive dashboards and health data visualization.',
    tech: ['React', 'TypeScript', 'Team Collaboration', 'DEPI'],
  },
  {
    number: '02', eyebrow: 'REAL ESTATE · DEPI', title: 'Grand Atlas',
    subtitle: 'Property browsing experience', status: 'LIVE', image: '/atlas-preview.webp',
    description: 'A real estate web experience created during the React Front-End track at the Digital Egypt Pioneers Initiative. Explore the deployed project or browse its source code.',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    live: 'https://grand-atlas-live-jfel.vercel.app/', github: 'https://github.com/BODA102/grand-atlas',
  },
  {
    number: '03', eyebrow: 'PERSONAL PROJECT', title: 'Interactive Portfolio',
    subtitle: 'A personal portfolio experience', status: 'YOU ARE HERE', image: '/portfolio-preview.png',
    description: 'A responsive portfolio exploring immersive web visuals, a draggable 3D skills galaxy, and a curated presentation of selected work and learning.',
                    tech: ['React', 'Three.js', 'Vite', 'Lucide'],
  },
];

const credentials = [
  { title: 'Strategic Thinking in the Age of AI', issuer: 'HP LIFE · HP Foundation', date: 'Sep 2026', icon: Brain, image: '/certificate-hp-life.jpeg' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', date: 'Sep 2026', icon: ShieldCheck, image: '/certificate-cisco.jpeg' },
  { title: 'Work Basics on Khamsat', issuer: 'Khamsat · Hsoub', date: 'Sep 2026', icon: Award, image: '/certificate-khamsat.png' },
  { title: 'Introduction to Front-End Development', issuer: 'Meta · Coursera', date: 'Online course', icon: Code2, link: 'https://www.coursera.org/learn/introduction-to-front-end-development' },
];

function SkillsGalaxy() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    let renderer;
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 255;
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      mount.appendChild(renderer.domElement);

      const galaxy = new THREE.Group();
      scene.add(galaxy);
      const sunGlow = new THREE.Mesh(
        new THREE.SphereGeometry(25, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x31d99a, transparent: true, opacity: 0.12 }),
      );
      galaxy.add(sunGlow);
      const sun = new THREE.Mesh(
        new THREE.SphereGeometry(13, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xa6ffdc }),
      );
      galaxy.add(sun);
      const sunCanvas = document.createElement('canvas');
      sunCanvas.width = 128;
      sunCanvas.height = 128;
      const sunContext = sunCanvas.getContext('2d');
      if (sunContext) {
        const sunGradient = sunContext.createRadialGradient(64, 64, 4, 64, 64, 62);
        sunGradient.addColorStop(0, 'rgba(225,255,240,1)');
        sunGradient.addColorStop(0.18, 'rgba(125,255,197,.95)');
        sunGradient.addColorStop(0.42, 'rgba(71,231,160,.34)');
        sunGradient.addColorStop(1, 'rgba(71,231,160,0)');
        sunContext.fillStyle = sunGradient;
        sunContext.fillRect(0, 0, 128, 128);
        const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(sunCanvas), transparent: true, depthWrite: false }));
        sunSprite.scale.set(62, 62, 1);
        galaxy.add(sunSprite);
      }
      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(24, 1),
        new THREE.MeshBasicMaterial({ color: 0x6ef3c5, wireframe: true, transparent: true, opacity: 0.52 }),
      );
      galaxy.add(core);
      const halo = new THREE.Mesh(
        new THREE.IcosahedronGeometry(37, 1),
        new THREE.MeshBasicMaterial({ color: 0x165f51, wireframe: true, transparent: true, opacity: 0.25 }),
      );
      galaxy.add(halo);

      const colors = { Frontend: '#78edc5', Backend: '#78a9ff', AI: '#c4a2ff', Tools: '#ffc878', Learning: '#ff92b5' };
      const smallScreen = mount.clientWidth < 600;
      const orbitRadii = smallScreen ? [34, 50, 66, 82, 98] : [52, 90, 128, 166, 204];
      const orbitCount = orbitRadii.length;
      const orbitCounts = Array.from({ length: orbitCount }, (_, orbit) => skills.filter((_, index) => index % orbitCount === orbit).length);
      const satellites = [];
      orbitRadii.forEach((radius, orbit) => {
        const points = [];
        for (let step = 0; step <= 96; step += 1) {
          const angle = (step / 96) * Math.PI * 2;
          points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.72, Math.sin(angle) * radius * 0.18));
        }
        const path = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.LineLoop(path, new THREE.LineBasicMaterial({ color: 0x79e9bd, transparent: true, opacity: 0.2 }));
        line.rotation.x = -0.12 + orbit * 0.035;
        galaxy.add(line);
      });
      skills.forEach(([label, category], index) => {
        const orbit = index % orbitCount;
        const orbitRadius = orbitRadii[orbit];
        const orbitPosition = Math.floor(index / orbitCount);
        const angle = (orbitPosition / orbitCounts[orbit]) * Math.PI * 2 + orbit * 0.42;
        const inclination = -0.12 + orbit * 0.035;
        const canvas = document.createElement('canvas');
        canvas.width = 360; canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const color = colors[category] || '#78edc5';
        const glow = ctx.createRadialGradient(180, 52, 2, 180, 52, 48);
        glow.addColorStop(0, `${color}bb`);
        glow.addColorStop(0.24, `${color}65`);
        glow.addColorStop(0.58, `${color}1c`);
        glow.addColorStop(1, `${color}00`);
        ctx.fillStyle = glow;
        ctx.fillRect(125, 0, 110, 100);
        ctx.shadowColor = color;
        ctx.shadowBlur = 16;
        ctx.font = '600 32px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, 180, 52, 340);
        const texture = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
        const labelWidth = smallScreen ? 47 : 67;
        sprite.scale.set(labelWidth, labelWidth * 0.34, 1);
        galaxy.add(sprite);
        satellites.push({ sprite, orbitRadius, angle, inclination, speed: (0.008 - orbit * 0.00115) * (index % 2 ? 1 : 0.92) });
      });

      const starPositions = new Float32Array(420 * 3);
      for (let i = 0; i < starPositions.length; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 440;
        starPositions[i + 1] = (Math.random() - 0.5) * 280;
        starPositions[i + 2] = (Math.random() - 0.5) * 180;
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0x9ef7d5, size: 1.1, transparent: true, opacity: 0.55 }));
      scene.add(stars);

      let dragging = false;
      let previous = { x: 0, y: 0 };
      const down = (event) => { dragging = true; previous = { x: event.clientX, y: event.clientY }; mount.classList.add('is-dragging'); };
      const move = (event) => {
        if (!dragging) return;
        galaxy.rotation.y += (event.clientX - previous.x) * 0.006;
        galaxy.rotation.x += (event.clientY - previous.y) * 0.006;
        previous = { x: event.clientX, y: event.clientY };
      };
      const up = () => { dragging = false; mount.classList.remove('is-dragging'); };
      mount.addEventListener('pointerdown', down);
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      const resize = new ResizeObserver(() => {
        if (!mount.clientWidth || !mount.clientHeight) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      });
      resize.observe(mount);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let frame;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        satellites.forEach((satellite) => {
          satellite.angle += satellite.speed * (reduceMotion ? 0.35 : 1);
          const x = Math.cos(satellite.angle) * satellite.orbitRadius;
          const z = Math.sin(satellite.angle) * satellite.orbitRadius * 0.18;
          const y = Math.sin(satellite.angle) * satellite.orbitRadius * 0.72;
          satellite.sprite.position.set(x, y * Math.cos(satellite.inclination) - z * Math.sin(satellite.inclination), y * Math.sin(satellite.inclination) + z * Math.cos(satellite.inclination));
        });
        if (!dragging && !reduceMotion) galaxy.rotation.y += 0.00035;
        core.rotation.x += 0.001; core.rotation.y -= 0.0014;
        stars.rotation.y += 0.00015;
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        cancelAnimationFrame(frame); resize.disconnect();
        mount.removeEventListener('pointerdown', down);
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => { if (material.map) material.map.dispose(); material.dispose(); });
          }
        });
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    } catch (error) {
      console.warn('The interactive skills galaxy could not be initialized.', error);
      if (renderer) renderer.dispose();
      return undefined;
    }
  }, []);
  return <div className="galaxy-wrap"><div ref={mountRef} className="galaxy-canvas" role="img" aria-label="Interactive 3D galaxy of web development and AI skills" /><p className="galaxy-hint"><span className="drag-dot" /> Drag to explore the galaxy</p></div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const navItems = [['About', '#about'], ['Work', '#projects'], ['Skills', '#skills'], ['Journey', '#journey'], ['Contact', '#contact']];
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const selectors = [
      '.projects .section-heading .section-kicker', '.projects .section-heading h2', '.projects .section-heading > p',
      '.project-topline > *', '.project-image-button', '.project-info .project-title-char', '.project-info .project-subtitle',
      '.project-details', '.project-bottom > p', '.project-bottom .tech-list > span', '.project-links > *',
    ];
    const elements = [...document.querySelectorAll(selectors.join(', '))];
    ['.project-topline > *', '.project-bottom .tech-list > span', '.project-links > *'].forEach((selector) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.dataset.scrollStep = String(index);
      });
    });
    document.querySelectorAll('.project-info h3').forEach((heading) => {
      heading.querySelectorAll('.project-title-char').forEach((element, index) => {
        element.dataset.scrollStep = String(index * 0.32);
      });
    });
    elements.forEach((element) => element.classList.add('scroll-scrub'));

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      elements.forEach((element) => {
        const top = element.getBoundingClientRect().top;
        const stepOffset = Number(element.dataset.scrollStep || 0) * 15;
        const start = viewportHeight * 0.84 - stepOffset;
        const end = viewportHeight * 0.34 - stepOffset;
        const progress = Math.max(0, Math.min(1, (start - top) / (start - end)));
        const titleBlur = element.matches('.projects .section-heading h2, .project-info .project-title-char') ? 20 : 13;
        const lift = element.matches('.projects .section-heading h2, .project-info .project-title-char') ? 20 : 14;
        element.style.setProperty('--scroll-opacity', progress.toFixed(3));
        element.style.setProperty('--scroll-blur', `${((1 - progress) * titleBlur).toFixed(1)}px`);
        element.style.setProperty('--scroll-lift', `${((1 - progress) * lift).toFixed(1)}px`);
      });
    };
    const scheduleProgress = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress);
    updateProgress();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleProgress);
      window.removeEventListener('resize', scheduleProgress);
    };
  }, []);

  useEffect(() => {
    if (!activeProject) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setActiveProject(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeProject]);

  return (
    <main>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Abdulrahman home"><span>A</span><i>.</i><span>S</span></a>
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
        </nav>
        <a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span className="eyebrow-line" /> SOFTWARE DEVELOPMENT · REACT FRONT-END</p>
          <h1>Building thoughtful<br />web experiences<span className="accent-dot">.</span></h1>
          <p className="hero-intro">I’m <strong>Abdulrahman ElSaeed</strong>, a third-year Software Engineering student turning ideas into useful, polished web products with React.</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={17} /></a><a className="button button-quiet" href="/abdulrahman-elsaeed-cv.pdf" download>Download CV <Download size={16} /></a></div>
          <div className="hero-meta"><span><i className="status-pulse" /> OPEN TO OPPORTUNITIES</span><span>Alexandria, Egypt</span></div>
        </div>
        <div className="hero-visual reveal reveal-delay">
          <div className="portrait-orbit orbit-a" /><div className="portrait-orbit orbit-b" />
          <div className="portrait-frame"><img src="/me.jpeg" alt="Abdulrahman ElSaeed" /></div>
          <div className="float-card card-react"><span className="float-icon">R</span><span>React Developer<small>Frontend · UI</small></span></div>
          <div className="float-card card-student"><GraduationCap size={18} /><span>Software Engineering<small>EELU · Year 3</small></span></div>
          <span className="visual-index">01 — 05</span>
        </div>
        <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        <span className="hero-side-note">DESIGN · CODE · ITERATE</span>
      </section>

      <section className="about section-shell section-pad" id="about">
        <div className="section-kicker"><span>01</span><span>ABOUT</span></div>
        <div className="about-grid"><div><p className="eyebrow">THE STORY SO FAR</p><h2>Curious by nature.<br /><span className="muted-heading">Builder by practice.</span></h2></div><div className="about-body"><p>I’m a third-year student at the <strong>Egyptian E-Learning University (EELU)</strong>, studying Software Engineering and focused on React Front-End Development.</p><p>Through the <strong>Digital Egypt Pioneers Initiative (DEPI)</strong>, I’m learning to build complete web experiences—from accessible interfaces and reusable React components to APIs, version control, and deployment fundamentals.</p><p>I enjoy working with a team, learning by building, and turning a real problem into a product people can use.</p><a className="text-link" href="https://www.linkedin.com/in/abdulrahman-al-saeed-a81365365/" target="_blank" rel="noreferrer">More about my journey <ArrowUpRight size={16} /></a></div></div>
        <div className="stats-row"><div><strong>03<span>+</span></strong><small>SELECTED PROJECTS</small></div><div><strong>20<span>+</span></strong><small>TOOLS & TECHNOLOGIES</small></div><div><strong>01</strong><small>TEAM MEGA PROJECT</small></div><div className="stat-caption">Learning continuously,<br />shipping one step at a time.</div></div>
      </section>

      <section className="projects section-shell section-pad" id="projects">
        <div className="section-heading"><div><div className="section-kicker"><span>02</span><span>SELECTED WORK</span></div><h2>Ideas made <span className="serif-accent">real.</span></h2></div><p>A few projects that reflect how I learn, collaborate, and build.</p></div>
        <div className="project-list">{projects.map((project) => <article className="project-row" key={project.number}>
          <div className="project-topline"><span>{project.number} / 03</span><span>{project.eyebrow}</span></div>
          <button className="project-image-button" type="button" onClick={() => setActiveProject(project)} aria-label={`View ${project.title} project details`}><img src={project.image} alt={`${project.title} project preview`} /><span className="image-open"><ArrowUpRight /></span><span className="project-status">{project.status}</span></button>
          <div className="project-info"><div><h3 aria-label={project.title}>{project.title.split('').map((character, index) => <span aria-hidden="true" className="project-title-char" key={`${project.number}-${index}`}>{character === ' ' ? '\u00a0' : character}</span>)}</h3><p className="project-subtitle">{project.subtitle}</p></div><button className="project-details" type="button" onClick={() => setActiveProject(project)}>View case study <ArrowUpRight size={17} /></button></div>
          <div className="project-bottom"><p>{project.description}</p><div className="tech-list">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
          {project.live && <div className="project-links"><a href={project.live} target="_blank" rel="noreferrer">Live project <ExternalLink size={15} /></a><a href={project.github} target="_blank" rel="noreferrer">Source code <GitBranch size={15} /></a></div>}
        </article>)}</div>
      </section>

      <section className="skills section-shell section-pad" id="skills">
        <div className="section-heading"><div><div className="section-kicker"><span>03</span><span>SKILLS GALAXY</span></div><h2>One system,<br /><span className="serif-accent">many moving parts.</span></h2></div><p>Frontend, backend foundations, and AI tools orbiting the same core. Grab the galaxy and explore.</p></div>
        <SkillsGalaxy />
        <div className="skill-legend"><span><i className="legend-green" />FRONTEND</span><span><i className="legend-blue" />BACKEND</span><span><i className="legend-purple" />AI & AUTOMATION</span><span><i className="legend-amber" />TOOLS</span></div>
        <div className="learning-block"><div><p className="eyebrow">COURSES & FOUNDATIONS</p><h3>Learning that keeps<br />the curiosity alive.</h3></div><div className="course-chips">{['Prompt Engineering', 'HTML5 Essentials', 'CSS Essentials & UX/UI', 'JavaScript', 'TypeScript', 'Bootstrap', 'Git & GitHub', 'React', 'Code Style & Best Practices', 'Node.js + Express', 'Docker Basics', 'Functional Documentation', 'Unit Testing', 'Capstone Project', 'OpenAI', 'Google Gemini', 'Oracle AI for You', 'CS50 · YouTube', 'CCNA · YouTube'].map((course) => <span key={course}>{course}</span>)}</div></div>
        <div className="soft-skills"><p className="eyebrow">HOW I WORK</p><div>{softSkills.map((skill) => <span key={skill}><Check size={14} />{skill}</span>)}</div></div>
      </section>

      <section className="journey section-shell section-pad" id="journey">
        <div className="section-heading"><div><div className="section-kicker"><span>04</span><span>EDUCATION & CREDENTIALS</span></div><h2>Building the<br /><span className="serif-accent">foundations.</span></h2></div><p>Formal study, focused training, and courses that broaden my perspective.</p></div>
        <div className="journey-grid"><div className="education-card"><div className="education-icon"><GraduationCap /></div><p className="eyebrow">2024 — PRESENT</p><h3>Egyptian E-Learning University</h3><p className="credential-sub">B.Sc. Computer Science & IT · Software Engineering Track</p><span className="year-tag">THIRD YEAR STUDENT</span><div className="education-divider" /><p className="eyebrow">DEPI · ROUND 5</p><h3>React Front-End Development</h3><p className="credential-sub">Digital Egypt Pioneers Initiative</p></div>
          <div className="cert-list">{credentials.map((item) => { const Icon = item.icon; return <article className="cert-item" key={item.title}><div className="cert-icon"><Icon size={19} /></div><div className="cert-copy"><h3>{item.title}</h3><p>{item.issuer} <span>· {item.date}</span></p></div>{item.image ? <a className="cert-view" href={item.image} target="_blank" rel="noreferrer" aria-label={`View ${item.title} certificate`}><ArrowUpRight size={17} /></a> : <a className="cert-view" href={item.link} target="_blank" rel="noreferrer" aria-label={`View ${item.title} course`}><ArrowUpRight size={17} /></a>}</article>; })}</div></div>
      </section>

      <section className="contact section-shell" id="contact"><div className="contact-glow" /><div className="section-kicker"><span>05</span><span>CONTACT</span></div><p className="eyebrow">HAVE A GOOD CHALLENGE?</p><h2>Let’s build something<br /><span className="serif-accent">that matters.</span></h2><p className="contact-copy">Open to internships, freelance projects, and collaborative opportunities. Tell me what you’re working on.</p><a className="button button-primary contact-button" href="mailto:abdulrahmanalsaeed709@gmail.com">Start a conversation <ArrowUpRight size={17} /></a>
        <div className="contact-links"><a href="mailto:abdulrahmanalsaeed709@gmail.com"><Mail size={16} />EMAIL</a><a href="https://wa.me/201146897069" target="_blank" rel="noreferrer"><MessageCircle size={16} />WHATSAPP</a><a href="https://www.linkedin.com/in/abdulrahman-al-saeed-a81365365/" target="_blank" rel="noreferrer"><span className="linkedin-mark">in</span>LINKEDIN</a><a href="https://github.com/BODA102" target="_blank" rel="noreferrer"><GitBranch size={16} />GITHUB</a><a href="tel:+201146897069"><Phone size={16} />CALL</a></div>
      </section>

      <footer className="site-footer section-shell"><a className="brand" href="#home"><span>A</span><i>.</i><span>S</span></a><p>Designed with curiosity. Built with React & Three.js.</p><a href="#home" className="back-top">BACK TO TOP <ArrowDown size={14} /></a><small>© 2026 Abdulrahman ElSaeed</small></footer>

      {activeProject && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setActiveProject(null); }}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button type="button" className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close project details"><X /></button><img src={activeProject.image} alt="" /><p className="eyebrow">{activeProject.eyebrow}</p><h2 id="modal-title">{activeProject.title}<span className="serif-accent">.</span></h2><h3>{activeProject.subtitle}</h3><p>{activeProject.description}</p><div className="tech-list">{activeProject.tech.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="modal-links">{activeProject.live && <a href={activeProject.live} target="_blank" rel="noreferrer">Live project <ExternalLink size={15} /></a>}{activeProject.github && <a href={activeProject.github} target="_blank" rel="noreferrer">Source code <GitBranch size={15} /></a>}</div></section></div>}
    </main>
  );
}

export default App;
