# Changelog

All notable changes to Thomas Metten's personal portfolio website are documented in this file.

## <small>0.3.3 (2025-07-04)</small>

### 📝 Documentation

* 📝 docs: sync version v0.3.2 and CHANGELOG.md [skip ci] ([||255b8ea](https://github.com/tmttn/tmttn.eu/commit/||255b8ea))

### 🔧 Maintenance

* 🔧 chore: globals to ^16.2.0 (#52) ([||9540287](https://github.com/tmttn/tmttn.eu/commit/||9540287))



## <small>0.3.2 (2025-07-04)</small>

### 📝 Documentation

* 📝 docs: sync version v0.3.1 and CHANGELOG.md [skip ci] ([||2453188](https://github.com/tmttn/tmttn.eu/commit/||2453188))

### 🔧 Maintenance

* 🔧 chore: @types/node to ^24.0.7 (#51) ([||56dcd27](https://github.com/tmttn/tmttn.eu/commit/||56dcd27))



## <small>0.3.1 (2025-07-04)</small>

### 🐛 Bug Fixes

* 🐛 fix: typescript-eslint monorepo to ^8.35.0 (#50) ([||fa1c3a7](https://github.com/tmttn/tmttn.eu/commit/||fa1c3a7))

### 📝 Documentation

* 📝 docs: sync version v0.3.0 and CHANGELOG.md [skip ci] ([||9128220](https://github.com/tmttn/tmttn.eu/commit/||9128220))

### 🔧 Maintenance

* chore: make renovate respect commitlint ([||f744940](https://github.com/tmttn/tmttn.eu/commit/||f744940))



## <small>0.3.0 (2025-07-01)</small>

### ✨ New Features

* ✨ feat: initialize VSCode settings file ([||d11eb08](https://github.com/tmttn/tmttn.eu/commit/||d11eb08))
* ✨ feat: add notifications for uncategorized file changes in deploy workflow ([||4944513](https://github.com/tmttn/tmttn.eu/commit/||4944513))

### 📝 Documentation

* 📝 docs: add relevant badges to README for project visibility ([||4934c30](https://github.com/tmttn/tmttn.eu/commit/||4934c30))
* 📝 docs: sync version v0.2.11 and CHANGELOG.md [skip ci] ([||7344e77](https://github.com/tmttn/tmttn.eu/commit/||7344e77))
* 📝 docs: simplify SECURITY.md for personal project scope ([||76198f4](https://github.com/tmttn/tmttn.eu/commit/||76198f4))

### 🔧 Maintenance

* 🔧 enhance: add SonarQube issue listing on analysis failure ([||941fed2](https://github.com/tmttn/tmttn.eu/commit/||941fed2))
* 🔧 fix: treat uncategorized changes as non-user-facing to prevent needless deploys ([||d63f052](https://github.com/tmttn/tmttn.eu/commit/||d63f052))
* 🔧 fix: improve release workflow to categorize changes and prevent failures ([||b71c3f9](https://github.com/tmttn/tmttn.eu/commit/||b71c3f9))

### 📦 Other Changes

* 🔒 fix: suppress SonarQube S2245 warnings for safe Math.random() usage ([||a4c4726](https://github.com/tmttn/tmttn.eu/commit/||a4c4726))



## <small>0.2.11 (2025-07-01)</small>

### Summary
Release with improvements and updates.

* ♻️ refactor: use React.Readonly<T> instead of individual readonly properties ([5f3fffa](https://github.com/tmttn/tmttn.eu/commit/5f3fffa1a8e589c54c0d1b9328e29159e5389c9c))
* 🔧 refactor: fix SonarQube code quality issues ([4a3a52b](https://github.com/tmttn/tmttn.eu/commit/4a3a52bb2ebac9d38b43cf13f193b50489222c8c))
* 📝 docs: sync version v0.2.10 and CHANGELOG.md [skip ci] ([4291926](https://github.com/tmttn/tmttn.eu/commit/4291926c53986cd669cb300d83ef4b6674bbc226))


## <small>0.2.10 (2025-07-01)</small>

### Summary
Release with improvements and updates.

* 🔧 feat: integrate SonarQube analysis into CI pipeline ([c3cc967](https://github.com/tmttn/tmttn.eu/commit/c3cc967f38dd82a14b880db929fcfdeb4b4ecf68))
* 📝 docs: sync version v0.2.9 and CHANGELOG.md [skip ci] ([9cc62c1](https://github.com/tmttn/tmttn.eu/commit/9cc62c109aa5eb316be7720c3a6cc26edeaee101))


## <small>0.2.9 (2025-07-01)</small>

### Summary
Release with improvements and updates.

* ⚡ perf: fix infinite useEffect loop causing 178s Time to Interactive ([da1006c](https://github.com/tmttn/tmttn.eu/commit/da1006c2e187300bd68a95144b983362a5ee4dde))
* 🔧 fix: correct package.json version-only detection with precise logic ([3a108ef](https://github.com/tmttn/tmttn.eu/commit/3a108ef269cd8a7d0bb018af23c2f59eecc616ab))
* 📝 docs: sync version v0.2.8 and CHANGELOG.md [skip ci] ([a691362](https://github.com/tmttn/tmttn.eu/commit/a6913621ae9669fb5a0edf58e7e592ff772db73e))


## <small>0.2.8 (2025-06-30)</small>

### Summary
Release with improvements and updates.

* 🔧 fix: improve package.json change detection logic to properly skip version-only changes ([316b973](https://github.com/tmttn/tmttn.eu/commit/316b973b8b356b0147921f19f4da0e066c271afc))
* 📝 docs: sync version v0.2.7 and CHANGELOG.md [skip ci] ([d518bbe](https://github.com/tmttn/tmttn.eu/commit/d518bbe27bf9d44a46ae0680bf92ed0ff7e21b0b))


## <small>0.2.7 (2025-06-30)</small>

### Summary
Release with improvements and updates.

* 🔧 fix: ensure release workflow runs on production branch and sync missing v0.2.6 changelog ([5540106](https://github.com/tmttn/tmttn.eu/commit/5540106e13b04e6dde8f47666e345369aacd1b6f))
* 🔧 fix: prevent version-only package.json changes from triggering deployments ([4d72554](https://github.com/tmttn/tmttn.eu/commit/4d72554ddde1443bd0cb6faeba8d3088e3415b6d))


## <small>0.2.6 (2025-06-30)</small>

### Summary
Release with improvements and updates.

### 🔧 Maintenance & Build
* 🔧 fix: resolve versioning pipeline issues with comprehensive improvements ([2d76cdd](https://github.com/tmttn/tmttn.eu/commit/2d76cdde9334bdb675b1ef243a713214753d54fb))

### 📝 Documentation
* 📝 docs: sync version v0.2.5 and CHANGELOG.md [skip ci] ([4e4e235](https://github.com/tmttn/tmttn.eu/commit/4e4e235a72220c2e90356d71a5f4d44c26a4107b))
* 📝 docs: update CHANGELOG.md for vvnull [skip ci] ([e938c88](https://github.com/tmttn/tmttn.eu/commit/e938c883eab9bd8974a80d47c022292a492db201))

## <small>0.2.5 (2025-06-30)</small>

### Summary
Maintenance release focused on bug fixes and stability improvements.

This release includes 1 new feature and 1 bug fix.

### 🔧 Maintenance & Build
* 🔧 feat: implement proper semver logic based on conventional commits since highest tag ([8d00851](https://github.com/tmttn/tmttn.eu/commit/8d00851))

### 📝 Documentation  
* 📝 docs: sync version v0.2.4 and CHANGELOG.md [skip ci] ([f3af48b](https://github.com/tmttn/tmttn.eu/commit/f3af48b))

## <small>0.2.4 (2025-06-30)</small>

* 🐛 fix: prevent duplicate [skip ci] in changelog commit messages ([66a2c2c](https://github.com/tmttn/tmttn.eu/commit/66a2c2c))
* 🐛 fix: resolve illegal return statement in changelog enhancement script ([e1eaa36](https://github.com/tmttn/tmttn.eu/commit/e1eaa36))
* 📝 docs: sync version v0.1.1 and CHANGELOG.md [skip ci] ([0ce5793](https://github.com/tmttn/tmttn.eu/commit/0ce5793))
* 📝 docs: update CHANGELOG.md for vv0.1.0 [skip ci] ([9cc82ed](https://github.com/tmttn/tmttn.eu/commit/9cc82ed))
* 📝 docs: update CHANGELOG.md for vvnull [skip ci] ([81f9b52](https://github.com/tmttn/tmttn.eu/commit/81f9b52))
* 📝 docs: update CHANGELOG.md for vvnull [skip ci] ([bde6162](https://github.com/tmttn/tmttn.eu/commit/bde6162))
* 🔧 fix: correct changelog version ordering and add duplicate prevention ([c5f42bb](https://github.com/tmttn/tmttn.eu/commit/c5f42bb))
* 🔧 fix: correct version to 0.2.3 and fix changelog ordering to match existing tags ([81400b5](https://github.com/tmttn/tmttn.eu/commit/81400b5))
* 🔧 fix: force new release creation and remove duplicate release check ([a55dc6b](https://github.com/tmttn/tmttn.eu/commit/a55dc6b))

## <small>0.2.2 (2025-06-30)</small>

* ✨ feat: enhance changelog generation with intelligent summaries and structured format ([a7f2a93](https://github.com/tmttn/tmttn.eu/commit/a7f2a93))
* ✨ feat: hide entire portfolio section when GitHub API fails ([1e100bf](https://github.com/tmttn/tmttn.eu/commit/1e100bf))
* 🎨 style: remove logo from header and improve CI pipeline ([b6173aa](https://github.com/tmttn/tmttn.eu/commit/b6173aa))
* 🐛 fix: adjust header layout after logo removal ([faa7e89](https://github.com/tmttn/tmttn.eu/commit/faa7e89))
* 🐛 fix: prevent vnull tag creation in release workflow ([a7dfafa](https://github.com/tmttn/tmttn.eu/commit/a7dfafa))
* 🐛 fix: restore version 0.2.2 in package.json and fix changelog header ([650c51f](https://github.com/tmttn/tmttn.eu/commit/650c51f))
* 📝 docs: sync version v0.2.1 and CHANGELOG.md [skip ci] ([74830b5](https://github.com/tmttn/tmttn.eu/commit/74830b5))
* 📝 docs: update CHANGELOG.md for vvnull [skip ci] [skip ci] ([0646802](https://github.com/tmttn/tmttn.eu/commit/0646802))
* 📝 docs: update CHANGELOG.md for vvnull [skip ci] [skip ci] ([2e3d627](https://github.com/tmttn/tmttn.eu/commit/2e3d627))
* 🔧 fix: exclude .versionrc.json from user-facing deployment triggers ([0dc5b33](https://github.com/tmttn/tmttn.eu/commit/0dc5b33))
* 🔧 fix: trigger deployment to test release workflow after vnull tag removal ([ba06b29](https://github.com/tmttn/tmttn.eu/commit/ba06b29))
* 🔧 fix: update E2E tests to handle hidden portfolio section ([fcc94d0](https://github.com/tmttn/tmttn.eu/commit/fcc94d0))

## <small>0.2.1 (2025-06-30)</small>

* 📝 docs: update CHANGELOG.md for vvnull [skip ci] ([09a05c3](https://github.com/tmttn/tmttn.eu/commit/09a05c3))
* 🔧 fix: resolve vvnull changelog issue and enhance automated versioning ([6457cce](https://github.com/tmttn/tmttn.eu/commit/6457cce))
* 🔧 fix: update Renovate config to use modern commitMessage subcomponents ([632b46b](https://github.com/tmttn/tmttn.eu/commit/632b46b))

## <small>0.1.1 (2025-06-30)</small>

* ✨ feat: add 'modern web technologies' to meta keywords for better SEO ([d9e7fe2](https://github.com/tmttn/tmttn.eu/commit/d9e7fe2))
* ✨ feat: update GitHub portfolio link text for better UX ([52df89c](https://github.com/tmttn/tmttn.eu/commit/52df89c))
* ⬆️ chore: update TriPSs/conventional-changelog-action to v6 (#48) ([dca8586](https://github.com/tmttn/tmttn.eu/commit/dca8586)), closes [#48](https://github.com/tmttn/tmttn.eu/issues/48)
* 🔗 feat: update contact email and add target="_blank" to external links ([38d956b](https://github.com/tmttn/tmttn.eu/commit/38d956b))
* 🔧 chore: configure Renovate to use conventional commits with emojis ([e9e0194](https://github.com/tmttn/tmttn.eu/commit/e9e0194))
* 🔧 chore: enable automatic semantic versioning in CI pipeline ([055ee81](https://github.com/tmttn/tmttn.eu/commit/055ee81))
* 🔧 enhance: add comprehensive build output summaries for all CI jobs ([232d20d](https://github.com/tmttn/tmttn.eu/commit/232d20d))
* 🔧 enhance: automate release workflow to trigger on user-facing deployments ([505f2bf](https://github.com/tmttn/tmttn.eu/commit/505f2bf))
* 🔧 fix: improve deployment workflow to use git-based change detection ([d4c3019](https://github.com/tmttn/tmttn.eu/commit/d4c3019))
* 🧪 test: fix intermittent ParticleBackground connection test failure ([e078a05](https://github.com/tmttn/tmttn.eu/commit/e078a05))

