import React from "react"

interface LayoutProperties {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProperties) {
  return <div>{children}</div>
}
