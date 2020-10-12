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
          <div className="sectionContent">
            <div>
              <img
                src="../../square-profile-picture.jpg"
                alt="Thomas Metten"
                heigth="260"
                width="260"
              ></img>
            </div>
            <div>
              <p>
                Hi! I'm Thomas (Tom) Metten, a {new Date().getFullYear() - 1987}{" "}
                year old developer from Belgium. During the day, I work for{" "}
                <a href="https://www.aca-it.be">ACA IT-Solutions</a>. After work
                I spend quality time with my family, enjoy myself with some
                personal and open-source coding projects and I bingewatching
                Netflix / Disney+ / Youtube (a lot).
              </p>
              <p>
                I also really enjoy tabletop boardgames, roleplaying games and
                occasionally video games (I'm a PC gamer, but I do not shun the
                consoles). Food is equally the bane of my existance as it is my
                passion. I love cooking, but I enjoy eating even more. As you
                can imagine the struggle against the scale is real.
              </p>
            </div>
          </div>
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
