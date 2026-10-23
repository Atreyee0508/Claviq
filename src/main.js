import './styles.css';
import './mount.jsx';

const introScreen = document.querySelector('#introScreen');
const briefScreen = document.querySelector('#briefScreen');
const briefEnterButtons = document.querySelectorAll('.brief-enter');
const pageShell = document.querySelector('.page-shell');
const homeContent = pageShell.querySelector(':scope > main');
const routePage = document.querySelector('#routePage');
const routePageContent = document.querySelector('#routePageContent');
const menuTrigger = document.querySelector('#menuTrigger');
const menuPanel = document.querySelector('#menuPanel');
const questionContent = document.querySelector('#questionContent');
const menuAnnouncement = menuTrigger.querySelector('.sr-only');
const orbs = document.querySelectorAll('.orb');

menuPanel.hidden = true;
pageShell.setAttribute('aria-hidden', 'true');

document.body.classList.add('intro-lock');

const servicePages = {
  'get-found': {
    number: '01',
    title: 'Get found.',
    description: 'AEO and SEO, social media, content and AI video ads that bring the right people to you.',
    what: 'AEO and SEO, social media management, content and AI video ads, websites',
    charge: 'Monthly retainer',
    measure: 'Qualified leads, visibility on Google and in AI answers, cost per lead',
  },
  'get-chosen': {
    number: '02',
    title: 'Get chosen.',
    description: 'AI that answers calls and WhatsApp messages, follows up every lead and shows your team the next sale.',
    what: 'AI receptionists and WhatsApp assistants, lead follow-up, CRM automation, sales insights',
    charge: 'Build fee + monthly run fee',
    measure: 'Response time, lead-to-sale conversion',
  },
  'get-chosen-again': {
    number: '03',
    title: 'Get chosen again.',
    description: 'Reminders, reorders and offers that bring customers back and raise what each one spends.',
    what: 'Recall and reorder reminders, loyalty and upsell journeys, churn alerts, customer analytics',
    charge: 'Build fee + monthly run fee',
    measure: 'Repeat purchase rate, revenue per customer',
  },
  'consulting-custom-ai': {
    number: '04',
    title: 'Consulting and custom AI.',
    description: 'Revenue strategy, custom AI tools built for your business, and independent reviews of AI you already run.',
    what: 'AI revenue strategy, custom AI tools and products, independent AI reviews for large organisations',
    charge: 'Project or advisory fee',
    measure: 'A business case agreed upfront',
  },
};

const industryPages = {
  'healthcare-dental': {
    number: '01',
    title: 'Healthcare / dental.',
    line: 'Every missed call is a patient who books somewhere else. We build AI that answers, books and reminds.',
  },
  'real-estate': {
    number: '02',
    title: 'Real estate.',
    line: 'Your best leads go cold within the hour. We make sure every site-visit enquiry gets a fast reply and a follow-up.',
  },
  'consumer-goods': {
    number: '03',
    title: 'Consumer goods.',
    line: 'Turn social media engagement into orders, and one-time buyers into repeat customers.',
  },
  'financial-services': {
    number: '04',
    title: 'Financial services.',
    line: 'Follow up on every SIP and insurance enquiry on time, without adding staff.',
  },
};

const routeHeader = (label, index = '') => `
  <header class="route-header">
    <a class="route-back" href="#home">BACK TO HOME</a>
    <span>CLAVIQ / ${label}</span>
    ${index ? `<span class="route-header__index">${index}</span>` : ''}
  </header>
`;

const routeActions = () => `
  <div class="route-actions">
    <a class="route-button" href="#ai-revenue-audit">BOOK AN AI REVENUE AUDIT</a>
    <a class="route-link" href="#services">SEE HOW WE WORK <span aria-hidden="true">↗</span></a>
  </div>
`;

const methodMarkup = `
  <div class="route-method-grid">
    <article>
      <span>01</span>
      <h3>Diagnose.</h3>
      <p>We map how customers find you, buy from you and come back, and show where revenue is lost.</p>
    </article>
    <article>
      <span>02</span>
      <h3>Build.</h3>
      <p>We build AI into the tools your team already uses.</p>
    </article>
    <article>
      <span>03</span>
      <h3>Prove.</h3>
      <p>We agree the starting numbers with you, then measure the change.</p>
    </article>
  </div>
`;

