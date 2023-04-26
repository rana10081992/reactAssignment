module.exports = {
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(png|gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**"],
  coverageReporters: ["json", "html"],
  coverageThreshold: {
    global: {
      lines: 90
    }
  }
};
