import { color } from '../utils/color'
import { Router } from 'express'
import { Server } from 'socket.io'
import { scanDirSync, fileExistsSync } from '../utils/file'

export default (io: Server) => {
  const router = Router()
  const APIs = []
  const getFilePath = (file, a, ext = 'ts'): string => {
    return `./${file}/${a}.${ext.toLowerCase()}`
  }
  
  scanDirSync(__dirname, file => {
    // Run before api import
    const routerFile = getFilePath(file, 'router')
    const middlewareFile = getFilePath(file, 'middleware')
    const configFile = getFilePath(file, 'config')
    if (fileExistsSync(__dirname, routerFile)) {
      // Some informations about APIs
      let API = {
        name: file
      }
      if (fileExistsSync(__dirname, configFile)) {
        API = {
          ...API,
          ...require(configFile).default
        }
      }
      APIs.push(API)
  
      // Load middlewares if middleware.js file exists
      const middlewares = fileExistsSync(__dirname, middlewareFile) && require(`./${file}/middleware`).default
      const apiRouter = Router()
      let apiRouterConfig = require(routerFile).default
  
      // Load "before" middlewares
      middlewares.before && middlewares.before.forEach(mw => apiRouter.use(mw))
    
      if (!Array.isArray(apiRouterConfig)) {
        apiRouterConfig = apiRouterConfig(io)
      }

      // Load routes
      apiRouterConfig.forEach(r => {
        const list = Array.isArray(r)
        const method = r[list ? 0 : 'method'].toLowerCase()
        const route = r[list ? 1 : 'route'] 
        let functions = r[list ? 2 : 'functions']
        functions = Array.isArray(functions) ? functions : [functions]
        apiRouter[method](route, ...functions)
      })
    
      // Load "after" middlewares
      middlewares.after && middlewares.after.forEach(mw => apiRouter.use(mw))
    
      // Import API
      router.use(`/${file}`, apiRouter)
      console.log('✅  API:', color(`${file}`, 'fg.green'))
    } else {
      console.log(`❌  API: ${file} - ` + color('router.ts is required', 'fg.red'))
    }
  })
  
  router.get('/', (req, res) => res.send(APIs))
  
  return router
}
