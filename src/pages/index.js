import React from "react"
import Layout from "../components/layout"
import Section from "../components/section"
import Scrollable from "../components/scrollable"
import { Link } from "gatsby"

export default function Home() {
  return (
    <Layout>
      <header>
        <img
          src="../../tmttn-logo2.svg"
          alt="tmttn logo"
          className="logo"
        ></img>
        <nav>
          <ul>
            <li>
              <Link to="/#welcome">Welcome</Link>
            </li>
            <li>
              <Link to="/#about">About</Link>
            </li>
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
            <li>
              <Link to="/#showcase">Showcase</Link>
            </li>
            <hr />
          </ul>
        </nav>
      </header>
      <main>
        <Section id="welcome">
          <h1>Thomas Metten</h1>
          <h2>Developer | Father | Tabletop and Online RPG enthousiast</h2>
          {/* <span className="emoji" role="img" aria-label="roleplaying wizard">
            👨🏻‍💻
          </span> */}
        </Section>
        <Section id="about">
          <h1>About me</h1>
        </Section>
        <Section id="contact">
          <h1>Contact</h1>
        </Section>
        <Section id="showcase">
          <h1>Showcase</h1>
        </Section>
      </main>
      <Scrollable />
    </Layout>
  )
}
