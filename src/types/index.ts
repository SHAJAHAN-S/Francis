export interface NavLink {
  label: string;
  path: string;
  children?: NavLink[];
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  category: 'Academic' | 'Event' | 'Holiday' | 'Admission' | 'General';
  content: string;
  isNew: boolean;
}

export interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  subject: string;
  department: string;
  bio: string;
  photoUrl: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  thumbnail: string;
  category: 'Sports' | 'Events' | 'Campus' | 'Academics' | 'Cultural';
  caption: string;
  year: number;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
}

export interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  category: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface AdmissionFormData {
  studentName: string;
  dob: string;
  classApplying: string;
  parentName: string;
  mobile: string;
  email: string;
  address: string;
  message: string;
}
