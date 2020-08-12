// 데이터베이스 처리 위한 라이브러리 필요
const connection = require("../db/mysql_connection");
const { query } = require("../db/mysql_connection");

// @desc    모든 할일 목록 불러오기 (25개씩)
// @route   GET /api/v1/todos
// @req     offset, limit  ( ?offset=0&limit=25 )
// @res     success, items, cnt
exports.getTodos = async (req, res, next) => {
  let offset = req.query.offset;
  let limit = req.query.limit;

  if (!offset || !limit) {
    res.status(400).json({ message: "parameters setting error" });
    return;
  }

  let query = `select * from todo limit ${offset}, ${limit};`;

  try {
    [rows] = await connection.query(query);
    let cnt = rows.length;
    res.status(200).json({ success: true, items: rows, cnt: cnt });
    return;
  } catch (e) {
    res.status(500).json({ success: false, error: e });
  }
};

// @desc    완료 여부 체크
// @route   PUT /api/v1/todo
// @parameters  todo_id

exports.completeTodo = async (req, res, next) => {
  // 즐겨찾기에 이미 추가된 영화는, 즐겨찾기에 추가되지 않도록 한다.

  let todo_id = req.body.todo_id;
  let completed = req.body.completed;

  let query = `UPDATE todo SET completed = if( completed = '1', '0', '1' ) WHERE id = ${todo_id}`;

  try {
    [result] = await connection.query(query);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(501).json({ error: e });
  }
};
