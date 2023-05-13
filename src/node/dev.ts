import { createServer as createViteDevServer } from 'vite'

export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root
  })
}