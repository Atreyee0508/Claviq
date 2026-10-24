import './styles.css';
import './mount.jsx';

const introScreen = document.querySelector('#introScreen');
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

const unsplash = (id, width = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

const industryPages = {
  'healthcare-dental': {
    number: '01',
    title: 'Healthcare / dental.',
    line: 'Every missed call is a patient who books somewhere else. We build AI that answers, books and reminds.',
    images: [
      unsplash('1598256989800-fe5f95da9787'),
      unsplash('1588776814546-1ffcf47267a5'),
      unsplash('1629909613654-28e377c37b09'),
      unsplash('1587854692152-cbe660dbde88'),
      unsplash('1584308666744-24d5c474f2ae'),
    ],
  },
  'real-estate': {
    number: '02',
    title: 'Real estate.',
    line: 'Your best leads go cold within the hour. We make sure every site-visit enquiry gets a fast reply and a follow-up.',
    images: [
      unsplash('1600585154340-be6161a56a0c'),
      unsplash('1600596542815-ffad4c1539a9'),
      unsplash('1512917774080-9991f1c4c750'),
      unsplash('1568605114967-8130f3a36994'),
      unsplash('1600607687939-ce8a6c25118c'),
    ],
  },
  'consumer-goods': {
    number: '03',
    title: 'Consumer goods.',
    line: 'Turn social media engagement into orders, and one-time buyers into repeat customers.',
    images: [
      unsplash('1542291026-7eec264c27ff'),
      unsplash('1523275335684-37898b6baf30'),
      unsplash('1526170375885-4d8ecf77b99f'),
      unsplash('1505740420928-5e560c06d30e'),
      unsplash('1560343090-f0409e92791a'),
    ],
  },
  'financial-services': {
    number: '04',
    title: 'Financial services.',
    line: 'Follow up on every SIP and insurance enquiry on time, without adding staff.',
    images: [
      unsplash('1460925895917-afdab827c52f'),
      unsplash('1554224154-26032ffc0d07'),
      unsplash('1611974789855-9c2a0a7236a3'),
      unsplash('1590283603385-17ffb3a7f29f'),
      unsplash('1551288049-bebda4e38f71'),
    ],
  },
};

const industrySlideshowMarkup = (images, title) => `
  <div class="industry-slideshow" aria-hidden="true">
    ${images
      .map(
        (src, index) =>
          `<img src="${src}" alt="${title} background ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" />`,
      )
      .join('')}
  </div>
`;

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

const routeFlow = [
  { key: 'about', number: '01', label: 'About' },
  { key: 'services', number: '02', label: 'Services' },
  { key: 'industries', number: '03', label: 'Industries' },
  { key: 'ai-revenue-audit', number: '04', label: 'AI Revenue Audit' },
  { key: 'contact', number: '05', label: 'Contact' },
];

const routeChainMarkup = (current) => `
  <nav class="route-chain" aria-label="Page flow">
    <span class="route-chain__label">CONTINUE</span>
    <div class="route-chain__track">
      ${routeFlow
        .map(
          (step) => `
        <a class="route-chain__step${step.key === current ? ' is-current' : ''}" href="#${step.key}" data-route-slide${step.key === current ? ' aria-current="page"' : ''}>
          <span class="route-chain__index">${step.number}</span>
          <span class="route-chain__name">${step.label}</span>
        </a>
      `,
        )
        .join('')}
    </div>
  </nav>
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

const industryCollageMarkup = `
  <div class="route-industry-strip" aria-label="Industries we work with">
    <figure class="brief-industry-card brief-industry-card--healthcare" tabindex="0">
      <img src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&amp;fit=crop&amp;w=900&amp;q=85" alt="Dental equipment in a treatment room" loading="lazy" decoding="async" />
    </figure>
    <figure class="brief-industry-card brief-industry-card--real-estate" tabindex="0">
      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=900&amp;q=85" alt="Modern real estate home" loading="lazy" decoding="async" />
    </figure>
    <figure class="brief-industry-card brief-industry-card--consumer" tabindex="0">
      <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&amp;fit=crop&amp;w=900&amp;q=85" alt="Red consumer product sneaker" loading="lazy" decoding="async" />
    </figure>
    <figure class="brief-industry-card brief-industry-card--finance" tabindex="0">
      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&amp;fit=crop&amp;w=900&amp;q=85" alt="Financial analytics dashboard on a laptop" loading="lazy" decoding="async" />
    </figure>
  </div>
`;

const serviceCategories = {
  'Get found.': 'MARKETING & VISIBILITY',
  'Get chosen.': 'SALES & CONVERSION',
  'Get chosen again.': 'RETENTION & REPEAT BUSINESS',
  'Consulting and custom AI.': 'FOUNDATION & STRATEGY',
};

const serviceCardMarkup = (slug, number, title, description) => `
  <a class="route-service-card" data-reveal href="#${slug}">
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
  <a class="route-industry-card" data-reveal href="#${slug}">
    <span>${number}</span>
    <h3>${title}</h3>
    <p>${line}</p>
    <strong aria-hidden="true">↗</strong>
  </a>
`;

const renderServicesPage = () => `
  ${routeHeader('SERVICES', '00')}
  <section class="route-section route-section--problem">
    <div class="route-label">THE PROBLEM</div>
    <div>
      <h2>Nobody owns the revenue.</h2>
      <p>Most companies have an agency for marketing, a tool for customer chats and a consultant for strategy. Each one reports its own numbers. Nobody owns revenue.</p>
      <p>Meanwhile, customers slip away at every stage. They cannot find you when they ask Google or ChatGPT. They wait too long for a reply. Or they buy once and never come back.</p>
    </div>
  </section>

  <section class="route-section route-section--solutions">
    <div class="route-label" data-reveal>SOLUTIONS</div>
    <div>
      <h2 data-reveal>Everything Claviq does.</h2>
      <div class="route-service-slider">
        <div class="route-service-grid route-service-grid--slider" data-service-slider>
          ${serviceCardMarkup('get-found', '01', 'Get found.', 'AEO and SEO, social media, content and AI video ads that bring the right people to you.')}
          ${serviceCardMarkup('get-chosen', '02', 'Get chosen.', 'AI that answers calls and WhatsApp messages, follows up every lead and shows your team the next sale.')}
          ${serviceCardMarkup('get-chosen-again', '03', 'Get chosen again.', 'Reminders, reorders and offers that bring customers back and raise what each one spends.')}
          ${serviceCardMarkup('consulting-custom-ai', '04', 'Consulting and custom AI.', 'Revenue strategy, custom AI tools built for your business, and independent reviews of AI you already run.')}
        </div>
        <div class="route-slider-controls">
          <span class="route-slider-count" data-slider-count>01 / 04</span>
          <button class="route-slider-button" data-slider-prev type="button" aria-label="Previous service">←</button>
          <button class="route-slider-button" data-slider-next type="button" aria-label="Next service">→</button>
        </div>
      </div>
    </div>
  </section>

  <section class="route-section route-section--industries">
    <div class="route-label" data-reveal>INDUSTRIES</div>
    <div>
      <h2 data-reveal>From single-location clinics to national brands.</h2>
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
  ${routeChainMarkup('services')}
  <footer class="route-footer">Claviq Private Limited · Guwahati, Assam, India · Orlando, Florida, USA</footer>
`;

const testimonialMarkup = (quote, sector) => `
  <article class="route-testimonial">
    <p class="route-quote">“${quote}”</p>
    <span>${sector}</span>
  </article>
`;

const caseItemMarkup = (number, sector, title, text) => `
  <article class="route-case">
    <span>${number} · ${sector}</span>
    <h3>${title}</h3>
    <p>${text}</p>
  </article>
`;

const renderAboutPage = () => `
  ${routeHeader('ABOUT', 'GUWAHATI → ORLANDO')}
  <section class="route-section route-section--about">
    <div class="route-label">THE WEBSITE BRIEF</div>
    <div>
      <h2>One partner, from first search to repeat sale.</h2>
      <p>Claviq uses AI to help companies get found, get chosen and get chosen again. Marketing, sales and retention sit in one place, measured in revenue rather than followers, chats or slides.</p>
      <p>Claviq was founded by Kaushik Boruah. Over twelve years, he solved growth problems with data and AI for Fortune 500 consumer and hospitality brands. He started Claviq to bring that discipline to every company that wants to grow.</p>
      <p class="route-quote">If there is no straight line from a service to revenue, we don't sell it under Claviq.</p>
    </div>
  </section>

  <section class="route-section route-section--industries">
    <div class="route-label">INDUSTRIES</div>
    <div>
      <h2>Where we work.</h2>
      <p>We began in healthcare and work across real estate, consumer goods and financial services, from single-location clinics to national brands.</p>
      <div class="route-collage-wrap">
        ${industryCollageMarkup}
      </div>
    </div>
  </section>

  <section class="route-section route-section--testimonials">
    <div class="route-label">TESTIMONIALS</div>
    <div>
      <h2>What it is like to work with Claviq.</h2>
      <div class="route-testimonial-grid">
        ${testimonialMarkup('Claviq started with the calls we were missing, not with a pitch. The first build answered them.', 'Dental practice · Guwahati')}
        ${testimonialMarkup('Every site-visit enquiry now gets a reply before it goes cold.', 'Real estate · Orlando')}
        ${testimonialMarkup('They connected our ads, our WhatsApp and our repeat orders into one report.', 'Consumer goods · Guwahati')}
        ${testimonialMarkup('The audit told us which two moves were worth paying for. We did those.', 'Financial services · Guwahati')}
      </div>
      <p class="route-fineprint">Client names are shared on request.</p>
    </div>
  </section>

  <section class="route-section route-section--case-studies">
    <div class="route-label">CASE STUDIES</div>
    <div>
      <h2>How the work looks on the ground.</h2>
      <div class="route-case-grid">
        ${caseItemMarkup('01', 'HEALTHCARE / DENTAL', 'Answer every patient call, then bring them back.', 'An AI receptionist answers, books and sends recall reminders before the next appointment is due. We measure calls answered, bookings made and patients who return.')}
        ${caseItemMarkup('02', 'REAL ESTATE', 'Reply to every enquiry within minutes.', 'One inbox for every enquiry, automated follow-up and a daily list of the next calls for the sales team. We measure response time and site visits booked.')}
        ${caseItemMarkup('03', 'CONSUMER GOODS', 'Turn engagement into repeat orders.', 'Order reminders, loyalty journeys and a clear view of which products bring customers back. We measure repeat purchase rate and revenue per customer.')}
        ${caseItemMarkup('04', 'FINANCIAL SERVICES', 'Follow up on every SIP and insurance enquiry on time.', 'Automated follow-up for every enquiry, with a clear handover when a conversation needs an advisor. We measure meetings booked and policies completed.')}
      </div>
    </div>
  </section>

  <section class="route-section route-section--blog">
    <div class="route-label">BLOG</div>
    <div>
      <h2>Notes on revenue.</h2>
      <div class="route-post-list">
        ${blogPostMarkup('01', 'AEO is the new SEO.', 'How to get found when customers ask ChatGPT instead of scrolling Google. What changes, and what does not.', '4 MIN READ')}
        ${blogPostMarkup('02', 'The follow-up is the sale.', 'Most leads are lost between the enquiry and the second message. A simple system for closing that gap.', '3 MIN READ')}
        ${blogPostMarkup('03', 'Retention is a revenue channel.', 'Why the cheapest customer to win is the one you already have, and how to bring them back.', '5 MIN READ')}
        ${blogPostMarkup('04', 'What an AI revenue audit looks at.', 'The three stages we check, the numbers we ask for, and what the output actually contains.', '4 MIN READ')}
      </div>
    </div>
  </section>

  <section class="route-cta">
    <p>Tell us how customers find you and buy from you. In 30 minutes, we will show you where revenue is slipping and what AI can do about it.</p>
    <a class="route-button" href="#ai-revenue-audit">BOOK AN AI REVENUE AUDIT</a>
  </section>
  ${routeChainMarkup('about')}
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
  ${routeChainMarkup('industries')}
  <footer class="route-footer">Claviq Private Limited · Guwahati, Assam, India · Orlando, Florida, USA</footer>
`;

const renderIndustryPage = (industry) => `
  ${industrySlideshowMarkup(industry.images, industry.title)}
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

const blogPostMarkup = (number, title, excerpt, time) => `
  <article class="route-post">
    <span class="route-post-index">${number}</span>
    <div>
      <h3>${title}</h3>
      <p>${excerpt}</p>
    </div>
    <span class="route-post-time">${time}</span>
  </article>
`;

const renderAuditPage = () => `
  ${routeHeader('AI REVENUE AUDIT', 'AUDIT')}
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

  <section class="route-section route-section--diagnostics">
    <div class="route-label">DIAGNOSTICS</div>
    <div>
      <h2>What the audit checks.</h2>
      <div class="route-expect-list">
        <p>Where you appear when someone asks Google or ChatGPT for what you sell.</p>
        <p>How your website and profiles convert the people who do find you.</p>
        <p>What happens to a call, WhatsApp message or form fill after it arrives.</p>
        <p>How quickly a lead gets a reply, and how many get a second follow-up.</p>
        <p>Which customers come back, and what brings them back.</p>
        <p>Where the handoffs between marketing, sales and support break.</p>
      </div>
    </div>
  </section>

  <section class="route-section route-section--deliverables">
    <div class="route-label">DELIVERABLES</div>
    <div>
      <h2>What you receive.</h2>
      <div class="route-expect-list">
        <p>A written summary of how customers find you, buy from you and come back.</p>
        <p>A map of where revenue leaks at each stage.</p>
        <p>The two or three moves worth most, and roughly what each is worth.</p>
        <p>A recommended sequence, and what we would build first.</p>
      </div>
    </div>
  </section>

  <section class="route-section route-section--method">
    <div class="route-label">WHAT HAPPENS NEXT</div>
    <div>
      <h2>Diagnose. Build. Prove.</h2>
      ${methodMarkup}
    </div>
  </section>

  <section class="route-section route-section--bookings">
    <div class="route-label">BOOKINGS</div>
    <div>
      <h2>Book the audit.</h2>
      <p>The audit is a short, paid diagnosis. We run it remotely, in Guwahati or Orlando hours, and you leave with the written summary and the shortlist of moves.</p>
      <div class="route-expect-list">
        <p><strong>01 · Send a note.</strong> Tell us how customers find you and buy from you.</p>
        <p><strong>02 · Pick a slot.</strong> We confirm a 30-minute call at a time that works in your time zone.</p>
        <p><strong>03 · Get the diagnosis.</strong> We walk through the findings and the moves worth making.</p>
      </div>
      <div class="route-actions">
        <a class="route-button" href="mailto:hello@claviq.studio">BOOK AN AI REVENUE AUDIT</a>
      </div>
    </div>
  </section>

  <section class="route-cta">
    <p>Tell us how customers find you and buy from you. In 30 minutes, we will show you where revenue is slipping and what AI can do about it.</p>
    <a class="route-button" href="mailto:hello@claviq.studio">BOOK AN AI REVENUE AUDIT</a>
  </section>
  ${routeChainMarkup('ai-revenue-audit')}
  <footer class="route-footer">Claviq Private Limited · Guwahati, Assam, India · Orlando, Florida, USA</footer>
`;

const renderContactPage = () => `
  ${routeHeader('CONTACT', 'GUWAHATI → ORLANDO')}
  <section class="route-hero route-hero--service">
    <div>
      <p class="route-kicker">CONTACT US</p>
      <h1>Tell us how customers find you and buy from you.</h1>
      <p class="route-intro">Send a note with a paragraph about your business. We reply with a time for a 30-minute AI revenue audit call.</p>
      <div class="route-actions">
        <a class="route-button" href="mailto:hello@claviq.studio">EMAIL HELLO@CLAVIQ.STUDIO</a>
        <a class="route-link" href="#ai-revenue-audit">SEE THE AUDIT <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <span class="route-hero-index">CLAVIQ<br />CONTACT</span>
  </section>

  <section class="route-section route-section--facts">
    <div class="route-label">WHERE WE WORK</div>
    <div>
      <h2>Two markets, one team.</h2>
      <p>We work with companies in India and the United States, across Guwahati and Orlando hours.</p>
      <div class="route-facts">
        <article>
          <span>GUWAHATI</span>
          <p>Assam, India</p>
        </article>
        <article>
          <span>ORLANDO</span>
          <p>Florida, USA</p>
        </article>
      </div>
    </div>
  </section>

  <section class="route-cta">
    <p>Prefer to write first? Email us with how customers find you and buy from you. We will reply with the next step.</p>
    <a class="route-button" href="mailto:hello@claviq.studio">WRITE TO US</a>
  </section>
  ${routeChainMarkup('contact')}
  <footer class="route-footer">Claviq Private Limited · Guwahati, Assam, India · Orlando, Florida, USA</footer>
`;

const routeRenderers = {
  services: renderServicesPage,
  industries: renderIndustriesPage,
  'ai-revenue-audit': renderAuditPage,
  about: renderAboutPage,
  'website-brief': renderAboutPage,
  contact: renderContactPage,
  ...Object.fromEntries(Object.entries(servicePages).map(([slug, service]) => [slug, () => renderServicePage(service)])),
  ...Object.fromEntries(Object.entries(industryPages).map(([slug, industry]) => [slug, () => renderIndustryPage(industry)])),
};

let revealObserver;

const setupReveals = () => {
  revealObserver?.disconnect();
  revealObserver = undefined;

  const items = routePageContent.querySelectorAll('[data-reveal]');

  if (!items.length) {
    routePageContent.classList.remove('reveal-ready');
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    routePageContent.classList.remove('reveal-ready');
    items.forEach((item) => item.classList.add('is-revealed'));
    return;
  }

  routePageContent.classList.add('reveal-ready');

  items.forEach((item) => {
    const siblings = Array.from(item.parentElement.querySelectorAll('[data-reveal]'));
    const index = Math.min(siblings.indexOf(item), 8);
    item.style.setProperty('--reveal-delay', `${index * 70}ms`);
  });

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    });
  }, { root: routePage, threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach((item) => revealObserver.observe(item));
};

