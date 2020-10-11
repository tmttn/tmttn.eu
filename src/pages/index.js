import React from "react"
import Layout from "../components/layout"
import Section from "../components/section"

export default function Home() {
  return (
    <Layout>
      <header>
        <img
          src="../../tmttn-logo-black-on-transparent.svg"
          alt="tmttn logo"
          className="logo"
        ></img>
        <nav>
          <a href="#welcome">Welcome</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#showcase">Showcase</a>
        </nav>
      </header>
      <Section id="welcome">
        <main>
          <h1>Thomas Metten</h1>
          <h2>
            Developer | Father | Tabletop and Online RPG enthousiast
            <span className="emoji" role="img" aria-label="roleplaying wizard">
              🧙‍♂️
            </span>
          </h2>
        </main>
      </Section>
      <Section id="about">About</Section>
      <Section id="contact">Contact</Section>
      <Section id="showcase">Showcase</Section>
    </Layout>
  )
}
