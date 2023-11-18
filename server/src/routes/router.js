import express from 'express'
import createError from 'http-errors'
//import { router as accountRouter } from './api/v1/account-router.js'
import { usersMap } from '../models/dataCollector.js'
import { moviesMap } from '../models/dataCollector.js'
import { ratingsMap } from '../models/dataCollector.js'


export const router = express.Router()

router.get('/', (req, res) => {

  console.log(usersMap)
  console.log(moviesMap)
  console.log(ratingsMap)


  res.json({
    message: 'WELCOME TO THE API'
  })
})




// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))