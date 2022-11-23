import Controller from './controller.interface'
import { Router, Request, Response, NextFunction } from 'express'
import { isValidURL, shortenURL } from '../helper'
import AppError from '../exceptions/exception.apperror'

let links: Array<{ id: string, link: string }> = []

interface ITemplateData {
  shortened_links: Array<{ id: string, link: string }>
}
class MainRouter implements Controller {
  public path = '/'
  public router = Router()

  constructor () {
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.get(this.path, this.homeHandlerGet)
    this.router.get(this.path + 'shorten', this.shortenHandlerGet)
    this.router.post(this.path + 'shorten', this.checkUrlValidity, this.shortenHandlerPost)
    this.router.patch(this.path + 'shorten/:url_id', this.changeLongUrl)
    this.router.get(this.path + 'rd/:rd_id', this.redirectToLongURL)
  }

  private homeHandlerGet (req: Request, res: Response): void {
    const templateData: ITemplateData = { shortened_links: links }
    res.render('index', templateData)
  }

  private shortenHandlerGet (req: Request, res: Response): void {
    res.redirect('/')
  }

  private checkUrlValidity (req: Request, res: Response, next: NextFunction): void {
    const url = req.body.url
    if (typeof url === 'string' && isValidURL(url)) {
      next()
    } else {
      const error = new AppError(400, 'The link you tried to shorten is not valid. Please try again')
      next(error)
    }
  }

  private shortenHandlerPost (req: Request, res: Response): void {
    let shortenedUrl = shortenURL(req.body.url)
    while (links.filter(l => l.id === shortenedUrl.id).length > 0) {
      shortenedUrl = shortenURL(req.body.url)
    }
    links = [...links, shortenedUrl]
    const templateData: ITemplateData = {
      shortened_links: links
    }
    res.render('index', templateData)
  }

  private redirectToLongURL (req: Request, res: Response, next: NextFunction): void {
    const rdId = req.params.rd_id
    const surl = links.filter(shortenedUrl => shortenedUrl.id === rdId)
    try {
      res.redirect(surl[0].link)
    } catch (_e) {
      next(new AppError(404, 'The link cannot be found'))
    }
  }

  private changeLongUrl (req: Request, res: Response, next: NextFunction): void {
    const urlId = req.params.url_id
    const newLongLink = req.body.longLink
    const surl = links.find(shortenedUrl => shortenedUrl.id === urlId)

    if (surl != null && newLongLink != null) {
      surl.link = newLongLink
      res.json({ message: 'changed' })
    } else {
      next(new AppError(400, 'Check the link ID and make sure you\'re passing the new link'))
    }
  }
};

export default MainRouter
