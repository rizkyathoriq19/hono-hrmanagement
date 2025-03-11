import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { connectDB } from '@/config/database.js'
import "@/lib/encryption.js"
import api from '@/routes/api.js'
import { swaggerUI } from '@hono/swagger-ui';
import swagger from '@/docs/swagger.js';

const app = new Hono()

await connectDB()

app.use(poweredBy())
app.use(logger())

app.get('/ui', swaggerUI({ url: '/doc/openapi.json' }));
app.get('/doc/openapi.json', (c) => {
  return c.json(swagger.getOpenAPIDocument({
    openapi: '3.1.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'API for user authentication',
    },
    servers: [
      {
        url: '{protocol}://{baseurl}/api/v1',
        description: 'Identify Server Test API',
        variables: {
          protocol: {
            default: 'http',
            enum: ['http', 'https'],
          },
          baseurl: {
            default: 'localhost:10000',
            enum: ['localhost:10000'],
          },
        }
      }
    ],
  }));
});

app.use('/api/v1/*', cors())
app.route('/api/v1', api)
app.get('/', (c) => c.json({ message: 'Welcome to API HR Management' }))

if (process.env.VERCEL !== '1') { 
  const PORT: number = Number(process.env.PORT) || 10000
  serve({
    fetch: app.fetch,
    port: PORT
  })
  console.log(`Server is running on http://localhost:${PORT}`)
}

export default handle(app)