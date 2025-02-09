import Router = require('koa-router')
import CardController from '../controller/card'

export const getCardMiddleware = () => {
  const router = new Router({
    prefix: '/api',
  })
  const cardController = new CardController()
  router.post('/card', cardController.createCard.bind(cardController))
  router.delete('/card', cardController.deleteCard.bind(cardController))
  router.get('/card', cardController.getCardsByTimeSort.bind(cardController))
  router.get('/card/@me', cardController.getSelfCards.bind(cardController))
  router.post('/card/quickstar', cardController.starCard.bind(cardController))

  return router.routes()
}
