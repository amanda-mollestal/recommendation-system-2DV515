import { DataCollector } from '../models/DataCollector.js'

export class DataController {
  dataCollector

  constructor() {
    this.dataCollector = new DataCollector()
    console.log('hej från datacontroller')
    this.getMatches('7')
  }

  async loadUser(req, res, next, userId) {

    req.user = userId

    next()

  }

  getMatches(userId) {

    setTimeout(() => {
      this.dataCollector.getMatches(userId)
    }, 3000);

    


  }
}