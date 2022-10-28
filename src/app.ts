import * as express from 'express';
import * as bodyparser from 'body-parser';
import Controller from './controllers/controller.interface';

class App {
    public app: express.Application;

    constructor (controllers: Controller[]) {
        this.app = express();
        this.setupApplication();
        controllers.forEach( controller => {
            this.app.use('/', controller.router);
        });
    }

    /**
     * Mount middleware and setup view engine
     */
    private setupApplication(): void {
        this.app.use(this.loggerMiddleware);
        this.app.use(bodyparser.urlencoded({extended: true}));
        this.app.use('/public', express.static(__dirname + '/../public'));
        this.app.set('views', __dirname + '/../views');
        this.app.set('view engine', 'pug');

    }
    
    private loggerMiddleware(request: express.Request, response: express.Response, next) {
        console.log(`${request.method} ${request.path}`);
        next();
    }

    public listen() {
        this.app.listen(process.env.PORT || 3000, () => {
            console.log(`listening on port ${process.env.PORT || 3000}`);
            
        })
    }
}

export default App;