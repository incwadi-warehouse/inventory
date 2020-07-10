module.exports = {
  rootDir: '../',
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|scss|svg|png|jpg)$': 'jest-transform-stub',
    '^.+\\.js$': 'babel-jest'
  },
  testMatch: [
    '**/tests/unit/**/*.spec.js'
  ],
  testURL: 'http://localhost/'
}
