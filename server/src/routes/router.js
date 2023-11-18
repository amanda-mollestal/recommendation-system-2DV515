import express from 'express'
import createError from 'http-errors'
//import { router as accountRouter } from './api/v1/account-router.js'

export const router = express.Router()

router.get('/', (req, res) => {

  res.json({
    message: 'WELCOME TO THE API'
  })
})


// Catch 404 (ALWAYS keep this as the last route).
//router.use('*', (req, res, next) => next(createError(404)))