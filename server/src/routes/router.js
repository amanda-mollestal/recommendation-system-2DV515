import express from 'express'
import createError from 'http-errors'
import { DataController } from '../controllers/DataController.js'

export const router = express.Router()

const dataController = new DataController()

router.get('/', (req, res) => {
  res.json({
    message: 'WELCOME TO THE API'
  })
})

router.param('userId', (req, res, next, userId) => {
  dataController.loadUser(req, res, next, userId)
})

router.get('/users', (req, res) => {
  const users = dataController.getAllUsers()
  res.json(users)
})

router.get('/:userId', (req, res) => {
  const matches = dataController.getMatches(req.user)
  res.json(matches)
})


// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))