const serviceCategories = {
  'Get found.': 'MARKETING & VISIBILITY',
  'Get chosen.': 'SALES & CONVERSION',
  'Get chosen again.': 'RETENTION & REPEAT BUSINESS',
  'Consulting and custom AI.': 'FOUNDATION & STRATEGY',
};

const serviceCardMarkup = (slug, number, title, description) => `
  <a class="route-service-card" href="#${slug}">
    <span class="route-card-index">${number}</span>
    <div class="route-card-copy">
      <small>${serviceCategories[title]}</small>
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
    <span class="route-card-explore">EXPLORE <strong aria-hidden="true">↗</strong></span>
  </a>
`;

const industryCardMarkup = (slug, number, title, line) => `
  <a class="route-industry-card" href="#${slug}">
    <span>${number}</span>
    <h3>${title}</h3>
    <p>${line}</p>
    <strong aria-hidden="true">↗</strong>
  </a>
`;

const renderServicesPage = () => `
  ${routeHeader('SERVICES', '00')}
  <section class="route-hero route-hero--services">
    <div>
      <h1>Grow revenue with AI,<br />from first search to repeat sale.</h1>
      <p class="route-intro">Claviq uses AI to help your company get found, get chosen and get chosen again. One partner across marketing, sales and retention, measured in revenue.</p>
      <div class="route-actions">
        <a class="route-button" href="#ai-revenue-audit">BOOK AN AI REVENUE AUDIT</a>
      </div>
    </div>
  </section>

  <section class="route-section route-section--problem">
    <div class="route-label">THE PROBLEM</div>
    <div>
      <h2>Nobody owns the revenue.</h2>
      <p>Most companies have an agency for marketing, a tool for customer chats and a consultant for strategy. Each one reports its own numbers. Nobody owns revenue.</p>
      <p>Meanwhile, customers slip away at every stage. They cannot find you when they ask Google or ChatGPT. They wait too long for a reply. Or they buy once and never come back.</p>
    </div>
  </section>

  <section class="route-section route-section--solutions">
    <div class="route-label">SOLUTIONS</div>
    <div>
      <h2>Everything Claviq does.</h2>
      <div class="route-service-grid">
        ${serviceCardMarkup('get-found', '01', 'Get found.', 'AEO and SEO, social media, content and AI video ads that bring the right people to you.')}
        ${serviceCardMarkup('get-chosen', '02', 'Get chosen.', 'AI that answers calls and WhatsApp messages, follows up every lead and shows your team the next sale.')}
        ${serviceCardMarkup('get-chosen-again', '03', 'Get chosen again.', 'Reminders, reorders and offers that bring customers back and raise what each one spends.')}
        ${serviceCardMarkup('consulting-custom-ai', '04', 'Consulting and custom AI.', 'Revenue strategy, custom AI tools built for your business, and independent reviews of AI you already run.')}
      </div>
    </div>
  </section>

  <section class="route-section route-section--industries">
    <div class="route-label">INDUSTRIES</div>
    <div>
      <h2>From single-location clinics to national brands.</h2>
      <p>We began in healthcare and work across real estate, consumer goods and financial services.</p>
      <div class="route-industry-grid">
        ${industryCardMarkup('healthcare-dental', '01', 'Healthcare / dental.', 'Every missed call is a patient who books somewhere else. We build AI that answers, books and reminds.')}
        ${industryCardMarkup('real-estate', '02', 'Real estate.', 'Your best leads go cold within the hour. We make sure every site-visit enquiry gets a fast reply and a follow-up.')}
        ${industryCardMarkup('consumer-goods', '03', 'Consumer goods.', 'Turn social media engagement into orders, and one-time buyers into repeat customers.')}
        ${industryCardMarkup('financial-services', '04', 'Financial services.', 'Follow up on every SIP and insurance enquiry on time, without adding staff.')}
      </div>
    </div>
  </section>

  <section class="route-section route-section--method">
    <div class="route-label">METHODOLOGY</div>
    <div>
      <h2>Diagnose. Build. Prove.</h2>
      ${methodMarkup}
    </div>
  </section>

  <section class="route-section route-section--partner">
    <div class="route-label">ONE PARTNER</div>
    <div>
      <h2>Connect the three stages.</h2>
      <p>Most companies hire an agency for marketing, a vendor for chatbots and a consultant for strategy. Each owns one piece and reports its own numbers — followers, chats handled, slides delivered. Nobody owns revenue.</p>
      <p>Claviq connects the three stages. What we learn in sales improves the marketing; what we learn from repeat customers improves both.</p>
      <p class="route-quote">If there is no straight line from a service to revenue, we don't sell it under Claviq.</p>
    </div>
  </section>

  <section class="route-section route-section--expect">
    <div class="route-label">WHAT YOU CAN EXPECT</div>
    <div class="route-expect-list">
      <p>A revenue number we are working to move, agreed before we start</p>
      <p>AI that fits your team's day, not another app to log into</p>
      <p>Your team trained to use it, as part of the project</p>
      <p>An honest monthly report: what changed, what didn't, and why</p>
    </div>
  </section>

  <section class="route-cta">
    <p>Tell us how customers find you and buy from you. In 30 minutes, we will show you where revenue is slipping and what AI can do about it.</p>
    <a class="route-button" href="#ai-revenue-audit">BOOK AN AI REVENUE AUDIT</a>
  </section>
  <footer class="route-footer">Claviq Private Limited · Guwahati, Assam, India · Orlando, Florida, USA</footer>
`;

