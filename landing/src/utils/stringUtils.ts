/**
 * Converts a string to kebab-case.
 * Handles camelCase, PascalCase, spaces, underscores, and mixed formats.
 * @param {string} str - The input string to convert
 * @returns {string} The kebab-case version of the input string
 * @example
 * toKebabCase("HelloWorld")   // "hello-world"
 * toKebabCase("foo bar")      // "foo-bar"
 * toKebabCase("fooBar_baz")   // "foo-bar-baz"
 */
export function toKebabCase(str: string): string {
    if (!str || typeof str !== 'string') return '';
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')   // camelCase/PascalCase → insert hyphen
        .replace(/[\s_]+/g, '-')                 // spaces/underscores → hyphen
        .replace(/[^a-zA-Z0-9-]/g, '')          // remove invalid chars
        .replace(/-+/g, '-')                    // collapse multiple hyphens
        .replace(/^-|-$/g, '')                  // trim hyphens at start/end
        .toLowerCase();
}

// FILE DOCUMENTED
