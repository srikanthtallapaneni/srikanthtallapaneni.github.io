import { useEffect } from 'react';
import content from './content.js';

// Animated components from React Bits (https://reactbits.dev)
import Aurora from './reactbits/Aurora.jsx';
import BlurText from './reactbits/BlurText.jsx';
import ShinyText from './reactbits/ShinyText.jsx';
import CountUp from './reactbits/CountUp.jsx';
import Magnet from './reactbits/Magnet.jsx';
import ScrollVelocity from './reactbits/ScrollVelocity.jsx';
import SpotlightCard from './reactbits/SpotlightCard.jsx';
import AnimatedContent from './reactbits/AnimatedContent.jsx';
import ScrollReveal from './reactbits/ScrollReveal.jsx';

const ACCENT = '#c9f26c';

function Reveal({ children, delay = 0, className }) {
  return (
    <AnimatedContent distance={36} duration={0.7} delay={delay} threshold={0.12} className={className}>
      {children}
    </AnimatedContent>
  );
}

function Ext({ href, className, children }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

function Chips({ items, tone }) {
  return (
    <ul className={`chips ${tone || ''}`}>
      {items.map(t => <li key={t}>{t}</li>)}
    </ul>
  );
}

function Heading({ s, id }) {
  return (
    <Reveal className="heading">
      <p className="kicker">{s.eyebrow}</p>
      <h2 id={id}>
        {s.heading} <em>{s.headingAccent}</em>
      </h2>
      {s.lead && <p className="lead">{s.lead}</p>}
    </Reveal>
  );
}

function Nav() {
  const { meta } = content;
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <a className="mono" href="#top" aria-label={`${meta.shortName} — home`}>st</a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#stack">Stack</a>
          <a href="#journey">Journey</a>
        </div>
        <a className="nav-cta" href="#contact">Say hello</a>
      </nav>
    </header>
  );
}

