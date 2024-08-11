import express from "express";
import { config } from "dotenv";
import db from "../db.js";

config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    const [ordered_products] = await db.query(`
        SELECT 
            o.id AS order_id,
            o.ordered_at,
            p.name AS product_name,
            op.tracking_code
        FROM 
            pm_user u
        JOIN 
            pm_order o ON u.id = o.user_id
        JOIN 
            pm_order_product op ON o.id = op.order_id
        JOIN 
            pm_product p ON op.product_id = p.id
        WHERE 
            u.email = '${email}'
        ORDER BY o.ordered_at DESC;
`);

    res.json(ordered_products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error: " + error);
  } finally {
    res.end();
  }
});

export default router;
