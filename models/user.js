import {model, Schema} from 'mongoose';
import {modelNames} from "../shared/models.js";


const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        apiKey: {
            type: String,
            required: true,
        }
    },
    {timestamps: true});


const userModel = model(modelNames.user, userSchema);
export default userModel
