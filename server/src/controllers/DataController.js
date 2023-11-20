import { DataCollector } from '../models/DataCollector.js'

export class DataController {
  dataCollector

  constructor() {
    this.dataCollector = new DataCollector()
  }

  async loadUser(req, res, next, userId) {
    req.user = userId
    next()
  }

  getAllUsers() {
    return this.dataCollector.getAllUsers()
  }

  getMatches(userId) {
     return this.dataCollector.getMatches(`${userId}`)
  }
}