const setupServiceSlider = () => {
  const track = routePageContent.querySelector('[data-service-slider]');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.route-service-card'));
  const prev = routePageContent.querySelector('[data-slider-prev]');
  const next = routePageContent.querySelector('[data-slider-next]');
  const count = routePageContent.querySelector('[data-slider-count]');

  const step = () => (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth);

  const update = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (prev) prev.disabled = track.scrollLeft <= 2;
    if (next) next.disabled = track.scrollLeft >= maxScroll - 2;

    if (count) {
      const index = Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / step())));
      count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    }
  };

  prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });

  let pointerDown = false;
  let dragged = false;
  let startX = 0;
  let startScroll = 0;

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerDown = true;
    dragged = false;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    track.classList.add('is-dragging');
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener('pointermove', (event) => {
    if (!pointerDown) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 5) dragged = true;
    track.scrollLeft = startScroll - delta;
  });

  const endDrag = (event) => {
    if (!pointerDown) return;
    pointerDown = false;
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  };

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('click', (event) => {
    if (!dragged) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  update();
};

const setupAboutBackdrop = () => {
  const backdrop = document.querySelector('[data-about-backdrop]');
  if (!backdrop) return;

  const slides = Array.from(backdrop.querySelectorAll('.about-backdrop__slide'));
  if (slides.length < 2) return;

  let index = 0;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });
  };

  if (reducedMotionQuery.matches) {
    show(0);
    return;
  }

  window.setInterval(() => {
    if (document.hidden || !document.body.classList.contains('is-about-route')) return;
    show(index + 1);
  }, 5600);
};

