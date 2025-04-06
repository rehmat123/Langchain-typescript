import { z } from "zod";
import { StructuredTool, tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { isAIMessage } from "@langchain/core/messages";
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


const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
});

const tools = [new AddTool(), new MultiplyTool()];
const llmWithTools = model.bindTools(tools);

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant that can perform math operations using tools."],
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad"),
]);

async function llmCall(state: typeof MessagesAnnotation.State) {
    // LLM decides whether to call a tool or not
    const result = await llmWithTools.invoke([
        {
            role: "system",
            content: "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
        },
        ...state.messages
    ]);

    return {
        messages: [result]
    };
}

const toolNode = new ToolNode(tools);

// Conditional edge function to route to the tool node or end
function shouldContinue(state: typeof MessagesAnnotation.State) {
    const messages = state.messages;
    const lastMessage = messages.at(-1);

    // If the LLM makes a tool call, then perform an action
    if (lastMessage) {
        const toolCall = isAIMessage(lastMessage) ? lastMessage.tool_calls : undefined;
        if (toolCall && toolCall.length > 0) {
            return "Action";
        }
    }
    // Otherwise, we stop (reply to the user)
    return "__end__";
}

// Build workflow
const agentBuilder = new StateGraph(MessagesAnnotation)
    .addNode("llmCall", llmCall)
    .addNode("tools", toolNode)
    // Add edges to connect nodes
    .addEdge("__start__", "llmCall")
    .addConditionalEdges(
        "llmCall",
        shouldContinue,
        {
            // Name returned by shouldContinue : Name of next node to visit
            "Action": "tools",
            "__end__": "__end__",
        }
    )
    .addEdge("tools", "llmCall")
    .compile();

const messages = [{
    role: "user",
    content: "Add 3 and 4 than multiple that by 10 and divide it by 2."
}];
(async () => {
    const result = await agentBuilder.invoke({ messages });
    const answer = result.messages;
    const lastMessage = answer[answer.length - 1];

    // Log the content of the last message, which contains the final answer
    console.log(lastMessage.content);
})();