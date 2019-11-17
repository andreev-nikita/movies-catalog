const presets = [
  [
    '@babel/env',
    {
      corejs: 3,
      useBuiltIns: 'usage',
      debug: false,
    },
  ],
  '@babel/react',
];

const plugins = ['@babel/proposal-class-properties'];

module.exports = { presets, plugins };
