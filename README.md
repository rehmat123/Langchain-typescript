# 🤖 LangChain TypeScript Examples

This repository demonstrates different ways to integrate LangChain with TypeScript, including native tool calling, single MCP server, and multiple MCP servers.

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

### 4. Configure Cursor with Weather MCP Server

edit the MCP configuration file at `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "@rehmatalisayany/weather-mcp-server"],
      "transport": "stdio"
    },
  }
}
```

## 📚 LangChain Integrations

### 1. Native Tool Calling

The `src/langchain/toolsCalling.ts` file demonstrates how to use LangChain with native tool calling. This approach allows you to define custom tools directly in your code.

```bash
pnpm function-calling-langchain
```

### 2. Single MCP Server

The `src/langchain/singleMcp.ts` file shows how to integrate a single MCP server (weather service) with LangChain. This allows you to use external services as tools in your LangChain agents.

```bash
pnpm single-mcp-weather-langchain
```

### 3. Multiple MCP Servers

The `src/langchain/multiMcp.ts` file demonstrates how to use multiple MCP servers (weather and math) with LangChain. This enables your agents to use different tools from various services.

```bash
pnpm run multi-mcp-weather-langchain
```

## 🧰 Tech Stack

- [**LangChain.js**](https://js.langchain.com) - Framework for building context-aware, language model-driven applications
- **TypeScript** - Strongly typed JavaScript for better developer experience
- [**OpenAI**](https://platform.openai.com/) - Used as the underlying language model
- [**MCP Server**](https://github.com/modelcontextprotocol/servers) - Model Context Protocol server for external services


## Project Structure

```
.
├── src/
│   ├── langchain/
│   │   ├── toolsCalling.ts  # Native tool calling example
│   │   ├── singleMcp.ts     # Single MCP server example
│   │   └── multiMcp.ts      # Multiple MCP servers example
│   └── index.ts             # Main entry point
├── package.json
└── README.md
```

### Common Issues

1. **MCP Server Connection Timeout**
   - If you see errors like `Failed to connect to stdio server: McpError: MCP error -32001: Request timed out`, try:
     - Reducing the `delayMs` value in the server configuration
     - Ensuring the MCP server package is installed correctly
     - Checking your network connection

2. **Tool Not Found**
   - If you see errors about tools not being found, ensure:
     - The tool name in your prompt matches the actual tool name (including prefixes)
     - The MCP server is properly configured and running

3. **Template Variable Errors**
   - If you see errors like `Missing value for input variable`, check:
     - Your prompt template for proper variable formatting
     - That all required variables are provided in the `invoke` method

### Debugging Tips

- Enable verbose output in the agent executor to see detailed logs
- Check the console for specific error messages
- Verify that all required environment variables are set

## 🔧 Configuration

The project uses the following configuration for MCP servers:

```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "@rehmatalisayany/weather-mcp-server"],
      "transport": "stdio"
    },
    "math": {
      "command": "npx",
      "args": ["-y", "nm-mcp-math"],
      "transport": "stdio"
    }
  }
}
```

## 🐛 Troubleshooting

If you encounter issues:

1. Make sure your OpenAI API key is correctly set in the `.env` file
2. Verify that all dependencies are installed
3. Check that the MCP servers are running correctly
4. For connection timeouts, try reducing the `delayMs` value in the server configuration

## License

MIT


