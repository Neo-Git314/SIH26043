import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Frontend A (Auth & Landing)
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

// Frontend B (Citizen & University Screens)
import SubmitIssue from './components/SubmitIssue';
import MyComplaints from './components/MyComplaints';
import Challenges from './components/Challenges';
import UniversityChallenges from './pages/university/UniversityChallenges';
import Workspace from './components/Workspace';

// Frontend C (Admin Analytics Dashboard)
import AdminDashboard from './pages/admin/AdminDashboard';

const API_BASE = 'http://localhost:5000/api';

const INITIAL_COMPLAINTS = [
  {
    ticketId: 'CIV-2024-883',
    title: 'Pothole on Main Street',
    district: 'd1',
    description: 'Large pothole forming near the intersection of Main and 4th, causing traffic delays.',
    status: 'Pending',
    date: 'Oct 24, 2024',
    mediaUrls: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAR1cdcHieYaSAwgARlNTRkvt5BarXEJh05z0bPDXGem-giU-vAaybM5kb8eytTVdcvbspeqi0w_vlQXMuGVvRE6uBuCoKHdzHTBLY8qunUffXYZtBTi4YZGD6hTU9-frGeL8Vtp71gOkb3xGPMpOpJSxFg3Pbf72UMxk7yykF7ww3hqX-QrwMpJS34oe_5v4KC3tL8b62CR3XlsaT6qOrFZzv0haeaqmI5e8OPMLXE9cPSgQapd-d7aA']
  },
  {
    ticketId: 'CIV-2024-855',
    title: 'Fallen Tree Branch',
    district: 'd2',
    description: 'Large branch blocking the pedestrian walkway near the north entrance.',
    status: 'In Progress',
    date: 'Oct 22, 2024',
    mediaUrls: []
  },
  {
    ticketId: 'CIV-2024-812',
    title: 'Water Leak in Riverside Park',
    district: 'd3',
    description: 'Broken sprinkler head near the playground area is flooding the walking path.',
    status: 'Assigned',
    date: 'Oct 20, 2024',
    mediaUrls: []
  },
  {
    ticketId: 'CIV-2024-745',
    title: 'Streetlight Outage',
    district: 'd2',
    description: 'Two streetlights out in a row on Oak Ave, making the sidewalk very dark at night.',
    status: 'Resolved',
    date: 'Oct 15, 2024',
    mediaUrls: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBRx6FMHN_2VGmyuPzXm3Oby8d8zkdINFfgyqJmXXTy_dGD6JsOf8fAM5ytOrL4gc0EApGOqHi-JAgBpClnG1GO-zOFqsddNT-lqSIrxhJq8wHUXW-b9mPpXoTjYYXKkHPsKlDvozArV7U7tWnSdBGAapoii62WzjcdZ48nLPP-EjR4Z6rwsqQq0D-UwUi26XIygDomzrWrJAPVAfYHszfpYJszthVcC7D2L13bcHZBLYR4Sxh4K-LHCw']
  }
];

const INITIAL_CHALLENGES = [
  {
    id: 'ch-1',
    title: 'Optimize Autonomous Transit Routes for Under-served Districts',
    description: 'The city is rolling out a fleet of autonomous micro-buses. We need an AI model to dynamically route these vehicles based on real-time pedestrian density and historic transit blackspots in District 4.',
    urgency: 'High Urgency',
    topic: 'Urban Mobility',
    duration: '6 Months',
    grant: '$50k Grant',
    matchScore: '98%',
    isAccepted: false
  },
  {
    id: 'ch-2',
    title: 'Predictive Water Main Maintenance',
    description: 'Utilize historical acoustic sensor data to predict pipe failures before they cause disruptive street flooding.',
    urgency: 'Medium Urgency',
    topic: 'Water Systems',
    duration: '9 Months',
    grant: '$75k Grant',
    matchScore: '85%',
    isAccepted: false
  },
  {
    id: 'ch-3',
    title: 'Air Quality Sensor Network Calibration',
    description: 'Develop machine learning techniques to auto-calibrate low-cost IoT air quality sensors deployed across industrial zones.',
    urgency: 'High Urgency',
    topic: 'Environmental IoT',
    duration: '4 Months',
    grant: '$30k Grant',
    matchScore: '91%',
    isAccepted: false
  },
  {
    id: 'ch-4',
    title: 'Public Park Utilization Heatmaps',
    description: 'Analyze anonymized mobile connection data to understand usage patterns in city parks to optimize maintenance schedules.',
    urgency: 'Low Urgency',
    topic: 'Urban Parks',
    duration: '3 Months',
    grant: '$15k Grant',
    matchScore: '78%',
    isAccepted: false
  },
  {
    id: 'ch-5',
    title: 'Smart Grid Load Balancing UI',
    description: 'Design an intuitive dashboard for grid operators to visualize and manage localized energy spikes from EV charging stations.',
    urgency: 'Medium Urgency',
    topic: 'Smart Grid',
    duration: '8 Months',
    grant: '$60k Grant',
    matchScore: '82%',
    isAccepted: false
  }
];

