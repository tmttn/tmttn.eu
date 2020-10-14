import React from "react"
import _ from "lodash"
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons"

let mainNavLinks: NodeListOf<HTMLAnchorElement>

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
