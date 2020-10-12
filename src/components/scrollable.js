import React from "react"
import _ from "lodash"

let mainNavLinks

export default class Scrollable extends React.Component {
  constructor(props) {
    super()

    this.updateActiveNavigation = this.updateActiveNavigation.bind(this)
    this.throttledUpdateActiveNavigation = _.throttle(
      this.updateActiveNavigation,
      100
    )
  }

  componentDidMount() {
    mainNavLinks = document.querySelectorAll("nav ul li a")
    window.addEventListener(
      "scroll",
      this.throttledUpdateActiveNavigation,
      false
    )
  }

  componentWillUnmount() {
    window.removeEventListener(
      "scroll",
      this.throttledUpdateActiveNavigation,
      false
    )
  }

  updateActiveNavigation() {
    let fromTop = window.scrollY

    mainNavLinks.forEach(link => {
      let section = document.querySelector(link.hash)

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

  render = () => {
    return ""
  }
}
