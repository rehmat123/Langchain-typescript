import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import dotenv from 'dotenv';

dotenv.config();

// Create client with multiple MCP servers
const client = new MultiServerMCPClient({
  // Global tool configuration
  throwOnLoadError: true,
  prefixToolNameWithServerName: true,
  additionalToolNamePrefix: "mcp",

  // Server configurations
  mcpServers: {
    // Weather server
    weather: {
      transport: "stdio",
      command: "npx",
      args: ["-y", "@rehmatalisayany/weather-mcp-server"],
      restart: {
        enabled: true,
        maxAttempts: 3,
        delayMs: 1000,
      },
    },
    // Math server for calculations
    math: {
      transport: "stdio",
      command: "npx",
      args: ["-y", "nm-mcp-math"],
      restart: {
        enabled: true,
        maxAttempts: 3,
        delayMs: 1000,
      },
    },
  },
});

// Initialize the OpenAI model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});

// Function to process weather queries specifically
export async function processQuery(input: string) {
  try {
    // Get all tools from configured servers
    const tools = await client.getTools();

    // Define a specialized prompt for weather queries
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `You are a helpful assistant that uses MCP Server to get weather information as well as perform calculations.
IMPORTANT: Always use the "mcp__weather__getWeather" tool with the location parameter to get weather information.
For example, 
if asked about Munich's weather, call mcp__weather__getWeather with {{ location: "Munich" }}.
if asked about Mumbai's weather, call mcp__weather__getWeather with {{ location: "Mumbai" }}.
If asked about weather in any other city, call mcp__weather__getWeather with {{ location: city }}.`],
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad")
    ]);

    // Create the agent
    const agent = await createOpenAIFunctionsAgent({
      llm: model,
      tools,
      prompt,
    });

    // Create an agent executor with higher recursion limit and verbose output
    const agentExecutor = AgentExecutor.fromAgentAndTools({
      agent,
      tools,
      verbose: true,
      maxIterations: 10,
    });

    // Run the agent with the query
    const response = await agentExecutor.invoke({
      input: input
    });

    return response;
  } catch (error) {
    console.error("Error during agent execution:", error);
    if (error.name === "ToolException") {
      console.error("Tool execution failed:", error.message);
    }
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // Example weather query using specialized function
    console.log("Checking weather via specialized function...");
    const result = await processQuery("What's the weather in Munich and what should i wear today also what is 2 + 2x 2?");
    console.log("Weather result:", result);


  } catch (error) {
    console.error("Error in main:", error);
  } finally {
    // Clean up all connections
    await client.close();
  }
}

// Run the example
main().catch(console.error); 