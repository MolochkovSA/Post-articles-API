export default {
  testEnvironment: 'jest-environment-node',
  transform: {},
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
  collectCoverage: true,
  collectCoverageFrom: ['./source/utils/env/getAdminEmail.js'],
}
