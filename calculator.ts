
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredTool } from "@langchain/core/tools";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import dotenv from 'dotenv';

dotenv.config();

class AddTool extends StructuredTool {
    name = "add";
    description = "Add two numbers together";
    schema = z.object({
      a: z.number().describe("The first number"),
      b: z.number().describe("The second number"),
    });
  
    async _call({ a, b }: { a: number; b: number }): Promise<string> {
      return (a + b).toString();
    }
  }
  
  class MultiplyTool extends StructuredTool {
      name = "multiply";
      description = "Multiply two numbers together";
      schema = z.object({
        a: z.number().describe("The first number"),
        b: z.number().describe("The second number"),
      });
    
      async _call({ a, b }: { a: number; b: number }): Promise<string> {
        return (a * b).toString();
      }
    }
  
  const addTool = new AddTool();
  const multiplyTool = new MultiplyTool();
  
  // Create an OpenAI chat model
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });
  
  // Define the agent prompt
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant that can perform math operations using tools."],
    ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad")
  ]);

  // Initialize the agent and executor asynchronously
  const initializeAgent = async () => {
    // Create the agent with the tools
    const agent = await createOpenAIFunctionsAgent({
      llm: model,
      tools: [addTool, multiplyTool],
      prompt: prompt
    });
  
    // Create the agent executor
    return new AgentExecutor({
      agent,
      tools: [addTool, multiplyTool],
      verbose: true,
    });
  };

  let agentExecutor: AgentExecutor;
    
  // Initialize the agent and run the invocation
  (async () => {
    try {
      agentExecutor = await initializeAgent();
      console.log("Agent initialized successfully");
      
      const result = await agentExecutor.invoke({
        input: "Add 3 and 4 than multiple that by 10 and divide it by 2"
      });
    } catch (error) {
      console.error("Failed to initialize agent:", error);
      process.exit(1);
    }
  })();
