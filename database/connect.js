import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let cachedBucket;

export default async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        console.log("ja esta conectado")

        if (cachedBucket) {
            return { connection: mongoose.connection, bucket: cachedBucket }
        }

        cachedBucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: "Imagens",
        });

        return { connection: mongoose.connection, bucket: cachedBucket }
    }

    console.log("conectando...")

    return await mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
        dbName: "despesas"
    }).then(res => {
        console.log("conectado")
        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected from cluster")
        })

        cachedBucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: "Imagens"
        })

        return { connection: mongoose.connection, bucket: cachedBucket }
    });
}