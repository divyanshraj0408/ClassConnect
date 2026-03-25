import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

// ── inline SVG placeholders (swap for your real imports) ──────────────────────
// import Navbar from "../../shared/Navbar/Navbar";
// import image  from "../assets/Group 2.svg";
// import logo   from "../assets/logo/svg/logo-no-background.svg";
// import Button from "../../shared/button/Button";
// import InfoSection from "../components/InfoSection";
// import Footer      from "../components/Footer";

// ── feature data ──────────────────────────────────────────────────────────────
interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: "📋",
    title: "Manage Assignments",
    description:
      "Create, distribute, and grade assignments with ease. Track submissions in real-time.",
  },
  {
    icon: "💬",
    title: "Live Interaction",
    description:
      "Engage students with announcements, comments, and direct messaging in one place.",
  },
  {
    icon: "📊",
    title: "Track Progress",
    description:
      "Monitor student performance with intuitive grade books and analytics dashboards.",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description:
      "Role-based access ensures teachers and students only see what they should.",
  },
];

// ── component ─────────────────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = (): void => {
    navigate("/auth");
  };

  return (
    <div className="lp-root">
      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className="lp-nav">
        <div className="lp-nav__inner">
          <span className="lp-nav__logo">ClassConnect</span>
          <button className="lp-btn lp-btn--outline" onClick={handleGetStarted}>
            Get started
          </button>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="lp-hero">
        <div className="lp-hero__glow lp-hero__glow--1" aria-hidden="true" />
        <div className="lp-hero__glow lp-hero__glow--2" aria-hidden="true" />

        <div className="lp-hero__inner">
          <div className="lp-hero__badge">✦ Virtual Classroom Platform</div>

          <h1 className="lp-hero__title">
            Where Learning
            <br />
            <span className="lp-hero__title--accent">Comes Together</span>
          </h1>

          <p className="lp-hero__sub">
            ClassConnect gives teachers the tools to create classes, manage
            assignments, and foster meaningful interaction — all in one elegant
            virtual classroom.
          </p>

          <div className="lp-hero__actions">
            <button className="lp-btn lp-btn--primary" onClick={handleGetStarted}>
              Get started — it&apos;s free
            </button>
            <button className="lp-btn lp-btn--ghost">See how it works ↓</button>
          </div>

          {/* mock dashboard card */}
          <div className="lp-hero__card" aria-hidden="true">
            <div className="lp-card__header">
              <div className="lp-card__dot lp-card__dot--red" />
              <div className="lp-card__dot lp-card__dot--yellow" />
              <div className="lp-card__dot lp-card__dot--green" />
              <span className="lp-card__title">CS 101 · Spring 2025</span>
            </div>
            <div className="lp-card__body">
              <div className="lp-card__row lp-card__row--active">
                <span>📌</span>
                <div>
                  <p className="lp-card__label">Assignment due</p>
                  <p className="lp-card__value">Problem Set 3 — Today, 11:59 PM</p>
                </div>
                <span className="lp-card__badge lp-card__badge--warn">Due soon</span>
              </div>
              <div className="lp-card__row">
                <span>✅</span>
                <div>
                  <p className="lp-card__label">Graded</p>
                  <p className="lp-card__value">Midterm Essay — 92/100</p>
                </div>
                <span className="lp-card__badge lp-card__badge--ok">Graded</span>
              </div>
              <div className="lp-card__row">
                <span>💬</span>
                <div>
                  <p className="lp-card__label">New announcement</p>
                  <p className="lp-card__value">Office hours moved to Thursday</p>
                </div>
                <span className="lp-card__badge">New</span>
              </div>
              <div className="lp-card__progress-section">
                <p className="lp-card__label">Class completion</p>
                <div className="lp-card__progress-bar">
                  <div className="lp-card__progress-fill" style={{ width: "68%" }} />
                </div>
                <p className="lp-card__progress-label">68% of curriculum covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────── */}
      <section className="lp-features">
        <div className="lp-features__inner">
          <p className="lp-section__eyebrow">What you get</p>
          <h2 className="lp-section__heading">Everything a classroom needs</h2>

          <div className="lp-features__grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="lp-feature-card">
                <div className="lp-feature-card__icon">{f.icon}</div>
                <h3 className="lp-feature-card__title">{f.title}</h3>
                <p className="lp-feature-card__desc">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="lp-cta">
        <div className="lp-cta__inner">
          <h2 className="lp-cta__heading">Ready to connect your class?</h2>
          <p className="lp-cta__sub">
            Join thousands of educators already using ClassConnect.
          </p>
          <button className="lp-btn lp-btn--primary lp-btn--lg" onClick={handleGetStarted}>
            Create your first class →
          </button>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-footer__inner">
          <span className="lp-nav__logo">ClassConnect</span>
          <p className="lp-footer__copy">© {new Date().getFullYear()} ClassConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;