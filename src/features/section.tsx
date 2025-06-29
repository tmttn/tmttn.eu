import React from "react"

interface SectionProperties {
  id?: string
  children: React.ReactNode
}

export default function Section(properties: Readonly<SectionProperties>) {
  return <section id={properties.id}>{properties.children}</section>
}
