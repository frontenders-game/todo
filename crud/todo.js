import todoModel from "../models/todo.js"

export default class todoCRUD {
    static create = ({text, userId}) => todoModel.create({text, userId});
    static exists = (filter) => todoModel.exists(filter).lean();
    static getOne = (filter) => todoModel.findOne(filter).lean()
    static getAll = (filter) => todoModel.find(filter).lean();
    static deleteOne = (filter) => todoModel.deleteOne(filter).lean();
    static updateOne = (filter, data) => todoModel.updateOne(filter, data).lean();
}
