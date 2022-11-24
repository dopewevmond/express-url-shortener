import * as express from 'express'
import * as bodyparser from 'body-parser'
import Controller from './controllers/controller.interface'
import * as path from 'path'
import * as Sentry from '@sentry/node'
import AppError from './exceptions/exception.apperror'
import * as morgan from 'morgan'

class App {
  public app: express.Application
  public shortenedLinks: any[]

  constructor (controllers: Controller[]) {
    this.app = express()
    Sentry.init({ dsn: 'https://b76619ae6aa641258556f6cc028ef7a4@o4504203419648000.ingest.sentry.io/4504203423711232' })
    this.app.use(Sentry.Handlers.requestHandler())

    this.app.use(morgan('dev'))
    this.setupApplication()
    controllers.forEach(controller => {
      this.app.use(controller.path, controller.router)
    })

    this.app.use(Sentry.Handlers.errorHandler())

    // adding error handling middleware after mounting all controllers
    this.app.use(this.ErrorHandlerMiddleware)
    this.app.use(this.NotFoundError)
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

  private ErrorHandlerMiddleware (error: AppError, req: express.Request, res: express.Response, next: express.NextFunction): void {
    // res.status(err.statusCode).json({ message: err.message })
    res.status(error.statusCode).render('error', { error })
  }

  private NotFoundError (req: express.Request, res: express.Response, next: express.NextFunction): void {
    const error = new AppError(404, 'The page you\'re requesting for was not found')
    res.status(error.statusCode).render('error', { error })
  }

  public listen (): void {
    const PORT: number = 3000
    this.app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })
  }
}

export default App
