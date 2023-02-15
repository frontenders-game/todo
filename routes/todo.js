import express from "express";
import todoCRUD from "../crud/todo.js";
import checkAuth from "../middlewares/auth.js";
import {successfulResponse} from "../shared/utils.js"


const router = express.Router();

router.get('/:todoId', checkAuth, async (req, res, next) => {
    try {
        const todoId = req.params.todoId
        const todo = await todoCRUD.getOne({_id: todoId, userId: req.user._id});
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

router.get('/all', checkAuth, async (req, res, next) => {
    try {
        const todos = await todoCRUD.getAll({userId: req.user._id}, '-userId');
        return res.send(successfulResponse({
            message: `List of your Todos`,
            data: {todos: todos}
        }));
    } catch (error) {
        return next(error);
    }
});

router.post('/', checkAuth, async (req, res, next) => {
    try {
        const todo = await todoCRUD.create({...req.body, userId: req.user._id});
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
        const todoUpd = await todoCRUD.updateOne({_id: todoId, userId: req.user._id}, {...req.body});

        if (todoUpd.acknowledged) {
            return res.send(successfulResponse({
                message: 'Success. Todo updated',
                data: await todoCRUD.getOne({_id: todoId, userId: req.user._id})
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
        let todoDel

        if (todoId === 'all'){
            todoDel = await todoCRUD.deleteMany({userId: req.user._id});
         }
        else{
            todoDel = await todoCRUD.deleteOne({_id: todoId, userId: req.user._id});
         }
        if (todoDel.acknowledged) {
            return res.send(successfulResponse({
                message: `Todos deleted: ${todoDel.deletedCount}`,
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

router.delete('/', checkAuth, async (req, res, next) => {
    try {
        const todosDel = await todoCRUD.deleteMany({userId: req.user._id});

        if (todosDel.acknowledged) {
            return res.send(successfulResponse({
                message: `Success. All todos deleted`,
                data: {}
            }));
        } else {
            const err = Error(`No todos deleted`);
            err.status = 404;
            return next(err);
        }
    } catch (error) {
        return next(error);
    }
});


export default router
