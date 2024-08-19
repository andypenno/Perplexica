// In-memory cache for configuration data
let cachedConfig: { [key: string]: string } ;

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
    console.error('Error fetching config:', error);
    throw error;
  }
}

export async function getServerEnv(envVar: string): Promise<string | undefined> {
  // Check if the cache is still valid
  if (cachedConfig) {
    return cachedConfig[envVar];
  }

  // Fetch and cache the config if not in cache or cache is expired
  await fetchConfig();
  return cachedConfig[envVar];
}
