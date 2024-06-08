import express from "express";
import { createBoard } from "../database/createBoardController";

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, writer, content } = req.body;

  try {
    await createBoard(title, writer, content);
    res.status(201).json({ message: "Board created successfully" });
  } catch (error) {
    console.error("Error creating board: ", error);
    res.status(500).json({ message: "Failed to create board" });
  }
});

export default router;
