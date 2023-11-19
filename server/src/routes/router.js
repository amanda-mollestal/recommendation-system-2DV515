import express from 'express'
import createError from 'http-errors'
//import { router as accountRouter } from './api/v1/account-router.js'

import { router as matchRouter } from './matchRouter.js'


export const router = express.Router()

router.get('/', (req, res) => {


  res.json({
    message: 'WELCOME TO THE API'
  })
})

router.get('/users', (req, res) => {
  //console.log(usersMap)
  //res.json(Array.from(usersMap.values()))
})

router.use('/matches', matchRouter)
//router.use('/matches', () =>
  //console.log('first'), matchRouter)  





// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))