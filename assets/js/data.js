/* ==========================================================================
   Content: English strings, services, projects and their 3D massing scenes.
   Lithuanian copy lives in index.html and is picked up automatically.

   PROJECTS below are representative placeholders — replace titles, places,
   descriptions and (optionally) add `image: 'assets/img/projects/xyz.jpg'`
   to show a real photo instead of the generated model.
   ========================================================================== */
window.VA = (function () {
  'use strict';

  const EN = {
    'skip': 'Skip to content',
    'nav.about': 'About', 'nav.services': 'Services', 'nav.projects': 'Projects',
    'nav.process': 'Process', 'nav.contact': 'Contact', 'nav.cta': 'Discuss a project',
    'hero.eyebrow': 'General contracting · Since 2007',
    'hero.title': 'We build<br><em>what lasts.</em>',
    'hero.lead': 'An Alytus-based construction company delivering general contracting, design, general and special construction, and cultural heritage works across Lithuania.',
    'hero.cta1': 'View projects', 'hero.cta2': 'Get in touch',
    'hero.loc': 'Alytus, Lithuania', 'hero.scroll': 'Scroll',
    'mq.1': 'General contracting', 'mq.2': 'Design', 'mq.3': 'Special structures',
    'mq.4': 'Cultural heritage', 'mq.5': 'Renovation', 'mq.6': 'Engineering networks',
    'mq.7': 'Residential buildings', 'mq.8': 'Industrial facilities',
    'stats.1': 'Founded', 'stats.2': 'Qualified employees', 'stats.3': 'Years of experience', 'stats.4': 'ISO certifications',
    'about.label': 'About us',
    'about.title': 'A reliable partner from the first drawing to the handover of keys.',
    'about.caption': 'Headquarters',
    'about.p1': 'Since 2007, VA STATYBA has grown together with its clients. Today we are a team of more than 100 specialists delivering residential, commercial, industrial and public projects all over Lithuania.',
    'about.p2': 'Our qualified specialists take care of project preparation, building permits and completion documentation — so all you have to do is watch your idea become a building.',
    'about.c1': 'Licensed contractor for special (high-complexity) structures',
    'about.c2': 'Works on cultural heritage sites and in their protection zones',
    'about.c3': 'ISO 9001, ISO 14001 and ISO 45001 certified management',
    'about.c4': 'The full cycle — from design to handover',
    'services.label': 'Services',
    'services.title': 'The full construction cycle — in one pair of hands.',
    'projects.label': 'Projects', 'projects.title': 'Selected work',
    'process.label': 'Process', 'process.title': 'A clear path to the result.',
    'process.s1.t': 'Consultation', 'process.s1.d': 'We listen to your needs, assess the site or existing building and propose the optimal solutions.',
    'process.s2.t': 'Design & permits', 'process.s2.d': 'We prepare the design and cost estimate, and obtain all building permits.',
    'process.s3.t': 'Construction', 'process.s3.d': 'We build to an agreed schedule, keep you informed on progress and control quality at every step.',
    'process.s4.t': 'Handover', 'process.s4.d': 'We complete the completion documentation and hand over the building — with a warranty.',
    'quality.label': 'Quality', 'quality.title': 'Quality you can verify.',
    'quality.text': 'Our operations are certified to international standards for quality, environmental and occupational health & safety management.',
    'quality.b1': 'Quality management', 'quality.b2': 'Environmental management', 'quality.b3': 'Occupational health & safety',
    'quality.b4t': 'Special structures', 'quality.b4': 'Licensed special structures contractor',
    'quality.b5t': 'Heritage', 'quality.b5': 'Cultural heritage works',
    'quality.b6': 'Projects all over Lithuania',
    'careers.k': 'Careers', 'careers.t': 'Build with us. We are hiring site managers, engineers and craftspeople.', 'careers.cta': 'Send your CV',
    'contact.label': 'Contact', 'contact.title': 'Have a project? <em>Let’s talk.</em>',
    'contact.phone': 'Phone', 'contact.email': 'Email', 'contact.address': 'Address', 'contact.req': 'Company details',
    'contact.code': 'Company code', 'contact.vat': 'VAT code',
    'form.name': 'Full name', 'form.company': 'Company', 'form.email': 'Email', 'form.phone': 'Phone',
    'form.type': 'Project type', 'form.t1': 'Residential', 'form.t2': 'Commercial', 'form.t3': 'Industrial',
    'form.t4': 'Public', 'form.t5': 'Heritage', 'form.msg': 'Tell us briefly about the project',
    'form.note': 'We reply within 1 business day.', 'form.send': 'Send enquiry',
    'footer.top': 'Back to top', 'footer.rights': 'All rights reserved',
    'modal.cta': 'Discuss a similar project'
  };

  const UI = {
    lt: {
      all: 'Visi', residential: 'Gyvenamieji', commercial: 'Komerciniai', industrial: 'Pramoniniai',
      public: 'Visuomeniniai', heritage: 'Paveldas', view: 'Peržiūrėti',
      category: 'Kategorija', location: 'Vieta', works: 'Atlikti darbai', role: 'Vaidmuo',
      formErr: 'Užpildykite vardą, el. paštą ir žinutę.', formOk: 'Ačiū! Atidaromas el. pašto langas užklausai išsiųsti.',
      mailSubject: 'Užklausa iš svetainės', close: 'Uždaryti'
    },
    en: {
      all: 'All', residential: 'Residential', commercial: 'Commercial', industrial: 'Industrial',
      public: 'Public', heritage: 'Heritage', view: 'View',
      category: 'Category', location: 'Location', works: 'Scope of works', role: 'Role',
      formErr: 'Please fill in your name, email and message.', formOk: 'Thank you! Your email app is opening to send the enquiry.',
      mailSubject: 'Website enquiry', close: 'Close'
    }
  };

  /* ---- scenes ------------------------------------------------------------ */
  const G = (x, y, w, d) => ({ ground: true, x, y, w, d, h: 0.3 });
  const T = (x, y, r) => ({ tree: [x, y, r || 0.6] });
  const CLAY_A = '#e2b49c', CLAY_B = '#c98a6c';

  const SCENES = {
    residential: [
      G(-1.5, -1.5, 17.5, 15.5),
      { x: 0, y: 0, w: 4, d: 11, h: 6, win: 'stripes' },
      { x: 6, y: 0, w: 8.5, d: 4, h: 8, win: 'stripes' },
      T(12.2, 6.2, 0.55),
      { x: 6, y: 6, w: 4, d: 5.5, h: 5, win: 'stripes' },
      { x: 11.5, y: 8, w: 3, d: 3, h: 1, accent: true },
      T(1, 12.7, 0.55), T(3.4, 12.7, 0.55), T(7, 12.9, 0.5), T(13, 12.8, 0.5)
    ],
    business: [
      G(-1.5, -1.5, 16.5, 14),
      { x: 0, y: 0, w: 13, d: 10, h: 2, win: 'ribbon', floor: 1 },
      { x: 1, y: 1, z: 2, w: 6, d: 6, h: 11, win: 'ribbon', floor: 1 },
      { x: 8, y: 1, z: 2, w: 4, d: 5, h: 4, win: 'fins' },
      { x: 8.5, y: 6.8, z: 2, w: 3.5, d: 2.6, h: 1.4, accent: true },
      T(14, 3, 0.5), T(14, 6, 0.5), T(14, 9, 0.5),
      T(1.5, 11.3, 0.5), T(4.5, 11.3, 0.5), T(7.5, 11.3, 0.5), T(10.5, 11.3, 0.5)
    ],
    industrial: [
      G(-1.5, -1.5, 23, 14.5),
      { x: 0, y: 0, w: 18, d: 8, h: 3.6, win: 'fins', parapet: true },
      { x: 0, y: 8.4, w: 6, d: 3.2, h: 3, win: 'ribbon', floor: 1 },
      { x: 7.5, y: 8, z: 2.2, w: 9, d: 1.3, h: 0.22, accent: true },
      { x: 19, y: 1, w: 1.6, d: 1.6, h: 5.5, win: 'none' },
      T(20, 5.5, 0.5), T(20, 8, 0.5), T(20, 10.5, 0.5), T(8.5, 12, 0.45), T(12, 12, 0.45)
    ],
    manor: [
      G(-2, -2, 21, 16.5),
      T(-0.5, -0.5, 0.8), T(1.2, -0.8, 0.6),
      { x: 2, y: 1, w: 11, d: 4.6, h: 2.6, floor: 1.3, step: 1.1, ww: 0.38, roof: 'gable', axis: 'x', rh: 2, roofA: CLAY_A, roofB: CLAY_B },
      { x: 15, y: 1, w: 3.2, d: 5, h: 1.6, floor: 1.6, step: 1.2, roof: 'gable', axis: 'y', rh: 1.4, roofA: CLAY_B, roofB: CLAY_A },
      { x: 0, y: 7.5, w: 3.4, d: 5, h: 1.6, floor: 1.6, step: 1.2, roof: 'gable', axis: 'y', rh: 1.4, roofA: CLAY_B, roofB: CLAY_A },
      T(7, 9, 0.7), T(9.8, 10.8, 0.6), T(12.8, 9.4, 0.7), T(16, 10.5, 0.7), T(5.5, 12.6, 0.55), T(17.8, 13, 0.55)
    ],
    school: [
      G(-1.5, -1.5, 19.5, 15.5),
      { x: 0, y: 0, w: 16.5, d: 3.6, h: 3, win: 'ribbon', floor: 1 },
      { x: 0, y: 4, w: 3.6, d: 8.5, h: 3, win: 'ribbon', floor: 1 },
      T(7, 8, 0.6), T(9.6, 6.2, 0.55), T(8.2, 10.6, 0.55),
      { x: 12.9, y: 4, w: 3.6, d: 8.5, h: 2, win: 'ribbon', floor: 1, accent: true },
      T(1.5, 13.4, 0.5), T(5, 13.4, 0.5), T(9, 13.4, 0.5)
    ],
    sports: [
      G(-1.5, -1.5, 18.5, 15.5),
      { x: 0, y: 0, w: 12, d: 10, h: 4.2, win: 'fins', roof: 'gable', axis: 'y', rh: 1.1 },
      { x: 13.2, y: 0, w: 2.6, d: 10, h: 0.08, accent: true },
      { x: 2.5, y: 10.2, w: 7, d: 2.4, h: 1.8, accent: true, win: 'ribbon', floor: 1.8 },
      T(14.5, 11.5, 0.55), T(11.5, 13.2, 0.5), T(0.8, 13.2, 0.5)
    ],
    mall: [
      G(-1.5, -1.5, 23, 15),
      { x: 0, y: 0, w: 18, d: 9, h: 2.6, win: 'ribbon', floor: 1.3 },
      { x: 3, y: 2, z: 2.6, w: 5, d: 4, h: 0.9, win: 'none' },
      { x: 10, y: 1.5, z: 2.6, w: 2.5, d: 2.5, h: 0.6, win: 'none' },
      { x: 16.2, y: 9.8, w: 1.1, d: 1.1, h: 5.2, accent: true },
      T(1, 11.8, 0.5), T(4, 11.8, 0.5), T(7, 11.8, 0.5), T(10, 11.8, 0.5), T(13, 11.8, 0.5), T(19.8, 3, 0.5), T(19.8, 6.5, 0.5)
    ],
    houses: [
      G(-1.5, -1.5, 19.5, 17),
      { x: 0, y: 0, w: 4.2, d: 3.6, h: 1.5, floor: 1.5, step: 1.4, roof: 'gable', axis: 'x', rh: 1.3 },
      { x: 6.2, y: 0, w: 4.4, d: 3.6, h: 2.2, floor: 1.1, win: 'ribbon' },
      { x: 12.6, y: 0, w: 4.2, d: 3.6, h: 1.5, floor: 1.5, step: 1.4, roof: 'gable', axis: 'x', rh: 1.3 },
      T(5, 5.6, 0.5), T(11.4, 5.6, 0.5), T(17.4, 5.6, 0.5),
      { x: 0, y: 7.5, w: 3.6, d: 4.4, h: 1.5, floor: 1.5, step: 1.4, roof: 'gable', axis: 'y', rh: 1.3 },
      { x: 6.2, y: 7.5, w: 4.4, d: 3.8, h: 2.2, floor: 1.1, win: 'ribbon', accent: true },
      { x: 12.6, y: 7.5, w: 3.6, d: 4.4, h: 1.5, floor: 1.5, step: 1.4, roof: 'gable', axis: 'y', rh: 1.3 },
      T(4.8, 14, 0.5), T(11, 14, 0.5), T(16.8, 14, 0.5)
    ]
  };

  // Hero: a city block at dusk, one tower still rising under a crane.
  const HERO = {
    palette: 'dark',
    items: [
      G(-2, -2, 26, 21),
      { x: 0, y: 0, w: 5, d: 5, h: 13, step: 1 },
      { x: 6, y: 0, w: 7, d: 4, h: 8, win: 'ribbon', floor: 1 },
      { x: 0, y: 6, w: 4, d: 7, h: 9, step: 1 },
      { x: 6, y: 5, w: 8, d: 8, h: 3, win: 'ribbon', floor: 1 },
      { x: 8, y: 7, z: 3, w: 4, d: 4, h: 10, step: 1 },
      { x: 8, y: 7, z: 13, w: 4, d: 4, h: 1, accent: true, win: 'none' },
      { x: 15, y: 0, w: 6, d: 6, h: 5, win: 'stripes' },
      { x: 0, y: 14.5, w: 8, d: 3, h: 2.5, win: 'ribbon', floor: 1.25 },
      { x: 15.5, y: 7.5, w: 5, d: 7, h: 6, win: 'stripes' },
      T(17, 16.8, 0.6), T(19.5, 16.8, 0.6), T(22.5, 16.8, 0.6), T(22.5, 3, 0.6), T(22.5, 6, 0.6), T(22.5, 9.5, 0.6), T(22.5, 13, 0.6)
    ],
    crane: { at: 7, x: 14, y: 2, h: 19, L: 11, Lc: 4, theta: 2.09, swing: 0.22, r: 0.72, trolley: 0.1, hookZ: 16.4, load: { w: 2.2, d: 0.6 } }
  };

  const ABOUT = {
    palette: 'paper',
    items: [
      G(-1.5, -1.5, 18, 15),
      { x: 0, y: 0, w: 14, d: 5, h: 3.8, win: 'fins', parapet: true },
      { x: 0, y: 5.6, w: 8, d: 4.4, h: 3, win: 'ribbon', floor: 1 },
      { x: 9.2, y: 6, w: 4.6, d: 3.6, h: 0.9, accent: true },
      { x: 9.6, y: 10.6, w: 0.6, d: 0.6, h: 3.8, accent: true },
      T(15.4, 2, 0.55), T(15.4, 5, 0.55), T(15.4, 8, 0.55), T(1, 12, 0.5), T(4, 12, 0.5), T(12.8, 12.2, 0.5)
    ]
  };

  const SVC_SCENES = [
    { palette: 'dark', items: SCENES.business.slice(), crane: { at: 5, x: 14, y: 0.5, h: 16, L: 10, Lc: 3, theta: 2.8, r: 0.7, hookZ: 14.2 } },
    { palette: 'wire', items: SCENES.business.filter((it) => !it.tree) },
    { palette: 'dark', items: SCENES.residential },
    { palette: 'dark', items: [
      G(-1.5, -1.5, 18, 14),
      { x: 0, y: 0, w: 4, d: 4, h: 18, step: 1 },
      { x: 0, y: 0, z: 18, w: 4, d: 4, h: 1.2, accent: true },
      { x: 6, y: 0, w: 10, d: 8, h: 3, win: 'fins', roof: 'gable', axis: 'x', rh: 1.6 },
      { x: 0, y: 6, w: 4, d: 5, h: 4, win: 'ribbon', floor: 1 },
      T(7, 10.4, 0.55), T(10, 10.4, 0.55), T(13, 10.4, 0.55)
    ] },
    { palette: 'dark', items: SCENES.manor.map((it) => (it.roof ? Object.assign({}, it, { roofA: '#ff8a57', roofB: '#d8470f' }) : it)) },
    { palette: 'dark', items: [
      G(-1.5, -1.5, 18, 13),
      { x: 0, y: 0, w: 7, d: 9, h: 5, win: 'stripes' },
      { x: 7, y: 0, w: 7, d: 9, h: 5, win: 'grid', step: 1.4, accent: true },
      T(15.5, 3, 0.55), T(15.5, 7, 0.55), T(3, 10.5, 0.5), T(10, 10.5, 0.5)
    ] }
  ];

  const SERVICES = [
    {
      lt: { t: 'Generalinė ranga', d: 'Prisiimame visą atsakomybę už projektą: planuojame, koordinuojame subrangovus, valdome biudžetą ir terminus.', tags: ['Projekto valdymas', 'Sąmatos', 'Kokybės kontrolė'] },
      en: { t: 'General contracting', d: 'We take full responsibility for the project: planning, coordinating subcontractors and managing budget and deadlines.', tags: ['Project management', 'Estimating', 'Quality control'] }
    },
    {
      lt: { t: 'Projektavimas', d: 'Parengiame techninius ir darbo projektus, gauname statybą leidžiančius dokumentus ir visus derinimus.', tags: ['Techninis projektas', 'Darbo projektas', 'Leidimai'] },
      en: { t: 'Design', d: 'We prepare technical and working designs and obtain building permits and all required approvals.', tags: ['Technical design', 'Working design', 'Permits'] }
    },
    {
      lt: { t: 'Bendroji statyba', d: 'Naujų gyvenamųjų, komercinių ir pramoninių pastatų statyba – nuo pamatų iki galutinės apdailos.', tags: ['Pamatai', 'Karkasai', 'Apdaila'] },
      en: { t: 'General construction', d: 'New residential, commercial and industrial buildings — from foundations to final finishes.', tags: ['Foundations', 'Structures', 'Finishes'] }
    },
    {
      lt: { t: 'Ypatingi statiniai', d: 'Turime teisę būti ypatingų statinių statybos rangovu ir vykdyti specialiuosius statybos darbus.', tags: ['Specialieji darbai', 'Konstrukcijos', 'Inžinerinės sistemos'] },
      en: { t: 'Special structures', d: 'We are licensed to act as contractor for special (high-complexity) structures and to carry out special construction works.', tags: ['Special works', 'Structures', 'Building services'] }
    },
    {
      lt: { t: 'Kultūros paveldas', d: 'Atsakingai tvarkome ir atkuriame kultūros paveldo objektus bei statome jų apsaugos zonose.', tags: ['Restauravimas', 'Tvarkyba', 'Pritaikymas'] },
      en: { t: 'Cultural heritage', d: 'We carefully restore and adapt cultural heritage sites and build within their protection zones.', tags: ['Restoration', 'Conservation', 'Adaptive reuse'] }
    },
    {
      lt: { t: 'Renovacija ir rekonstrukcija', d: 'Modernizuojame esamus pastatus: didiname energinį efektyvumą, keičiame paskirtį, atnaujiname inžinerinius tinklus.', tags: ['Energinis efektyvumas', 'Rekonstrukcija', 'Inžineriniai tinklai'] },
      en: { t: 'Renovation & reconstruction', d: 'We modernise existing buildings: improving energy efficiency, changing use and upgrading engineering networks.', tags: ['Energy efficiency', 'Reconstruction', 'Engineering networks'] }
    }
  ];

  const PROJECTS = [
    {
      cat: 'residential', scene: 'residential', size: 'wide',
      lt: { t: 'Daugiabučių namų kvartalas', place: 'Alytus', d: 'Trijų daugiabučių gyvenamųjų namų kvartalas su apželdintu kiemu ir požeminėmis inžinerinėmis sistemomis.', works: 'Generalinė ranga, bendroji statyba, inžineriniai tinklai' },
      en: { t: 'Apartment quarter', place: 'Alytus', d: 'A quarter of three apartment buildings with a landscaped courtyard and underground engineering systems.', works: 'General contracting, general construction, engineering networks' }
    },
    {
      cat: 'commercial', scene: 'business', size: 'tall',
      lt: { t: 'Verslo centras', place: 'Vilnius', d: 'Administracinis pastatas su stiklo fasadu, podiumu ir eksploatuojama stogo terasa.', works: 'Generalinė ranga, projektavimas' },
      en: { t: 'Business centre', place: 'Vilnius', d: 'An office building with a glazed facade, podium base and an accessible roof terrace.', works: 'General contracting, design' }
    },
    {
      cat: 'industrial', scene: 'industrial',
      lt: { t: 'Gamybos ir logistikos pastatas', place: 'Kauno r.', d: 'Didelio angos pločio gamybos cechas su sandėliavimo zona, pakrovimo rampomis ir administracinėmis patalpomis.', works: 'Bendroji statyba, ypatingi statiniai' },
      en: { t: 'Production & logistics facility', place: 'Kaunas district', d: 'A large-span production hall with storage, loading docks and office space.', works: 'General construction, special structures' }
    },
    {
      cat: 'heritage', scene: 'manor',
      lt: { t: 'Dvaro sodybos restauravimas', place: 'Alytaus r.', d: 'Kultūros paveldo vertybės – dvaro rūmų ir ūkinių pastatų – restauravimas ir pritaikymas visuomenės poreikiams.', works: 'Paveldo tvarkyba, restauravimas' },
      en: { t: 'Manor estate restoration', place: 'Alytus district', d: 'Restoration and adaptive reuse of a heritage-listed manor house and its outbuildings.', works: 'Heritage works, restoration' }
    },
    {
      cat: 'public', scene: 'school', size: 'wide',
      lt: { t: 'Gimnazijos modernizavimas', place: 'Druskininkai', d: 'Mokyklos pastato rekonstrukcija ir naujo priestato statyba, didinant energinį efektyvumą.', works: 'Rekonstrukcija, renovacija' },
      en: { t: 'Gymnasium modernisation', place: 'Druskininkai', d: 'Reconstruction of a school building and a new extension, with major energy-efficiency upgrades.', works: 'Reconstruction, renovation' }
    },
    {
      cat: 'public', scene: 'sports',
      lt: { t: 'Sporto ir laisvalaikio centras', place: 'Marijampolė', d: 'Universali sporto arena su stiklo vestibiuliu ir lauko aikštynais.', works: 'Generalinė ranga, ypatingi statiniai' },
      en: { t: 'Sports & leisure centre', place: 'Marijampolė', d: 'A multi-purpose sports arena with a glazed lobby and outdoor courts.', works: 'General contracting, special structures' }
    },
    {
      cat: 'commercial', scene: 'mall',
      lt: { t: 'Prekybos centras', place: 'Alytus', d: 'Dviejų aukštų prekybos pastatas su automobilių stovėjimo aikštele ir apželdinta teritorija.', works: 'Bendroji statyba, inžineriniai tinklai' },
      en: { t: 'Retail centre', place: 'Alytus', d: 'A two-storey retail building with a car park and landscaped grounds.', works: 'General construction, engineering networks' }
    },
    {
      cat: 'residential', scene: 'houses', size: 'wide',
      lt: { t: 'Individualių namų kvartalas', place: 'Birštonas', d: 'Šiuolaikiškų individualių gyvenamųjų namų kvartalas su bendra infrastruktūra.', works: 'Projektavimas, bendroji statyba' },
      en: { t: 'Private housing quarter', place: 'Birštonas', d: 'A quarter of contemporary detached homes with shared infrastructure.', works: 'Design, general construction' }
    }
  ];

  return { EN, UI, SCENES, HERO, ABOUT, SVC_SCENES, SERVICES, PROJECTS };
})();
