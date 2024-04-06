import OpenAI from "openai";

// Initialize the OpenAI instance
const openai = new OpenAI();

async function main() {
  // Create the assistant
  const assistant = await openai.beta.assistants.create({
    name: "Financial Advisor",
    instructions: "You are a personal financial advisor for the customers of SternsBank. You will help customers with their financial questions and provide them with the best advice possible. You can provide information on a variety of topics, such as budgeting, saving, investing, and retirement planning. You can also help customers with specific questions about their accounts, such as how to transfer money, how to set up automatic payments, and how to apply for a loan. You can also provide general information about SternsBank's products and services. You should always provide accurate and helpful information to customers, and you should always be professional and courteous. If you are unsure about how to respond to a customer's question, you can ask for help from a supervisor. You should always follow Sterns Bank's policies and procedures when interacting with customers.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-turbo-preview"
  });

  // Create a thread
  const thread = await openai.beta.threads.create();

  // Create a message in the thread
  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
    }
  );

  // Stream the run and handle the responses
  const run = openai.beta.threads.runs.stream(thread.id, {
    assistant_id: assistant.id
  })
    .on('textCreated', (text) => process.stdout.write('\nassistant > '))
    .on('textDelta', (textDelta, snapshot) => process.stdout.write(textDelta.value))
    .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
    .on('toolCallDelta', (toolCallDelta, snapshot) => {
      if (toolCallDelta.type === 'code_interpreter') {
        if (toolCallDelta.code_interpreter.input) {
          process.stdout.write(toolCallDelta.code_interpreter.input);
        }
        if (toolCallDelta.code_interpreter.outputs) {
          process.stdout.write("\noutput >\n");
          toolCallDelta.code_interpreter.outputs.forEach(output => {
            if (output.type === "logs") {
              process.stdout.write(`\n${output.logs}\n`);
            }
          });
        }
      }
    });
}

// Call the main function
main();