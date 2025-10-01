import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * StatusForge – One-Page Website (Preset v2)
 * Stack: React + Tailwind + Framer Motion
 *
 * Fonts (add to index.html <head>):
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 * <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
 *
 * Tailwind config (optional, in tailwind.config.js):
 *  theme: { extend: { colors: { sf: { bg: "#181818", gold: "#eeb75d", text: "#b0b0b0", paper: "#f1efeb" } }, fontFamily: { display: ['"Playfair Display"', 'serif'], sans: ['Inter', 'ui-sans-serif', 'system-ui'] } } }
 */

const SF = {
  bg: "#181818",
  gold: "#eeb75d",
  text: "#b0b0b0",
  paper: "#f1efeb",
};

// === YOUR MEDIA LINKS (edit here) ===
const LINKS = {
  linkedin: "https://linkedin.com/company/statusforge-za",
  instagram: "https://instagram.com/statusforge_za",
  medium: "https://medium.com/@hello_51218",
  website: "https://statusforge.co.za/",
  logo: "/logo.png",
  og: "/og-cover.jpg",
};

const heroSlidesDefault = [
  { src: "/images/hero-1.jpg", alt: "prestige realtor website mockup — credibility engineering example", caption: "Authority, Engineered." },
  { src: "/images/hero-2.jpg", alt: "authority profile optimization — LinkedIn South Africa", caption: "Built for South African pros" },
];

/* === Load Fillout embed script once (no plugins) === */
function FilloutScript() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://server.fillout.com/embed/v1/"]')) {
      const s = document.createElement("script");
      s.src = "https://server.fillout.com/embed/v1/";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);
  return null;
}

/* === Brand JSON-LD + minimal meta injection (SPA-friendly) === */
function SeoHead() {
  useEffect(() => {
    // Title + Description (best set in index.html, but this helps for SPA)
    document.title = "StatusForge | Authority, Engineered — Status-as-a-Service & Credibility Engineering (South Africa)";
    const setMeta = (name, content) => {
      let m = document.querySelector(`meta[name="${name}"]`);
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", name);
        document.head.appendChild(m);
      }
      m.setAttribute("content", content);
    };
    setMeta("description", "StatusForge is South Africa’s first Status-as-a-Service™. We engineer credibility, authority and digital prestige for realtors and SA professionals. Ethical credibility signals, 14-day authority sprints, and prestige websites.");

    // Open Graph (basic)
    const setOG = (property, content) => {
      let m = document.querySelector(`meta[property="${property}"]`);
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("property", property);
        document.head.appendChild(m);
      }
      m.setAttribute("content", content);
    };
    setOG("og:type", "website");
    setOG("og:title", "StatusForge — Authority, Engineered");
    setOG("og:description", "Credibility engineering & Status-as-a-Service™ for South African professionals.");
    setOG("og:url", LINKS.website);
    setOG("og:image", LINKS.og);

    // JSON-LD sameAs
    if (!document.getElementById("sf-jsonld")) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "sf-jsonld";
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "name": "StatusForge",
            "url": LINKS.website,
            "logo": LINKS.logo,
            "slogan": "Authority, Engineered.",
            "sameAs": [LINKS.linkedin, LINKS.instagram, LINKS.medium],
          },
          {
            "@type": "Service",
            "name": "Status-as-a-Service™",
            "serviceType": "Credibility Engineering & Online Authority",
            "provider": { "@type": "Organization", "name": "StatusForge", "url": LINKS.website },
            "areaServed": { "@type": "Country", "name": "South Africa" },
            "description": "Engineering credibility, authority and prestige presence for South African professionals with ethical credibility signals and 14-day authority sprints."
          }
        ]
      });
      document.head.appendChild(script);
    }
  }, []);
  return null;
}

/* Reusable props for any "Get Started" popup button */
const filloutAttrs = {
  "data-fillout-id": "ifDkXUT9ygus",
  "data-fillout-embed-type": "popup",
  "data-fillout-dynamic-resize": "",
  "data-fillout-inherit-parameters": "",
  "data-fillout-popup-size": "medium",
};

