async function fetchConfig() {
  try {
    const response = await fetch('/api/env');
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('cachedConfig', JSON.stringify(data));
      return data;
    } else {
      throw new Error('Failed to fetch config');
    }
  } catch (error) {
    return null;
  }
}

export async function getServerEnv(envVar: string): Promise<string> {
  const cachedConfig = JSON.parse(localStorage.getItem('cachedConfig') || 'null');

  if (cachedConfig) {
    return cachedConfig[envVar];
  }

  const data = await fetchConfig();
  if (!data) {
    return "";
  }

  return data[envVar];
}
