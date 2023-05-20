# 首页配置

## 语法

```markdown
---
pageType: home
---
```

## 图片引入

> **图片放入根目录的public目录中，可直接通过 /图片文件名 引入**

## hero

```markdown
---
hero:
  name: 名称
  text: 文本
  tagline: 标语
  image:
    src: /img.png
    alt: img
  actions:
    - theme: brand
      text: 按钮一
      link: /guide/use
    - theme: alt
      text: 按钮二
      link: https://github.com
---
```

## features

```markdown
---
features:
  - title: 'title'
    details: details
    icon: ☑️
    image: /img.png
    link: 'https://github.com/'
  - title: 'title'
    details: details
    icon: ☑️
    image: /img.png
    link: 'https://github.com/'
---
```