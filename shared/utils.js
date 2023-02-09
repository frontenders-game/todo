import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';
import config from "./config.js";

const connectMongoDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const mongoUri = `mongodb://${config.mongoHost}:${config.mongoPort}/${config.mongoDbName}`
        const con = await mongoose.connect(mongoUri);
        console.log(`[MongoDB] Connected to '${con.connection.name}' DB`);
    } catch (err) {
        console.log('[MongoDB] Error : ', err.message);
        process.exit(0);
    }
}

const successfulResponse = (
    {message = 'Success', data = {}, status = true}) => ({data, status, message});

const failedResponse = (
    {message = 'Failed', data = {}, status = false}) => ({data, status, message});

const generateApiKey = () => uuidv4()

export {
    connectMongoDB,
    successfulResponse,
    failedResponse,
    generateApiKey
}

