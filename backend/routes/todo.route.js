// CRUD Operation
import express from "express";
import Todo from "../models/todo.model.js";

const router = express.Router();

// GET /api/todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add a new todo
router.post("/", async (req, res) => {
    console.log("Received request body:", req.body); // <-- Add this

    const todo = new Todo({
        text: req.body.text
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error saving todo:", error); // <-- Add this
        res.status(400).json({ message: error.message });
    }
});

// Update a todo (text and/or completed)
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not Found" });

    if (req.body.text !== undefined) {
      todo.text = req.body.text;
    }

    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete the Todo
router.delete("/:id" , async (req, res) =>{
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.json({message: "Todo deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router;