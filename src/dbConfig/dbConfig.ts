import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to MongoDB Successfully');
        })

        connection.on('error', (err) => {
            console.log('Error connecting to MongoDB');
            console.log(err);
            process.exit(1);
        })
    }
    catch (error) {
        console.error("Could not connect to MongoDB properly" + error);
    }
}
