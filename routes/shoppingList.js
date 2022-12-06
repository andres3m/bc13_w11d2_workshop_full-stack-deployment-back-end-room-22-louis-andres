import express from "express";
import { getShoppingList, patchListItem, postListItem } from "../models/shoppingList.js";


const router = express.Router();

/* GET shopping list. */
router.get("/", async (req, res) => {
  const data = await getShoppingList();
  res.json({ success: true, payload: data });
});

router.post("/", async (req, res) => {
  const { listItem } = req.body;
  const result = await postListItem(listItem);
  res.status(201).json({ success: true, payload: result });
});

router.patch("/:id", async (req, res) => {
  const { completed } = req.body;
  const result = await patchListItem(req.params.id, completed);
  res.status(201).json({ success: true, payload: result });
});

/*router.delete("/:id", async (req, res) => {
  {
       const result = await deleteListItem(req.params.id);
       return res.json({success:true, payload: result});
   } 
   
})*/

export default router;
