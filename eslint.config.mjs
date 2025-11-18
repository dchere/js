export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "readonly",
        // Jest globals
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        it: "readonly",
        jest: "readonly"
      }
    },
    rules: {
      // Google-style Complexity Rules (Strict)
      "complexity": ["error", { "max": 10 }],          // Cyclomatic complexity - ERROR at 10
      "max-depth": ["error", 4],                       // Max nesting depth - ERROR at 4
      "max-lines-per-function": ["error", {            // Max lines in a function
        "max": 40,                                     // Google recommends 40
        "skipBlankLines": true,
        "skipComments": true
      }],
      "max-nested-callbacks": ["error", 3],            // Max nested callbacks - ERROR
      "max-params": ["error", 3],                      // Max 3 parameters (Google style)
      "max-statements": ["error", 15],                 // Max 15 statements per function
      
      // Code Quality Rules
      "no-unused-vars": "error",                       // Stricter: error instead of warn
      "no-undef": "error",
      "no-console": "warn"                             // Warn on console.log in production code
    }
  }
];
