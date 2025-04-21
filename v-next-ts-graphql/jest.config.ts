import type { Config } from "jest";
import nextJest from 'next/jest.js';




const createJestConfig = nextJest({
  dir: './',
})
 
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@tsCF/(.*)$': '<rootDir>/node_modules/@tsCF/$1',
		'^@tsLF/(.*)$': '<rootDir>/node_modules/@tsLF/$1'
	},
	/* transformIgnorePatterns:[
		// I prefer to think that this packages are battle-tested and don’t require mocking.
		"/node_modules/(?!(@ts\w+)/)"
	] */
}
 
export default createJestConfig(config)
