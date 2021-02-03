const path = require('path')
const multer = require('multer')
const crypto = require('crypto')

const uploadsFolder = path.resolve(__dirname, '..', 'files')
module.exports = {
  directory: uploadsFolder,
  storage: multer.diskStorage({
    destination: uploadsFolder,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(8).toString('hex')
      const fileName = `${fileHash}${file.originalname}`

      return callback(null, fileName)
    },
  }),
}
