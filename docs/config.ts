import { defaultConfig } from '../dist/tsup/index.mjs'

export default defaultConfig({
  title: "GuLinga",
  github: 'https://github.com/GuLinga',
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "steppuzzle指南", link: "/steppuzzleGuide/use" }
    ],
    sidebar: {
      '/steppuzzleGuide/': [
        {
          text: 'steppuzzle指南',
          items: [
            {
              text: '使用指南',
              link: '/steppuzzleGuide/use'
            },
            {
              text: '主题配置',
              link: '/steppuzzleGuide/config'
            },
            {
              text: '首页配置',
              link: '/steppuzzleGuide/home'
            }
          ]
        }
      ]
    }
  },
})