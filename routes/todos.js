const express = require("express");
const { getTodos, completeTodo } = require("../controllers/todos");

const router = express.Router();

router.route("/").get(getTodos);
router.route("/").put(completeTodo);

module.exports = router;
