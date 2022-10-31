import Controller from './controller.interface'
import { Router, Request, Response, NextFunction } from 'express'
import { isValidURL, shortenURL } from '../helper'

let links: Array<{ id: string, link: string }> = []

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
    this.router.get(this.path + 'rd/:rd_id', this.redirectToLongURL)
  }

  private homeHandlerGet (req: Request, res: Response): void {
    res.render('index', { try_shorten: false })
  }

  private shortenHandlerGet (req: Request, res: Response): void {
    res.redirect('/')
  }

  private checkUrlValidity (req: Request, res: Response, next: NextFunction): void {
    req.body.isValid = false
    if (isValidURL(req.body.url)) {
      req.body.isValid = true
    }
    next()
  }

  private shortenHandlerPost (req: Request, res: Response): void {
    const templateData = { try_shorten: true, isvalid: false, orig_link: '', shortened_link: '' }
    const linkValidity: boolean = req.body.isValid
    if (linkValidity) {
      let shortenedUrl = shortenURL(req.body.url)

      // even though its unlikely we should still check if there's a saved link with the same ID
      // as this newly generated one before inserting into links array
      while (links.filter(l => l.id === shortenedUrl.id).length > 0) {
        shortenedUrl = shortenURL(req.body.url)
      }
      links = [...links, shortenedUrl]

      templateData.isvalid = true
      templateData.orig_link = req.body.url
      templateData.shortened_link = shortenedUrl.id
    } else {
      templateData.isvalid = false
    }
    res.render('index', templateData)
  }

  private redirectToLongURL (req: Request, res: Response): void {
    const rdId = req.params.rd_id
    const surl = links.filter(shortenedUrl => shortenedUrl.id === rdId)
    if (surl.length > 0) {
      res.redirect(surl[0].link)
    } else {
      res.render('not_found')
    }
  }
};

export default MainRouter
