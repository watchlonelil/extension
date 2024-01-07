/**
 * @type {import('prettier').Options}
 */
export default {
  printWidth: 120,
  trailingComma: 'all',
  singleQuote: true,
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '', // Empty line
    '^@plasmo/(.*)$',
    '',
    '^@plasmohq/(.*)$',
    '',
    '^~(.*)$',
    '',
    '^[./]',
  ],
};
