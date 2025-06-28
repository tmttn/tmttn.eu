# Security Policy

## Overview

This repository contains a Next.js personal portfolio website. Security is a top priority, and we actively monitor and address vulnerabilities in dependencies and codebase.

## Supported Versions

This project follows a rolling release model with continuous deployment. Security updates are applied to:

| Version | Supported          | Notes                    |
| ------- | ------------------ | ------------------------ |
| Latest  | :white_check_mark: | Main branch (production) |
| < Latest| :x:                | Only latest is supported |

## Security Measures

### Automated Security Monitoring
- **Dependabot**: Enabled for automatic dependency vulnerability detection
- **npm audit**: Regular automated scans for package vulnerabilities  
- **GitHub Security Advisories**: Monitored for ecosystem-wide issues
- **ESLint Security Rules**: Enforced code quality and security practices

### Dependency Management
- **npm overrides**: Used to enforce secure versions of transitive dependencies
- **Regular updates**: Dependencies updated weekly or upon security alerts
- **Zero tolerance**: No known vulnerabilities allowed in production
- **Compatible versions**: Balance between security and stability

### Build & Deployment Security
- **Static Site Generation**: No server-side vulnerabilities in production
- **Content Security Policy**: Implemented for XSS protection
- **Secure Headers**: Added via Netlify configuration
- **HTTPS Only**: All traffic encrypted in transit

## Vulnerability Response Process

### Severity Levels

| Level | Response Time | Action Required |
|-------|--------------|----------------|
| **Critical** | Immediate (< 1 hour) | Hotfix deployment |
| **High** | Same day (< 24 hours) | Priority fix |
| **Medium** | Within 3 days | Scheduled fix |
| **Low** | Within 1 week | Regular maintenance |

### Response Workflow
1. **Detection**: Automated alerts via Dependabot/npm audit
2. **Assessment**: Evaluate impact and exploitability 
3. **Fix**: Update dependencies or apply patches
4. **Testing**: Verify fix doesn't break functionality
5. **Deployment**: Deploy secure version immediately
6. **Documentation**: Update security logs and dependencies

## Reporting a Vulnerability

### For Security Researchers
If you discover a security vulnerability, please report it responsibly:

**Email**: [Insert contact email]  
**Subject**: "Security Vulnerability - tmttn.eu"

### What to Include
- **Description**: Clear explanation of the vulnerability
- **Impact**: Potential security impact and affected components
- **Steps to Reproduce**: Detailed reproduction steps
- **Proof of Concept**: Code or screenshots (if applicable)
- **Suggested Fix**: Recommended remediation (optional)

### Response Timeline
- **Acknowledgment**: Within 24 hours
- **Initial Assessment**: Within 48 hours  
- **Regular Updates**: Every 5 business days
- **Resolution**: Based on severity level above

### Responsible Disclosure
- **Coordination**: Work together on fix timeline
- **Attribution**: Public credit after fix (if desired)
- **No Public Disclosure**: Until fix is deployed
- **Good Faith**: No malicious testing on live systems

## Security Contact

For security-related questions or concerns:
- **GitHub Issues**: For non-sensitive security discussions
- **Email**: [Insert security contact] for private vulnerability reports
- **Response Time**: Within 24-48 hours

## Security Best Practices

### For Contributors
- **Dependency Updates**: Always check for security implications
- **Code Review**: Security-focused review for all changes
- **Secrets Management**: Never commit API keys or credentials
- **Input Validation**: Sanitize all user inputs (if applicable)
- **HTTPS**: All external requests must use secure protocols

### For Users
- **Browser Security**: Keep browsers updated for latest security patches
- **Privacy**: Website uses minimal tracking and respects user privacy
- **Safe Browsing**: Report suspicious behavior or content

## Security Features

### Implemented Protections
- ✅ **Dependency Scanning**: Automated vulnerability detection
- ✅ **Content Security Policy**: XSS and injection protection
- ✅ **Secure Headers**: HSTS, X-Frame-Options, etc.
- ✅ **Static Generation**: No server-side attack vectors
- ✅ **Input Sanitization**: All user inputs properly handled
- ✅ **Secure Deployment**: HTTPS-only with secure hosting

### Monitoring & Alerting
- ✅ **GitHub Dependabot**: Automatic dependency alerts
- ✅ **npm audit**: Regular package vulnerability scans
- ✅ **Build Security**: Security checks in CI/CD pipeline
- ✅ **Runtime Monitoring**: Error tracking and anomaly detection

## Security Changelog

### Recent Security Updates
- **2025-06**: Resolved 7 dependency vulnerabilities (tar-fs, base-x, brace-expansion)
- **2025-06**: Added ESLint security rules (eslint-plugin-unicorn)
- **2025-06**: Implemented npm overrides for transitive dependency security
- **2025-06**: Updated all dependencies to latest secure versions

---

*Last Updated: June 2025*  
*Security Policy Version: 1.0*