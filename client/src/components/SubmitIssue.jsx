import React, { useState } from 'react'

function SubmitIssue({ addComplaint, setView }) {
  const [title, setTitle] = useState('')
  const [district, setDistrict] = useState('')
  const [description, setDescription] = useState('')
  const [pinLocation, setPinLocation] = useState({ x: 50, y: 50, label: 'Center Square (Downtown)' })
  const [toastMessage, setToastMessage] = useState(null)

  // Pre-seeded uploaded images that can be removed
  const [media, setMedia] = useState([
    {
      id: 'img-1',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR1cdcHieYaSAwgARlNTRkvt5BarXEJh05z0bPDXGem-giU-vAaybM5kb8eytTVdcvbspeqi0w_vlQXMuGVvRE6uBuCoKHdzHTBLY8qunUffXYZtBTi4YZGD6hTU9-frGeL8Vtp71gOkb3xGPMpOpJSxFg3Pbf72UMxk7yykF7ww3hqX-QrwMpJS34oe_5v4KC3tL8b62CR3XlsaT6qOrFZzv0haeaqmI5e8OPMLXE9cPSgQapd-d7aA',
      desc: 'Pothole photo'
    },
    {
      id: 'img-2',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRx6FMHN_2VGmyuPzXm3Oby8d8zkdINFfgyqJmXXTy_dGD6JsOf8fAM5ytOrL4gc0EApGOqHi-JAgBpClnG1GO-zOFqsddNT-lqSIrxhJq8wHUXW-b9mPpXoTjYYXKkHPsKlDvozArV7U7tWnSdBGAapoii62WzjcdZ48nLPP-EjR4Z6rwsqQq0D-UwUi26XIygDomzrWrJAPVAfYHszfpYJszthVcC7D2L13bcHZBLYR4Sxh4K-LHCw',
      desc: 'Broken streetlight'
    }
  ])

  // Handle map click to update pin location and set district
  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    let label = 'Custom Pin Location'
    let autoDistrict = ''

    if (x < 50 && y < 50) {
      label = 'Northside Residential Zone'
      autoDistrict = 'd2'
    } else if (x >= 50 && y < 50) {
      label = 'East End Shopping Center'
      autoDistrict = 'd3'
    } else if (x < 50 && y >= 50) {
      label = 'West Valley Industrial Park'
      autoDistrict = 'd4'
    } else {
      label = 'Downtown Central Avenue'
      autoDistrict = 'd1'
    }

    setPinLocation({ x, y, label })
    if (autoDistrict) {
      setDistrict(autoDistrict)
    }
  }

  // Delete uploaded file
  const handleRemoveMedia = (id) => {
    setMedia(media.filter(item => item.id !== id))
  }

  // Simulate file upload
  const handleSimulateUpload = () => {
    const mockImages = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAR1cdcHieYaSAwgARlNTRkvt5BarXEJh05z0bPDXGem-giU-vAaybM5kb8eytTVdcvbspeqi0w_vlQXMuGVvRE6uBuCoKHdzHTBLY8qunUffXYZtBTi4YZGD6hTU9-frGeL8Vtp71gOkb3xGPMpOpJSxFg3Pbf72UMxk7yykF7ww3hqX-QrwMpJS34oe_5v4KC3tL8b62CR3XlsaT6qOrFZzv0haeaqmI5e8OPMLXE9cPSgQapd-d7aA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRx6FMHN_2VGmyuPzXm3Oby8d8zkdINFfgyqJmXXTy_dGD6JsOf8fAM5ytOrL4gc0EApGOqHi-JAgBpClnG1GO-zOFqsddNT-lqSIrxhJq8wHUXW-b9mPpXoTjYYXKkHPsKlDvozArV7U7tWnSdBGAapoii62WzjcdZ48nLPP-EjR4Z6rwsqQq0D-UwUi26XIygDomzrWrJAPVAfYHszfpYJszthVcC7D2L13bcHZBLYR4Sxh4K-LHCw'
    ]
    const randomUrl = mockImages[Math.floor(Math.random() * mockImages.length)]
    
    setMedia([
      ...media,
      {
        id: `img-${Date.now()}`,
        url: randomUrl,
        desc: 'New uploaded image'
      }
    ])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !district || !description) {
      alert('Please fill out all required fields.')
      return
    }

    const complaintData = {
      title,
      district,
      description: `${description}\n\n[Location Pinned: ${pinLocation.label}]`,
      mediaUrls: media.map(m => m.url)
    }

    try {
      await addComplaint(complaintData)
      setToastMessage('Issue submitted successfully! Redirecting you to your complaints feed...')
      
      setTimeout(() => {
        setToastMessage(null)
        setView('my-complaints')
      }, 2500)
    } catch (error) {
      alert('Error submitting issue: ' + error.message)
    }
  }

  return (
    <div className="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-[#e6f4ea] border-l-4 border-[#137333] text-[#137333] p-4 rounded shadow-lg z-50 animate-bounce flex items-center gap-2">
          <span className="material-symbols-outlined icon-fill">check_circle</span>
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-stack-lg border-b border-surface-variant pb-stack-md">
        <h1 className="font-headline-xl text-headline-xl text-on-secondary-fixed mb-stack-sm font-bold">
          Submit a New Civic Issue
        </h1>
        <p className="font-body-lg text-body-lg text-tertiary">
          Please provide detailed information to help us address the issue efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
        {/* Form Section */}
        <div className="lg:col-span-7 space-y-stack-md">
          <div className="bg-surface-container-lowest p-stack-lg rounded-xl custom-shadow border-t-4 border-t-primary border border-surface-variant">
            <form onSubmit={handleSubmit} className="space-y-stack-md">
              {/* Title */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-secondary-fixed mb-stack-sm font-semibold" htmlFor="title">
                  Issue Title <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-surface-variant rounded px-4 py-3 text-body-md focus:border-on-secondary-fixed focus:ring-1 focus:ring-on-secondary-fixed transition-colors"
                  id="title"
                  placeholder="Brief summary of the issue (e.g. Broken Sprinkler, Streetlight Out)"
                  type="text"
                />
              </div>

              {/* District */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-secondary-fixed mb-stack-sm font-semibold" htmlFor="district">
                  District / Ward <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-surface-variant rounded px-4 py-3 text-body-md focus:border-on-secondary-fixed focus:ring-1 focus:ring-on-secondary-fixed transition-colors"
                  id="district"
                >
                  <option value="" disabled>Select the affected district</option>
                  <option value="d1">District 1 - Downtown</option>
                  <option value="d2">District 2 - Northside</option>
                  <option value="d3">District 3 - East End</option>
                  <option value="d4">District 4 - West Valley</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-secondary-fixed mb-stack-sm font-semibold" htmlFor="description">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-surface-variant rounded px-4 py-3 text-body-md focus:border-on-secondary-fixed focus:ring-1 focus:ring-on-secondary-fixed transition-colors resize-y"
                  id="description"
                  placeholder="Describe the issue, including specific location details, duration, and any hazards..."
                  rows="5"
                ></textarea>
              </div>

              {/* Upload Zone */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-secondary-fixed mb-stack-sm font-semibold">
                  Supporting Media (Optional)
                </label>
                <div 
                  onClick={handleSimulateUpload}
                  className="border-2 border-dashed border-primary bg-primary-fixed-dim/20 rounded-xl p-6 text-center cursor-pointer hover:bg-primary-fixed-dim/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary text-4xl mb-2 block">cloud_upload</span>
                  <p className="font-label-bold text-label-bold text-on-secondary-fixed">Click here to attach a photo</p>
                  <p className="text-label-sm text-tertiary mt-1">Simulates local camera upload (Max 5MB)</p>
                </div>

                {/* Thumbnails */}
                {media.length > 0 && (
                  <div className="flex gap-stack-sm mt-stack-md overflow-x-auto pb-2">
                    {media.map((item) => (
                      <div key={item.id} className="relative w-24 h-24 rounded-lg overflow-hidden border border-surface-variant group flex-shrink-0">
                        <img src={item.url} alt={item.desc} className="w-full h-full object-cover" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveMedia(item.id)
                          }}
                          className="absolute top-1 right-1 bg-surface-container-lowest rounded-full p-1 shadow-sm opacity-90 hover:opacity-100 transition-opacity"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-error text-[16px] font-bold">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="pt-stack-md">
                <button
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-md text-headline-md shadow-md hover:bg-primary-container transition-colors active:scale-[0.98] font-bold"
                  type="submit"
                >
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="lg:col-span-5 h-[400px] lg:h-auto">
          <div className="bg-surface-container-lowest p-stack-sm rounded-xl custom-shadow border border-on-secondary-fixed h-full relative overflow-hidden flex flex-col">
            <div className="p-stack-sm flex justify-between items-center bg-surface-container-lowest z-10 border-b border-surface-variant p-3">
              <span className="font-label-bold text-label-bold text-on-secondary-fixed flex items-center gap-2 font-semibold">
                <span className="material-symbols-outlined text-primary icon-fill">my_location</span>
                Pinpoint Location
              </span>
              <span className="text-xs text-tertiary font-medium">Click map to move pin</span>
            </div>
            
            {/* Clickable Map area */}
            <div
              onClick={handleMapClick}
              className="flex-grow relative bg-surface-variant cursor-crosshair overflow-hidden"
              style={{ minHeight: '300px' }}
            >
              <img
                className="w-full h-full object-cover absolute inset-0 select-none"
                alt="Detailed city block vector map"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCANTI0SinGiHEW7n2qVhqWA1f3C8hoFHPhyVBzPR-qND0DkcIrWgLVnO8dhhIF5OZGcB6bN99Gyh4hcdZiRvO0m_nPY64rYZZCVBQWiY8GI7HPV29MRB6ps24psgsMV14TJXvVReot8VAE43wpMj32TliE-HqI9ClY3IRYthD8KF0sb4WAZ5vqQ5OLU4_gnB-1wBiiruofbpU771I7GNfwx6Wily-SzbgG-KdEW_hoWjRb8T7bbMe_gg"
              />
              
              {/* Map Pin */}
              <div
                className="absolute z-20 flex flex-col items-center transition-all duration-300 pointer-events-none"
                style={{ left: `${pinLocation.x}%`, top: `${pinLocation.y}%`, transform: 'translate(-50%, -100%)' }}
              >
                <div className="w-10 h-10 bg-surface-container-lowest rounded-full shadow-lg flex items-center justify-center border-2 border-primary animate-bounce">
                  <span className="material-symbols-outlined text-primary text-2xl icon-fill">location_on</span>
                </div>
                <div className="w-2 h-2 bg-on-secondary-fixed/30 rounded-full mt-1 blur-[2px]"></div>
              </div>
            </div>
            <div className="p-3 bg-surface-container text-xs text-on-secondary-fixed font-semibold">
              Currently Pinned: <span className="text-primary font-bold">{pinLocation.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitIssue
