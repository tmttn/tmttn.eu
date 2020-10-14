import React from "react"
import _ from "lodash"
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons"

let mainNavLinks: NodeListOf<HTMLAnchorElement>
let header: HTMLElement

export default class Scrollable extends React.Component {
  private throttledUpdateActiveNavigation: _.DebouncedFunc<() => void>

  constructor(props: Readonly<{}>) {
    super(props)

    this.throttledUpdateActiveNavigation = _.throttle(
      this.updateActiveNavigation,
      100
    )
  }

  componentDidMount(): void {
    mainNavLinks = document.querySelectorAll("nav ul li a")
    header = document.querySelector("header")

    window.addEventListener(
      "scroll",
      this.throttledUpdateActiveNavigation,
      false
    )
  }

  componentWillUnmount(): void {
    window.removeEventListener(
      "scroll",
      this.throttledUpdateActiveNavigation,
      false
    )
  }

  updateActiveNavigation(): void {
    let fromTop = window.scrollY

    if (fromTop > 10) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    mainNavLinks.forEach(link => {
      let section: HTMLElement = document.querySelector(link.hash)

      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add("current")
      } else {
        link.classList.remove("current")
      }
    })
  }

  render = (): string => {
    return ""
  }
}
