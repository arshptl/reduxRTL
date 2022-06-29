const path = require('path')

module.exports = {
    // testEnvironment: 'jest-environment-jsdom',
    moduleDirectories: ['node_modules', path.join(__dirname, 'src'), 'shared', path.join(__dirname, 'test')],
    // ...config,
    // watchPlugins: [
    //     ...config.watchPlugins,
    //     require.resolve('jest-watch-select-projects'),
    // ],
    // projects: [
    //     require.resolve('./tests/jest.config.dom'),
    //     require.resolve('./tests/jest.config.node'),
    // ],
}