/* === Social Icons (no external deps) === */
function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M6.94 8.5H4V20h2.94V8.5zM5.47 7.12a1.71 1.71 0 1 0 0-3.42 1.71 1.71 0 0 0 0 3.42zM20 20h-2.93v-5.59c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94V20H10.1V8.5h2.81v1.57h.04c.39-.73 1.36-1.5 2.8-1.5 2.99 0 3.54 1.97 3.54 4.54V20z"/>
    </svg>
  );
}
function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1ZM17.7 6.3a1.12 1.12 0 1 0 1.12 1.12 1.12 1.12 0 0 0-1.12-1.12ZM21.7 7.4a6.53 6.53 0 0 0-1.78-4.62A6.53 6.53 0 0 0 15.3 1H8.7a6.53 6.53 0 0 0-4.62 1.78A6.53 6.53 0 0 0 2.3 7.4v6.6a6.53 6.53 0 0 0 1.78 4.62A6.53 6.53 0 0 0 8.7 20.4h6.6a6.53 6.53 0 0 0 4.62-1.78 6.53 6.53 0 0 0 1.78-4.62Zm-2.2 6.6a4.33 4.33 0 0 1-4.3 4.3H8.8a4.33 4.33 0 0 1-4.3-4.3V8.8a4.33 4.33 0 0 1 4.3-4.3h6.4a4.33 4.33 0 0 1 4.3 4.3Z"/>
    </svg>
  );
}
function IconMedium(props) {
  return (
    <svg viewBox="0 0 1043.63 592.71" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M588.67 296.35c0 163.66-131.36 296.35-293.88 296.35S0.92 460 0.92 296.35 132.28 0 294.79 0 588.67 132.69 588.67 296.35zm309.54 0c0 154.49-65.68 279.82-146.71 279.82S604.8 450.84 604.8 296.35 670.49 16.53 751.52 16.53s146.69 125.33 146.69 279.82zm145.42 0c0 144.04-27.58 260.88-61.61 260.88s-61.61-116.84-61.61-260.88S947.98 35.46 982.01 35.46s61.61 116.84 61.61 260.88z"/>
    </svg>
  );
}

/* === Reusable Social Links Row === */
function SocialRow({ className = "" }) {
  const aBase = "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2";
  const iconCls = "h-4 w-4";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="StatusForge on LinkedIn"
         className={aBase}
         style={{ backgroundColor: "#ffffff12", color: "#fff", border: "1px solid #2a2a2a" }}>
        <IconLinkedIn className={iconCls} />
        LinkedIn
      </a>
      <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="StatusForge on Instagram"
         className={aBase}
         style={{ backgroundColor: "#ffffff12", color: "#fff", border: "1px solid #2a2a2a" }}>
        <IconInstagram className={iconCls} />
        Instagram
      </a>
      <a href={LINKS.medium} target="_blank" rel="noopener noreferrer" aria-label="StatusForge on Medium"
         className={aBase}
         style={{ backgroundColor: "#ffffff12", color: "#fff", border: "1px solid #2a2a2a" }}>
        <IconMedium className={iconCls} />
        Medium
      </a>
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="group inline-flex items-center gap-2">
          <img src={LINKS.logo} alt="StatusForge Logo" className="h-7 w-7 rounded-md" />
          <span className="font-semibold tracking-tight text-white" style={{ fontFamily: 'Playfair Display, serif' }}>StatusForge</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-sm" style={{ color: SF.text }}>Services</a>
          <a href="#packages" className="text-sm" style={{ color: SF.text }}>Packages</a>
          <a href="#about" className="text-sm" style={{ color: SF.text }}>About</a>
          <a href="#contact" className="text-sm" style={{ color: SF.text }}>Contact</a>
        </nav>
        <button
          type="button"
          {...filloutAttrs}
          className="hidden rounded-md px-4 py-2 text-sm font-medium md:inline-block"
          style={{ backgroundColor: SF.gold, color: "#0a0a0a" }}
        >
          Get Started
        </button>
      </div>
    </header>
  );
}

