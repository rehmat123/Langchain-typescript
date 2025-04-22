import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { loadMcpTools } from '@langchain/mcp-adapters';
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import dotenv from 'dotenv';

dotenv.config();

// Function to get weather for a location
export async function processQuery(input: string) {
  // Initialize the MCP client for weather
  const weatherTransport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@rehmatalisayany/weather-mcp-server"]
  });

  const weatherClient = new Client({
    name: "weather-client",
    version: "1.0.0"
  });

  try {
    // Connect to the transport
    await weatherClient.connect(weatherTransport);

    // Load tools from the MCP server
    const tools = await loadMcpTools('weather', weatherClient);

    // Initialize the OpenAI model
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
    });

    // Define the agent prompt
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a helpful assistant that will give weather information using MCP Server."],
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad")
    ]);

    // Create the agent with the loaded tools
    const agent = await createOpenAIFunctionsAgent({
      llm: model,
      tools,
      prompt,
    });

    // Create an agent executor with higher recursion limit
    const agentExecutor = AgentExecutor.fromAgentAndTools({
      agent,
      tools,
      verbose: true,
      maxIterations: 10,
    });

    // Run the agent with the user query
    const response = await agentExecutor.invoke({
      input,
    });

    return response;
  } catch (error) {
    console.error("Error executing agent:", error);
    return "Error getting weather information";
  } finally {
    // Clean up connection
    await weatherClient.close();
  }
}

// Example usage
async function main() {
  const result = await processQuery(`What's the weather in Munich and What should I wear today?`);
  console.log("Weather result:", result);
}

// Run the example
main().catch(console.error); 