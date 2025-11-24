const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query(`
    SELECT * FROM roles;
  `);

  return console.log(rows);
}
