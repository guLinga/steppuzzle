import { defaultConfig } from '../dist/tsup/index.mjs'

export default defaultConfig({
  title: "五亿个小铃铛",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "指南", link: "/guide/" },
    ],
  },
})