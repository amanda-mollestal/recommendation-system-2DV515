import fs from 'fs'
import { parse } from 'csv-parse'


export class DataCollector {
  moviesMap 
  usersMap
  ratingsMap

  constructor() {
    this.moviesMap = new Map()
    this.usersMap = new Map()
    this.ratingsMap = new Map()

    this.readFiles()
  }

  async readFiles() {
    await this.loadCsvData('./movies_example/movies.csv', 'movies')
    await this.loadCsvData('./movies_example/users.csv', 'users')
    await this.loadCsvData('./movies_example/ratings.csv', 'ratings')
  }

  async loadCsvData(filePath, fileType) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(parse({
          columns: true,
          trim: true,
          delimiter: ';'
        }))
        .on('data', (record) => {
          try {
            this.processRecord(record, fileType)
          } catch (err) {
            reject(err)
          }
        })
        .on('end', () => {
          resolve()
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  processRecord(record, fileType) {
    switch (fileType) {
      case 'movies':
        this.moviesMap.set(record.MovieId, { title: record.Title, year: record.Year })
        break
      case 'users':
        this.usersMap.set(record.UserId, { name: record.Name })
        break
      case 'ratings':
        if (!this.ratingsMap.has(record.UserId)) {
          this.ratingsMap.set(record.UserId, new Map())
        }
        this.ratingsMap.get(record.UserId).set(record.MovieId, parseFloat(record.Rating))
        break
      default:
        throw new Error(`Unknown file type: ${fileType}`)
    }
  }

  // fixa
  get movies() {
    return this.moviesMap
  }

  get users() {
    return this.usersMap
  }

  get ratings() {
    return this.ratingsMap
  }

}

