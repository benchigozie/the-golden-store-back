const pool = require("../db/pool");

beforeAll(async () => {
  await pool.query("DELETE FROM users"); 
});

afterAll(async () => {
    await pool.end();
});

test("Should insert a user", async () => {
    const res = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      ["Test User", "test@example.com", "hashedpassword"]
    );
    expect(res.rows[0].email).toBe("test@example.com");
  });

  test("Should retrieve a user by email", async () => {
    const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      "test@example.com",
    ]);
    expect(res.rows.length).toBe(1);
  });

  test("Should update a user's name", async () => {
    await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      ["Old Name", "update@example.com", "hashedpassword"]
    );
  
    await pool.query(`UPDATE users SET name = $1 WHERE email = $2`, [
      "New Name",
      "update@example.com",
    ]);
  
    const res = await pool.query(`SELECT name FROM users WHERE email = $1`, [
      "update@example.com",
    ]);
  
    expect(res.rows[0].name).toBe("New Name");
  });

  test("Should delete a user", async () => {
    await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      ["ToDelete", "delete@example.com", "hashedpassword"]
    );
  
    await pool.query(`DELETE FROM users WHERE email = $1`, ["delete@example.com"]);
  
    const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      "delete@example.com",
    ]);
    expect(res.rows.length).toBe(0);
  });