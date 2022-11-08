import App from './app'
import MainRouter from './controllers/controller.main'

const app = new App([
  new MainRouter()
])

app.listen()
