import React, { useState } from 'react'

function Workspace({ milestones, addMilestone }) {
  const [partner, setPartner] = useState('')
  const [inviteStatus, setInviteStatus] = useState(null)
  
  // inline new milestone form states
  const [showMilestoneForm, setShowMilestoneForm] = useState(false)
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('')
  const [newMilestoneDue, setNewMilestoneDue] = useState('')

  const handleInvite = (e) => {
    e.preventDefault()
    if (!partner || partner.includes('Select')) {
      alert('Please select a verified partner first.')
      return
    }
    setInviteStatus(`Invitation sent to ${partner}! Awaiting response...`)
    setTimeout(() => {
      setInviteStatus(null)
    }, 4000)
  }

  const handleCreateMilestone = async (e) => {
    e.preventDefault()
    if (!newMilestoneTitle) return

    const msData = {
      title: newMilestoneTitle,
      status: 'Pending',
      dueDate: newMilestoneDue || 'TBD'
    }

    try {
      await addMilestone(msData)
      setNewMilestoneTitle('')
      setNewMilestoneDue('')
      setShowMilestoneForm(false)
    } catch (error) {
      alert('Failed to add milestone: ' + error.message)
    }
  }

  return (
    <div className="flex-grow w-full max-w-[1280px] mx-auto px-margin-desktop py-stack-lg flex flex-col gap-stack-lg animate-fadeIn">
      {/* Invite Toast */}
      {inviteStatus && (
        <div className="fixed top-4 right-4 bg-secondary-container border-l-4 border-on-secondary-container text-on-secondary-container p-4 rounded shadow-lg z-50 animate-bounce flex items-center gap-2">
          <span className="material-symbols-outlined icon-fill">send</span>
          <span className="font-semibold text-sm">{inviteStatus}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-surface-variant pb-stack-md gap-4">
        <div>
          <span className="text-primary font-label-bold uppercase tracking-wider mb-2 block font-semibold">Management View</span>
          <h1 className="font-headline-xl text-headline-xl text-on-secondary-fixed font-bold">
            Project Workspace: Smart Traffic Management
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => alert('Smart Traffic Routing System - V1 Analysis Report:\n- Historic Transit Blackspots integrated.\n- Simulated Peak Route efficiency improved by 23.4%.\n- Next Milestone: City Integration.')}
            className="px-6 py-3 border border-on-secondary-fixed text-on-secondary-fixed font-label-bold rounded hover:bg-surface-container-low transition-colors font-semibold"
          >
            View Report
          </button>
          <button
            onClick={() => alert('Project configurations are locked for graduate review.')}
            className="px-6 py-3 bg-primary text-on-primary font-label-bold rounded hover:bg-primary-container transition-colors font-semibold"
          >
            Edit Details
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Milestones (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-lg border border-surface-variant custom-shadow p-stack-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div className="flex justify-between items-center mb-stack-md">
              <h2 className="font-headline-md text-headline-md text-on-secondary-fixed font-semibold">Milestone Tracker</h2>
              <span className="material-symbols-outlined text-primary bg-primary-fixed rounded-full p-1 border border-primary">flag</span>
            </div>

            {/* Timeline */}
            <div className="relative pl-4 border-l-2 border-surface-variant flex flex-col gap-6 mt-4">
              {milestones.map((ms, idx) => (
                <div key={ms._id || idx} className="relative">
                  {ms.status === 'Completed' ? (
                    <>
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
                      <h3 className="font-label-bold text-on-secondary-fixed font-semibold">{ms.title}</h3>
                      <p className="font-body-md text-tertiary-container mt-1 text-xs">Completed: {ms.completedDate || 'Nov 2024'}</p>
                    </>
                  ) : ms.status === 'In Progress' ? (
                    <>
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 border-primary bg-surface-container-lowest ring-4 ring-surface-container-lowest"></div>
                      <h3 className="font-label-bold text-on-secondary-fixed font-semibold">{ms.title}</h3>
                      <p className="font-body-md text-primary mt-1 text-xs">In Progress - Due {ms.dueDate || 'Dec 01'}</p>
                    </>
                  ) : (
                    <>
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-surface-variant ring-4 ring-surface-container-lowest"></div>
                      <h3 className="font-label-bold text-on-surface-variant opacity-75 font-semibold">{ms.title}</h3>
                      <p className="font-body-md text-tertiary mt-1 text-xs">Pending - Due {ms.dueDate || 'TBD'}</p>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Add milestone toggle */}
            {showMilestoneForm ? (
              <form onSubmit={handleCreateMilestone} className="mt-6 p-3 bg-surface-container rounded-lg space-y-3 animate-fadeIn">
                <input
                  required
                  type="text"
                  placeholder="Milestone Title"
                  value={newMilestoneTitle}
                  onChange={(e) => setNewMilestoneTitle(e.target.value)}
                  className="w-full text-xs p-2 border border-surface-variant rounded bg-white text-on-surface focus:outline-primary"
                />
                <input
                  type="text"
                  placeholder="Due Date (e.g. Dec 25, Q2 2025)"
                  value={newMilestoneDue}
                  onChange={(e) => setNewMilestoneDue(e.target.value)}
                  className="w-full text-xs p-2 border border-surface-variant rounded bg-white text-on-surface focus:outline-primary"
                />
                <div className="flex gap-2 justify-end text-xs">
                  <button
                    type="button"
                    onClick={() => setShowMilestoneForm(false)}
                    className="px-2 py-1 bg-surface-container-lowest rounded text-on-surface-variant border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-primary text-on-primary rounded font-semibold"
                  >
                    Add
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowMilestoneForm(true)}
                className="w-full mt-stack-lg py-3 border border-on-secondary-fixed text-on-secondary-fixed font-label-bold rounded hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">add</span> Add New Milestone
              </button>
            )}
          </div>
        </div>

        {/* Middle Column: Team (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-lg border border-surface-variant custom-shadow p-stack-md">
            <h2 className="font-headline-md text-headline-md text-on-secondary-fixed mb-stack-md font-semibold">Team Module</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-3 rounded hover:bg-surface-container-low transition-colors">
                <img
                  className="w-12 h-12 rounded-full object-cover border border-surface-variant"
                  alt="Dr. Elena Rostova"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs4MdC5y2NUZGIhh08Xz8RamOioXO0_qZCH8of3ZEPhY6jAnqNW5nB-FBIikr2LDkFna4bnu8Bh7-gyUHHVXRfHrYn5Cs9EGCayJxsAr9IGy7UqRhhkPn0nieop8XfXZblOsm6PDYpvWLJndU9mBTYu3SqX4low_E4k5tocKKX1mnWeLpyKu7gubyowoLgiZpLPibOZmjFkEFpdOiJ-NKT1fTQcNVUt1FFJBNpX7iF9F5kAFE2pr_hvw"
                />
                <div>
                  <h4 className="font-label-bold text-on-secondary-fixed font-semibold">Dr. Elena Rostova</h4>
                  <p className="font-label-sm text-tertiary-container text-xs">Faculty Lead / PI</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded hover:bg-surface-container-low transition-colors">
                <img
                  className="w-12 h-12 rounded-full object-cover border border-surface-variant"
                  alt="Marcus Chen"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3oY6Go0zyQXvGeuk8BihJ30ueDo_VSufd6w22TTngqLv9zDP-VpHUV5CioSoOiOohhmZRASXwd2EVoxuQ_3IoBNyXPqKpPTWEXXTqXEqVr13vMoftLkuyJ2i31T9dCgOVSCun-ZocSCUlYcmbC5S8OAv6JyH33wk2LPsBBsAwpi_HmmjvKwXweLzKIzRQClSfXHjUk0Cwl11xSMm4emUIKHs6lo9Bd31xUx4tdwyzapovarQsxnQy_w"
                />
                <div>
                  <h4 className="font-label-bold text-on-secondary-fixed font-semibold">Marcus Chen</h4>
                  <p className="font-label-sm text-tertiary-container text-xs">Graduate Student / Data Analyst</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded hover:bg-surface-container-low transition-colors">
                <img
                  className="w-12 h-12 rounded-full object-cover border border-surface-variant"
                  alt="Sarah Jenkins"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfe0Gbc9w04R5VR24iJs7yvdd7JYVBhaE2fpecXbTe0NihVIapbqZmk_LCepwrqN4sH52N0rvL6Jv2FFgDYdj6j1YLxDWLUHaEK8pFMInG6tApXeT7wAMJieB1ALJZIfXS3WcL6rjgHTFfb-RV7qHr0PJk_MybNUhcgfVD3vBCwdmZPoWRgvafNAO4ZjMV0FVYrfsuXOsCux_Gcbd9IDc8jS7E5CnkwQtzw9LwxIgp1bCbIu9E57Np4Q"
                />
                <div>
                  <h4 className="font-label-bold text-on-secondary-fixed font-semibold">Sarah Jenkins</h4>
                  <p className="font-label-sm text-tertiary-container text-xs">Undergrad Student / Field Researcher</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded hover:bg-surface-container-low transition-colors">
                <img
                  className="w-12 h-12 rounded-full object-cover border border-surface-variant"
                  alt="David Okafor"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeL09r8h-c0UqYcmlHXULYOs3SGnsfzGRZS8hn2BgyAwDI-LTHnUu7sC3M1k6-CuytBz9rSqfKfUwtgqqqluAeBNe2R79vlYor8mZkbhqGIwGBSglujNEPFADfpmnTVhd9N2n96T33VuUQeHAUYN4U6U3OG2fDrxS7RC_lASZF_K7fzImmcBozyoMiuNz6jsxyFUTP_lFhEcpCkRfneN-3khqKvKUm1OLr3rkJHi4Vk5EGawQ4FBOHXA"
                />
                <div>
                  <h4 className="font-label-bold text-on-secondary-fixed font-semibold">David Okafor</h4>
                  <p className="font-label-sm text-tertiary-container text-xs">Graduate Student / Systems Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Industry Partner (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-lg border border-surface-variant custom-shadow p-stack-md h-full flex flex-col justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-secondary-fixed mb-2 font-semibold">Collaborate with Industry</h2>
              <p className="font-body-md text-tertiary-container mb-stack-md text-sm">Connect this project with verified civic tech partners.</p>
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <div className="relative">
                <label className="font-label-bold text-on-secondary-fixed block mb-1 text-sm font-semibold">Partner Selection</label>
                <div className="relative">
                  <select
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-surface-variant text-on-background font-body-md rounded p-3 focus:ring-2 focus:ring-on-secondary-fixed focus:border-on-secondary-fixed outline-none appearance-none pr-10 text-sm"
                  >
                    <option>Select a verified partner...</option>
                    <option>MobilityTech Solutions</option>
                    <option>Civic Data Grid Corp</option>
                    <option>Metro Transit Authority</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-tertiary-container pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
              <button
                onClick={handleInvite}
                className="w-full py-3 bg-primary text-on-primary font-label-bold rounded hover:bg-primary-container transition-colors flex items-center justify-center gap-2 font-semibold text-sm shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">send</span> Invite Partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workspace
