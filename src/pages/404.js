import React from "react"
import { Link } from "gatsby"

import "../styles/main.scss"

export default function Home() {
  return (
    <layout>
      <section>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blog/">Blog</Link>
          <Link to="/about/">About</Link>
        </nav>
      </section>
      <main>
        <h1>
          404 - This page is like a lost treasure: not found
          <span role="img" aria-label="dead">
            🏴‍☠️
          </span>
        </h1>
      </main>
    </layout>
  )
}
