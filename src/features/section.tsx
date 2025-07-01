import React from "react"

interface SectionProperties {
  id?: string
}

export default function Section({ id, children }: React.PropsWithChildren<Readonly<SectionProperties>>) {
  return <section id={id}>{children}</section>
}
