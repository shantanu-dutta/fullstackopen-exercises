import 'dotenv/config'

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_URI
  : process.env.TEST_MONGODB_URI

export default {
  PORT,
  MONGODB_URI
}
