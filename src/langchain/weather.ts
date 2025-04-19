import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { DynamicTool } from "@langchain/core/tools";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import dotenv from 'dotenv';

dotenv.config();

// Initialize the MCP client for weather
const weatherTransport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "@rehmatalisayany/weather-mcp-server"]
});

const weatherClient = new Client({
  name: "weather-client",
  version: "1.0.0"
});

await weatherClient.connect(weatherTransport);

// Create a tool for getting weather
const getWeatherTool = new DynamicTool({
  name: "getWeather",
  description: "Get the current weather for a location",
  func: async (location: string) => {
    try {
      const result = await weatherClient.callTool({
        name: "getWeather",
        arguments: { location },
      });
      return JSON.stringify(result);
    } catch (error) {
      console.error("Error getting weather:", error);
      return "Error getting weather information";
    }
  },
});

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

// Create the agent and executor
async function createAgent() {
  const agent = await createOpenAIFunctionsAgent({
    llm: model,
    tools: [getWeatherTool],
    prompt: prompt,
  });

  return new AgentExecutor({
    agent,
    tools: [getWeatherTool],
    verbose: true,
  });
}

// Function to get weather for a location
export async function getWeatherForLocation(location: string) {
  try {
    const agentExecutor = await createAgent();
    const result = await agentExecutor.invoke({
      input: `What's the weather in ${location}?`,
    });
    return result;
  } catch (error) {
    console.error("Error executing agent:", error);
    return "Error getting weather information";
  }
}

// Example usage
async function main() {
  const location = "Munich";
  console.log(`Getting weather for ${location}...`);
  const result = await getWeatherForLocation(location);
  console.log("Weather result:", result);
}

// Run the example
main().catch(console.error); 