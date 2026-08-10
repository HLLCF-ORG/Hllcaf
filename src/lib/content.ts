export const SITE = {
  name: "Heart of Life Line Care Foundation",
  shortName: "HLLCAF",
  tagline: "Hope, dignity, and opportunity for every life.",
  phone: "+234 806 227 4746",
  phoneHref: "tel:+2348062274746",
  email: "info@heartoflifeline.org",
  emailHref: "mailto:info@heartoflifeline.org",
  address: "Ado Ekiti, Adebayo, Nigeria",
  whatsapp: "https://wa.me/2348062274746",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://x.com/",
    whatsapp: "https://wa.me/2348062274746",
  },
  mapEmbed:
    "https://maps.google.com/maps?q=Ado%20Ekiti%20Adebayo%20Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed",
};

export const VISION =
  "To build a compassionate and empowered society where every individual, regardless of age, gender, or background, has access to hope, opportunities, quality education, healthcare, and the support needed to live a dignified and fulfilling life.";

export const MISSION =
  "Heart of Life Line Care Foundation is committed to improving the lives of vulnerable individuals and communities through healthcare outreach, education, support, humanitarian assistance, youth and women empowerment, poverty alleviation, advocacy, and sustainable community development. We strive to promote hope, compassion, equality, and self-reliance through partnership, volunteerism, innovation, integrity, and dedicated services.";

export const HISTORY = [
  "Heart of Life Line Care Foundation was established out of a deep passion to improve the lives of vulnerable individuals and underserved communities. The Foundation was created in response to the growing challenges of poverty, poor access to healthcare, inadequate education, unemployment, and the increasing number of disadvantaged children, women, elderly people, and persons living with disabilities.",
  "Recognizing that lasting change begins with compassion and community service, the founders came together with a shared vision of restoring hope, promoting dignity, and empowering people to achieve sustainable livelihoods. Since its inception, the Foundation has been committed to providing humanitarian assistance through healthcare outreach programmes, educational support, youth and women empowerment initiatives, food relief, advocacy, and community development projects.",
  "Heart of Life Line Care Foundation believes that every individual deserves the opportunity to live a healthy, productive, and dignified life regardless of their social or economic background. Through partnerships with volunteers, donors, government agencies, and other organizations, the Foundation continues to expand its impact and reach more people in need.",
  "Today, Heart of Life Line Care Foundation remains dedicated to building healthier communities, reducing poverty, promoting social justice, and inspiring hope through compassionate service and sustainable development.",
];

export type Program = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  image?: string;
  featured?: boolean;
};

export const PROGRAMS: Program[] = [
  {
    id: "healthcare",
    title: "Healthcare Programs",
    summary: "Medical outreach, screening, and health education for underserved communities.",
    image: "/images/healthcare-outreach.png",
    featured: true,
    items: [
      "Free medical outreach in rural and underserved communities",
      "Health education and disease prevention campaigns",
      "Maternal and child healthcare support",
      "Free health screening (blood pressure, diabetes, HIV, hepatitis, malaria)",
      "Mental health awareness and counseling",
      "Blood donation and organ donation awareness",
    ],
  },
  {
    id: "education",
    title: "Education Programs",
    summary: "Scholarships, literacy, mentoring, and digital skills for learners of all ages.",
    image: "/images/education-students.png",
    featured: true,
    items: [
      "Scholarships for indigent students",
      "School supplies and educational materials distribution",
      "Adult literacy classes",
      "Career guidance and mentoring",
      "Digital literacy and computer training",
      "Reading clubs and after-school lessons",
    ],
  },
  {
    id: "youth",
    title: "Youth Empowerment Projects",
    summary: "Vocational training, entrepreneurship, ICT, and leadership for young people.",
    image: "/images/youth-training.png",
    featured: true,
    items: [
      "Vocational skills acquisition",
      "Entrepreneurship and business development training",
      "ICT and digital skills training",
      "Leadership development seminars",
      "Internship and mentorship opportunities",
    ],
  },
  {
    id: "women",
    title: "Women Empowerment Projects",
    summary: "Skills, microfinance, and advocacy that strengthen women and families.",
    image: "/images/women-empowerment.png",
    featured: true,
    items: [
      "Skills acquisition (fashion design, catering, hairdressing, soapmaking, etc.)",
      "Small business grants and microfinance support",
      "Financial literacy training",
      "Advocacy against gender-based violence",
      "Maternal support and family welfare programs",
    ],
  },
  {
    id: "community",
    title: "Community Development Projects",
    summary: "Clean water, sanitation, environment, and emergency relief.",
    featured: true,
    items: [
      "Clean water and sanitation initiatives",
      "Community environmental sanitation and tree planting",
      "Waste management awareness",
      "Community infrastructure support",
      "Emergency relief during disasters and crises",
    ],
  },
  {
    id: "child-welfare",
    title: "Child Welfare Services",
    summary: "Protection, nutrition, and opportunity for orphans and vulnerable children.",
    featured: true,
    items: [
      "Support for orphans and vulnerable children",
      "Child protection and safeguarding awareness",
      "Nutrition and feeding programs",
      "Back-to-school campaigns",
      "Recreational and talent development activities",
    ],
  },
  {
    id: "senior-care",
    title: "Senior Care Services",
    summary: "Medical support, welfare packages, and companionship for older adults.",
    items: [
      "Medical support for senior citizens",
      "Food and welfare packages",
      "Home visitation and companionship",
      "Health insurance support where possible",
    ],
  },
  {
    id: "humanitarian",
    title: "Humanitarian Services",
    summary: "Food, clothing, shelter, and seasonal outreach for families in need.",
    items: [
      "Food distribution to vulnerable families",
      "Clothing and household item donations",
      "Emergency relief materials",
      "Shelter support for displaced persons",
      "Seasonal outreach during festive periods",
    ],
  },
  {
    id: "advocacy",
    title: "Advocacy and Awareness",
    summary: "Public health, rights, peacebuilding, and civic sensitization campaigns.",
    items: [
      "Campaigns on public health issues",
      "Human rights and child rights advocacy",
      "Anti-drug abuse awareness",
      "Peacebuilding and conflict resolution programs",
      "Community sensitization on civic responsibilities",
    ],
  },
  {
    id: "partnership",
    title: "Partnership and Volunteer Services",
    summary: "Volunteer training and collaboration with agencies, schools, and NGOs.",
    items: [
      "Volunteer recruitment and training",
      "Collaboration with government agencies, hospitals, schools, and other NGOs",
      "Corporate social responsibility (CSR) partnerships",
      "Community stakeholder engagement",
    ],
  },
];

export const IMPACT_STATS = [
  { value: "10+", label: "Program areas" },
  { value: "1", label: "Shared mission: dignity for all" },
  { value: "24/7", label: "Compassion in action" },
  { value: "∞", label: "Lives we aim to uplift" },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs & Services" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact Us" },
];
