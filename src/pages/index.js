import React from "react"
import Container from "../components/container"
import Section from "../components/section"

export default function Home() {
  return (
    <Container>
      <header>
        <img src="../../tmttn-logo-black-on-transparent.svg" alt="tmttn logo" class="logo"></img>
        <nav>
          <a href="welcome">Welcome</a>
          <a href="about">About</a>
          <a href="contact">Contact</a>
          <a href="showcase">Showcase</a>
        </nav>
      </header>
      <Section id="welcome">
        <main>
          <h1>Thomas Metten</h1>
          <h3>
            Developer | Father | Tabletop and Online RPG enthousiast
            <span class="emoji" role="img" aria-label="roleplaying wizard">
              🧙‍♂️
            </span>
          </h3>
        </main>
      </Section>
      <Section id="about">About</Section>
      <Section id="contact">Contact</Section>
      <Section id="showcase">Showcase</Section>
    </Container>
  )
}
