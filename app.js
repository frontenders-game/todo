import express from "express"
import cors from 'cors'
import createError from "http-errors" // const createError = require("http-errors");
import path from "path"
import {fileURLToPath} from 'url';
import {connectMongoDB, failedResponse} from "./shared/utils.js";
import logger from "morgan"
import livereload from "livereload"
import connectLiveReload from "connect-livereload"
import indexRouter from "./routes/index.js"
import usersRouter from "./routes/user.js"
import todosRouter from "./routes/todo.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


await connectMongoDB();

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

const app = express();

app.use(connectLiveReload());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", indexRouter);
app.use("/api/user", usersRouter);
app.use("/api/todo", todosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(failedResponse(
        {
            message: `Error: ${err.message}`,
            data: {}
        }))
});

export default app