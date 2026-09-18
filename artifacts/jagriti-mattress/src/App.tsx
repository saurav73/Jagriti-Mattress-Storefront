import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  HeartHandshake,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Wind,
  X,
} from 'lucide-react';
import './index.css';

type Product = {
  id: string;
  name: string;
  tier: string;
  price: number;
  blurb: string;
  tone: string;
  comfort: string;
  category: string;
  image: string;
  featured?: boolean;
  details: string;
};

type CartLine = Product & { quantity: number };

const products: Product[] = [
  {
    id: 'eco',
    name: 'Jagriti Eco',
    tier: 'Thoughtful beginnings',
    price: 24900,
    blurb: 'A naturally breathable everyday layer, designed for lighter impact.',
    tone: 'teal',
    comfort: 'Balanced',
    category: 'Everyday',
    image: '/assets/red-mattress.png',
    details: 'A breathable, supportive starting point for sleepers who like a little give without sinking in.',
  },
  {
    id: 'premium',
    name: 'Jagriti Premium',
    tier: 'The considered choice',
    price: 34900,
    blurb: 'Balanced support and a cooler, calmer sleep surface.',
    tone: 'navy',
    comfort: 'Medium-firm',
    category: 'Everyday',
    image: '/assets/smart-ortho-grid.png',
    featured: true,
    details: 'Our most versatile mattress: a quietly responsive build that keeps your spine supported and your side cool.',
  },
  {
    id: 'luxury',
    name: 'Jagriti Luxury',
    tier: 'Quiet indulgence',
    price: 49900,
    blurb: 'Deep comfort with a tailored finish for unhurried mornings.',
    tone: 'gold',
    comfort: 'Plush',
    category: 'Premium',
    image: '/assets/smart-ortho-pro.png',
    details: 'A generous, softer landing with layered cushioning for people who want their bed to feel like a retreat.',
  },
  {
    id: 'himalayan',
    name: 'Jagriti Himalayan',
    tier: 'Our signature',
    price: 64900,
    blurb: 'A generous, grounding sleep experience inspired by high places.',
    tone: 'blue',
    comfort: 'Firm',
    category: 'Signature',
    image: '/assets/mattress-himalayan.svg',
    details: 'Our signature finish, made for steady support and the clean, grounded feeling of sleeping above the clouds.',
  },
];

const additionalProductNames = [
  'Jagriti Rest 01',
  'Jagriti Rest 02',
  'Jagriti Rest 03',
  'Jagriti Rest 04',
  'Jagriti Rest 05',
  'Jagriti Rest 06',
  'Jagriti Rest 07',
  'Jagriti Rest 08',
  'Jagriti Rest 09',
  'Jagriti Rest 10',
  'Jagriti Rest 11',
  'Jagriti Rest 12',
  'Jagriti Rest 13',
  'Jagriti Rest 14',
  'Jagriti Rest 15',
  'Jagriti Rest 16',
];

const additionalProducts: Product[] = additionalProductNames.map((name, index) => {
  const comforts = ['Balanced', 'Medium-firm', 'Plush', 'Firm'];
  const categories = ['Everyday', 'Premium', 'Signature'];
  const tones = ['teal', 'navy', 'gold', 'blue'];
  const comfort = comforts[index % comforts.length];
  return {
    id: `rest-${String(index + 1).padStart(2, '0')}`,
    name,
    tier: 'More ways to rest',
    price: 26900 + index * 1400,
    blurb: `A considered comfort layer with ${comfort.toLowerCase()} support for a more restorative night.`,
    tone: tones[index % tones.length],
    comfort,
    category: categories[index % categories.length],
    image: '/assets/smart-ortho-grid.png',
    details: `A dependable Jagriti sleep surface with ${comfort.toLowerCase()} support, made to bring calm, consistent comfort to your room.`,
  };
});

const shopProducts = [...products, ...additionalProducts];

const money = (value: number) => `₨${value.toLocaleString('en-IN')}`;

