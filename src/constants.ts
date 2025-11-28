
import { Course, CourseMode, User, UserRole, Session } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 's1',
    name: 'Alex Johnson',
    email: 'alex@student.futurex.com',
    role: UserRole.STUDENT,
    avatarUrl: 'https://picsum.photos/200',
    phone: '+1 (555) 012-3456',
    bio: 'Aspiring Full Stack Developer passionate about React and Node.js.',
    password: 'password'
  },
  {
    id: 't1',
    name: 'Sarah Connor',
    email: 'sarah@trainer.futurex.com',
    role: UserRole.TRAINER,
    avatarUrl: 'https://picsum.photos/201',
    phone: '+1 (555) 987-6543',
    bio: 'Senior Software Engineer with 10+ years of experience in web technologies.',
    password: 'password'
  },
  {
    id: 't2',
    name: 'Dr. Alan Grant',
    email: 'alan@trainer.futurex.com',
    role: UserRole.TRAINER,
    avatarUrl: 'https://picsum.photos/205',
    phone: '+1 (555) 555-5555',
    bio: 'Data Scientist and Paleontologist.',
    password: 'password'
  },
  {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@futurex.com',
    role: UserRole.ADMIN,
    avatarUrl: 'https://picsum.photos/202',
    phone: '+1 (555) 000-0000',
    password: 'password'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Full Stack React Development',
    description: 'Master the MERN stack with live projects and expert guidance.',
    instructorName: 'Sarah Connor',
    price: 499,
    duration: '12 Weeks',
    category: 'Development',
    rating: 4.8,
    studentsEnrolled: 1240,
    image: 'https://picsum.photos/600/400?random=1',
    mode: CourseMode.ONLINE,
    nextBatchDate: '2023-11-15',
    progress: 65
  },
  {
    id: 'c2',
    title: 'Data Science with Python',
    description: 'From basic statistics to advanced machine learning models.',
    instructorName: 'Dr. Alan Grant',
    price: 599,
    duration: '16 Weeks',
    category: 'Data Science',
    rating: 4.9,
    studentsEnrolled: 850,
    image: 'https://picsum.photos/600/400?random=2',
    mode: CourseMode.ONLINE,
    nextBatchDate: '2023-11-20',
    progress: 30
  },
  {
    id: 'c3',
    title: 'Digital Marketing Mastery',
    description: 'SEO, SEM, and Social Media strategies for 2024.',
    instructorName: 'Emily Chen',
    price: 299,
    duration: '6 Weeks',
    category: 'Marketing',
    rating: 4.6,
    studentsEnrolled: 2100,
    image: 'https://picsum.photos/600/400?random=3',
    mode: CourseMode.RECORDED,
    progress: 0
  },
  {
    id: 'c4',
    title: 'UI/UX Design Bootcamp',
    description: 'Learn Figma, wireframing, and design systems.',
    instructorName: 'Mike Ross',
    price: 450,
    duration: '10 Weeks',
    category: 'Design',
    rating: 4.7,
    studentsEnrolled: 500,
    image: 'https://picsum.photos/600/400?random=4',
    mode: CourseMode.OFFLINE,
    nextBatchDate: '2023-12-01'
  }
];

const now = new Date();
const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
const twoDaysAgo = new Date(now); twoDaysAgo.setDate(now.getDate() - 2);
const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);

export const MOCK_SESSIONS: Session[] = [
  {
    id: 'sess1',
    courseId: 'c1',
    title: 'React Hooks Deep Dive',
    startTime: new Date(now.getTime() - 1000 * 60 * 10).toISOString(), // Live now (started 10 mins ago)
    durationMinutes: 90,
    isLive: true
  },
  {
    id: 'sess2',
    courseId: 'c1',
    title: 'State Management with Redux',
    startTime: tomorrow.toISOString(),
    durationMinutes: 90,
    isLive: false
  },
  {
    id: 'sess3',
    courseId: 'c1',
    title: 'Introduction to React Router',
    startTime: yesterday.toISOString(),
    durationMinutes: 60,
    isLive: false
  },
  {
    id: 'sess4',
    courseId: 'c1',
    title: 'Component Lifecycle Methods',
    startTime: twoDaysAgo.toISOString(),
    durationMinutes: 60,
    isLive: false
  },
  {
    id: 'sess5',
    courseId: 'c2',
    title: 'Pandas Dataframes',
    startTime: twoDaysAgo.toISOString(),
    durationMinutes: 120,
    isLive: false
  },
  {
    id: 'sess6',
    courseId: 'c2',
    title: 'NumPy Basics',
    startTime: yesterday.toISOString(),
    durationMinutes: 90,
    isLive: false
  }
];

export const CHART_DATA_MONTHLY = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export const CHART_DATA_ATTENDANCE = [
  { name: 'Mon', value: 85 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 92 },
  { name: 'Thu', value: 80 },
  { name: 'Fri', value: 75 },
];
