import express from 'express'
import createError from 'http-errors'
import { DataController } from '../controllers/DataController.js'

const dataController = new DataController()
console.log('hej från matchRouter')

export const router = express.Router()

router.param('userId', (req, res, next, userId) => {
  dataController.loadUser(req, res, next, userId)
})

router.get('/:userId', (req, res) => {
  console.log('kom till get nu')

  dataController.getMatches(req.user)
})