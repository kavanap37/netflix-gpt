import OpenAI from 'openai';
import { OPENAI_KEY } from './Constants';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_GEMINI_KEY || process.env.REACT_APP_OPENAI_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  dangerouslyAllowBrowser: true,
});

export default openai;