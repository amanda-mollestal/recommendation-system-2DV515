import { DataCollector } from '../models/DataCollector.js'

export class DataController {
  dataCollector

  constructor() {
    this.dataCollector = new DataCollector()
    console.log('hej från datacontroller')
  }

  async loadUser(req, res, next, userId) {

    console.log('hej från loadUser')
    console.log(userId)
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