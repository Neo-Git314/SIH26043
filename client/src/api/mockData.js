/**
 * Mock Data Contract for Samadhan Setu
 * Shared contract across Frontend 1 (Auth/Nav), Frontend 2 (Citizen Submit/List), and Frontend 3 (University/Admin)
 */

export const DEMO_USERS = {
  citizen: {
    id: 'usr-citizen-01',
    name: 'Rameshwar Mahato',
    email: 'citizen@jharkhand.gov.in',
    role: 'citizen',
    phone: '+91 98351 23456',
    organization: 'Ranchi Citizen Forum',
    district: 'Ranchi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-15T10:00:00.000Z',
  },
  university: {
    id: 'usr-univ-02',
    name: 'Prof. S. K. Verma',
    email: 'university@bitmesra.ac.in',
    role: 'university',
    phone: '+91 94311 78901',
    organization: 'Birla Institute of Technology (BIT) Mesra',
    department: 'Civil & Environmental Engineering / AI Innovation Hub',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-10T09:30:00.000Z',
  },
  industry: {
    id: 'usr-ind-03',
    name: 'Ananya Sen',
    email: 'industry@tatasteel.com',
    role: 'industry',
    phone: '+91 92345 67890',
    organization: 'Tata Steel CSR & Technology Incubation',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-12T14:20:00.000Z',
  },
  admin: {
    id: 'usr-admin-04',
    name: 'Dr. Alok Prasad (IAS)',
    email: 'admin@jharkhand.gov.in',
    role: 'admin',
    phone: '+91 651 2400123',
    organization: 'Department of Higher, Technical Education & Skill Development, GoJ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-01T08:00:00.000Z',
  },
};

// Generate a dummy JWT token for local fallback testing
export function generateMockToken(user) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    })
  );
  const signature = btoa('samadhan_setu_mock_signature');
  return `${header}.${payload}.${signature}`;
}

export const JHARKHAND_DISTRICTS = [
  'Bokaro',
  'Chatra',
  'Deoghar',
  'Dhanbad',
  'Dumka',
  'East Singhbhum (Jamshedpur)',
  'Garhwa',
  'Giridih',
  'Godda',
  'Gumla',
  'Hazaribagh',
  'Jamtara',
  'Khunti',
  'Koderma',
  'Latehar',
  'Lohardaga',
  'Pakur',
  'Palamu',
  'Ramgarh',
  'Ranchi',
  'Sahibganj',
  'Seraikela Kharsawan',
  'Simdega',
  'West Singhbhum (Chaibasa)',
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    message: 'AI matched your civic challenge "Solar Water Desalination in Latehar" with BIT Mesra Lab.',
    type: 'match',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'notif-2',
    message: 'Tata Steel CSR submitted a co-funding interest for Project #JH-2024-882.',
    type: 'industry_interest',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'notif-3',
    message: 'Grievance #GRV-4019 in Ranchi district status updated to "In Progress".',
    type: 'status_change',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];
