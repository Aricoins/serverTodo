import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';


const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json()); 
app.use(express.static('dist'));

const URL = "https://crudcrud.com/api/a405934e2e02498780cef254a99afbf9/todos";

app.get('/api/todos', async (req, res) => {
  try {
    const response = await axios.get(URL);
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send('Error fetching todos');
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const response = await axios.post(URL, req.body);
    res.status(201).send(response.data);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).send('Error adding todo');
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  try {
    await axios.delete(`${URL}/${todoId}`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send('Error deleting todo');
  }
});

app.put('/api/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  const { text, hashtags, dueDate, completed } = req.body;
  try {
    const response = await axios.put(`${URL}/${todoId}`, {
      text,
      hashtags,
      dueDate,
      completed
    });
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send('Error updating todo');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
