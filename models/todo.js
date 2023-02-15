import {model, Schema} from 'mongoose';
import modelNames from "../shared/enums.js";


const todoSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            unique: false
        },
        isDone: {
            type: Boolean,
            default: false
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            select: false,
            ref: modelNames.user,
        }
    },
    {
        timestamps: true,
        versionKey: false
    });

const todoModel = model(modelNames.todo, todoSchema);
export default todoModel