function Hero({ slides = heroSlidesDefault }) {
  const [i, setI] = useState(0);
  const data = slides.length ? slides : heroSlidesDefault;

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % data.length), 5000);
    return () => clearInterval(id);
  }, [data.length]);

  return (
    <section id="top" className="relative">
      <div className="absolute inset-0" style={{ backgroundColor: SF.bg }} />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-white/80" style={{ borderColor: "#2a2a2a" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SF.gold }} />
              South Africa’s first Status-as-a-Service™
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Authority, Engineered.
            </h1>
            <p className="mt-4 max-w-xl text-base sm:text-lg" style={{ color: SF.text }}>
              We engineer credibility, visibility, and prestige for realtors and SA professionals. Look like the market leader — before you are one.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#packages" className="rounded-md px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2" style={{ backgroundColor: SF.gold, color: "#0b0b0c", boxShadow: "0 10px 30px rgba(238,183,93,0.25)" }}>See Packages</a>
              <a href="#services" className="rounded-md border px-5 py-3 text-sm font-medium transition hover:bg-white/5" style={{ borderColor: "#2a2a2a", color: "#ffffff" }}>How it works</a>
            </div>
            <p className="mt-6 text-xs" style={{ color: SF.text }}>Limited seats <span className="font-semibold text-white">per area</span> to protect your advantage.</p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/20">
              <AnimatePresence mode="wait">
                <motion.img
                  key={i}
                  src={data[i].src}
                  alt={data[i].alt}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs text-black backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SF.gold }} />
                  {data[i].caption}
                </div>
              </div>
              <div className="absolute bottom-3 right-4 flex gap-1.5">
                {data.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className="h-2.5 w-2.5 rounded-full border"
                    style={{ backgroundColor: idx === i ? SF.gold : "rgba(255,255,255,0.6)", borderColor: idx === i ? SF.gold : "rgba(255,255,255,0.8)" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: SF.paper }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-600">Our Services</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            Built for SA Pros
          </h2>
          <p className="mt-3 text-neutral-600">
            Perception is reality. We engineer the signals decision-makers actually look for — ethically, locally, and fast.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { value: "88%", label: "of buyers research you online before engaging." },
            { value: "14 days", label: "to a credible, searchable footprint." },
            { value: ">3x", label: "increase in replies with authoritative profiles." },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-3xl font-semibold" style={{ color: "#111" }}>{item.value}</div>
              <p className="mt-2 text-sm text-neutral-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>Perception is Reality</h3>
            <p className="mt-2 text-neutral-600 text-sm">Prospects don’t compare CVs — they compare signals. We design the credibility cues that convert attention into appointments.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>Legal & Ethical</h3>
            <p className="mt-2 text-neutral-600 text-sm">No fake logos or fabricated claims. Real press, co-created content, and transparent positioning that stands up to scrutiny.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>Built for SA Pros</h3>
            <p className="mt-2 text-neutral-600 text-sm">Local keywords, platforms, and tone that land with South African audiences in real estate and beyond.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==== Packages ==== */
function PackageCard({ title, price, period, bullets, cta = "Choose", featured = false, whiteText = false }) {
  const isGetStarted = cta === "Get Started";
  const baseText = whiteText ? "#ffffff" : "#111111";
  const subText = whiteText ? "#e5e5e5" : "#6b7280";

  return (
    <div
      className={`relative h-full rounded-2xl border p-6 shadow-sm ${featured ? "ring-2 ring-[#eeb75d]" : ""} flex flex-col`}
      style={{
        backgroundColor: featured ? "rgba(238,183,93,0.07)" : "#ffffff",
        borderColor: featured ? "rgba(238,183,93,0.4)" : "#e5e5e5",
        color: baseText,
      }}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#eeb75d] px-3 py-1 text-xs font-semibold text-black">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-semibold" style={{ fontFamily: "Playfair Display, serif", color: baseText }}>
        {title}
      </h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-semibold" style={{ color: baseText }}>
          {price}
        </span>
        {period ? (
          <span className="text-sm" style={{ color: subText }}>
            {period}
          </span>
        ) : null}
      </div>

      <ul className="mt-4 flex-1 space-y-2 text-sm" style={{ color: baseText }}>
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5">
              <path
                d="M20 7L9 18l-5-5"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {b}
          </li>
        ))}
      </ul>

      {isGetStarted ? (
        <button
          type="button"
          {...filloutAttrs}
          className="mt-6 inline-block rounded-md px-4 py-2 text-sm font-semibold"
          style={{ backgroundColor: SF.gold, color: "#111" }}
        >
          Get Started
        </button>
      ) : (
        <a
          href="#contact"
          className="mt-6 inline-flex justify-center items-center rounded-md px-4 py-2 text-sm font-semibold text-center"
          style={{ backgroundColor: SF.gold, color: "#111" }}
        >
          {cta}
        </a>
      )}
    </div>
  );
}

