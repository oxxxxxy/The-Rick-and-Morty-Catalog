import { defineConfig } from 'cypress'
 
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: [
      'tests/e2e-cypress/**/*.cy.{js,jsx,ts,tsx}',
		],
		supportFile: false
  },
})