const renderBriefPage = () => `
  ${routeHeader('WEBSITE BRIEF', 'GUWAHATI → ORLANDO')}
  <section class="route-hero route-hero--services">
    <div>
      <h1>Grow revenue with AI,<br />from first search to repeat sale.</h1>
      <p class="route-intro">Claviq uses AI to help your company get found, get chosen and get chosen again. One partner across marketing, sales and retention, measured in revenue.</p>
      <div class="route-actions">
        <a class="route-button" href="#ai-revenue-audit">BOOK AN AI REVENUE AUDIT</a>
      </div>
    </div>
  </section>

  <section class="route-section route-section--problem">
    <div class="route-label">THE PROBLEM</div>
    <div>
      <h2>Nobody owns the revenue.</h2>
      <p>Most companies have an agency for marketing, a tool for customer chats and a consultant for strategy. Each one reports its own numbers. Nobody owns revenue.</p>
      <p>Meanwhile, customers slip away at every stage. They cannot find you when they ask Google or ChatGPT. They wait too long for a reply. Or they buy once and never come back.</p>
    </div>
  </section>

  <section class="route-section route-section--solutions">
    <div class="route-label">WHAT CLAVIQ DOES</div>
    <div>
      <h2>Get found. Get chosen. Get chosen again.</h2>
      <div class="route-service-grid">
        ${serviceCardMarkup('get-found', '01', 'Get found.', 'AEO and SEO, social media, content and AI video ads that bring the right people to you.')}
        ${serviceCardMarkup('get-chosen', '02', 'Get chosen.', 'AI that answers calls and WhatsApp messages, follows up every lead and shows your team the next sale.')}
        ${serviceCardMarkup('get-chosen-again', '03', 'Get chosen again.', 'Reminders, reorders and offers that bring customers back and raise what each one spends.')}
        ${serviceCardMarkup('consulting-custom-ai', '04', 'Consulting and custom AI.', 'Revenue strategy, custom AI tools built for your business, and independent reviews of AI you already run.')}
      </div>
    </div>
  </section>

  <section class="route-section route-section--method">
    <div class="route-label">HOW WE WORK</div>
    <div>
      <h2>Diagnose. Build. Prove.</h2>
      ${methodMarkup}
    </div>
  </section>

  <section class="route-section route-section--audience">
    <div class="route-label">WHO WE WORK WITH</div>
    <div>
      <h2>From single-location clinics to national brands.</h2>
      <p>We began in healthcare and work across real estate, consumer goods and financial services.</p>
      <p class="route-quote">We help companies win more customers through AI marketing and sales, measured in revenue.</p>
    </div>
  </section>

  <section class="route-section route-section--founder">
    <div class="route-label">WHO IS BEHIND IT</div>
    <div>
      <h2>Kaushik Boruah, the AI Translator.</h2>
      <p>Claviq was founded by Kaushik Boruah. Over twelve years, he solved growth problems with data and AI for Fortune 500 consumer and hospitality brands. He started Claviq to bring that discipline to every company that wants to grow.</p>
    </div>
  </section>

  <section class="route-cta">
    <p>Tell us how customers find you and buy from you. In 30 minutes, we will show you where revenue is slipping and what AI can do about it.</p>
    <a class="route-button" href="#ai-revenue-audit">BOOK AN AI REVENUE AUDIT</a>
  </section>
  <footer class="route-footer">Claviq Private Limited · Guwahati, Assam, India · Orlando, Florida, USA</footer>
`;

