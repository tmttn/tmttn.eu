import React from "react"
import Container from "../components/container"
import Section from "../components/section"

import "../styles/main.scss"

export default function Home() {
  return (
    <Container>
      <Section>
        <main>
          <h1>404</h1>
          <h2>
            This page is like a lost treasure: not found
            <span class="emoji" role="img" aria-label="dead">
              🏴‍☠️
            </span>
          </h2>
        </main>
      </Section>
    </Container>
  )
}
