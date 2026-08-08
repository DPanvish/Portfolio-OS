export const portfolioData = {
  about: `Hello! I'm a software engineer specializing in building high-performance web applications and digital experiences. This portfolio is designed to mimic a classic desktop OS, showcasing my love for clean architecture, precise interactions, and slightly nostalgic interfaces.`,
  experience: [
    {
      id: 'job-1',
      title: 'Senior Frontend Engineer',
      company: 'TechCorp Inc.',
      date: '2023 - Present',
      description: 'Led the migration to Next.js App Router, improving Core Web Vitals by 40%. Built a robust component library used by 5 different product teams.',
    },
    {
      id: 'job-2',
      title: 'Full Stack Developer',
      company: 'StartupX',
      date: '2021 - 2023',
      description: 'Developed scalable APIs using Node.js and PostgreSQL. Designed and built interactive, real-time dashboards for financial analytics.',
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'OS Portfolio',
      description: 'The very portfolio you are viewing right now. It simulates a premium desktop environment with draggable windows, a terminal engine, and a custom interactive cursor.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      link: 'https://portfolio-os.vercel.app',
      github: 'https://github.com/yourusername/portfolio-os',
    },
    {
      id: 'proj-2',
      title: 'Headless E-commerce Platform',
      description: 'A headless e-commerce solution integrating a Shopify backend with a lightning-fast Next.js frontend.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      techStack: ['React', 'Shopify Storefront API', 'GraphQL', 'Stripe'],
      link: 'https://ecommerce-demo.vercel.app',
      github: 'https://github.com/yourusername/headless-ecommerce',
    }
  ],
  skills: [
    { name: 'TypeScript', usage: 95 },
    { name: 'React / Next.js', usage: 90 },
    { name: 'Tailwind CSS', usage: 85 },
    { name: 'Node.js / Express', usage: 75 },
    { name: 'Framer Motion', usage: 70 },
  ]
};
