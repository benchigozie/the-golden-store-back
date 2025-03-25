const pool = require("../db/pool");

const tables = ["users", "products", "orders", "order_items", "promo_codes"];

afterAll(async () => {
    await pool.end();
});

test.each(tables)("Tables should exist", async (table) => {
    const res = await pool.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1) AS exists`,
        [table]
    );
    expect(res.rows[0].exists).toBe(true);
});