export interface AlumniMember {
  id: number;
  name: string;
  batch: number;
  currentRole: string;
  company: string;
  story: string;
  photoUrl: string;
  linkedIn?: string;
}

export const alumniData: AlumniMember[] = [
  {
    id: 1,
    name: 'Dr. Arun Prakash',
    batch: 2005,
    currentRole: 'Cardiologist',
    company: 'Apollo Hospitals, Chennai',
    story: 'From the classrooms of St. Francis to the operation theatres of Apollo Hospitals — my journey in medicine began with the strong science foundation I received here. The school\'s emphasis on discipline and hard work shaped my career.',
    photoUrl: '',
  },
  {
    id: 2,
    name: 'Priya Lakshmi V.',
    batch: 2010,
    currentRole: 'Software Engineer',
    company: 'Google, Bangalore',
    story: 'St. Francis gave me my first taste of computers in the school lab. That curiosity led me to pursue computer science at Anna University and eventually to Google. I\'m forever grateful for the foundation this school provided.',
    photoUrl: '',
  },
  {
    id: 3,
    name: 'Karthik Rajan M.',
    batch: 2008,
    currentRole: 'Civil Services (IAS)',
    company: 'Government of Tamil Nadu',
    story: 'The discipline, moral values, and competitive spirit instilled at St. Francis were instrumental in my UPSC journey. The school taught me that no dream is too big if you have the determination to pursue it.',
    photoUrl: '',
  },
  {
    id: 4,
    name: 'Divya Shankar',
    batch: 2012,
    currentRole: 'Data Scientist',
    company: 'Microsoft, Hyderabad',
    story: 'Mrs. Lakshmi Priya\'s physics classes and the math club competitions sparked my love for analytical thinking. St. Francis didn\'t just teach me subjects — it taught me how to think.',
    photoUrl: '',
  },
  {
    id: 5,
    name: 'Mohammed Rizwan',
    batch: 2015,
    currentRole: 'Entrepreneur',
    company: 'FreshFarm Organics (Founder)',
    story: 'The eco club and community service activities at St. Francis planted the seed for my organic farming startup. Today, we supply fresh produce to over 500 families in Villupuram district.',
    photoUrl: '',
  },
  {
    id: 6,
    name: 'Sangeetha Devi',
    batch: 2007,
    currentRole: 'Professor',
    company: 'IIT Madras',
    story: 'My teachers at St. Francis saw my potential and encouraged me to aim higher. From a small school in Tindivanam to teaching at IIT Madras — this journey wouldn\'t have been possible without their guidance.',
    photoUrl: '',
  },
  {
    id: 7,
    name: 'Rajesh Kumar P.',
    batch: 2003,
    currentRole: 'District Collector',
    company: 'Government of Tamil Nadu',
    story: 'St. Francis shaped my character and leadership skills through scout activities and student council. These experiences were the foundation of my career in public service.',
    photoUrl: '',
  },
  {
    id: 8,
    name: 'Anitha Krishnan',
    batch: 2018,
    currentRole: 'Research Scholar',
    company: 'University of Cambridge, UK',
    story: 'The science exhibitions and laboratory experiments at St. Francis ignited my passion for research. Now pursuing my PhD at Cambridge, I carry the values and work ethic instilled by my beloved school.',
    photoUrl: '',
  },
];
