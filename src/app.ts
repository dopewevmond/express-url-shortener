import * as express from 'express'
import * as bodyparser from 'body-parser'
import Controller from './controllers/controller.interface'
import * as path from 'path'
import AppError from 'exceptions/exception.apperror'
import * as morgan from 'morgan'

class App {
  public app: express.Application
  public shortenedLinks: any[]

  constructor (controllers: Controller[]) {
    this.app = express()
    this.app.use(morgan('dev'))
    this.setupApplication()
    controllers.forEach(controller => {
      this.app.use(controller.path, controller.router)
    })
    // adding error handling middleware after mounting all controllers
    this.app.use(this.ErrorHandlerMiddleware)
  }

  /**
     * Mount middleware and setup view engine
     */
  private setupApplication (): void {
    this.app.use(bodyparser.urlencoded({ extended: true }))
    this.app.use('/public', express.static(path.join(__dirname, '/../public')))
    this.app.set('views', path.join(__dirname, '/../views'))
    this.app.set('view engine', 'pug')
  }

  private ErrorHandlerMiddleware (err: AppError, req: express.Request, res: express.Response, next: express.NextFunction): void {
    // res.status(err.statusCode).json({ message: err.message })
    res.status(err.statusCode).render('error', { err })
  }

  public listen (): void {
    const PORT: number = 3000
    this.app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })
  }
}

export default App
