import { chatGptService } from './index';

export async function chatGptInit(prompt: string): Promise<any> {
  const payload = {
    prompt: prompt,
    max_tokens: 240,
    temperature: 0.5,
    model: 'text-davinci-003'
  };
  try {
    const response = await chatGptService.post('', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}
