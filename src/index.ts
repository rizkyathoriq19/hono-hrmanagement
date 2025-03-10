import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { connectDB } from '@/config/database.js'
import "@/lib/encryption.js"
import api from '@/routes/api.js'

async function init() {
  try { 
    const app = new Hono()
    const PORT = 10000

    await connectDB()
    
    app.use(poweredBy())
    app.use(logger())
    
    app.use('/api/v1/*', cors())
    app.route('/api/v1', api)

    serve({
      fetch: app.fetch,
      port: PORT
    })
    
    console.log(`Server is running on http://localhost:${PORT}`)
  } catch (error) { 
    console.error('init err: ', error)
  }
}

init()

