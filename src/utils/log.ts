import * as fs from 'fs'

export const writeLog = (file: string, data: string) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(`./logs/${file}.log`, `------\n${new Date().toISOString()}\n${data}\n------\n\n`, (err) => {
      if (err) {
        reject('Error during appending to log file')
      } else {
        resolve()
      }
    })
  })
}
