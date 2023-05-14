### File structure and function

```yaml
|——node_modules
|——package.json
|——pnpm-lock.yaml
|——README.md
|——tsconfig.json # ts配置文件
|——src
	|——node
		|——__test__ # vitest 测试
		|——cli.ts # cli 入口
		|——dev.ts # vit 配置
		|——build.ts # SSG 生成 打包
		|——constants
			|——index.ts # 常量文件
		|——plugin-island # vite 插件
			|——indexHtml.ts # vite 生成
	|——runtime
		|——App.tsx # 客户端 App 组件
		|——client-entry.tsx # 客户端入口
		|——ssr-entry.tsx # 服务端入口
	|——theme-default
		|——Layout
			|——index.tsx # Layout 组件
|——dist # typescript 打包后的文件
|——bin
	|——steppuzzle.js # cli 执行文件
|——script
	|——prepare-e2e.ts # e2e 测试
|——e2e
	|——playground
		|——basic # e2e 测试目录
|——docs # 模拟 markdown 目录
|——template.html # html 模板
|——tsup.config.ts # 使用 tsup 将 cli 重新打包
|——vitest.config.ts # vitest 测试
|——playwright.config.ts # 内置浏览器
```

### command

编译 ts 代码 生成 js 代码

```
pnpm ts:start
or
pnpm ts:run
```

打包生成 ssg

```
steppuzzle build docs
```

开启本地服务

```
steppuzzle dev docs
```
