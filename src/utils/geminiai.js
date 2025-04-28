import {GoogleGenAI} from '@google/genai'
import { GEMINIAI_KEY } from "./Constants";

const genAI = new GoogleGenAI({ apiKey: GEMINIAI_KEY });

 
  async function geminiOutput(prompt) {
    try {
      if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
        throw new Error("IPrompt is either empty or not in format of string.");
      }
      const chatSession = genAI.chats.create({
        model: "gemini-1.5-flash",
        config: {
            responseMimeType: "text/plain",
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_ONLY_HIGH",
              },
            ],
            maxOutputTokens: 20,
            temperature: 1.0,
        },
        history: [],
      });
  
      if (!chatSession) {
        throw new Error("Chat is not created successfully.");
    } 
      const result = await chatSession.sendMessage({message:prompt});
      console.log(result);
      if (!result || !result || !result.text) {
        console.log(result);
        throw new Error("Don't have response from API.");
       
      }
      const resultText = result.text;
      if (!resultText) {
        throw new Error("Don't have response from API.");
      }
      const gptMoviesListCSV = resultText.split(",").map((movie) => movie.trim());  
      console.log(gptMoviesListCSV );
      return gptMoviesListCSV ;
    } catch (error) {
      console.error("No response from GPT server:", error.message);
      throw new Error(
        `No response from GPT server: ${error.message}`
      );
    }
  }
  export default geminiOutput;
  