const setupHomeSlideshow = () => {
  const slideshow = document.querySelector('[data-home-slideshow]');
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll('.home-slideshow__slide'));
  const captions = Array.from(slideshow.querySelectorAll('.home-slideshow__caption'));
  if (slides.length < 2) return;

  let index = 0;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });
    captions.forEach((caption, captionIndex) => {
      caption.classList.toggle('is-active', captionIndex === index);
    });
  };

  if (reducedMotionQuery.matches) return;

  window.setInterval(() => {
    if (document.hidden || !routePage.hidden) return;
    show(index + 1);
  }, 6400);
};

let pendingSlide = 0;
let slideLocked = false;
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const renderRoute = () => {
  if (!pageShell.classList.contains('is-ready')) return;

  const routeKey = window.location.hash.slice(1);
  const renderer = routeRenderers[routeKey];

  if (!renderer) {
    revealObserver?.disconnect();
    revealObserver = undefined;
    routePage.hidden = true;
    routePage.classList.remove('is-visible');
    routePage.setAttribute('aria-hidden', 'true');
    homeContent.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('route-open');
    routePageContent.classList.remove('is-slide-out-left', 'is-slide-out-right', 'is-slide-in-right', 'is-slide-in-left');
    pendingSlide = 0;
    slideLocked = false;
    routePage.classList.remove('is-inverted');
    routePage.classList.remove('is-about');
    document.body.classList.remove('is-inverted-route');
    document.body.classList.remove('is-about-route');
    return;
  }

  const isAbout = routeKey === 'about' || routeKey === 'website-brief';
  const isInverted = isAbout || routeKey === 'ai-revenue-audit';
  routePage.classList.toggle('is-inverted', isInverted);
  routePage.classList.toggle('is-about', isAbout);
  document.body.classList.toggle('is-inverted-route', isInverted);
  document.body.classList.toggle('is-about-route', isAbout);

  routePageContent.classList.remove('is-slide-out-left', 'is-slide-out-right', 'is-slide-in-right', 'is-slide-in-left');
  routePageContent.innerHTML = renderer();
  routePage.hidden = false;
  routePage.setAttribute('aria-hidden', 'false');
  homeContent.setAttribute('aria-hidden', 'true');
  routePage.scrollTop = 0;
  document.body.classList.add('route-open');

  if (pendingSlide) {
    const incomingClass = pendingSlide > 0 ? 'is-slide-in-right' : 'is-slide-in-left';
    routePageContent.classList.add(incomingClass);
    pendingSlide = 0;
    window.setTimeout(() => {
      routePageContent.classList.remove(incomingClass);
      slideLocked = false;
    }, 480);
  } else {
    slideLocked = false;
  }

  requestAnimationFrame(() => routePage.classList.add('is-visible'));
  setupReveals();
  setupServiceSlider();
};

