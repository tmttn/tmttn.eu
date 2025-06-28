import { defineConfig } from 'cypress'
// @ts-ignore
import webpack from '@cypress/webpack-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    webpack({
      webpackOptions: {
        resolve: {
          extensions: ['.ts', '.js'],
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'ts-loader',
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                  options: config,
                },
              ],
            },
          ],
        },
      },
    }),
  )

  return config
}

export default defineConfig({
  video: false,
  viewportWidth: 1600,
  viewportHeight: 900,
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  env: {},
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/*.feature',
    setupNodeEvents,
  },
})
