import express from 'express'
import createError from 'http-errors'
import { DataController } from '../controllers/DataController.js'

export const router = express.Router()

const dataController = new DataController()

router.get('/', (req, res) => {
  res.status(200).json('WELCOME TO THE API')
})

router.param('userId', (req, res, next, userId) => {
  dataController.loadUser(req, res, next, userId)
})

router.get('/users', (req, res, next) => {
  dataController.getAllUsers(req, res, next)
})

router.get('/:userId', (req, res, next) => {
  dataController.getMatches(req, res, next)
})


// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))