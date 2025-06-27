import { useState, useEffect } from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface ClientOnlyIconProps extends FontAwesomeIconProps {
  fallback?: React.ReactNode
}

export default function ClientOnlyIcon({ fallback = null, ...props }: ClientOnlyIconProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <FontAwesomeIcon {...props} />
}