const renderServicePage = (service) => `
  ${routeHeader(`SERVICES / ${service.title.toUpperCase()}`, service.number)}
  <section class="route-hero route-hero--service">
    <div>
      <p class="route-kicker">SERVICES / ${service.number}</p>
      <h1>${service.title}</h1>
      <p class="route-intro">${service.description}</p>
      ${routeActions()}
    </div>
    <span class="route-hero-index">${service.number}<br />04</span>
  </section>

  <section class="route-facts">
    <article>
      <span>WHAT WE DO</span>
      <p>${service.what}</p>
    </article>
    <article>
      <span>HOW WE CHARGE</span>
      <p>${service.charge}</p>
    </article>
    <article>
      <span>WHAT WE MEASURE</span>
      <p>${service.measure}</p>
    </article>
  </section>

  <section class="route-section route-section--method">
    <div class="route-label">METHODOLOGY</div>
    <div>
      <h2>Diagnose. Build. Prove.</h2>
      ${methodMarkup}
    </div>
  </section>

  <section class="route-section route-section--audience">
    <div class="route-label">WHO WE WORK WITH</div>
    <div>
      <h2>From single-location clinics to national brands.</h2>
      <p>We began in healthcare and work across real estate, consumer goods and financial services.</p>
    </div>
  </section>

  <section class="route-cta">
    <p>Tell us how customers find you and buy from you. In 30 minutes, we will show you where revenue is slipping and what AI can do about it.</p>
    <a class="route-button" href="#ai-revenue-audit">BOOK AN AI REVENUE AUDIT</a>
  </section>
  <footer class="route-footer">Claviq Private Limited · Guwahati, Assam, India · Orlando, Florida, USA</footer>
`;

const renderIndustriesPage = () => `
  ${routeHeader('INDUSTRIES', '00')}
  <section class="route-hero route-hero--service">
    <div>
      <p class="route-kicker">INDUSTRIES</p>
      <h1>From single-location clinics to national brands.</h1>
      <p class="route-intro">We began in healthcare and work across real estate, consumer goods and financial services.</p>
      ${routeActions()}
    </div>
    <span class="route-hero-index">CLAVIQ<br />INDUSTRIES</span>
  </section>

  <section class="route-section route-section--industries">
    <div class="route-label">WHO WE WORK WITH</div>
    <div>
      <h2>Revenue is easy to see and prove.</h2>
      <p>Every buyer we target already tracks revenue, so the value is easy to see and prove. "AI saves you 10 hours" is weak in India and only fair in the US. "AI wins you more customers" works in both markets.</p>
      <div class="route-industry-grid">
        ${industryCardMarkup('healthcare-dental', '01', 'Healthcare / dental.', 'Every missed call is a patient who books somewhere else. We build AI that answers, books and reminds.')}
        ${industryCardMarkup('real-estate', '02', 'Real estate.', 'Your best leads go cold within the hour. We make sure every site-visit enquiry gets a fast reply and a follow-up.')}
        ${industryCardMarkup('consumer-goods', '03', 'Consumer goods.', 'Turn social media engagement into orders, and one-time buyers into repeat customers.')}
        ${industryCardMarkup('financial-services', '04', 'Financial services.', 'Follow up on every SIP and insurance enquiry on time, without adding staff.')}
      </div>
    </div>
  </section>

  <section class="route-cta">
    <p>Tell us how customers find you and buy from you. In 30 minutes, we will show you where revenue is slipping and what AI can do about it.</p>
    <a class="route-button" href="#ai-revenue-audit">BOOK AN AI REVENUE AUDIT</a>
  </section>
  <footer class="route-footer">Claviq Private Limited · Guwahati, Assam, India · Orlando, Florida, USA</footer>
`;

