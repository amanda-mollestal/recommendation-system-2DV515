import fs from 'fs'
import { parse } from 'csv-parse'

export const moviesMap = new Map()
export const usersMap = new Map()
export const ratingsMap = new Map()


export async function loadCsvData(filePath, fileType) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({
        columns: true, 
        trim: true, 
        delimiter: ';'  
      }))
      .on('data', (record) => {
        try {
          processRecord(record, fileType)
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

function processRecord(record, fileType) {
  switch (fileType) {
    case 'movies':
      moviesMap.set(record.MovieId, { title: record.Title, year: record.Year })
      break
    case 'users':
      usersMap.set(record.UserId, { name: record.Name })
      break
    case 'ratings':
      if (!ratingsMap.has(record.UserId)) {
        ratingsMap.set(record.UserId, new Map())
      }
      ratingsMap.get(record.UserId).set(record.MovieId, parseFloat(record.Rating))
      break
    default:
      throw new Error(`Unknown file type: ${fileType}`)
  }
}