import mongoose from "mongoose";

export async function connect() {
    try {
        const MONGO_URI = process.env.MONGO_URI;

        if (!MONGO_URI) {
            throw new Error("Please define the MONGO_URI environment variable in your .env file.");
        }

        mongoose.connect(MONGO_URI);
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('Database Connected');
        })

        connection.on('error', (err) => {
            console.log('Database connextion error, Please make sure db is up and running: ' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong in connecting to DB');
        console.log(error);
    }
}