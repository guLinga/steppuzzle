# 主题配置

## 配置文件

```txt
config.ts
or
config.js
```

## 配置文件导出

```ts
export default {}
```

## 标题

```ts
title: ''
```

## github 地址

```ts
github: ''
```

## 导航

```ts
themeConfig: {
  nav: [
    { text: '主页', link: '/' },
    { text: 'guide', link: '/guide/index' }
  ]
}
```

> **导航中的 link 地址需要有对应的 md、mdx、jsx、tsx 文件，否则会找不到对应页面**

## 侧边栏

```ts
themeConfig: {
  sidebar: {
    "/guide/": [
      {
        text: 'guide',
        item: [
          {
              text: '指南',
              link: '/guide/index'
          },
        ]
      }
    ]
  }
}
```
