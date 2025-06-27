import React, { useState, useEffect } from "react"
import Layout from "../src/components/layout"
import Section from "../src/components/section"
import Scrollable from "../src/components/scrollable"
import Portfolio from "../src/components/portfolio"
import Link from "next/link"
import Image from "next/image"
import ClientOnlyIcon from "../src/components/ClientOnlyIcon"
import {
  StyledHeader,
  StyledLogo,
  StyledNav,
  StyledMain,
  StyledWelcomeSection,
  StyledSectionContent,
  StyledContactSection,
  StyledIconBar,
  StyledIcon,
  StyledSection
} from "../src/components/StyledComponents"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Layout>
      <StyledHeader $scrolled={scrolled}>
        <StyledLogo
          src="/tmttn-logo2.svg"
          alt="tmttn logo"
          $scrolled={scrolled}
        />
        <StyledNav>
          <ul>
            <li>
              <Link href="/#welcome">Welcome</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/#contact">Contact</Link>
            </li>
            <li>
              <Link href="/#showcase">Showcase</Link>
            </li>
            <hr />
          </ul>
        </StyledNav>
      </StyledHeader>
      <StyledMain>
        <StyledWelcomeSection id="welcome" $variant="odd">
          <h1>Tom Metten</h1>
          <h2>Developer | Father | Tabletop and Online RPG enthousiast</h2>
        </StyledWelcomeSection>
        <StyledSection id="about" $variant="even">
          <h1>About me</h1>
          <StyledSectionContent>
            <div>
              <Image
                src="/square-profile-picture.jpg"
                alt="Tom Metten"
                height={260}
                width={260}
              />
            </div>
            <div>
              <p>
                Hi! I&apos;m Tom Metten, a {new Date().getFullYear() - 1987}{" "}
                year old developer from Belgium. During the day, I work for{" "}
                <a href="https://www.acagroup.be">ACA Group</a>. After work
                I like spending quality time with my family, enjoying myself
                with some personal and open-source coding projects and
                bingewatching Netflix / Disney+ / Youtube (a lot).
              </p>
              <p>
                I also enjoy tabletop boardgames, roleplaying games and
                occasionally video games (I&apos;m a PC gamer, consoles are awesome
                too). Food is as much the bane of my existance as it is my
                passion. I love cooking, but I enjoy eating even more. As you
                can imagine, the struggle against the scale is real.
              </p>
            </div>
          </StyledSectionContent>
        </StyledSection>
        <StyledContactSection id="contact" $variant="odd">
          <h1>Contact</h1>
          <h2>Get in touch with me:</h2>
          <StyledIconBar>
            <StyledIcon href="https://github.com/tmttn">
              <ClientOnlyIcon icon={["fab", "github-square"]} fallback="GitHub" />
            </StyledIcon>

            <StyledIcon href="https://www.linkedin.com/in/tmetten/">
              <ClientOnlyIcon icon={["fab", "linkedin"]} fallback="LinkedIn" />
            </StyledIcon>

            <StyledIcon href="https://github.com/less-is-code">
              <ClientOnlyIcon icon={["fab", "github-square"]} fallback="GitHub" />
            </StyledIcon>

            <StyledIcon href="mailto:contact@tmttn.be">
              <ClientOnlyIcon icon="at" fallback="Email" />
            </StyledIcon>

            <StyledIcon href="https://www.twitch.tv/bizarius">
              <ClientOnlyIcon icon={["fab", "twitch"]} fallback="Twitch" />
            </StyledIcon>

            <StyledIcon href="https://discord.gg/G5E8XWR">
              <ClientOnlyIcon icon={["fab", "discord"]} fallback="Discord" />
            </StyledIcon>

            <StyledIcon href="https://www.facebook.com/mettentom">
              <ClientOnlyIcon icon={["fab", "facebook-square"]} fallback="Facebook" />
            </StyledIcon>
          </StyledIconBar>
        </StyledContactSection>
        <StyledSection id="showcase" $variant="even">
          <h1>Showcase</h1>
          <Portfolio variant="even" />
        </StyledSection>
      </StyledMain>
      <Scrollable />
    </Layout>
  )
}