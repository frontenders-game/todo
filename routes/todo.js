import express from "express";
import todoCRUD from "../crud/todo.js";
import userCRUD from "../crud/user.js";
import checkAuth from "../middlewares/auth.js";
import {successfulResponse} from "../shared/utils.js"
import {todoStatus} from "../shared/models.js";


const router = express.Router();

router.get('/:todoId', checkAuth, async (req, res, next) => {
    try {
        const todoId = req.params.todoId
        const apiKey = req.header('apiKey');
        const user = await userCRUD.getOne({apiKey: apiKey})
        const todo = await todoCRUD.getOne({_id: todoId, userId: user._id});
        if (todo) {

            return res.send(successfulResponse({data: todo}));
        } else {
            const err = Error(`Todo with id '${todoId}' doesn't exist`);
            err.status = 404;
            return next(err);
        }

    } catch (error) {
        return next(error);
    }
});

router.get('/', checkAuth, async (req, res, next) => {
    try {
        const apiKey = req.header('apiKey');
        const user = await userCRUD.getOne({apiKey: apiKey})
        const todos = await todoCRUD.getAll({userId: user._id}, '-userId');
        return res.send(successfulResponse({
            message: `List of your Todos`,
            data: todos
        }));
    } catch (error) {
        return next(error);
    }
});

router.post('/', checkAuth, async (req, res, next) => {
    try {
        const apiKey = req.header('apiKey');
        const user = await userCRUD.getOne({apiKey: apiKey})
        const todo = await todoCRUD.create({...req.body, userId: user._id});
        res.send(successfulResponse({
            message: `Success. Todo created`,
            data: {todo: todo}
        }));
    } catch (error) {
        next(error);
    }
});

router.patch('/:todoId', checkAuth, async (req, res, next) => {
    try {
        const todoId = req.params.todoId
        const apiKey = req.header('apiKey');
        const user = await userCRUD.getOne({apiKey: apiKey})
        const todoUpd = await todoCRUD.updateOne({_id: todoId, userId: user._id},
            {...req.body, status: todoStatus.created});

        if (todoUpd.acknowledged) {
            return res.send(successfulResponse({
                message: 'Success. Todo updated',
                data: await todoCRUD.getOne({_id: todoId, userId: user._id})
            }));
        } else {
            const err = Error(`Todo with id '${todoId}' doesn't exist`);
            err.status = 404;
            return next(err);
        }
    } catch (error) {
        return next(error);
    }
});

router.delete('/:todoId', checkAuth, async (req, res, next) => {
    try {
        const todoId = req.params.todoId
        const apiKey = req.header('apiKey');
        const user = await userCRUD.getOne({apiKey: apiKey})
        const todoDel = await todoCRUD.deleteOne({_id: todoId, userId: user._id});

        if (todoDel.acknowledged) {
            return res.send(successfulResponse({
                message: 'Success. Todo deleted',
                data: {}
            }));
        } else {
            const err = Error(`Todo with id '${todoId}' doesn't exist`);
            err.status = 404;
            return next(err);
        }
    } catch (error) {
        return next(error);
    }
});


export default router
