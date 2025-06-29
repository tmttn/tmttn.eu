import React from 'react'
import dynamic from 'next/dynamic'
import ClientOnlyIcon from '../../components/ClientOnlyIcon'

const Portfolio = dynamic(() => import('./portfolio'), {
  loading: () => (
    <div className="portfolio-loading" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '2rem',
      gap: '1rem'
    }}>
      <ClientOnlyIcon icon="spinner" spin fallback="⟳" />
      <p>Loading portfolio...</p>
    </div>
  ),
  ssr: false
})

export default Portfolio