module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // ✨ New features
        'fix',      // 🐛 Bug fixes  
        'style',    // 🎨 UI/styling changes
        'refactor', // ♻️ Code refactoring
        'perf',     // ⚡ Performance improvements
        'test',     // 🧪 Tests
        'docs',     // 📝 Documentation
        'chore',    // 🔧 Build/tooling
        'deploy',   // 🚀 Deployment
        'enhance'   // 🌟 Enhancements
      ]
    ],
    'subject-min-length': [2, 'always', 1],
    'subject-max-length': [2, 'always', 100],
    'subject-case': [2, 'always', 'sentence-case'],
    'header-max-length': [2, 'always', 120],
    // Custom rule to allow optional emojis at the start
    'header-pattern': [
      2,
      'always',
      /^((✨|🐛|🎨|♻️|⚡|🧪|📝|🔧|🚀|🌟|🌙|🌞|🎭|🎯|📊|🔗|📱|♿|🏗️|🔒) )?(feat|fix|style|refactor|perf|test|docs|chore|deploy|enhance): .+$/
    ]
  },
  plugins: [
    {
      rules: {
        'header-pattern': ({ header }) => {
          const pattern = /^((✨|🐛|🎨|♻️|⚡|🧪|📝|🔧|🚀|🌟|🌙|🌞|🎭|🎯|📊|🔗|📱|♿|🏗️|🔒) )?(feat|fix|style|refactor|perf|test|docs|chore|deploy|enhance): .+$/;
          
          if (!pattern.test(header)) {
            return [
              false,
              `Header must match format: [emoji] <type>: <description>
              
Optional emojis: ✨ 🐛 🎨 ♻️ ⚡ 🧪 📝 🔧 🚀 🌟 🌙 🌞 🎭 🎯 📊 🔗 📱 ♿ 🏗️ 🔒
Valid types: feat, fix, style, refactor, perf, test, docs, chore, deploy, enhance

Examples:
  feat: add GitHub activity heatmap component
  ✨ feat: add GitHub activity heatmap component
  fix: prevent particles from falling during scroll
  🐛 fix: prevent particles from falling during scroll`
            ];
          }
          
          return [true];
        }
      }
    }
  ]
};