const renderIndustryPage = (industry) => `
  ${routeHeader(`INDUSTRIES / ${industry.title.toUpperCase()}`, industry.number)}
  <section class="route-hero route-hero--service">
    <div>
      <p class="route-kicker">INDUSTRIES / ${industry.number}</p>
      <h1>${industry.title}</h1>
      <p class="route-intro">${industry.line}</p>
      ${routeActions()}
    </div>
    <span class="route-hero-index">${industry.number}<br />04</span>
  </section>

  <section class="route-section route-section--audience">
    <div class="route-label">WHO WE WORK WITH</div>
    <div>
      <h2>From single-location clinics to national brands.</h2>
      <p>We began in healthcare and work across real estate, consumer goods and financial services.</p>
    </div>
  </section>

  <section class="route-section route-section--solutions">
    <div class="route-label">SERVICES</div>
    <div>
      <h2>Get found. Get chosen. Get chosen again.</h2>
      <div class="route-service-grid">
        ${serviceCardMarkup('get-found', '01', 'Get found.', 'AEO and SEO, social media, content and AI video ads that bring the right people to you.')}
        ${serviceCardMarkup('get-chosen', '02', 'Get chosen.', 'AI that answers calls and WhatsApp messages, follows up every lead and shows your team the next sale.')}
        ${serviceCardMarkup('get-chosen-again', '03', 'Get chosen again.', 'Reminders, reorders and offers that bring customers back and raise what each one spends.')}
        ${serviceCardMarkup('consulting-custom-ai', '04', 'Consulting and custom AI.', 'Revenue strategy, custom AI tools built for your business, and independent reviews of AI you already run.')}
      </div>
    </div>
  </section>

  <section class="route-section route-section--method">
    <div class="route-label">METHODOLOGY</div>
    <div>
      <h2>Diagnose. Build. Prove.</h2>
      ${methodMarkup}
    </div>
  </section>

  <section class="route-cta">
    <p>Tell us how customers find you and buy from you. In 30 minutes, we will show you where revenue is slipping and what AI can do about it.</p>
    <a class="route-button" href="#ai-revenue-audit">BOOK AN AI REVENUE AUDIT</a>
  </section>
  <footer class="route-footer">Claviq Private Limited · Guwahati, Assam, India · Orlando, Florida, USA</footer>
`;

const renderAuditPage = () => `
  ${routeHeader('AI REVENUE AUDIT', 'AUDIT')}
  <section class="route-hero route-hero--service">
    <div>
      <p class="route-kicker">ENTRY OFFER</p>
      <h1>AI Revenue Audit.</h1>
      <p class="route-intro">A short, paid diagnosis across all three stages: how visible you are, how fast you answer, and how many customers come back.</p>
      <div class="route-actions">
        <a class="route-button" href="mailto:hello@claviq.studio">BOOK AN AI REVENUE AUDIT</a>
        <a class="route-link" href="#services">SEE SERVICES <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <span class="route-hero-index">AI<br />AUDIT</span>
  </section>

  <section class="route-section route-section--audit">
    <div class="route-label">THE DIAGNOSIS</div>
    <div>
      <h2>Find where revenue is slipping.</h2>
      <div class="route-audit-grid">
        <p><strong>How visible you are.</strong> Get found on Google, AI search and social media.</p>
        <p><strong>How fast you answer.</strong> Get chosen when a lead comes in.</p>
        <p><strong>How many customers come back.</strong> Get chosen again, so customers return.</p>
      </div>
      <p class="route-quote">It ends with the two or three moves worth most, and roughly what each is worth.</p>
    </div>
  </section>

  <section class="route-section route-section--method">
    <div class="route-label">WHAT HAPPENS NEXT</div>
    <div>
      <h2>Diagnose. Build. Prove.</h2>
      ${methodMarkup}
    </div>
  </section>

  <section class="route-cta">
    <p>Tell us how customers find you and buy from you. In 30 minutes, we will show you where revenue is slipping and what AI can do about it.</p>
    <a class="route-button" href="mailto:hello@claviq.studio">BOOK AN AI REVENUE AUDIT</a>
  </section>
  <footer class="route-footer">Claviq Private Limited · Guwahati, Assam, India · Orlando, Florida, USA</footer>
`;

