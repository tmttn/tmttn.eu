import React from "react"
import { Link } from "gatsby"

import "../styles/main.scss"

export default function Blog() {
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
        <h1>Blog</h1>
      </main>
    </layout>
  )
}
