import React from "react"

interface SectionProps {
  id?: string
  children: React.ReactNode
}

export default function Section(props: Readonly<SectionProps>) {
  return <section id={props.id}>{props.children}</section>
}
