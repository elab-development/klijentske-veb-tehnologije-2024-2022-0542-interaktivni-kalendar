module.exports = {

  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!reactjs-popup).+\\.js$"
  ],

  testEnvironment: "jsdom",
  
  
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
