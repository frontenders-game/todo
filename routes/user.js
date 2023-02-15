import express from "express";
import userCRUD from "../crud/user.js";
import checkAuth from "../middlewares/auth.js"
import {failedResponse, generateApiKey, successfulResponse} from "../shared/utils.js"

const router = express.Router();

const REGISTER_PATH = 'register'

router.get(`/`, async (req, res, next) => {
    return res.json(failedResponse(
        {
            message: `use /api/user/${REGISTER_PATH} to get api key`,
            data: {}
        }))
})

router.get(`/${REGISTER_PATH}`, async (req, res, next) => {
    try {
        const newKey = generateApiKey()
        await userCRUD.create({apiKey: newKey, firstName: "", lastName: ""})
        const user = await userCRUD.getOne({apiKey: newKey})
        return res.json(successfulResponse(
            {
                message: `Success. Your api key: ${newKey}`,
                data: user
            }));
    } catch (error) {
        return next(error);
    }
});

router.patch('/update', checkAuth, async (req, res, next) => {
    try {
        const userUpd = await userCRUD.updateOne({apiKey: req.user.apiKey}, {...req.body})
        if (userUpd.acknowledged) {
            return res.json(successfulResponse(
                {
                    message: `Success. User updated`,
                    data: req.user
                }));
        } else {
            return res.json(failedResponse(
                {
                    message: `Error. Try again. User wasn't updated`,
                    data: req.user
                }));
        }
    } catch (error) {
        return next(error);
    }
});

router.delete('/delete', checkAuth, async (req, res, next) => {
    try {
        const apiKey = req.user.apiKey;
        const userDel = await userCRUD.deleteOne({apiKey})
        if (userDel.acknowledged) {
            return res.json(successfulResponse(
                {
                    message: `Success. User (apiKey: ${apiKey}) was deleted`,
                    data: {}
                }));
        } else {
            const err = Error(`Error. User wasn't deleted. Try again.`);
            err.status = 404;
            return next(err);
        }
    } catch (error) {
        return next(error);
    }
});


export default router
