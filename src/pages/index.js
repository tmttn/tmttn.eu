import React from "react"
import { Link } from "gatsby"

import "../styles/main.scss"

export default function Home() {
  return (
    <div>
      <section>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blog/">Blog</Link>
          <Link to="/about/">About</Link>
        </nav>
      </section>
      <main id="welcome">
        <h1>I'm Thomas Metten</h1>
        <h3>
          Developer | Father | Tabletop and Online RPG enthousiast
          <span role="img" aria-label="roleplaying wizard">
            🧙‍♂️
          </span>
        </h3>
        <h2>Welcome to my site!</h2>
      </main>
    </div>
  )
}
