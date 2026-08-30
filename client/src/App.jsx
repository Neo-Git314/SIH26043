import React, { useState, useEffect } from 'react'
import MyComplaints from './components/MyComplaints'
import Challenges from './components/Challenges'
import SubmitIssue from './components/SubmitIssue'
import Workspace from './components/Workspace'

const API_BASE = 'http://localhost:5000/api'

// Client-side initial mock seeds if server is not available
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
]

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
]

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
]

function App() {
  const [view, setView] = useState('my-complaints')
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS)
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES)
  const [milestones, setMilestones] = useState(INITIAL_MILESTONES)
  const [backendAvailable, setBackendAvailable] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Fetch initial data from backend if available
  useEffect(() => {
    const checkBackendAndLoad = async () => {
      try {
        // Test health endpoint
        const res = await fetch(`${API_BASE}/health`)
        if (res.ok) {
          console.log('Connected to Backend API, loading server-side data...')
          setBackendAvailable(true)
          
          // Load complaints
          const complaintsRes = await fetch(`${API_BASE}/complaints`)
          if (complaintsRes.ok) {
            const data = await complaintsRes.json()
            if (data.length > 0) setComplaints(data)
          }

          // Load challenges
          const challengesRes = await fetch(`${API_BASE}/challenges`)
          if (challengesRes.ok) {
            const data = await challengesRes.json()
            if (data.length > 0) setChallenges(data)
          }

          // Load milestones
          const milestonesRes = await fetch(`${API_BASE}/milestones`)
          if (milestonesRes.ok) {
            const data = await milestonesRes.json()
            if (data.length > 0) setMilestones(data)
          }
        }
      } catch (err) {
        console.warn('Backend API not responding. Running client-side standalone mode.')
        setBackendAvailable(false)
      }
    }
    checkBackendAndLoad()
  }, [])

  // Action: Add new complaint
  const addComplaint = async (newComplaint) => {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/complaints`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newComplaint)
        })
        if (res.ok) {
          const saved = await res.json()
          setComplaints(prev => [saved, ...prev])
          return
        }
      } catch (err) {
        console.error('Failed to post complaint to backend, saving locally.', err)
      }
    }
    
    // Fallback/Local Save
    const mockSaved = {
      ticketId: `CIV-2024-${Math.floor(100 + Math.random() * 900)}`,
      title: newComplaint.title,
      district: newComplaint.district,
      description: newComplaint.description,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      mediaUrls: newComplaint.mediaUrls || []
    }
    setComplaints(prev => [mockSaved, ...prev])
  }

  // Action: Accept Challenge
  const acceptChallenge = async (id) => {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/challenges/${id}/accept`, {
          method: 'PUT'
        })
        if (res.ok) {
          const updated = await res.json()
          setChallenges(prev => prev.map(c => (c.id === id || c._id === id) ? updated : c))
          return
        }
      } catch (err) {
        console.error('Failed to accept challenge on backend, saving locally.', err)
      }
    }

    // Fallback/Local Update
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, isAccepted: true } : c))
  }

  // Action: Add Milestone
  const addMilestone = async (newMs) => {
    if (backendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/milestones`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMs)
        })
        if (res.ok) {
          const saved = await res.json()
          setMilestones(prev => [...prev, saved])
          return
        }
      } catch (err) {
        console.error('Failed to save milestone to backend, saving locally.', err)
      }
    }

    // Fallback/Local Save
    setMilestones(prev => [...prev, newMs])
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans">
      {/* TopNavBar */}
      <header className="bg-on-secondary-fixed shadow-md w-full sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-[1280px] mx-auto bg-on-secondary-fixed">
          {/* Brand */}
          <div 
            onClick={() => setView('my-complaints')} 
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="font-headline-md text-headline-md font-bold text-inverse-on-surface text-2xl">
              Samadhan Setu
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex gap-gutter items-center">
            <button
              onClick={() => setView('submit-issue')}
              className={`text-sm hover:text-primary-fixed transition-colors duration-200 ${
                view === 'submit-issue'
                  ? 'text-primary font-label-bold border-b-2 border-primary pb-1'
                  : 'text-inverse-on-surface font-body-md'
              }`}
            >
              Report Civic Issue
            </button>
            <button
              onClick={() => setView('my-complaints')}
              className={`text-sm hover:text-primary-fixed transition-colors duration-200 ${
                view === 'my-complaints'
                  ? 'text-primary font-label-bold border-b-2 border-primary pb-1'
                  : 'text-inverse-on-surface font-body-md'
              }`}
            >
              My Complaints
            </button>
            <button
              onClick={() => setView('challenges')}
              className={`text-sm hover:text-primary-fixed transition-colors duration-200 ${
                view === 'challenges'
                  ? 'text-primary font-label-bold border-b-2 border-primary pb-1'
                  : 'text-inverse-on-surface font-body-md'
              }`}
            >
              University Challenges
            </button>
            <button
              onClick={() => setView('workspace')}
              className={`text-sm hover:text-primary-fixed transition-colors duration-200 ${
                view === 'workspace'
                  ? 'text-primary font-label-bold border-b-2 border-primary pb-1'
                  : 'text-inverse-on-surface font-body-md'
              }`}
            >
              Project Workspace
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('submit-issue')}
              className="hidden md:block bg-[#FF4D00] hover:bg-[#d43f00] text-white font-label-bold text-label-bold px-6 py-2.5 rounded font-bold scale-95 active:opacity-80 transition-all shadow-md"
            >
              Report an Issue
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-inverse-on-surface"
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-on-secondary-fixed border-t border-on-secondary-fixed-variant p-4 flex flex-col gap-3">
            <button
              onClick={() => { setView('submit-issue'); setMobileMenuOpen(false) }}
              className="text-left py-2 px-3 rounded hover:bg-on-secondary-fixed-variant text-inverse-on-surface"
            >
              Report Civic Issue
            </button>
            <button
              onClick={() => { setView('my-complaints'); setMobileMenuOpen(false) }}
              className="text-left py-2 px-3 rounded hover:bg-on-secondary-fixed-variant text-inverse-on-surface"
            >
              My Complaints
            </button>
            <button
              onClick={() => { setView('challenges'); setMobileMenuOpen(false) }}
              className="text-left py-2 px-3 rounded hover:bg-on-secondary-fixed-variant text-inverse-on-surface"
            >
              University Challenges
            </button>
            <button
              onClick={() => { setView('workspace'); setMobileMenuOpen(false) }}
              className="text-left py-2 px-3 rounded hover:bg-on-secondary-fixed-variant text-inverse-on-surface"
            >
              Project Workspace
            </button>
            <button
              onClick={() => { setView('submit-issue'); setMobileMenuOpen(false) }}
              className="bg-[#FF4D00] text-white py-2 px-3 rounded font-bold text-center mt-2"
            >
              Report an Issue
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {view === 'my-complaints' && (
          <MyComplaints complaints={complaints} setView={setView} />
        )}
        {view === 'challenges' && (
          <Challenges challenges={challenges} acceptChallenge={acceptChallenge} setView={setView} />
        )}
        {view === 'submit-issue' && (
          <SubmitIssue addComplaint={addComplaint} setView={setView} />
        )}
        {view === 'workspace' && (
          <Workspace milestones={milestones} addMilestone={addMilestone} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-on-secondary-fixed dark:bg-on-secondary-fixed border-t border-on-secondary-fixed-variant full-width mt-auto text-inverse-on-surface">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg w-full max-w-[1280px] mx-auto">
          <div className="col-span-1 md:col-span-4 mb-4 md:mb-8 border-b border-on-secondary-fixed-variant pb-4">
            <span className="font-headline-md text-headline-md font-bold text-inverse-on-surface text-xl">
              Samadhan Setu
            </span>
            <p className="text-xs text-[#d6e3ff] mt-1 font-medium">
              {backendAvailable ? '🟢 Connected to Backend Server' : '🟡 Offline Mode (Mock Data enabled)'}
            </p>
          </div>
          
          <div className="col-span-1 flex flex-col gap-2">
            <button onClick={() => setView('my-complaints')} className="text-left text-inverse-on-surface font-body-md hover:text-primary transition-colors opacity-90 hover:opacity-100 mb-1">
              About Portal
            </button>
            <button onClick={() => setView('challenges')} className="text-left text-inverse-on-surface font-body-md hover:text-primary transition-colors opacity-90 hover:opacity-100 mb-1">
              University Partners
            </button>
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <button onClick={() => setView('submit-issue')} className="text-left text-inverse-on-surface font-body-md hover:text-primary transition-colors opacity-90 hover:opacity-100 mb-1">
              Report Civic Issue
            </button>
            <button onClick={() => setView('workspace')} className="text-left text-inverse-on-surface font-body-md hover:text-primary transition-colors opacity-90 hover:opacity-100 mb-1">
              Active Workspaces
            </button>
          </div>

          <div className="col-span-1 md:col-span-2 flex items-end justify-end mt-8 md:mt-0 text-right">
            <p className="font-body-md text-body-md text-inverse-on-surface opacity-70 text-sm">
              © 2024 Societal Innovation Collaboration Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
