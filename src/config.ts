import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';
import process from 'process';

const configFileName = 'config.toml';

interface Config {
  GENERAL: {
    PORT: number;
    SIMILARITY_MEASURE: string;
  };
  API_KEYS: {
    OPENAI: string;
    GROQ: string;
    ANTHROPIC: string;
  };
  API_ENDPOINTS: {
    SEARXNG: string;
    OLLAMA: string;
  };
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

const configFilePath = path.join(__dirname, `../${configFileName}`);

const loadConfig = () => {
    if (fs.existsSync(configFilePath)) {
      return toml.parse(fs.readFileSync(configFilePath, 'utf-8')) as any as Config;
    } else {
      return {} as Config;
    }
}

export const getPort = () => 
  process.env.PORT ?? loadConfig().GENERAL.PORT ?? "3001";

export const getSimilarityMeasure = () =>
  process.env.SIMILARITY_MEASURE ?? loadConfig().GENERAL.SIMILARITY_MEASURE ?? "cosine";

export const getOpenaiApiKey = () =>
  process.env.OPENAI_API_KEY ?? loadConfig().API_KEYS.OPENAI ?? "";

export const getGroqApiKey = () =>
  process.env.GROQ_API_KEY ?? loadConfig().API_KEYS.GROQ ?? "";

export const getAnthropicApiKey = () =>
  process.env.ANTHROPIC_API_KEY ?? loadConfig().API_KEYS.ANTHROPIC ?? "";

export const getSearxngApiEndpoint = () =>
  process.env.SEARXNG_API_ENDPOINT ?? loadConfig().API_ENDPOINTS.SEARXNG ?? "http://localhost:32768";

export const getOllamaApiEndpoint = () =>
  process.env.OLLAMA_API_ENDPOINT ?? loadConfig().API_ENDPOINTS.OLLAMA ?? "";

export const updateConfig = (config: RecursivePartial<Config>) => {
  const currentConfig = loadConfig();

  for (const key in currentConfig) {
    if (!config[key]) config[key] = {};

    if (typeof currentConfig[key] === 'object' && currentConfig[key] !== null) {
      for (const nestedKey in currentConfig[key]) {
        if (
          !config[key][nestedKey] &&
          currentConfig[key][nestedKey] &&
          config[key][nestedKey] !== ''
        ) {
          config[key][nestedKey] = currentConfig[key][nestedKey];
        }
      }
    } else if (currentConfig[key] && config[key] !== '') {
      config[key] = currentConfig[key];
    }
  }

  fs.writeFileSync(configFilePath, toml.stringify(config));
};
