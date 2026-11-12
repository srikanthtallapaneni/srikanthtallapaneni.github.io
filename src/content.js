/*
 * All of the site's text lives in this file.
 * When the resume changes, edit this file only — the layout (App.jsx) and
 * styles do not need to be touched.
 *
 * Source: Srikanth_Tallapaneni_5y.pdf
 */
const content = {
  meta: {
    name: "Srikanth Chowdari Tallapaneni",
    shortName: "Srikanth Tallapaneni",
    role: "Software Engineer",
    title: "Srikanth Tallapaneni | Software Engineer | Java, Angular & Cloud",
    description:
      "Software Engineer at IBM building geospatial and climate data platforms with Java, Spring Boot, Angular and cloud object storage.",
    location: "Andhra Pradesh, India",
  },

  links: {
    linkedin: "https://www.linkedin.com/in/srikanthchowdaritallapaneni/",
    github: "", // personal GitHub profile URL — leave empty to hide the button
    resume: "", // e.g. "assets/resume.pdf" — leave empty to hide the button
    email: "", // leave empty to hide
  },

  hero: {
    label: "Software Engineer · IBM",
    headline: "Dependable platforms for",
    headlineAccent: "geospatial & climate data.",
    intro:
      "Hi, I’m Srikanth. I build full-stack systems with Java, Spring Boot and Angular — from failover across data centers to APIs that stream geospatial data in real time.",
    photo: { src: "assets/profile.webp", alt: "Portrait of Srikanth Tallapaneni" },
    status: "Currently at IBM",
  },

  // value = number that counts up; suffix is shown after it
  stats: [
    { value: 25, suffix: "%", label: "Application performance improvement" },
    { value: 90, suffix: "%+", label: "Reduction in query time through caching" },
    { value: 5000, suffix: "+", label: "Users protected by automated failover" },
    { value: 15, suffix: "+", label: "Open-source code contributions" },
  ],

  work: {
    eyebrow: "Work",
    heading: "Things I’ve",
    headingAccent: "shipped.",
    lead: "The platforms I have worked on, what they do, and the stack behind them.",
    items: [
      {
        tag: "Utilities · Prediction",
        name: "Outage Prediction",
        org: "IBM (ISL)",
        period: "May 2025 – Present",
        summary:
          "A central place to view expected service outages and their types within a defined service territory. The predictions help assess the impact of weather and climate change on a utility system and determine the right response to mitigate it.",
        stack: ["React", "Node.js", "PostgreSQL", "AWX", "Grafana"],
        link: "https://www.ibm.com/docs/en/environmental-intel-suite?topic=solutions-outage-prediction",
        linkLabel: "Product documentation",
      },
      {
        tag: "Climate · SaaS platform",
        name: "Environmental Intelligence",
        org: "IBM (ISL)",
        period: "Nov 2023 – May 2025",
        summary:
          "IBM Environmental Intelligence Suite is a SaaS platform to monitor, predict and respond to weather and climate impact. It combines weather, geospatial, greenhouse gas emissions and industry-specific data behind dashboards, alerts and APIs so enterprises can build climate adaptation solutions.",
        stack: ["Spring Boot", "MySQL", "PostgreSQL", "MongoDB", "IBM Cloud", "AWS"],
        link: "https://www.ibm.com/products/environmental-intelligence",
        linkLabel: "Product page",
      },
      {
        tag: "Banking · Collections",
        name: "CACS — Computer Assisted Collection System",
        org: "CGI",
        period: "Dec 2020 – Nov 2023",
        summary:
          "A SaaS default-management solution that gives lenders end-to-end control of defaulted accounts across the collection life cycle — helping them handle cost pressure, third-party integration and changing compliance requirements while replacing outdated processes.",
        stack: ["Angular", "Spring Boot", "Kafka", "Camunda", "Keycloak", "MySQL"],
        link: "https://www.cgi.com/en/solutions/banking-capital-markets/cacs-x-collections",
        linkLabel: "Product page",
      },
    ],
  },

  about: {
    eyebrow: "About",
    heading: "Full-stack depth,",
    headingAccent: "reliability first.",
    paragraphs: [
      "I’m a Software Engineer at IBM working on the Environmental Intelligence Suite — the platform enterprises use to monitor, predict and respond to weather and climate impact.",
      "My work spans backend services, geospatial data ingestion, caching and resilience. I architected an error framework that sped up root cause analysis, built automated failover across three geographically diverse data centers, and cut query times by more than 90% with caching on IBM Cloud.",
      "Before IBM, I built micro-frontends and reusable Angular component libraries at CGI for a banking collections platform, along with real-time WebSocket communication, multilingual localization and API caching with Hazelcast.",
    ],
    facts: [
      { label: "Based in", value: "Andhra Pradesh, India" },
      { label: "Current focus", value: "Geospatial data, resilience & full-stack delivery" },
    ],
  },

  skills: {
    eyebrow: "Stack",
    heading: "From the browser",
    headingAccent: "to the data center.",
    lead: "The languages, frameworks and tools I work with day to day.",
    groups: [
      {
        name: "Languages",
        blurb: "Typed, readable code across backend and frontend.",
        items: ["Java", "Python", "TypeScript", "SQL", "C", "HTML", "CSS"],
      },
      {
        name: "Frontend",
        blurb: "Micro-frontends, reusable component libraries and accessible interfaces.",
        items: ["Angular", "Angular Material", "Angular Elements", "Reactive Forms", "Micro Front End", "Web Accessibility", "React"],
      },
      {
        name: "Backend & messaging",
        blurb: "Services, real-time communication, workflow and identity.",
        items: ["Spring Boot", "Node.js", "REST APIs", "WebSockets", "Kafka", "Camunda", "Keycloak"],
      },
      {
        name: "Data & caching",
        blurb: "Relational and document stores, with caching where it counts.",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Hazelcast"],
      },
      {
        name: "Cloud & operations",
        blurb: "Object storage, containers, automation and observability.",
        items: ["AWS S3", "IBM Cloud", "Kubernetes", "Docker", "AWX", "Grafana"],
      },
      {
        name: "Tooling",
        blurb: "The everyday kit for shipping and reviewing code.",
        items: ["Git", "Jira", "Sourcetree", "VS Code", "Spring Tool Suite", "Debugging"],
      },
    ],
  },

  experience: {
    eyebrow: "Journey",
    heading: "Where I’ve",
    headingAccent: "worked.",
    lead: "From banking collections to climate and geospatial platforms.",
    roles: [
      {
        company: "IBM",
        title: "Software Engineer",
        location: "India",
        start: "Nov 2023",
        end: "Present",
        current: true,
        context: "Environmental Intelligence · Geospatial data, resilience and performance",
        bullets: [
          "Architected a robust error framework that enabled faster root cause analysis; the findings let the team fix the three biggest causes of crashes and improve application performance by 25%.",
          "Used AWS S3 cloud object storage to ingest and retrieve COG files, enabling real-time processing and API-based streaming of geospatial data.",
          "Pioneered automated failover across three geographically diverse data centers, shielding critical applications from disruption and ensuring uninterrupted service for 5,000+ users.",
          "Delivered 15+ code contributions to IBM’s Environmental Intelligence open-source GitHub project, supporting scalable environmental data solutions.",
          "Implemented a caching mechanism on IBM Cloud that reduced query time by more than 90% without increasing costs.",
        ],
        stack: ["Spring Boot", "AWS S3", "IBM Cloud", "PostgreSQL", "MongoDB", "React", "Node.js"],
        impact: ["25% performance improvement", "90%+ faster queries", "5,000+ users kept online", "15+ open-source contributions"],
        link: { label: "Environmental Intelligence on GitHub", url: "https://github.com/IBM/Environmental-Intelligence" },
      },
      {
        company: "CGI",
        title: "Software Engineer",
        location: "India",
        start: "Dec 2020",
        end: "Nov 2023",
        context: "CGI Information Systems and Management · Banking collections platform",
        bullets: [
          "Conceptualized and deployed 10+ reusable component libraries to a private NPM registry, improving code reuse across teams by 30% and accelerating feature development; engineered micro-frontend web components with Angular Elements, with dynamic input fields and tailored validation through Reactive Forms.",
          "Implemented real-time WebSocket communication and multilingual localization (English, Spanish and more), driving a 40% increase in user engagement across 5 global regions.",
          "Revamped REST API performance with a Hazelcast caching mechanism, cutting response time by 40%.",
          "Engaged in code reviews that reinforced best practices and improved code quality, resulting in a 20% reduction in post-deployment issues.",
        ],
        stack: ["Angular", "Spring Boot", "Kafka", "Camunda", "Keycloak", "Hazelcast", "MySQL"],
        impact: ["10+ shared component libraries", "40% faster API responses", "40% higher engagement", "20% fewer post-deployment issues"],
      },
    ],
    education: {
      school: "Andhra University",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      location: "Visakhapatnam, Andhra Pradesh, India",
      start: "Aug 2016",
      end: "Apr 2020",
    },
  },

  contact: {
    eyebrow: "Contact",
    heading: "Let’s",
    headingAccent: "talk.",
    lead: "The quickest way to reach me is LinkedIn.",
  },
};

export default content;
