import React from "react"
import { Layout } from '@features'
import Link from "next/link"

export default function Custom404() {
  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/">Go back to homepage</Link>
      </div>
    </Layout>
  )
}