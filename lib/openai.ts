import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

let openai: OpenAIApi;

if (process.env.NODE_ENV === 'production') {
  openai = new OpenAIApi(configuration);
} else {
  const globalWithOpenai = global as typeof globalThis & {
    openai: OpenAIApi;
  };

  if (!globalWithOpenai.openai) {
    globalWithOpenai.openai = new OpenAIApi(configuration);
  }
  openai = globalWithOpenai.openai;
}

export default openai;
