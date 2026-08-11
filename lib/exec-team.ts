export type ExecTeamMember = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio: string[];
};

export const execTeam: ExecTeamMember[] = [
  {
    name: 'Isaac Vassell',
    role: 'Founder',
    image: '/isaac-vassell.webp',
    imageAlt:
      'Professional headshot of Isaac Vassell, Founder of Rectify International',
    bio: [
      'Isaac Vassell founded Rectify after more than a decade in recruitment, sales and business development. Having seen how transactional the industry had become, he wanted to build a company centred on understanding real problems and creating practical, lasting solutions.',
      'His role is to drive strategy, partner closely with business leaders and have the difficult conversations that help people recognise what needs to change. Professional but still a child at heart, Isaac brings curiosity, energy and humour into his work, allowing him to connect with people from all walks of life.',
      'He founded Rectify to solve problems, challenge conventional thinking and create opportunities that positively transform businesses, careers and communities.',
    ],
  },
  {
    name: 'Collette Vassell',
    role: 'Chief Operating Officer',
    image: '/collette-vassell.webp',
    imageAlt:
      'Professional headshot of Collette Vassell, Chief Operating Officer at Rectify International',
    bio: [
      'As Chief Operating Officer at Rectify International, Collette Vassell leads strategy, growth and day-to-day operations across the energy and engineering sectors. She focuses on solving complex challenges and building clear, scalable systems that keep the business moving forward.',
      'With a background in agile project management, her leadership style is rooted in adaptability, iterative improvement and delivering value through collaboration. She believes hard work only becomes stressful without purpose; when the goal matters, it becomes meaningful. This shapes her approach — driving open communication, continuous improvement, and empowering teams with trust and support to deliver strong results.',
      'With a strong focus on problem solving and linking operational performance to commercial success, Collette partners with clients and internal teams to challenge conventional thinking, enable meaningful change and create long-term value across Rectify’s industries.',
      'Beyond work, she is deeply connected to her Caribbean heritage and a lifelong lover of soca music and culture. She draws inspiration from the region’s creativity, resilience and joy, bringing a sense of culture and play into her leadership — reinforcing that great businesses are built on both performance and authentic human connection.',
    ],
  },
  {
    name: 'Khalil Kirkwood',
    role: 'Chief Technology Officer',
    image: '/khalil-kirkwood.webp',
    imageAlt:
      'Professional headshot of Khalil Kirkwood, Chief Technology Officer at Rectify International',
    bio: [
      'As Chief Technology Officer at Rectify International, Khalil Kirkwood leads the company’s digital infrastructure — from the website and systems that keep the business running, to the marketing and SEO that help the right people find Rectify.',
      'He focuses on building clear, reliable digital foundations that support growth without unnecessary complexity. That means translating business goals into practical online experiences, keeping platforms secure and dependable, and making sure Rectify’s presence across search and digital channels stays sharp, consistent and useful.',
      'Khalil works closely with the leadership team to turn strategy into working tools — improving how Rectify shows up online, how information moves through the business, and how technology quietly supports better conversations with clients and candidates.',
    ],
  },
];
