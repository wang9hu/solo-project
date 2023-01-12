module.exports = {
	'env': {
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:airbnb',
		'plugin:react/recommended'
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
