module.exports = {
	globals: {
		window: true,
		'ts-jest': {
			tsconfig: 'tsconfig.test.json'
		}
	},
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
};
