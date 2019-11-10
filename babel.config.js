module.exports = {
  "presets": [
    "@vue/app"
  ],
  "env": {
    "development": {
      "sourceMaps": true,
      "retainLines": true,
    }
  },
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    [
      "import",
      {
        "libraryName": "muse-ui",
        "libraryDirectory": "lib",
        "camel2DashComponentName": false
      }
    ]
  ]
}
