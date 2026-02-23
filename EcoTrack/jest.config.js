// Jest configuration for EcoTrack React application
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react'] }],
    '^.+\\.css$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@mui|@emotion)/)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testMatch: [
    '<rootDir>/src/**/*.test.{js,jsx}',
    '<rootDir>/src/**/*.spec.{js,jsx}',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.d.ts',
    '!src/main.jsx',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};

