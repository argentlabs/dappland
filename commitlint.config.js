const capturingGroupType = /(\w*:\s)/ // 'type: '
const capturingGroupSubject = /([^[].+)/ // 'subject'

/*
  ❌ Bad commit messages
  git commit -m "add feature"
  git commit -m "ABC-123 add feature"
  git commit -m "feat / add feature"

  ✅ Good commit messages
  git commit -m "feat: add feature"
  git commit -m "[ABC-123] feat: add feature"
*/

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        "^" + capturingGroupType.source + capturingGroupSubject.source + "$",
      ),
      headerCorrespondence: ["type", "subject"],
    },
  },

  plugins: [
    {
      rules: {
        "header-match-pattern": (parsed) => {
          const { type, subject } = parsed

          if (type === null && subject === null)
            return [false, "commit message must be in format 'type: subject'"]

          return [true, ""]
        },

        "check-type": (parsed, _when, expectedValues) => {
          const { type } = parsed

          if (type && !Object.keys(expectedValues).includes(type.split(":")[0]))
            return [
              false,
              `commit message must be in format 'type: subject'\ntype must be one of:\n${Object.keys(
                expectedValues,
              )
                .map((type) => `${type} - ${expectedValues[type]}`)
                .join("\n")}`,
            ]

          return [true, ""]
        },
      },
    },
  ],

  rules: {
    "header-match-pattern": [2, "always"],
    "check-type": [
      2,
      "always",
      {
        feat: "add a new feature to your application",
        chore: "tool, configuration changes, linters",
        fix: "bug fix",
        docs: "documentation update",
        refactor: "code changes, no new features added",
        test: "add / update tests",
      },
    ],
  },
}
