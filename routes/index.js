import express from "express";

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', {title: 'Hey', message: 'Hello there!'})
})

export default router
