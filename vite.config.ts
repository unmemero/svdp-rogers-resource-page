import fs from 'node:fs/promises'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function localAdminApiPlugin(): Plugin {
  return {
    name: 'local-admin-api',
    configureServer(server) {
      server.middlewares.use('/__admin/resources', async (req, res) => {
        try {
          const url = new URL(req.url || '', 'http://localhost')

          if (req.method === 'GET') {
            const lang = url.searchParams.get('lang') === 'es' ? 'es' : 'en'
            const fileName = lang === 'es' ? 'spanish.json' : 'english.json'
            const filePath = path.resolve(process.cwd(), 'src/data', fileName)
            const content = await fs.readFile(filePath, 'utf-8')
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(content)
            return
          }

          if (req.method === 'POST') {
            const chunks: Buffer[] = []
            for await (const chunk of req) {
              chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
            }
            const body = JSON.parse(Buffer.concat(chunks).toString('utf-8')) as {
              lang?: string
              resources?: unknown
            }

            const lang = body.lang === 'es' ? 'es' : 'en'
            if (!Array.isArray(body.resources)) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'resources must be an array' }))
              return
            }

            const fileName = lang === 'es' ? 'spanish.json' : 'english.json'
            const filePath = path.resolve(process.cwd(), 'src/data', fileName)
            await fs.writeFile(
              filePath,
              `${JSON.stringify(body.resources, null, 2)}\n`,
              'utf-8',
            )

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                ok: true,
                file: `src/data/${fileName}`,
                count: body.resources.length,
              }),
            )
            return
          }

          res.statusCode = 405
          res.end('Method Not Allowed')
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: err instanceof Error ? err.message : 'Unknown error',
            }),
          )
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/svdp-rogers-resource-page/',
  plugins: [react(), tailwindcss(), localAdminApiPlugin()],
})
