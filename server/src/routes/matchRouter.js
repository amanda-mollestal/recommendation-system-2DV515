import express from 'express'
import createError from 'http-errors'
import { MatchController } from '../controllers/matchController.js'

const matchController = new MatchController()


export const router = express.Router()

router.param('userId', (req, res, next, userId) => {
  console.log('matchrouter: ' + userId)
  matchController.loadUser(req, res, next, userId)
})

router.get('/:userId', (req, res) => {
  console.log('kom till get nu')
})