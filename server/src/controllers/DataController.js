import { DataCollector } from '../models/DataCollector.js'

export class DataController {
  dataCollector

  constructor() {
    this.dataCollector = new DataCollector()
  }

  loadUser(req, res, next, userId) {
    try {
      req.user = userId
      next()
    } catch (error) {
      next(error)
    }
  }

  getAllUsers(req, res, next) {
    try {
      const users = this.dataCollector.getAllUsers()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  getMatches(req, res, next) {
    try {
      const matches = this.dataCollector.getMatches(`${req.user}`)
      res.status(200).json(matches)
    } catch (error) {
      next(error)
    }
  }
}