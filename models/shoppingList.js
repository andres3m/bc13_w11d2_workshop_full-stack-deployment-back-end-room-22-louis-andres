import { pool } from "../db/index.js";

export async function getShoppingList() {
  const data = await pool.query("SELECT * FROM shopping;");
  console.log("The shopping list is", data.rows);
  return data.rows;
}

export async function postListItem(listItem) {
  const { item, completed } = listItem;
  const data = await pool.query(
    `INSERT INTO shopping (
      item,
      completed
    ) VALUES ($1,$2) RETURNING *;`,
    [item, completed]
  );
  return data.rows[0];
}

export async function patchListItem(id, updates) {
  const { completed, id } = updates;
  const result = await pool.query(
    `UPDATE shopping
    SET completed = $1
    WHERE id = $2; RETURNING *;`,
    [completed, id]
  );
  return result.rows[0];
}

/*export async function deleteListItem(id) {
  {
    const deleteListItem = await pool.query(
      "DELETE FROM shopping WHERE id = $1 RETURNING *;",
      [id]
    );
    return deleteListItem.rows;
  } 

}*/