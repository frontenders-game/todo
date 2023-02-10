import {model, Schema} from 'mongoose';
import {modelNames, todoStatus} from "../shared/models.js";


const todoSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            unique: false
        },
        status: {
            type: String,
            default: todoStatus.created,
            enum: Object.values(todoStatus),
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: modelNames.user,
        }
    },
    {timestamps: true});

const todoModel = model(modelNames.todo, todoSchema);
export default todoModel