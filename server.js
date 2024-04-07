const express = require('express');
const { main } = require('./chatBot.js');
const app = express();

app.use(express.json());

app.post('/api/chatbot', async (req, res) => {
  const userInput = req.body.prompt;
  const response = await main(userInput);
  res.json(response);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});