const INITIAL_MILESTONES = [
  {
    title: 'Initial Data Collection',
    status: 'Completed',
    completedDate: 'Oct 12, 2024'
  },
  {
    title: 'Algorithm Prototyping',
    status: 'Completed',
    completedDate: 'Nov 05, 2024'
  },
  {
    title: 'Simulated Testing Phase',
    status: 'In Progress',
    dueDate: 'Dec 01'
  },
  {
    title: 'City Integration Pilot',
    status: 'Pending',
    dueDate: 'Q1 2025'
  }
];

function AppContent() {
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [milestones, setMilestones] = useState(INITIAL_MILESTONES);
  const [backendAvailable, setBackendAvailable] = useState(false);

  useEffect(() => {
    const checkBackendAndLoad = async () => {
      try {
        const res = await fetch(`${API_BASE}/health`);
        if (res.ok) {
          setBackendAvailable(true);
          const [cRes, chRes, mRes] = await Promise.all([
            fetch(`${API_BASE}/complaints`),
            fetch(`${API_BASE}/challenges`),
            fetch(`${API_BASE}/milestones`),
          ]);
          if (cRes.ok) {
            const data = await cRes.json();
            if (data.length > 0) setComplaints(data);
          }
          if (chRes.ok) {
            const data = await chRes.json();
            if (data.length > 0) setChallenges(data);
          }
          if (mRes.ok) {
            const data = await mRes.json();
            if (data.length > 0) setMilestones(data);
          }
        }
      } catch {
        setBackendAvailable(false);
      }
    };
    checkBackendAndLoad();
  }, []);

  const addComplaint = async (newComplaint) => {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/complaints`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newComplaint),
        });
        if (res.ok) {
          const saved = await res.json();
          setComplaints((prev) => [saved, ...prev]);
          return;
        }
      } catch (err) {
        console.error('Failed to post complaint to backend, saving locally.', err);
      }
    }
    const mockSaved = {
      ticketId: `CIV-2024-${Math.floor(100 + Math.random() * 900)}`,
      title: newComplaint.title,
      district: newComplaint.district,
      description: newComplaint.description,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      mediaUrls: newComplaint.mediaUrls || [],
    };
    setComplaints((prev) => [mockSaved, ...prev]);
  };

  const acceptChallenge = async (id) => {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/challenges/${id}/accept`, { method: 'PUT' });
        if (res.ok) {
          const updated = await res.json();
          setChallenges((prev) => prev.map((c) => (c.id === id || c._id === id ? updated : c)));
          return;
        }
      } catch (err) {
        console.error('Failed to accept challenge on backend, saving locally.', err);
      }
    }
    setChallenges((prev) => prev.map((c) => (c.id === id ? { ...c, isAccepted: true } : c)));
  };

  const addMilestone = async (newMs) => {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/milestones`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMs),
        });
        if (res.ok) {
          const saved = await res.json();
          setMilestones((prev) => [...prev, saved]);
          return;
        }
      } catch (err) {
        console.error('Failed to save milestone to backend, saving locally.', err);
      }
    }
    setMilestones((prev) => [...prev, newMs]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#191C1E] font-sans">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Citizen Protected Routes */}
          <Route
            path="/submit"
            element={
              <ProtectedRoute allowedRoles={['citizen', 'admin']}>
                <SubmitIssue addComplaint={addComplaint} setView={() => {}} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-complaints"
            element={
              <ProtectedRoute allowedRoles={['citizen', 'admin']}>
                <MyComplaints complaints={complaints} setView={() => {}} />
              </ProtectedRoute>
            }
          />

          {/* University Protected Routes */}
          <Route
            path="/university/challenges"
            element={
              <ProtectedRoute allowedRoles={['university', 'admin']}>
                <UniversityChallenges challenges={challenges} acceptChallenge={acceptChallenge} setView={() => {}} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workspace"
            element={
              <ProtectedRoute allowedRoles={['university', 'industry', 'admin']}>
                <Workspace milestones={milestones} addMilestone={addMilestone} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/university/projects/:id"
            element={
              <ProtectedRoute allowedRoles={['university', 'industry', 'admin']}>
                <Workspace milestones={milestones} addMilestone={addMilestone} />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
