import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  clearMocks: true,
  testTimeout: 30000,
  collectCoverage: true,
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
}

export default config