function Packages() {
  const starterBullets = [
    "Personal Website",
    "Google Business Profile",
    "Mini Brand Audit",
    "Social Media Profile Optimization",
    "Lead Capture",
    "14 Days Authority Sprint",
    "Authority Post on Medium",
    "Basic Web Discovery",
  ];

  const premiumBullets = [
    "Everything in Starter",
    "Enhanced Website Update",
    "Prestige Shoot (Videographer)",
    "Authority Content Flood (IG, LinkedIn, TikTok)",
    "Ghostwriting SEO Blogs & Insights",
    "Auto-reply System",
    "Prestige Identity Smart Card",
    "Google Visibility Engineering",
  ];

  const ultraBullets = [
    "Everything in Premium",
    "Cinematic Videography",
    "Exclusive Press Mentions",
    "Lead Nurturing",
    "Digital Billboard Ads",
    "High-Authority Press Features",
    "Video Authority Assets",
    "Reputation Management & SERP Control",
  ];

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-500">Packages</p>
          <h2
            className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Pick your path to authority
          </h2>
          <p className="mt-3 text-neutral-600">
            Starter → credible online. Premium → authority everywhere. Ultra → untouchable.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <PackageCard
            title="Starter — Credible Online"
            price="R4,000"
            period="once-off"
            bullets={starterBullets}
            cta="Get Started"
          />
          <PackageCard
            title="Premium — Authority Everywhere"
            price="R8,000"
            period="per month"
            bullets={premiumBullets}
            featured
            cta="Enroll Premium"
            whiteText
          />
          <PackageCard
            title="Ultra Prestige — Untouchable"
            price="By Invite Only"
            period=""
            bullets={ultraBullets}
            cta="Request Invite"
          />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: '#ffffff' }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-600">Results</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            What our clients say
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-sm text-neutral-700">“Within two weeks, my Google results looked like I’d been in the game for years. My personal website showcased my portfolio and landed me two exclusive mandates in Paulshof.”</div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-neutral-200" />
              <div>
                <div className="text-sm font-semibold text-neutral-900">Caitie M-R.</div>
                <div className="text-xs text-neutral-500">Realtor — Fourways/Sandton</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-sm text-neutral-700">“The Premium package paid for itself in a month. My site pulls in blog posts automatically, and the LinkedIn content flood tripled my inbound viewings.”</div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-neutral-200" />
              <div>
                <div className="text-sm font-semibold text-neutral-900">Jason S.</div>
                <div className="text-xs text-neutral-500">Luxury Property Specialist — Atlantic Seaboard</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-sm text-neutral-700">“The Smart Card completely changed the way I connect with clients. Instead of handing out old-fashioned business cards, I just tap my card and my personal brand contents pops up instantly on their phone. It feels premium, futuristic, and professional. My clients always say, ‘Wow, I’ve never seen that before.’ It’s not just a card, it’s a conversation starter that makes me unforgettable.”</div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-neutral-200" />
              <div>
                <div className="text-sm font-semibold text-neutral-900">Naledi K.</div>
                <div className="text-xs text-neutral-500">Area Agent — Bryanston & Riverclub</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: '#ffffff' }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>About StatusForge</h2>
            <p className="mt-3 text-neutral-700">StatusForge is South Africa’s first <span className="font-medium">Status-as-a-Service™</span> brand. We engineer credibility, authority, and digital prestige so ambitious professionals look like market leaders — fast and ethically. Our motto: <span className="italic">Authority, Engineered.</span></p>
            <p className="mt-3 text-neutral-700">We work with a limited number of clients per area to protect exclusivity and outcomes.</p>

            {/* Follow us row (subtle) */}
            <div className="mt-6">
              <p className="text-sm text-neutral-600 mb-2">Follow our authority insights:</p>
              <div className="flex flex-wrap gap-2">
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900">LinkedIn</a>
                <span className="text-neutral-400">•</span>
                <a href={LINKS.medium} target="_blank" rel="noopener noreferrer" className="text-sm underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900">Medium</a>
                <span className="text-neutral-400">•</span>
                <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-sm underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900">Instagram</a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>What makes us different</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li className="flex items-start gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5"><path d="M20 7L9 18l-5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Unified status engineering (not traditional PR)</li>
              <li className="flex items-start gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5"><path d="M20 7L9 18l-5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Localised for SA markets & platforms</li>
              <li className="flex items-start gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5"><path d="M20 7L9 18l-5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Ethical, transparent credibility signals (no fake logos)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative">
      <div className="absolute inset-0" style={{ backgroundColor: SF.bg }} />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl" style={{ fontFamily: 'Playfair Display, serif' }}>Let’s engineer your authority</h2>
            <p className="mt-3 max-w-2xl" style={{ color: SF.text }}>Tell us your area and goals. We’ll map a 14-day plan to make you the obvious choice in your market.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="mailto:hello@statusforge.co.za" className="rounded-md px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2" style={{ backgroundColor: SF.gold, color: "#0b0b0c" }}>Email Us</a>
              <a href="https://wa.me/27653206030" className="rounded-md border px-5 py-3 text-sm font-medium text-white transition hover:bg-white/5" style={{ borderColor: "#2a2a2a" }}>WhatsApp</a>
            </div>
            <p className="mt-6 text-xs" style={{ color: SF.text }}>Prefer a quick call? +27 65 320 6030</p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/90">
              <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>What to expect</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SF.gold }}></span> 20-minute discovery (fit & goals)</li>
                <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SF.gold }}></span> 14-day plan with deliverables & timeline</li>
                <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SF.gold }}></span> If we’re aligned, we start within 7 days</li>
              </ul>
              <p className="mt-4 text-xs" style={{ color: SF.text }}>Availability is limited.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10" style={{ backgroundColor: SF.bg }}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={LINKS.logo} alt="StatusForge Logo" className="h-7 w-7 rounded-md" />
            <div>
              <p className="text-sm text-white font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>StatusForge</p>
              <p className="text-xs" style={{ color: SF.text }}>Motto: <span className="italic text-white">Authority, Engineered.</span></p>
            </div>
          </div>

          {/* Social buttons */}
          <SocialRow />

        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs" style={{ color: SF.text }}>© {new Date().getFullYear()} StatusForge. All rights reserved.</p>
          <p className="text-xs" style={{ color: SF.text }}>
            Built in South Africa • <a href={LINKS.website} className="underline underline-offset-4">statusforge.co.za</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function StatusForgeOnePageSite() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: SF.bg, color: "#fff", fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
      {/* Load Fillout embed script */}
      <FilloutScript />
      {/* Inject basic SEO + JSON-LD */}
      <SeoHead />

      <Navbar />
      <Hero />
      <Services />
      <Packages />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
