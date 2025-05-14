import { OpenAI } from "openai";

import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI();

async function getCoordinates(
  location: string
): Promise<{ latitude: number; longitude: number }> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        location
      )}&format=json`
    );
    const data = await response.json();
    if (data.length === 0) {
      throw new Error("Location not found");
    }
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw new Error("Failed to fetch coordinates for the location.");
  }
}

async function getWeather(location: string): Promise<number> {
  try {
    const { latitude, longitude } = await getCoordinates(location);
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const data = await response.json();
    if (
      !data.current_weather ||
      data.current_weather.temperature === undefined
    ) {
      throw new Error("Weather data not available");
    }
    return data.current_weather.temperature;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Failed to fetch weather data.");
  }
}

const tools: any = [
  {
    type: "function",
    name: "get_weather", // Ensure this matches the function name being called
    description: "Get current temperature for a given location.",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "City and country e.g. Bogotá, Colombia",
        },
      },
      required: ["location"],
    },
  },
];

async function callOpenAIChat(userMessage, model = "gpt-3.5-turbo") {
  try {
    const input: any = [
      {
        role: "system",
        content: "You are a highly knowledgeable assistant specializing in providing accurate and up-to-date weather information. Your goal is to assist users with weather-related queries in a clear and concise manner. Always ensure your responses are helpful and relevant to the user's location and context.",
      },
      { role: "user", content: userMessage },
    ];

    const response = await openai.responses.create({
      model,
      input,
      tools,
    });
    console.log("Response from OpenAI:", response.output[0]);

    if (response.output[0].type === "function_call") {
      const toolCall = response.output[0];
      const args = JSON.parse(toolCall.arguments);
      let result;
      console.log("Function thinks this should be the arguments:", args);

      if (toolCall.name === "get_weather") {
        const { location } = args;
        result = await getWeather(location);
      }
      input.push(toolCall);
      input.push({
        // append result message
        type: "function_call_output",
        call_id: toolCall.call_id,
        output: result.toString(),
      });

      const finalResponse = await openai.responses.create({
        model,
        input,
        tools,
        temperature: 0
      });
      console.log(finalResponse.output_text);
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to get a response from OpenAI.");
  }
}

// 1st Example usage
// (async () => {
//   const userMessage = "What's the weather in munich?";
//   const response = await callOpenAIChat(userMessage);
// })();

// 2nd Example usage
(async () => {
  const userMessage = "Should I take an umbrella in munich today?";
  const response = await callOpenAIChat(userMessage);
})();
