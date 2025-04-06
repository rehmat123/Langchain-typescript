# 🤖 LangChain + LangGraph AI Agent (TypeScript)

Build an AI-powered agent using [LangChain](https://js.langchain.com) and [LangGraph](https://github.com/langchain-ai/langgraph) in TypeScript. This project demonstrates how to set up an agent capable of performing reasoning, using tools, and navigating a graph-based workflow.

---

## 🛠 Features

- ⚙️ Agent setup with `ChatPromptTemplate` and `agent_scratchpad`
- 🧩 Custom tools (e.g., math operations)
- 🔄 LangGraph node/edge architecture
- 🌐 OpenAI (or other LLMs) powered reasoning
- ✨ Modular, clean TypeScript structure

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
pnpm run langchain
pnpm run langraph
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

## ✅ Future Ideas

- [ ] Add external API tools (e.g., weather, news)
- [ ] Integrate [LangSmith](https://smith.langchain.com/) for observability and debugging
- [ ] Docker support for easier deployment
- [ ] Web interface using React or Next.js

---

## 🙌 Contributing

Contributions are welcome!  
If you find a bug, have a feature request, or want to add improvements, feel free to open an issue or submit a pull request.

---

## 📄 License

MIT License


