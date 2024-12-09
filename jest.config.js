module.exports = {
  testEnvironment: 'node',
  "testMatch": [
    "<rootDir>/test/**/*.test.{ts}",
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  "rootDir": ".",
  setupTestFrameworkScriptFile: './jest.setup.js'
};