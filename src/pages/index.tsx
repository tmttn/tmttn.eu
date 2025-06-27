import React from "react"
import Layout from "../components/layout"
import Section from "../components/section"
import Scrollable from "../components/scrollable"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../utils/fontawesome"

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
          <h1>Tom Metten</h1>
          <h2>Developer | Father | Tabletop and Online RPG enthousiast</h2>
        </Section>
        <Section id="about">
          <h1>About me</h1>
          <div className="sectionContent">
            <div>
              <img
                src="../../square-profile-picture.jpg"
                alt="Tom Metten"
                height="260"
                width="260"
              ></img>
            </div>
            <div>
              <p>
                Hi! I'm Tom Metten, a {new Date().getFullYear() - 1987}{" "}
                year old developer from Belgium. During the day, I work for{" "}
                <a href="https://www.acagroup.be">ACA Group</a>. After work
                I like spending quality time with my family, enjoying myself
                with some personal and open-source coding projects and
                bingewatching Netflix / Disney+ / Youtube (a lot).
              </p>
              <p>
                I also enjoy tabletop boardgames, roleplaying games and
                occasionally video games (I'm a PC gamer, consoles are awesome
                too). Food is as much the bane of my existance as it is my
                passion. I love cooking, but I enjoy eating even more. As you
                can imagine, the struggle against the scale is real.
              </p>
            </div>
          </div>
        </Section>
        <Section id="contact">
          <h1>Contact</h1>
          <h2>Get in touch with me:</h2>
          <div className="iconBar">
            <a className="icons" href="https://github.com/tmttn">
              <FontAwesomeIcon icon={["fab", "github-square"]} />
            </a>

            <a className="icons" href="https://www.linkedin.com/in/tmetten/">
              <FontAwesomeIcon icon={["fab", "linkedin"]} />
            </a>

            <a className="icons" href="https://github.com/less-is-code">
              <FontAwesomeIcon icon={["fab", "github-square"]} />
            </a>

            <a className="icons" href="mailto:contact@tmttn.be">
              <FontAwesomeIcon icon="at" />
            </a>

            <a className="icons" href="https://www.twitch.tv/bizarius">
              <FontAwesomeIcon icon={["fab", "twitch"]} />
            </a>

            <a className="icons" href="https://discord.gg/G5E8XWR">
              <FontAwesomeIcon icon={["fab", "discord"]} />
            </a>

            <a className="icons" href="https://www.facebook.com/mettentom">
              <FontAwesomeIcon icon={["fab", "facebook-square"]} />
            </a>
          </div>
        </Section>
        <Section id="showcase">
          <h1>Showcase</h1>
        </Section>
      </main>
      <Scrollable />
    </Layout>
  )
}
