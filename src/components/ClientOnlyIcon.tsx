import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface ClientOnlyIconProperties extends FontAwesomeIconProps {
  fallback?: React.ReactNode
}

export default function ClientOnlyIcon({ fallback = null, ...properties }: ClientOnlyIconProperties) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <FontAwesomeIcon {...properties} />
}