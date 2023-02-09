import userModel from "../models/user.js"

export default class userCRUD {
    static create = ({apiKey, firstName, lastName}) => userModel.create({apiKey, firstName, lastName});
    static exists = (filter) => userModel.exists(filter).lean();
    static getOne = (filter) => userModel.findOne(filter).lean()
    static getAll = (filter) => userModel.find(filter).lean();
    static deleteOne = (filter) => userModel.deleteOne(filter).lean();
    static updateOne = (filter, data) => userModel.updateOne(filter, data).lean();
}

