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

Copyright (c) [2025] [Rehmat Ali Sayany]

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  
THE SOFTWARE.
