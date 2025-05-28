

export const navigationItems = [
  { name: 'Trang Chủ', href: '/', current: true },
  { name: 'Học Sinh', href: '/students', current: false },
  { name: 'Giáo Viên', href: '/teachers', current: false },
  { name: 'Lớp Học', href: '/classes', current: false },
  { name: 'Môn Học', href: '/subjects', current: false },
  { name: 'Thời Khoá Biểu', href: '/schedules', current: false },
  { name: 'Sự Kiện', href: '/events', current: false },
  { name: 'Phân Quyền', href: '/roles', current: false},
  { name: 'Tài Khoản', href: '/accounts', current: false },
];

export const statisticsData = [
  {
    id: '1',
    title: 'Giáo Viên',
    value: 42,
    icon: 'Users',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: '2',
    title: 'Học Sinh',
    value: 1284,
    icon: 'GraduationCap',
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: '3',
    title: 'Lớp Học',
    value: 28,
    icon: 'Users',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: '4',
    title: 'Môn Học',
    value: 18,
    icon: 'BookOpen',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    id: '5',
    title: 'Sự Kiện',
    value: 12,
    icon: 'Calendar',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: '6',
    title: 'Thời Khoá Biểu',
    value: 186,
    icon: 'ClipboardList',
    color: 'bg-green-100 text-green-600'
  }
];

export const notificationsData = [
  {
    id: '1',
    title: 'New Student Registered',
    message: 'Emma Thompson has been registered to Grade 10-A.',
    time: '2023-07-01T09:30:00',
    read: false
  },
  {
    id: '2',
    title: 'Teacher Meeting',
    message: 'Reminder: Staff meeting today at 3:30 PM in the Conference Room.',
    time: '2023-07-01T08:45:00',
    read: false
  },
  {
    id: '3',
    title: 'System Update',
    message: 'The system will undergo maintenance tonight from 11 PM to 2 AM.',
    time: '2023-06-30T16:20:00',
    read: true
  },
  {
    id: '4',
    title: 'Grade Submission Deadline',
    message: 'Final grades for Term 1 must be submitted by July 5th.',
    time: '2023-06-30T14:15:00',
    read: true
  },
  {
    id: '5',
    title: 'New Curriculum Guidelines',
    message: 'Updated curriculum guidelines are now available for review.',
    time: '2023-06-29T11:05:00',
    read: true
  }
];

export const eventsData = [
  {
    id: '1',
    title: 'Annual Sports Day',
    date: '2023-07-15',
    time: '9:00 AM - 4:00 PM',
    location: 'School Grounds',
    type: 'sports'
  },
  {
    id: '2',
    title: 'Parent-Teacher Conference',
    date: '2023-07-10',
    time: '1:00 PM - 5:00 PM',
    location: 'Main Hall',
    type: 'meeting'
  },
  {
    id: '3',
    title: 'Science Fair',
    date: '2023-07-22',
    time: '10:00 AM - 3:00 PM',
    location: 'Science Block',
    type: 'academic'
  },
  {
    id: '4',
    title: 'Summer Break Begins',
    date: '2023-07-31',
    time: 'All Day',
    location: 'School-wide',
    type: 'holiday'
  },
  {
    id: '5',
    title: 'Cultural Performance',
    date: '2023-07-28',
    time: '6:00 PM - 8:00 PM',
    location: 'Auditorium',
    type: 'cultural'
  }
];
