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
    await this.loadCsvData('./movies_large/movies.csv', 'movies')
    await this.loadCsvData('./movies_large/users.csv', 'users')
    await this.loadCsvData('./movies_large/ratings.csv', 'ratings')
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


  getAllUsers() {
    if (this.usersMap && this.usersMap.size > 0) {
      const users = []
      this.usersMap.forEach((value, key) => {
        users.push({ id: key, name: value.name })
      })
      return users
    } else {
      console.log('no users')
      return {}
    }
  }

  getMatches(userId) {

    //const sim = this.euclideanDistance(userId, '2)
    //console.log(sim)
    const matchingUsers = this.findMatchingUsers(userId)
    const recommendations = this.recommendMovies(userId, matchingUsers)
    const userMatches = { users: matchingUsers, movies: recommendations}
   return userMatches
  }

  findMatchingUsers(targetUser) {
    let similarities = []

    for (const [userId, user] of this.usersMap) {
      const name = user.name
      if (userId !== targetUser) {
        const similarity = this.euclideanDistance(targetUser, userId)
        if (similarity > 0) {
          similarities.push({ userId, name, similarity })
        }
      }
    }

    similarities.sort((a, b) => b.similarity - a.similarity)

    return similarities
  }

  euclideanDistance(userA, userB) {

    //console.log(this.ratingsMap.get(userId1))
    const ratingsA = this.ratingsMap.get(userA)
    const ratingsB = this.ratingsMap.get(userB)
    console.log(ratingsA)
    console.log(ratingsB)

    let similarity = 0
    let commonMovies = 0

    ratingsA.forEach((rating, movieId) => {
      if (ratingsB.has(movieId)) {
        similarity += (rating - ratingsB.get(movieId)) ** 2
        commonMovies++
      }
    })

    if (commonMovies === 0) return null

    return 1 / (1 + similarity)
  }

  recommendMovies(targetUser, matchingUsers) {
    // const similarUsers = findSimilarUsers(targetUser, allUsers)
    let movieScores = {}

    for (const matchingUser of matchingUsers) {
      for (const [movieId, rating] of this.ratingsMap.get(matchingUser.userId)) {

        if (!this.ratingsMap.get(targetUser).has(movieId)) {

          if (!movieScores.hasOwnProperty(movieId)) {
            movieScores[movieId] = { id: movieId, title: this.moviesMap.get(movieId).title, score: 0, count: 0 }
          }

          movieScores[movieId].score += rating * matchingUser.similarity
          movieScores[movieId].count += matchingUser.similarity
        }
      }
    }


    let recommendations = []

    for (const [movieId, { id, title, score, count }] of Object.entries(movieScores)) {
      if (count > 0) {
        recommendations.push({ id, title, weightedScore: score / count })
      }
    }

    recommendations.sort((a, b) => b.weightedScore - a.weightedScore)

    return recommendations
  }


}

