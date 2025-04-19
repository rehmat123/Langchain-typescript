# 🤖 LangChain + LangGraph AI Agent (TypeScript)

Build an AI-powered agent using [LangChain](https://js.langchain.com) and [LangGraph](https://github.com/langchain-ai/langgraph) in TypeScript. This project demonstrates how to set up an agent capable of performing reasoning, using tools, and navigating a graph-based workflow.

---

## 🛠 Features

- ⚙️ Agent setup with `ChatPromptTemplate` and `agent_scratchpad`
- 🧩 Custom tools (e.g., math operations)
- 🔄 LangGraph node/edge architecture
- 🌐 OpenAI (or other LLMs) powered reasoning
- ✨ Modular, clean TypeScript structure
- 🌤️ Weather information using MCP server

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rehmat123/Langchain-typescript
cd langchain-typescript
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment
Create a .env file in the root:

```bash
OPENAI_API_KEY=your-openai-key
```

### 4. Run the Project

```bash
# Run the calculator agent
pnpm run langchain
pnpm run langraph

# Get weather information
pnpm weather
```

## 🧰 Tech Stack

- [**LangChain.js**](https://js.langchain.com)  
  Framework for building context-aware, language model-driven applications.

- [**LangGraph**](https://github.com/langchain-ai/langgraph)  
  A library for composing agents and chains as stateful graphs.

- **TypeScript**  
  Strongly typed JavaScript for better developer experience and maintainability.

- [**OpenAI**](https://platform.openai.com/) *(or another LLM provider)*  
  Used as the underlying language model to power the agent's reasoning and responses.

- [**MCP Server**](https://github.com/modelcontextprotocol/servers)  
  Model Context Protocol server for retrieving weather information.

## ✅ Future Ideas

- [ ] Add external API tools (e.g., news, stocks)
- [ ] Integrate [LangSmith](https://smith.langchain.com/) for observability and debugging
- [ ] Docker support for easier deployment
- [ ] Web interface using React or Next.js

---


# Weather MCP Server with LangChain

This project demonstrates how to use a Model Context Protocol (MCP) server to get weather information using LangChain.

## Prerequisites

- Node.js (v16 or higher)
- pnpm package manager
- OpenAI API key

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create a `.env` file in the root directory with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```


## Configuration

The project uses the following configuration files:

### MCP Configuration (~/.cursor/mcp.json)
```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "@rehmatalisayany/weather-mcp-server"],
      "transport": "stdio"
    }
  }
}
```


## Usage


1. In a separate terminal, run the weather script:
```bash
pnpm weather
```

This will get the weather for Munich by default. To get weather for a different location, modify the `location` variable in `src/langchain/weather.ts`.

## Project Structure

- `src/langchain/weather.ts`: Main implementation of the weather MCP client using LangChain
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `.env`: Environment variables (create this file)

## How It Works

1. The code initializes an MCP client that connects to the MCP weather server
2. It creates a LangChain tool that interfaces with the MCP server
3. An agent is created that can use this tool to get weather information
4. The agent processes natural language queries about weather and returns the results

## Troubleshooting

If you encounter issues:

1. Make sure the weather MCP server is running
2. Check that your OpenAI API key is correctly set in the `.env` file
3. Verify that all dependencies are installed
4. Ensure the MCP configuration in `~/.cursor/mcp.json` is correct

## License

MIT


