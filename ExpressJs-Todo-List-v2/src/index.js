const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = '/data/todos.json'; // Path to the shared file


// Middleware
app.use(bodyParser.json());

// Routes
app.get('/todos', (req, res) => {
    // Read todos from the shared file
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            console.error('Error reading todos file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const todos = JSON.parse(data) || [];
        res.json(todos);
    });
});

app.post('/todos', (req, res) => {
    const { text } = req.body;
    const newTodo = {
        id: Date.now(), // Use timestamp as ID for simplicity
        text
    };

    // Read current todos from the shared file
    fs.readFile(DATA_FILE, (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading todos file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const todos = JSON.parse(data) || [];

        // Add the new todo
        todos.push(newTodo);

        // Write updated todos back to the shared file
        fs.writeFile(DATA_FILE, JSON.stringify(todos), (err) => {
            if (err) {
                console.error('Error writing todos file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).json(newTodo);
        });
    });
});

// Check if the file exists
fs.access(DATA_FILE, fs.constants.F_OK, (err) => {
  if (err) {
      // File does not exist, create it
      fs.writeFile(DATA_FILE, '[]', (err) => {
          if (err) {
              console.error('Error creating todos file:', err);
          } else {
              console.log('Todos file created successfully.');
          }
      });
  }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
