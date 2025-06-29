import React from "react"

interface SectionProperties {
  id?: string
}

export default function Section({ id, children }: React.PropsWithChildren<SectionProperties>) {
  return <section id={id}>{children}</section>
}
