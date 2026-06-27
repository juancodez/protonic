import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  usesDtcg: true,
  source: [
    'tokens/color/foundation.json',
    'tokens/color/semantic.json',
    'tokens/typography.json',
    'tokens/spacing.json',
    'tokens/radius.json',
    'tokens/motion.json',
    'tokens/elevation.json',
    'tokens/text-styles.json',
    'tokens/borders.json',
    'tokens/z-index.json',
    'tokens/icon-sizes.json',
    'tokens/breakpoints.json',
    'tokens/opacity.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: '',
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
