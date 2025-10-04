import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async (uri: string) => {
    try {
        const conn = await mongoose.connect(uri)
        console.log(colors.green.underline.bold(`Database connected: ${conn.connection.host} - ${conn.connection.name} - ${conn.connection.port}`))
    } catch (error) {
        console.log(colors.red.underline.bold(`Error: ${(error as Error).message}`))
        process.exitCode = 1
    }
}

export default connectDB