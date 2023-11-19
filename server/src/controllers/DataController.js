import { DataCollector } from '../models/DataCollector.js'

export class DataController {
  dataCollector

  constructor() {
    this.dataCollector = new DataCollector()
    console.log('hej från datacontroller')
  }

  async loadUser(req, res, next, userId) {

    req.user = userId

    next()

  }

  getMatches(userId) {

    console.log('hej från getMatches')

  }
}