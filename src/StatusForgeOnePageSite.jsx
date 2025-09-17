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
  bg: "#181818", // dark hero background
  gold: "#eeb75d", // unified accent
  text: "#b0b0b0", // small text on dark
  paper: "#f1efeb", // services section bg
};

const heroSlidesDefault = [
  { src: "/images/hero-1.jpg", alt: "Prestige modern home exterior at dusk", caption: "Authority, Engineered." },
  { src: "/images/hero-2.jpg", alt: "Elegant interior with natural light", caption: "Built for South African pros" },
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

/* Reusable props for any "Get Started" popup button */
const filloutAttrs = {
  "data-fillout-id": "ifDkXUT9ygus",
  "data-fillout-embed-type": "popup",
  "data-fillout-dynamic-resize": "",
  "data-fillout-inherit-parameters": "",
  "data-fillout-popup-size": "medium",
};

function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="group inline-flex items-center gap-2">
          <img src="/logo.png" alt="StatusForge Logo" className="h-7 w-7 rounded-md" />
          <span className="font-semibold tracking-tight text-white" style={{ fontFamily: 'Playfair Display, serif' }}>StatusForge</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-sm" style={{ color: SF.text }}>Services</a>
          <a href="#packages" className="text-sm" style={{ color: SF.text }}>Packages</a>
          <a href="#about" className="text-sm" style={{ color: SF.text }}>About</a>
          <a href="#contact" className="text-sm" style={{ color: SF.text }}>Contact</a>
        </nav>
        {/* Book a Call -> Get Started (direct Fillout popup trigger) */}
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
            <p className="mt-6 text-xs" style={{ color: SF.text }}>We accept up to <span className="font-semibold text-white">5 clients per area</span> to protect exclusivity.</p>
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

/* ==== Packages (ONLY change: center text on Premium & Ultra buttons) ==== */
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
        /* CHANGE APPLIES HERE: make anchor an inline-flex with centered text */
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
  const starter = [
    "Personal brand website (1-page, hero carousel)",
    "AI-Powered Personal Brand Audit ",
    "14-Day AI Content Sprint (daily posts)",
    "Social Media profile optimization",
    "Basic Web Discovery",
  ];

  const premium = [
    "Everything in Starter",
    "Authority Content Flood (LinkedIn, Medium, Google News)",
    "Google visibility engineering (SEO, Knowledge Panel)",
    "AI ghostwriting (blogs, insights, commentary)",
    "Press distribution",
    "Personal website linked to blog posts (dynamic authority hub)",
    "Optional add-on: Local Authority Visibility (Wi-Fi splash ads)",
  ];

  const ultra = [
    "Everything in Premium",
    "Exclusive multi-venue Wi-Fi takeovers",
    "Prestige digital billboards (with social proof content)",
    "High-authority press features (national / niche real estate)",
    "Video authority assets (AI-enhanced interviews & reels)",
    "Smart Open House Wi-Fi (property splash with virtual tour)",
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
            Starter → credible online. Premium → authority everywhere. Ultra → untouchable celebrity realtor.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <PackageCard
            title="Starter – Credible Online"
            price="R2,500"
            period="once-off"
            bullets={starter}
            cta="Get Started"
          />
          <PackageCard
            title="Premium – Authority Everywhere"
            price="R6,500"
            period="per month"
            bullets={premium}
            featured
            cta="Enroll Premium"
            whiteText
          />
          <PackageCard
            title="Ultra-Prestige – Untouchable Authority"
            price="By Invite Only"
            period=""
            bullets={ultra}
            cta="Apply for Ultra"
          />
        </div>
      </div>
    </section>
  );
}
/* ==== End Packages ==== */

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
            <div className="text-sm text-neutral-700">“Within two weeks, my Google results looked like I’d been in the game for years. The audit + one-page site landed me two exclusive mandates in Paulshof.”</div>
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
            <div className="text-sm text-neutral-700">“StatusForge made me the face of my suburb. The Wi-Fi splash ads + authority content mean people already ‘know me’ before we meet.”</div>
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
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>What makes us different</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li className="flex items-start gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5"><path d="M20 7L9 18l-5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Unified status engineering (not traditional PR)
              </li>
              <li className="flex items-start gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5"><path d="M20 7L9 18l-5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Localised for SA markets & platforms
              </li>
              <li className="flex items-start gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5"><path d="M20 7L9 18l-5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Ethical, transparent credibility signals (no fake logos)
              </li>
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
              <p className="mt-4 text-xs" style={{ color: SF.text }}>Availability is limited — we work with up to 5 clients per area.</p>
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
      {/* Note: per your request, the bottom Get Started button was removed */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <p className="text-xs" style={{ color: SF.text }}>© {new Date().getFullYear()} StatusForge. All rights reserved.</p>
        <p className="text-xs" style={{ color: SF.text }}>Motto: <span className="italic text-white">Authority, Engineered.</span></p>
      </div>
    </footer>
  );
}

export default function StatusForgeOnePageSite() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: SF.bg, color: "#fff", fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
      {/* Load Fillout embed script */}
      <FilloutScript />

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