const routeRenderers = {
  services: renderServicesPage,
  industries: renderIndustriesPage,
  'ai-revenue-audit': renderAuditPage,
  'website-brief': renderBriefPage,
  ...Object.fromEntries(Object.entries(servicePages).map(([slug, service]) => [slug, () => renderServicePage(service)])),
  ...Object.fromEntries(Object.entries(industryPages).map(([slug, industry]) => [slug, () => renderIndustryPage(industry)])),
};

const renderRoute = () => {
  if (!pageShell.classList.contains('is-ready')) return;

  const routeKey = window.location.hash.slice(1);
  const renderer = routeRenderers[routeKey];

  if (!renderer) {
    routePage.hidden = true;
    routePage.classList.remove('is-visible');
    routePage.setAttribute('aria-hidden', 'true');
    homeContent.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('route-open');
    return;
  }

  routePageContent.innerHTML = renderer();
  routePage.hidden = false;
  routePage.setAttribute('aria-hidden', 'false');
  homeContent.setAttribute('aria-hidden', 'true');
  routePage.scrollTop = 0;
  document.body.classList.add('route-open');
  requestAnimationFrame(() => routePage.classList.add('is-visible'));
};

const showBrief = () => {
  if (introScreen.classList.contains('is-entering')) return;

  introScreen.classList.add('is-entering');
  introScreen.setAttribute('aria-hidden', 'true');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    introScreen.classList.add('is-fading');
    briefScreen.hidden = false;
    briefScreen.setAttribute('aria-hidden', 'false');

    requestAnimationFrame(() => {
      briefScreen.classList.add('is-visible');
    });

    window.setTimeout(() => {
      briefEnterButtons[0]?.focus({ preventScroll: true });
    }, 80);
  }, prefersReducedMotion ? 0 : 620);
};

const enterExperience = () => {
  briefScreen.classList.add('is-fading');
  introScreen.classList.add('is-fading');
  introScreen.setAttribute('aria-hidden', 'true');
  pageShell.classList.add('is-ready', 'content-visible');
  pageShell.setAttribute('aria-hidden', 'false');
  questionContent.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('intro-lock');
  renderRoute();

  window.setTimeout(() => {
    briefScreen.hidden = true;
    briefScreen.classList.remove('is-visible', 'is-fading');
  }, 720);
};

introScreen.addEventListener('click', showBrief);

introScreen.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    showBrief();
  }
});

briefEnterButtons.forEach((button) => {
  button.addEventListener('click', enterExperience);
});

const setMenuState = (isOpen) => {
  menuTrigger.classList.toggle('is-open', isOpen);
  menuTrigger.setAttribute('aria-expanded', String(isOpen));
  menuAnnouncement.textContent = isOpen ? 'Close menu' : 'Open menu';
  menuPanel.hidden = !isOpen;
  document.body.classList.toggle('menu-open', isOpen);
};

menuTrigger.addEventListener('click', () => {
  setMenuState(menuTrigger.getAttribute('aria-expanded') !== 'true');
});

menuPanel.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuState(false);
  if (event.target === menuPanel) setMenuState(false);
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.menu-area')) setMenuState(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuState(false);
});

let parallaxFrame;

const updateParallax = () => {
  const scrollOffset = window.scrollY;

  orbs.forEach((orb) => {
    const depth = Number(orb.dataset.depth);
    orb.style.setProperty('--orb-offset', `${scrollOffset * depth}px`);
  });

  parallaxFrame = undefined;
};

window.addEventListener('scroll', () => {
  if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateParallax);
}, { passive: true });

window.addEventListener('hashchange', () => {
  setMenuState(false);
  renderRoute();
});

updateParallax();
