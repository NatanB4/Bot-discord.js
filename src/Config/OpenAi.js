const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});

module.exports = class OpenAiConfig {
  constructor() {
    this.openai = new OpenAIApi(configuration);
    this.temperature = 0.7;
    this.max_tokens = 200;
    this.model = "text-davinci-002";
    this.prompt = "";
  }

  /**
   * @param {string} prompt
   * @description Define o prompt
   * @returns {Promise<string>}
   */
  async getAnswer(question) {
    const response = await this.openai.createCompletion({
      prompt: this.prompt + question,
      temperature: this.temperature,
      max_tokens: this.max_tokens,
      model: this.model,
    });

    return response.data.choices[0].text;
  }

  /**
   * @param {number} temperature
   * @description Define a temperatura da resposta
   */
  setTemperature(temperature) {
    this.temperature = temperature;

    return this;
  }

  /**
   * @param {number} max_tokens
   * @description Define o número máximo de tokens
   */
  setMaxTokens(max_tokens) {
    this.max_tokens = max_tokens;

    return this;
  }

  /**
   * @param {string} model
   * @description Define o modelo de resposta
   */
  setModel(model) {
    this.model = model;

    return this;
  }

  /**
   * @param {string} prompt
   * @description Define o prompt
   */
  setPrompt(prompt) {
    this.prompt = prompt;

    return this;
  }

  addPrompt(prompt) {
    this.prompt += prompt;

    return this;
  }
};
