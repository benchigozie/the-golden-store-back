const pool = require("../db/pool");


afterAll(async () => {
  await pool.end();
});


test("Database connection should be successful", async () => {
  const res = await pool.query("SELECT 1+1 AS result");
  expect(res.rows[0].result).toBe(2);
});