// Define your API key and the API endpoint
const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openai.com/v1/completions';

// Define the prompt you want to send to the API
const prompt = 'Once upon a time, ';

// Define the data to be sent in the request body
const data = {
  prompt: prompt,
  max_tokens: 100,
  temperature: 0.7,
  n: 1
};

// Define the options for the Fetch request
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify(data)
};

// Make the Fetch request to the API endpoint
fetch(apiUrl, requestOptions)
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    console.log(data.choices[0].text.trim());
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });
