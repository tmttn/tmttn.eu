const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    // Handle module aliases (same as those in tsconfig.json)
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@features(.*)$': '<rootDir>/src/features$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@styles(.*)$': '<rootDir>/src/styles$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@contexts(.*)$': '<rootDir>/src/contexts$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    String.raw`^.+\.module\.(css|sass|scss)$`,
  ],
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
    '!src/**/*.styled.{js,jsx,ts,tsx}',
    '!src/**/styled/**',
    '!src/styles/**',
    '!src/utils/fontawesome.js',
    '!src/utils/typography.js',
    '!src/**/*Styled*.{js,jsx,ts,tsx}',
    '!src/**/*Components.{js,jsx,ts,tsx}',
    '!src/**/theme.{js,jsx,ts,tsx}',
    '!src/**/GlobalStyle.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json-summary',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)