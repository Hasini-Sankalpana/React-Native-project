import express from 'express'
import { getItemDetails, listitem } from '../controllers/itemController.js'

const itemRouter = express.Router()

itemRouter.post('/item',listitem)
itemRouter.get('/item',getItemDetails)

export default itemRouter;