const enterExperience = () => {
  introScreen.classList.add('is-fading');
  introScreen.setAttribute('aria-hidden', 'true');
  pageShell.classList.add('is-ready', 'content-visible');
  pageShell.setAttribute('aria-hidden', 'false');
  questionContent.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('intro-lock');
  renderRoute();
};

window.setTimeout(() => {
  introScreen.classList.add('is-entering');
}, 1200);

window.setTimeout(enterExperience, 2000);

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

routePage.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-route-slide]');
  if (!link) return;

  const targetHash = link.getAttribute('href');
  if (!targetHash || targetHash === window.location.hash) return;

  event.preventDefault();
  if (slideLocked) return;

  const fromIndex = routeFlow.findIndex((step) => `#${step.key}` === window.location.hash);
  const toIndex = routeFlow.findIndex((step) => `#${step.key}` === targetHash);

  pendingSlide = toIndex >= fromIndex ? 1 : -1;
  slideLocked = true;

  routePageContent.classList.remove('is-slide-in-right', 'is-slide-in-left');
  routePageContent.classList.add(pendingSlide > 0 ? 'is-slide-out-left' : 'is-slide-out-right');

  window.setTimeout(() => {
    window.location.hash = targetHash;
  }, reducedMotionQuery.matches ? 0 : 240);
});

window.addEventListener('hashchange', () => {
  setMenuState(false);
  renderRoute();
});

updateParallax();
setupAboutBackdrop();
setupHomeSlideshow();
