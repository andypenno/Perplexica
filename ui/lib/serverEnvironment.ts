import process from 'process';
// In-memory cache for configuration data
let cachedConfig: { [key: string]: string } | null ;

async function fetchConfig() {
  try {
    const response = await fetch('/api/env');
    if (response.ok) {
      const data = await response.json();
      cachedConfig = data;
    } else {
      throw new Error('Failed to fetch config');
    }
  } catch (error) {
    return null;
  }
}

export async function getServerEnv(envVar: string): Promise<string | undefined> {
  // Check if the cache is valid
  if (cachedConfig && cachedConfig != null) {
    return cachedConfig[envVar];
  }

  // Fetch and cache the config if not in cache or cache is expired
  await fetchConfig();
  if (cachedConfig == null) {
    return process.env[envVar]
  }
  return cachedConfig[envVar];
}
