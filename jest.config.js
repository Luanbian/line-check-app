module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: 'jest-expo',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
}
