import React from "react"

interface LayoutProperties {
  children: React.ReactNode
}

export default function Layout({ children }: Readonly<LayoutProperties>) {
  return <div>{children}</div>
}
