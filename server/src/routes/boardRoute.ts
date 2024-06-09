import express from "express";
import { createBoard } from "../database/boardCreateController";
import { readBoard } from "../database/boardReadController";
import { readDetail } from "../database/boardReadContentController";

const router = express.Router();

router.post("/write", async (req, res) => {
  const { title, writer, content } = req.body;

  try {
    await createBoard(title, writer, content);
    res.status(201).json({ message: "Board created successfully" });
  } catch (error) {
    console.error("Error creating board: ", error);
    res.status(500).json({ message: "Failed to create board" });
  }
});

router.post("/readBoard", async (req, res) => {
  try {
    const boards = await readBoard();
    res.status(200).json(boards);
  } catch (error) {
    console.error("Error reading board: ", error);
    res.status(500).json({ message: "failed to read board" });
  }
});

router.get("/readBoard/:boardId", async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const content = await readDetail(boardId);
    res.status(200).json(content);
  } catch (error) {
    console.error("Error reading detail content: ", error);
    res.status(500).json({ message: "failed to read board" });
  }
});

export default router;
