import userCRUD from "../crud/user.js";

const checkAuth = async (req, res, next) => {
    try {
        const apiKey = req.header('apiKey');
        if (!apiKey) {
            // res.status(401);
            const err = Error("'apiKey' is missing in header");
            err.status = 401;
            return next(err);

        }
        const user = await userCRUD.getOne({apiKey: apiKey})
        if (!user) {
            // res.status(404);
            const err = Error("'apiKey' is invalid. Register new one.");
            err.status = 404;
            return next(err);
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

export default checkAuth
