import mongoose from 'mongoose'

const connectDB = async () => {
  const { MONGODB_URI } = process.env

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables')
  }

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected')
  })

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected')
  })

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message)
  })

  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message)
    throw error
  }
}

export default connectDB
