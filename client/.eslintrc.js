const path = require ("path")
module.exports = {
  root: true,
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "extends": "airbnb",
  "settings": {
    // "import/resolver": "webpack",
    "import/resolver": {
      "webpack": {
        "config": path.resolve (__dirname, "../build/webpack.config.client.js")
      }
    },

  },

  "rules": {
    "semi": [0],
    "react/jsx-filename-extension": [0],
    "react/require-default-props": [0],
    "react/forbid-prop-types": [0],
    "react/sort-comp": [0],
    "react/destructuring-assignment": [0],

  }
}
