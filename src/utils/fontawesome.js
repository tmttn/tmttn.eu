import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faAt, faStar, faCodeBranch, faSpinner, faExternalLinkAlt, faSun, faMoon, faEnvelope, faGlobe, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import { faGithubSquare, faLinkedin, faTwitterSquare, faTwitch, faDiscord, faFacebookSquare, faGithub} from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false

// Prevent FontAwesome from dynamically adding its CSS since we're importing it above
config.keepOriginalSource = false

// Ensure consistent server/client rendering
config.showMissingIcons = false

library.add(faAt, faStar, faCodeBranch, faSpinner, faExternalLinkAlt, faSun, faMoon, faEnvelope, faGlobe, faMapMarkerAlt, faGithubSquare, faLinkedin, faTwitterSquare, faTwitch, faDiscord, faFacebookSquare, faGithub)