function useHashRoute() {
  const getHash = () => window.location.hash.replace(/^#/, '') || 'home';
  const [route, setRoute] = useState(getHash);
  useEffect(() => {
    const onHashChange = () => setRoute(getHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return route;
}

function Brand() {
  return (
    <a href="#home" className="brand" data-testid="link-brand" aria-label="Jagriti Mattress home">
      <span className="brand-mark" aria-hidden="true" />
      <span className="brand-copy">
        <span className="brand-name">JAGRITI</span>
        <span className="brand-sub">MATTRESS</span>
      </span>
    </a>
  );
}

function ProductArt({ product, detail = false }: { product: Product; detail?: boolean }) {
  return (
    <div className={`product-art ${detail ? 'product-art-detail' : ''}`} aria-hidden="true">
      <img src={product.image} alt="" />
      <span className={`art-chip ${product.tone}`}>{product.comfort} comfort</span>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  return (
    <article className={`product-card reveal ${product.featured ? 'featured' : ''}`} data-testid={`card-product-${product.id}`}>
      <a className="card-image-link" href={`#product/${product.id}`} aria-label={`View ${product.name}`} data-testid={`link-product-${product.id}`}>
        <ProductArt product={product} />
      </a>
      <div className="product-details">
        <div className="product-top">
          <span className="product-tag">{product.tier}</span>
          {product.featured && <Sparkles size={16} color="#db6e2f" aria-label="Signature pick" />}
        </div>
        <a href={`#product/${product.id}`} className="product-name-link" data-testid={`link-product-name-${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </a>
        <p className="product-desc">{product.blurb}</p>
        <div className="product-meta"><span>{product.category}</span><span>{product.comfort}</span></div>
        <div className="product-footer">
          <span className="price"><small>Starting from</small>{money(product.price)}</span>
          <button className="add-button" type="button" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`} data-testid={`button-add-${product.id}`}>
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}

function PageIntro({ kicker, title, copy }: { kicker: string; title: ReactNode; copy: string }) {
  return (
    <section className="page-intro">
      <div className="container page-intro-inner">
        <span className="eyebrow reveal">{kicker}</span>
        <h1 className="page-title display reveal delay-1">{title}</h1>
        <p className="page-intro-copy reveal delay-2">{copy}</p>
      </div>
    </section>
  );
}

function DifferencePage() {
  return (
    <>
      <PageIntro kicker="The Jagriti difference" title={<>Comfort, with a point of view.</>} copy="We start with the climate, the body, and the life around the bed. Then we make every layer earn its place." />
      <section className="section difference-intro">
        <div className="container split-feature">
          <div>
            <span className="eyebrow">The sleep architecture</span>
            <h2 className="section-title display">Good design is felt, not announced.</h2>
            <p className="feature-copy">Exceptional craftsmanship is in the small things: the way air moves through a layer, the quiet of a supportive edge, the ease of waking without a second thought.</p>
          </div>
          <div className="layer-stack" aria-label="Illustration of mattress layers">
            <div className="layer layer-top"><span>01</span><strong>Breathable comfort</strong><small>for a cooler night</small></div>
            <div className="layer layer-mid"><span>02</span><strong>Responsive support</strong><small>that follows your body</small></div>
            <div className="layer layer-base"><span>03</span><strong>Steady foundation</strong><small>built for years of rest</small></div>
          </div>
        </div>
      </section>
      <section className="difference-band">
        <div className="container difference-points">
          <div className="difference-point"><Wind size={23} /><span className="eyebrow">01</span><h3>Breathable by nature</h3><p>Materials selected for Nepal’s changing seasons, from warm valley nights to highland mornings.</p></div>
          <div className="difference-point"><Layers3 size={23} /><span className="eyebrow">02</span><h3>Support, not stiffness</h3><p>Layered comfort that meets your body without asking you to sleep in one prescribed position.</p></div>
          <div className="difference-point"><ShieldCheck size={23} /><span className="eyebrow">03</span><h3>Made to stay with you</h3><p>Honest construction and considered finishing, inside and out, from our workshop in Kathmandu.</p></div>
        </div>
      </section>
      <section className="section difference-close">
        <div className="container quote-card"><span className="eyebrow">A quieter standard</span><p className="quote">“A mattress should make less noise in your life, not more.”</p><span className="quote-attribution">The Jagriti way of rest · Kathmandu, Nepal</span></div>
      </section>
    </>
  );
}

function StoryPage() {
  return (
    <>
      <PageIntro kicker="Our story" title={<>Rooted here.<br /><em>Ready for anywhere.</em></>} copy="Jagriti brings an internationally minded approach to rest, shaped by more than two decades of making sleep feel better." />
      <section className="section story-main">
        <div className="container story-grid">
          <div className="story-year display">2001<span>where our story began</span></div>
          <div className="story-copy"><p className="lead-copy">Jagriti started with a simple observation: the place you sleep should understand the place you live.</p><p>Today, our mattresses are made in Sankharapur, Kathmandu. We combine practical local knowledge with a restless curiosity about how people rest around the world. The result is comfort that feels familiar, never generic.</p><p>We believe better sleep is a quiet kind of progress. It gives the body room to repair, the mind a little more patience, and the day a softer beginning.</p></div>
        </div>
      </section>
      <section className="story-orange">
        <div className="container story-stats">
          <div><strong>20+</strong><span>years of sleep expertise</span></div>
          <div><strong>01</strong><span>home: Sankharapur</span></div>
          <div><strong>04</strong><span>ways to find your comfort</span></div>
          <div><strong>∞</strong><span>good nights ahead</span></div>
        </div>
      </section>
      <section className="section story-values">
        <div className="container">
          <span className="eyebrow">What we keep close</span>
          <div className="value-grid">
            <div><span>01</span><h3>Make it here</h3><p>Local making keeps our choices close to the people and climate they serve.</p></div>
            <div><span>02</span><h3>Leave room</h3><p>For different bodies, different homes, and the changing shape of a life well lived.</p></div>
            <div><span>03</span><h3>Choose slowly</h3><p>Buying a mattress is personal. Good guidance should never rush the decision.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

function TrackPage({ orderNumber, setOrderNumber, lookupResult, onLookup }: { orderNumber: string; setOrderNumber: (value: string) => void; lookupResult: string; onLookup: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <>
      <PageIntro kicker="Order care" title={<>A little reassurance,<br /><em>on the way.</em></>} copy="Enter the request number from your confirmation and a Jagriti sleep guide will help with the next step." />
      <section className="section track-section">
        <div className="container track-layout">
          <div className="track-card">
            <span className="eyebrow">Find your order</span>
            <h2 className="section-title display">Where is your better night?</h2>
            <form onSubmit={onLookup} className="track-form" data-testid="form-lookup">
              <label className="form-field">Order or request number<input value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} placeholder="For example, JG-2408" aria-label="Order number" data-testid="input-order-number" /></label>
              <button className="btn-primary" type="submit" data-testid="button-lookup-order">Look it up <Search size={15} /></button>
              {lookupResult && <p className="form-result" data-testid="status-lookup-result">{lookupResult}</p>}
            </form>
          </div>
          <div className="track-notes">
            <div><Clock3 size={19} /><div><strong>Made-to-order care</strong><p>We confirm size, delivery area, and preferred timing before anything leaves us.</p></div></div>
            <div><Phone size={19} /><div><strong>Talk to a real person</strong><p>Call +977-9744464491 if your request is time-sensitive or your details have changed.</p></div></div>
          </div>
        </div>
      </section>
    </>
  );
}

function VisitPage({ contactSent, onSubmit }: { contactSent: boolean; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <>
      <PageIntro kicker="Visit us" title={<>Try the difference<br /><em>in person.</em></>} copy="Bring your questions. We’ll bring the tea, the full collection, and enough time to find what feels right." />
      <section className="section visit-section">
        <div className="container visit-grid">
          <div className="visit-address">
            <span className="eyebrow">The Jagriti room</span>
            <h2 className="section-title display">Come say hello.</h2>
            <p className="feature-copy">Try each comfort level in a calm, unhurried setting. Our sleep guides can talk through materials, sizes, and delivery across Nepal.</p>
            <div className="address-lines"><div><MapPin size={17} /><span>Sankharapur, Kathmandu<br />Nepal</span></div><div><Clock3 size={17} /><span>Sunday–Friday<br />10:00–17:00</span></div><div><Phone size={17} /><span>+977-9744464491</span></div></div>
          </div>
          <div className="contact-form">
            {contactSent ? <div className="form-success" data-testid="status-contact-success"><strong>Thank you — we have your note.</strong><br />A Jagriti sleep guide will be in touch soon.</div> : <form onSubmit={onSubmit} data-testid="form-contact">
              <h3>Let’s find your better night.</h3>
              <label className="form-field">Your name<input required name="name" placeholder="How should we call you?" data-testid="input-contact-name" /></label>
              <label className="form-field">Phone or email<input required name="contact" placeholder="+977 or hello@email.com" data-testid="input-contact-detail" /></label>
              <label className="form-field">What can we help with?<textarea name="message" placeholder="Tell us a little about how you sleep..." data-testid="input-contact-message" /></label>
              <button className="btn-primary" type="submit" data-testid="button-submit-contact">Send my note <ArrowRight size={15} /></button>
            </form>}
          </div>
        </div>
      </section>
      <section className="map-panel"><div className="container map-inner"><div className="map-pin"><MapPin size={18} /><span>Jagriti Mattress<br /><small>Sankharapur</small></span></div><span className="map-caption">Made with care, close to home.</span></div></section>
    </>
  );
}

function HomePage({ onAdd, onVisit }: { onAdd: (product: Product) => void; onVisit: () => void }) {
  return (
    <>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow reveal">Made for the way you rest</span>
            <h1 className="hero-title display reveal delay-1">International comfort.<br /><em>Trusted experience.</em></h1>
            <p className="hero-lede reveal delay-2">A better night begins with a mattress that understands your body, your climate, and the life you live here.</p>
            <div className="hero-cta reveal delay-3"><a className="btn-primary" href="#shop" data-testid="link-shop-collection">Explore the collection <ArrowRight size={16} /></a><a className="btn-quiet" href="#story" data-testid="link-read-story">Our story <ArrowRight size={15} /></a></div>
            <div className="hero-note reveal delay-4"><span className="hero-note-mark"><Check size={13} /></span><span><strong>20+ years</strong> of sleep expertise</span></div>
          </div>
          <div className="hero-art reveal delay-2">
            <div className="art-glow" />
            <img className="hero-mattress-image" src={products[1].image} alt="Jagriti Premium mattress product photo" />
            <span className="art-label">A softer landing<br />for every tomorrow.</span>
          </div>
        </div>
      </section>
      <section className="trust-strip" aria-label="Jagriti at a glance"><div className="container trust-inner"><div className="trust-lede"><span>Why Jagriti</span>Sleep, your way.</div><div className="trust-point"><strong>20+</strong><small>years of expertise</small></div><div className="trust-point"><strong>Nepal</strong><small>made with care, here</small></div><div className="trust-point"><strong>4 ways</strong><small>to find your comfort</small></div></div></section>
      <section className="section products-section" id="collection">
        <div className="container"><div className="section-head reveal"><div><span className="eyebrow">Find your fit</span><h2 className="section-title display">Comfort has<br />more than one shape.</h2></div><p className="section-intro">Four considered ways to rest, from everyday ease to our signature Himalayan finish. Start with what your body already knows.</p></div><div className="product-grid home-product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div><div className="home-collection-cta"><div><span className="eyebrow">Not sure yet?</span><h3 className="display">Let sleep<br />choose you.</h3><p>Tell us how you rest and our Kathmandu sleep guides will point you in the right direction.</p></div><button className="btn-primary" type="button" onClick={onVisit} data-testid="button-find-fit">Talk to a sleep guide <ArrowRight size={15} /></button></div></div>
      </section>
      <section className="materials" id="materials"><div className="container materials-layout"><div><span className="eyebrow reveal">The Jagriti difference</span><h2 className="section-title display reveal delay-1">Better materials.<br />Thoughtful design.</h2><p className="feature-copy reveal delay-2">Exceptional craftsmanship is felt in the small things: the way air moves through a layer, the quiet of a supportive edge, the ease of waking without a second thought.</p><a className="btn-quiet reveal delay-3" href="#difference" data-testid="link-home-difference">See our difference <ArrowRight size={15} /></a></div><div className="material-orb reveal delay-2"><div className="orb-copy"><strong>Exceptional<br />craftsmanship.</strong><span>Feel the difference in every layer</span></div></div></div></section>
      <section className="experience" id="story"><div className="container experience-grid"><div><span className="eyebrow reveal">Rooted here, ready for anywhere</span><h2 className="experience-title display reveal delay-1">More than two decades of expertise, now in Nepal.</h2></div><div><p className="experience-copy reveal delay-2">Jagriti brings an internationally minded approach to rest, shaped by more than 20 years of making sleep feel better. We make the considered choice feel close to home — from our workshop in Sankharapur, Kathmandu.</p><a className="btn-quiet reveal delay-3" href="#story" data-testid="link-home-story">Read the full story <ArrowRight size={15} /></a></div></div></section>
      <section className="quote-section"><div className="container quote-layout"><div><span className="eyebrow">A note from Jagriti</span><div className="quote-mark">“</div></div><div><blockquote className="quote">Sleep is not time away from your life. It is where the best of it begins again.</blockquote><div className="quote-attribution">The Jagriti way of rest · Kathmandu, Nepal</div></div></div></section>
      <section className="section journal-section"><div className="container"><div className="section-head reveal"><div><span className="eyebrow">From the sleep journal</span><h2 className="section-title display">A little more<br />room to breathe.</h2></div><p className="section-intro">Small rituals, practical knowledge, and a new way to think about the place you end each day.</p></div><div className="journal-grid"><article className="journal-card reveal"><span className="journal-link">01 · The basics</span><h3>How to make your bedroom feel like a place to arrive.</h3><p>Five small changes for a quieter, cooler wind-down.</p></article><article className="journal-card reveal delay-1"><span className="journal-link">02 · The body</span><h3>What your sleeping position is asking for.</h3><p>Support should meet you where you are.</p></article><article className="journal-card reveal delay-2"><span className="journal-link">03 · The morning</span><h3>The underrated luxury of waking well.</h3><p>Why a better night changes the shape of your day.</p></article></div></div></section>
    </>
  );
}

function ShopPage({ onAdd }: { onAdd: (product: Product) => void }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [comfort, setComfort] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const filtered = useMemo(() => shopProducts.filter((product) => {
    const term = search.toLowerCase();
    return (!term || `${product.name} ${product.blurb} ${product.tier}`.toLowerCase().includes(term)) && (category === 'All' || product.category === category) && (comfort === 'All' || product.comfort === comfort);
  }), [search, category, comfort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const visibleProducts = filtered.slice(pageStart, pageStart + pageSize);
  useEffect(() => { setPage(1); }, [search, category, comfort]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  return (
    <>
      <PageIntro kicker="The collection" title={<>A better night,<br /><em>made in Nepal.</em></>} copy="Twenty thoughtfully different mattresses. One calmer way to choose. Explore by feel, by finish, or simply by what sounds like you." />
      <section className="section shop-section">
        <div className="container">
          <div className="shop-toolbar">
            <label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection" aria-label="Search the collection" data-testid="input-shop-search" /></label>
            <div className="filter-group" aria-label="Filter by category">{['All', 'Everyday', 'Premium', 'Signature'].map((option) => <button className={`filter-pill ${category === option ? 'active' : ''}`} type="button" key={option} onClick={() => setCategory(option)} data-testid={`button-filter-category-${option.toLowerCase()}`}>{option}</button>)}</div>
            <label className="select-filter">Comfort <select value={comfort} onChange={(event) => setComfort(event.target.value)} aria-label="Filter by comfort" data-testid="select-filter-comfort"><option>All</option><option>Balanced</option><option>Medium-firm</option><option>Plush</option><option>Firm</option></select><ChevronDown size={14} /></label>
          </div>
          <div className="shop-result-row"><span data-testid="text-shop-result-count">{filtered.length} mattress{filtered.length === 1 ? '' : 'es'}</span><span>{filtered.length > 0 ? `Showing ${pageStart + 1}–${Math.min(pageStart + pageSize, filtered.length)} of ${filtered.length}` : 'No results'} · Made for Nepal, finished with care.</span></div>
          {filtered.length > 0 ? <><div className="shop-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>{totalPages > 1 && <nav className="pagination" aria-label="Shop pagination"><button className="pagination-button" type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} data-testid="button-pagination-previous">Previous</button><div className="pagination-pages">{Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => <button className={`pagination-button pagination-number ${page === pageNumber ? 'active' : ''}`} type="button" key={pageNumber} onClick={() => setPage(pageNumber)} aria-current={page === pageNumber ? 'page' : undefined} aria-label={`Go to page ${pageNumber}`} data-testid={`button-pagination-page-${pageNumber}`}>{pageNumber}</button>)}</div><button className="pagination-button" type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} data-testid="button-pagination-next">Next</button></nav>}</> : <div className="shop-empty"><Search size={25} /><h3>No mattress matched that search.</h3><p>Try another comfort or clear your filters.</p><button className="btn-primary" type="button" onClick={() => { setSearch(''); setCategory('All'); setComfort('All'); }} data-testid="button-clear-filters">Show all mattresses</button></div>}
        </div>
      </section>
      <section className="shop-note"><div className="container shop-note-inner"><HeartHandshake size={22} /><div><strong>Need a second opinion?</strong><span>Our sleep guides are happy to help you compare the collection.</span></div><a className="btn-quiet" href="#visit" data-testid="link-shop-guidance">Talk to us <ArrowRight size={15} /></a></div></section>
    </>
  );
}

function ProductPage({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  return (
    <section className="product-detail-page">
      <div className="container"><a className="back-link" href="#shop" data-testid="link-back-shop"><ArrowLeft size={15} /> Back to collection</a><div className="detail-grid"><div className={`detail-art-panel ${product.tone}`}><ProductArt product={product} detail /><span className="detail-stamp">Made in<br />Nepal</span></div><div className="detail-copy"><span className="eyebrow">{product.tier}</span><h1 className="detail-title display">{product.name}</h1><p className="detail-lede">{product.details}</p><div className="detail-price">{money(product.price)} <small>starting from</small></div><div className="detail-specs"><div><span>Comfort</span><strong>{product.comfort}</strong></div><div><span>Collection</span><strong>{product.category}</strong></div><div><span>Made in</span><strong>Nepal</strong></div></div><button className="btn-primary detail-add" type="button" onClick={() => onAdd(product)} data-testid={`button-detail-add-${product.id}`}>Add to bag <ShoppingBag size={16} /></button><p className="detail-help"><CircleHelp size={15} /> Want help choosing? <a href="#visit" data-testid="link-detail-help">Talk to a sleep guide.</a></p></div></div></div>
      <div className="detail-bottom"><div className="container detail-bottom-grid"><div><Wind size={19} /><strong>Breathable layers</strong><span>Built for Nepal’s changing seasons.</span></div><div><ShieldCheck size={19} /><strong>Considered construction</strong><span>Made to feel good for years.</span></div><div><MapPin size={19} /><strong>Local delivery guidance</strong><span>We’ll confirm the details with you.</span></div></div></div>
    </section>
  );
}

function Footer({ onVisit, onTrack, onBag }: { onVisit: () => void; onTrack: () => void; onBag: () => void }) {
  return <footer className="footer"><div className="container footer-top"><div><Brand /><p className="footer-note">International comfort, thoughtfully made for the way Nepal rests.</p></div><div className="footer-col"><h4>Explore</h4><a href="#shop" data-testid="footer-link-collection">Collection</a><a href="#difference" data-testid="footer-link-materials">Our difference</a><a href="#story" data-testid="footer-link-story">Our story</a></div><div className="footer-col"><h4>Care</h4><button type="button" onClick={onTrack} data-testid="button-footer-order">Order lookup</button><button type="button" onClick={onVisit} data-testid="button-footer-help">Sleep guidance</button><button type="button" onClick={onBag} data-testid="button-footer-bag">Your bag</button></div><div className="footer-col"><h4>Stay close</h4><a href="tel:+9779744464491" data-testid="link-footer-phone"><Phone size={13} />+977-9744464491</a><a href="mailto:hello@jagritimattress.com" data-testid="link-footer-email"><Mail size={13} />hello@jagritimattress.com</a><span>Sankharapur, Kathmandu</span></div></div><div className="container footer-bottom"><span>© 2024 Jagriti Mattress. Sleep, your way.</span><span>Made with care in Nepal.</span></div></footer>;
}

function App() {
  const route = useHashRoute();
  const [cart, setCart] = useState<CartLine[]>(() => {
    try {
      const savedCart = window.localStorage.getItem('jagriti-cart');
      return savedCart ? (JSON.parse(savedCart) as CartLine[]) : [];
    } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [lookupResult, setLookupResult] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const detailProduct = route.startsWith('product/') ? shopProducts.find((product) => product.id === route.split('/')[1]) : undefined;

  useEffect(() => { window.localStorage.setItem('jagriti-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileNav(false); }, [route]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const updateQuantity = (id: string, delta: number) => setCart((current) => current.flatMap((item) => item.id === id ? item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : [] : [item]));
  const visit = () => { window.location.hash = 'visit'; setMobileNav(false); };
  const track = () => { window.location.hash = 'track'; setMobileNav(false); };
  const submitContact = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setContactSent(true); };
  const lookupOrder = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setLookupResult(orderNumber.trim() ? `We found your request. A sleep guide will call you shortly about ${orderNumber.trim()}.` : 'Please enter your order number to look it up.'); };
  const currentPage = detailProduct ? <ProductPage product={detailProduct} onAdd={addToCart} /> : route === 'shop' ? <ShopPage onAdd={addToCart} /> : route === 'difference' ? <DifferencePage /> : route === 'story' ? <StoryPage /> : route === 'visit' ? <VisitPage contactSent={contactSent} onSubmit={submitContact} /> : route === 'track' ? <TrackPage orderNumber={orderNumber} setOrderNumber={setOrderNumber} lookupResult={lookupResult} onLookup={lookupOrder} /> : <HomePage onAdd={addToCart} onVisit={visit} />;

  return (
    <div className="site-shell">
      <header className="nav-wrap"><div className="container nav"><Brand /><nav className="desktop-nav" aria-label="Main navigation"><a className={`nav-link ${route === 'home' ? 'active' : ''}`} href="#home" onClick={() => setMobileNav(false)} data-testid="link-home">Home</a><a className={`nav-link ${route === 'shop' || detailProduct ? 'active' : ''}`} href="#shop" onClick={() => setMobileNav(false)} data-testid="link-shop">Shop</a><a className={`nav-link ${route === 'difference' ? 'active' : ''}`} href="#difference" onClick={() => setMobileNav(false)} data-testid="link-difference">Our difference</a><a className={`nav-link ${route === 'story' ? 'active' : ''}`} href="#story" onClick={() => setMobileNav(false)} data-testid="link-story">Our story</a><a className={`nav-link ${route === 'visit' ? 'active' : ''}`} href="#visit" onClick={() => setMobileNav(false)} data-testid="link-visit">Visit us</a></nav><div className="nav-actions"><button className="track-nav" type="button" onClick={track} data-testid="button-track-order"><Search size={15} /><span>Track order</span></button><button className="cart-button" type="button" onClick={() => setCartOpen(true)} data-testid="button-open-cart"><ShoppingBag size={16} /><span>Bag</span><span className="cart-count" data-testid="text-cart-count">{cartCount}</span></button><button className="mobile-toggle" type="button" aria-label="Toggle navigation" onClick={() => setMobileNav((open) => !open)} data-testid="button-mobile-menu">{mobileNav ? <X size={23} /> : <Menu size={23} />}</button></div></div>{mobileNav && <div className="mobile-menu"><a href="#home" onClick={() => setMobileNav(false)} data-testid="mobile-link-home">Home</a><a href="#shop" onClick={() => setMobileNav(false)} data-testid="mobile-link-shop">Shop</a><a href="#difference" onClick={() => setMobileNav(false)} data-testid="mobile-link-difference">Our difference</a><a href="#story" onClick={() => setMobileNav(false)} data-testid="mobile-link-story">Our story</a><a href="#visit" onClick={() => setMobileNav(false)} data-testid="mobile-link-visit">Visit us</a><button type="button" onClick={track} data-testid="mobile-button-track-order">Track order <ArrowRight size={15} /></button></div>}</header>
      <main>{currentPage}</main>
      <Footer onVisit={visit} onTrack={track} onBag={() => setCartOpen(true)} />
      <button className={`drawer-backdrop ${cartOpen ? 'open' : ''}`} type="button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag" tabIndex={cartOpen ? 0 : -1} />
      <aside className={`cart-drawer ${cartOpen ? 'open' : ''}`} aria-label="Shopping bag" aria-hidden={!cartOpen}><div className="drawer-head"><h2>Your bag <span>({cartCount})</span></h2><button className="drawer-close" type="button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag" data-testid="button-close-cart"><X size={22} /></button></div><div className="drawer-body">{cart.length === 0 ? <div className="empty-cart"><div><ShoppingBag size={27} color="#238e9d" /><strong>Your bag is waiting.</strong><span>Choose a mattress that feels like you.</span></div></div> : cart.map((item) => <div className="cart-line" key={item.id} data-testid={`row-cart-${item.id}`}><div><h4>{item.name}</h4><p>{item.tier}</p><div className="qty-controls"><button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`} data-testid={`button-decrease-${item.id}`}><Minus size={12} /></button><span data-testid={`text-quantity-${item.id}`}>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`} data-testid={`button-increase-${item.id}`}><Plus size={12} /></button></div><button className="remove-line" type="button" onClick={() => setCart((current) => current.filter((line) => line.id !== item.id))} data-testid={`button-remove-${item.id}`}><Trash2 size={11} />Remove</button></div><span className="line-price">{money(item.price * item.quantity)}</span></div>)}</div>{cart.length > 0 && <div className="drawer-foot"><div className="total-row"><span>Total</span><span>{money(cartTotal)}</span></div><button className="btn-primary" style={{ width: '100%' }} type="button" onClick={() => setCheckoutOpen(true)} data-testid="button-start-checkout">Continue to checkout <ArrowRight size={15} /></button></div>}</aside>
      {checkoutOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Checkout"><div className="checkout-panel"><div className="modal-head"><div><span className="eyebrow">Almost there</span><h3>Reserve your better night.</h3></div><button className="drawer-close" type="button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout" data-testid="button-close-checkout"><X size={20} /></button></div><p className="checkout-copy">This first step helps us confirm your size, delivery area, and preferred time. No payment is taken here.</p><form onSubmit={(event) => { event.preventDefault(); setCheckoutOpen(false); setCart([]); setContactSent(true); setCartOpen(false); window.location.hash = 'visit'; }} data-testid="form-checkout"><label className="form-field">Full name<input required placeholder="Your name" data-testid="input-checkout-name" /></label><label className="form-field">Phone number<input required placeholder="+977" data-testid="input-checkout-phone" /></label><label className="form-field">Delivery note<textarea placeholder="Area, floor, anything we should know?" data-testid="input-checkout-note" /></label><button className="btn-primary" style={{ width: '100%' }} type="submit" data-testid="button-submit-checkout">Request a call <Check size={15} /></button></form></div></div>}
    </div>
  );
}

export default App;