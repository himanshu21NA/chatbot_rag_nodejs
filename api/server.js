const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', (req, res) => {
  let { query, user_id, conversation_id } = req.body;

  if (!query || !user_id) {
    return res.status(400).json({ error: "query and user_id are required" });
  }

  if (!conversation_id) {
    conversation_id = uuidv4();  // generate new ID
  }

  const input = JSON.stringify({ query, user_id, conversation_id });

  exec(`python3 model/rag_pipeline.py '${input}'`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ error: "Python execution failed" });
    }
    const response = JSON.parse(stdout);
    response.conversation_id = conversation_id;
    res.json(response);
  });
});

app.listen(port, () => {
  console.log(`Chatbot backend running at http://localhost:${port}`);
});
