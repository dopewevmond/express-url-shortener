import Controller from "./controller.interface";
import { Router, Request, Response, NextFunction } from "express";
import { isValidURL, shortenURL } from '../helper';

let links: {id: string, link: string}[] = [];

class MainRouter implements Controller {
    public path = '/';
    public router = Router();

    constructor() {
        this.setupRoutes();
    }

    private setupRoutes() {        
        this.router.get(this.path, this.homeHandlerGet);
        this.router.get(this.path + 'shorten', this.shortenHandlerGet);
        this.router.post(this.path + 'shorten', this.checkUrlValidity, this.shortenHandlerPost);
        this.router.get(this.path + 'rd/:rd_id', this.redirectToLongURL);
    }

    private homeHandlerGet(req: Request, res: Response) {
        res.render('index', {try_shorten: false});
    }

    private shortenHandlerGet(req: Request, res: Response) {
        res.redirect('/');
    }

    private checkUrlValidity (req: Request, res: Response, next: NextFunction) {
        req.body.isValid = false;
        if (isValidURL(req.body.url)) {
            req.body.isValid = true;
        }
        next();
    }

    private shortenHandlerPost(req: Request, res: Response) {
        const template_data = {try_shorten: true, isvalid: false, orig_link: "", shortened_link: ""};
    if (req.body.isValid) {
        let shortened_url = shortenURL(req.body.url);

        // even though its unlikely we should still check if there's a saved link with the same ID
        // as this newly generated one before inserting into links array
        while (links.filter(l => l.id === shortened_url.id).length > 0) {
            shortened_url = shortenURL(req.body.url);
        }
        links = [...links, shortened_url];

        template_data.isvalid = true;
        template_data.orig_link = req.body.url;
        template_data.shortened_link = shortened_url.id;
    }
    else {
        template_data.isvalid = false;
    }
    res.render('index', template_data);
    }

    private redirectToLongURL(req: Request, res: Response) {
        const rd_id = req.params.rd_id;
        let surl = links.filter(shortened_url => shortened_url.id === rd_id);
        if (surl.length > 0) {
            res.redirect(surl[0].link);
        }
        else {
            res.render('not_found');
        }
    }
};

export default MainRouter;