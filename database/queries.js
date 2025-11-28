const pool = require("./pool");

async function addUser(name, last_name, username, password) {
  const check = await pool.query(
    `
    SELECT * FROM users
    WHERE username = $1  
  `,
    [username]
  );

  if (check.rows.length > 0) {
    return false;
  }

  const { rows } = await pool.query(
    `
    INSERT INTO users (name, last_name, username, password, role_id)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING id;
  `,
    [name, last_name, username, password, 3]
  );

  return rows[0].id; //! revisa aqui y arriba, asi como el controller de register
}

async function getUser(username) {
  const { rows } = await pool.query(
    `
    SELECT * FROM users
    WHERE username = $1;
  `,
    [username]
  );

  if (rows.length === 0) return null;

  return rows[0];
}

async function getSessionInfo(id) {
  const { rows } = await pool.query(
    `
    SELECT name, last_name, username, role_id
    FROM users
    WHERE id = $1
  `,
    [id]
  );

  if (rows.length === 0) return null;

  return rows[0];
}

async function deleteUser(id) {
  const { rowCount } = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1;  
  `,
    [id]
  );

  return rowCount;
}

// expects an object with the modified columns and new data
async function editUser(userData, id) { //! check if this works with id or username
  const forbidden = ["role_id", "id"];

  const columns = Object.keys(userData);
  const newValues = Object.values(userData);

  const conflict = columns.some((col) => forbidden.includes(col));
  if (conflict) throw new Error("You dont have access to role changing");

  try {
    const setClause = columns
      .map((col, index) => `${col} = $${index + 2}`)
      .join(", ");

    const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = $1
    `;

    const params = [id, ...newValues];

    const { rowCount } = await pool.query(query, params);
    return rowCount;
  } catch (err) {
    console.error(err);
    throw new Error("Ups, having problems with the DB");
  }
}

async function addPost(title, message, author_id) {
  const result = await pool.query(
    `
    INSERT INTO posts (title, message, upload_date, author_id)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *;
  `,
    [title, message, new Date(), author_id]
  );

  return result;
}

async function getAllPosts() {
  const { rows } = await pool.query(`
    SELECT * FROM posts
    ORDER BY upload_date ASC;  
  `);

  return rows;
}

async function deletePost(id) {
  const { rowCount } = pool.query(
    `
    DELETE FROM posts
    WHERE id = $1  
  `,
    [id]
  );

  return rowCount;
}

async function editPost(message, title, id) {
  const { rowCount } = pool.query(
    `
    UPDATE posts
    SET title = $1, message = $2
    WHERE id = $3;  
  `,
    [title, message, id]
  );

  return rowCount;
}

module.exports = {
  addUser,
  getUser,
  getSessionInfo,
  deleteUser,
  editUser,
  addPost,
  getAllPosts,
  deletePost,
  editPost,
};
