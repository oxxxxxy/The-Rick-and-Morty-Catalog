import type { Config } from "jest";
import nextJest from 'next/jest.js';




const createJestConfig = nextJest({
  dir: './',
})
 
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // testEnvironment: 'node',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',

		// I prefer to think that this packages are battle-tested and don’t require mocking.
		'^@tsC/(.*)$': '<rootDir>/node_modules/@tsC/$1',
		'^@tsCF/(.*)$': '<rootDir>/node_modules/@tsCF/$1',
		'^@tsLF/(.*)$': '<rootDir>/node_modules/@tsLF/$1',
		'^@tsL/(,*)$': '<rootDir>/node_modules/@tsL/$1',

		/* '^@tsCF/data$': '<rootDir>/../packages/ts-CF-data',
		'^@tsLF/pages$': '<rootDir>/../packages/ts-LF-pages',
		'^@tsL/utils$': '<rootDir>/../packages/ts-L-utils', */



	},
	transform:{
    '^.+\\.tsx?$': 'ts-jest', // Для TypeScript-файлов
    '^.+\\.jsx?$': 'babel-jest', // Для JavaScript-файлов
	},
	/* transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  }, */
  /* transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
        transform: {
          react: {
            runtime: 'automatic'
          }
        }
      }
    }]
  }, */
 
	transformIgnorePatterns: [
		// 'node_modules',
		// 'packages'
	],
	/* transformIgnorePatterns:[
		"/node_modules/(?!(@ts\w+)/)"
	] */
}
 
export default createJestConfig(config)
