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

module.exports = { presets };