function Hero() {
  const { hero, links, meta, stats } = content;
  return (
    <section className="hero wrap" id="top">
      <div className="bento">
        <div className="tile tile-intro">
          <div className="aurora" aria-hidden="true">
            <Aurora colorStops={['#3f6b2a', ACCENT, '#1f6f6a']} amplitude={0.9} blend={0.6} speed={0.6} mouseInteraction={false} />
          </div>
          <div className="tile-intro-body">
            <p className="label">
              <ShinyText text={hero.label} color="#a9a69b" shineColor="#ffffff" speed={3} />
            </p>
            <h1 className="sr-only">{hero.headline} {hero.headlineAccent}</h1>
            <div className="headline" aria-hidden="true">
              <BlurText text={hero.headline} delay={90} animateBy="words" direction="bottom" className="headline-line" />
              <BlurText text={hero.headlineAccent} delay={90} animateBy="words" direction="bottom" className="headline-line headline-accent" />
            </div>
            <p className="intro">{hero.intro}</p>
            <div className="actions">
              <Magnet padding={50} magnetStrength={6}>
                <a className="btn btn-accent" href="#work">See my work <span aria-hidden="true">↓</span></a>
              </Magnet>
              {links.resume && <Ext href={links.resume} className="btn">Resume</Ext>}
              {links.linkedin && <Ext href={links.linkedin} className="btn">LinkedIn</Ext>}
              {links.github && <Ext href={links.github} className="btn">GitHub</Ext>}
            </div>
          </div>
        </div>

        {hero.photo && (
          <figure className="tile tile-photo">
            <img src={hero.photo.src} alt={hero.photo.alt} width="1024" height="1536" />
            <figcaption>
              <span className="status"><i aria-hidden="true" />{hero.status}</span>
              <span>{meta.location}</span>
            </figcaption>
          </figure>
        )}

        {stats.map(s => (
          <div className="tile tile-stat" key={s.label}>
            <p className="stat-value">
              <CountUp to={s.value} separator="," duration={1.6} suffix={s.suffix} />
            </p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const groups = content.skills.groups;
  const half = Math.ceil(groups.length / 2);
  const row = gs => gs.flatMap(g => g.items).join('  ✦  ') + '  ✦  ';
  return (
    <div className="marquee" aria-hidden="true">
      <ScrollVelocity texts={[row(groups.slice(0, half)), row(groups.slice(half))]} velocity={40} numCopies={3} className="marquee-text" />
    </div>
  );
}

function Work() {
  const { work } = content;
  return (
    <section className="section wrap" id="work" aria-labelledby="work-title">
      <Heading s={work} id="work-title" />
      <div className="projects">
        {work.items.map((p, i) => (
          <Reveal key={p.name}>
            <SpotlightCard className="project" spotlightColor="rgba(201, 242, 108, 0.22)">
              <div className="project-side">
                <span className="project-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{p.org}</span>
                <span>{p.period}</span>
              </div>
              <div className="project-main">
                <p className="kicker">{p.tag}</p>
                <h3>{p.name}</h3>
                <p className="body">{p.summary}</p>
              </div>
              <div className="project-meta">
                <Chips items={p.stack} />
                {p.link && <Ext href={p.link} className="link">{p.linkLabel || 'Learn more'}</Ext>}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  const { about } = content;
  const [first, ...rest] = about.paragraphs;
  return (
    <section className="section wrap" id="about" aria-labelledby="about-title">
      <Heading s={about} id="about-title" />
      <ScrollReveal baseOpacity={0.15} enableBlur baseRotation={0} blurStrength={4} containerClassName="about-lede" textClassName="about-lede-text">
        {first}
      </ScrollReveal>
      <Reveal className="about-rest">
        {rest.map(p => <p key={p}>{p}</p>)}
        <dl className="facts">
          {about.facts.map(f => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function Stack() {
  const { skills } = content;
  return (
    <section className="section wrap" id="stack" aria-labelledby="stack-title">
      <Heading s={skills} id="stack-title" />
      <div className="stack-table">
        {skills.groups.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.04}>
            <div className="stack-row">
              <h3>{g.name}</h3>
              <p className="body">{g.blurb}</p>
              <Chips items={g.items} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  const { experience } = content;
  const ed = experience.education;
  return (
    <section className="section wrap" id="journey" aria-labelledby="journey-title">
      <Heading s={experience} id="journey-title" />
      <div className="roles">
        {experience.roles.map(r => (
          <Reveal key={r.company}>
            <article className="role">
              <div className="role-side">
                <h3>{r.company}</h3>
                <p>{r.start} — {r.end}</p>
                {r.current && <span className="status"><i aria-hidden="true" />Current</span>}
              </div>
              <div className="role-main">
                <p className="role-title">{r.title} <span>· {r.location}</span></p>
                <p className="body">{r.context}</p>
                <ul className="bullets">
                  {r.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
                <Chips items={r.impact} tone="accent" />
                <Chips items={r.stack} />
                {r.link && <Ext href={r.link.url} className="link">{r.link.label}</Ext>}
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal>
          <article className="role">
            <div className="role-side">
              <h3>Education</h3>
              <p>{ed.start} — {ed.end}</p>
            </div>
            <div className="role-main">
              <p className="role-title">{ed.degree} <span>· {ed.field}</span></p>
              <p className="body">{ed.school} · {ed.location}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const { contact, links, meta } = content;
  return (
    <section className="contact wrap" id="contact" aria-labelledby="contact-title">
      <Reveal className="contact-card">
        <h2 id="contact-title">
          {contact.heading}{' '}
          <em><ShinyText text={contact.headingAccent} color={ACCENT} shineColor="#ffffff" speed={2.5} /></em>
        </h2>
        <p className="lead">{contact.lead}</p>
        <div className="actions">
          {links.linkedin && (
            <Magnet padding={60} magnetStrength={5}>
              <Ext href={links.linkedin} className="btn btn-accent">Connect on LinkedIn</Ext>
            </Magnet>
          )}
          {links.email && <a className="btn" href={`mailto:${links.email}`}>Email me</a>}
          {links.github && <Ext href={links.github} className="btn">GitHub</Ext>}
          {links.resume && <Ext href={links.resume} className="btn">Resume</Ext>}
        </div>
      </Reveal>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {meta.name}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    document.title = content.meta.title;
  }, []);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Stack />
        <Journey />
        <Contact />
      </main>
    </>
  );
}
