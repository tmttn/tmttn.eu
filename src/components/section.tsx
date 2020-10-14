import React from "react"

export default function Section(props: Readonly<any>) {
  return <section id={props.id}>{props.children}</section>
}
