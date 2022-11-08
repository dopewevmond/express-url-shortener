import * as express from 'express'
import * as bodyparser from 'body-parser'
import Controller from './controllers/controller.interface'
import * as path from 'path'

class App {
  public app: express.Application

  constructor (controllers: Controller[]) {
    this.app = express()
    this.setupApplication()
    controllers.forEach(controller => {
      this.app.use(controller.path, controller.router)
    })
  }

  /**
     * Mount middleware and setup view engine
     */
  private setupApplication (): void {
    this.app.use(this.loggerMiddleware)
    this.app.use(bodyparser.urlencoded({ extended: true }))
    this.app.use('/public', express.static(path.join(__dirname, '/../public')))
    this.app.set('views', path.join(__dirname, '/../views'))
    this.app.set('view engine', 'pug')
  }

  private loggerMiddleware (request: express.Request, response: express.Response, next: express.NextFunction): void {
    const method: string = request.method
    const path: string = request.path
    console.log(`${method} ${path}`)
    next()
  }

  public listen (): void {
    const PORT: number = 3000
    this.app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })
  }
}

export default App
