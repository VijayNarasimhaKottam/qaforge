export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: 'Engineering' | 'QA Testing' | 'Product' | 'Design' | 'DevOps' | 'Sales';
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  stock: number;
  description: string;
}

export interface UserProfile {
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar: string;
  bio: string;
  themePreference: 'dark' | 'light';
  notificationsEnabled: boolean;
}

const DEPARTMENTS: Employee['department'][] = ['Engineering', 'QA Testing', 'Product', 'Design', 'DevOps', 'Sales'];
const ROLES = ['Senior QA Engineer', 'Automation Architect', 'Frontend Developer', 'SDET Manager', 'DevOps Specialist', 'Product Designer', 'Backend Engineer'];
const FIRST_NAMES = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Sam', 'Chris', 'Pat', 'Riley', 'Avery', 'Dakota', 'Reese', 'Rowan', 'Quinn', 'Skyler', 'Cameron', 'Peyton', 'Devon', 'Kendall', 'Harper'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

export const generateEmployees = (count: number = 500): Employee[] => {
  const employees: Employee[] = [];
  for (let i = 1; i <= count; i++) {
    const fn = FIRST_NAMES[i % FIRST_NAMES.length];
    const ln = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const name = `${fn} ${ln}`;
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@qaforge.io`;
    const dept = DEPARTMENTS[i % DEPARTMENTS.length];
    const role = ROLES[i % ROLES.length];
    const salary = 65000 + (i * 175) % 85000;
    const status = i % 19 === 0 ? 'Terminated' : i % 7 === 0 ? 'On Leave' : 'Active';
    const year = 2019 + (i % 6);
    const month = String((i % 12) + 1).padStart(2, '0');
    const day = String((i % 28) + 1).padStart(2, '0');

    employees.push({
      id: `EMP-${String(i).padStart(4, '0')}`,
      name,
      email,
      role,
      department: dept,
      salary,
      status,
      joinDate: `${year}-${month}-${day}`
    });
  }
  return employees;
};

export const MOCK_EMPLOYEES = generateEmployees(500);

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    title: 'Playwright Test Masterclass License',
    price: 199.99,
    category: 'Software',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    stock: 45,
    description: 'Comprehensive guide & video course for mastering E2E Playwright test automation.'
  },
  {
    id: 'prod-002',
    title: 'Mechanical QA Keyboard (Silent Linear Red)',
    price: 149.50,
    category: 'Hardware',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
    stock: 12,
    description: 'Hot-swappable RGB keyboard with macro keys designed for high-velocity test script coding.'
  },
  {
    id: 'prod-003',
    title: 'Dual 4K HDR Monitor Stand Mount',
    price: 89.95,
    category: 'Hardware',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
    stock: 28,
    description: 'Heavy duty dual arm mount to display trace viewer and IDE side-by-side.'
  },
  {
    id: 'prod-004',
    title: 'Cyberpunk Dark-Mode QA Desk Mat',
    price: 29.99,
    category: 'Accessories',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1616588589676-63b3bd49795f?w=400&q=80',
    stock: 150,
    description: 'Ultra-smooth water resistant desk pad with Playwright cheat sheet keybindings printed on borders.'
  },
  {
    id: 'prod-005',
    title: 'API Performance & Load Testing Suite',
    price: 299.00,
    category: 'Software',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    stock: 99,
    description: 'Enterprise REST & GraphQL stress testing platform with automated report export.'
  },
  {
    id: 'prod-006',
    title: 'Noise Cancelling Wireless Headphones',
    price: 249.99,
    category: 'Hardware',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    stock: 8,
    description: 'Active noise cancellation to stay focused while debugging complex async race conditions.'
  },
  {
    id: 'prod-007',
    title: 'Automated CI/CD Pipeline Visualizer',
    price: 79.00,
    category: 'Software',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80',
    stock: 200,
    description: 'Real-time telemetry dashboard for monitoring GitHub Actions and Playwright test runs.'
  },
  {
    id: 'prod-008',
    title: 'Bug Hunter Ceramic Coffee Mug (500ml)',
    price: 18.50,
    category: 'Accessories',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
    stock: 85,
    description: 'Matte black stoneware mug featuring "It works on my machine" debug wisdom.'
  }
];

export const DEMO_ACCOUNTS = {
  user: {
    email: 'user@qaforge.com',
    password: 'user123',
    name: 'Vijay',
    role: 'user' as const,
    avatar: '/vijay-avatar.jpg',
    bio: 'Quality Assurance Test Automation Specialist.',
    themePreference: 'dark' as const,
    notificationsEnabled: true
  },
  admin: {
    email: 'admin@qaforge.com',
    password: 'admin123',
    name: 'Vijay (Admin)',
    role: 'admin' as const,
    avatar: '/vijay-avatar.jpg',
    bio: 'Lead Automation Architect & QAForge Creator.',
    themePreference: 'dark' as const,
    notificationsEnabled: true
  }
};
