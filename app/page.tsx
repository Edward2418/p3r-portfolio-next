'use client'

import { useState } from 'react'
import Background from '@/components/Background'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  const [activeSection, setActiveSection] = useState('about')

  return (
    <>
      <Background />
      <div className="app-layout">
        <Sidebar
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
        <main className="content-area">
          <div style={{ padding: '2rem', color: 'var(--cyan)' }}>
            Sección activa: <strong>{activeSection}</strong>
          </div>
        </main>
      </div>
    </>
  )
}