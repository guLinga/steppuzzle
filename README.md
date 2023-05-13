### File structure and function

```yaml
|——node_modules
|——package.json
|——pnpm-lock.yaml
|——README.md
|——tsconfig.json # ts配置文件
|——src
	|——node
		|——cli.ts # cli 入口
		|——dev.ts # devServer
		|——constants
			|——index.ts # 常量文件
		|——plugin-island # vite 插件
			|——indexHtml.ts # vite 生成
|——dist # typescript 打包后的文件
|——bin
	|——steppuzzle.js # cli 执行文件
|——docs # 模拟 markdown 目录
|——template.html # html 模板
```
