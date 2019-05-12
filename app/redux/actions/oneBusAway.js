import { config } from "../../config";

const { baseUrl, key, maxRequestAttempts } = config.api.oneBusAway;
export const apiKey = key;
export const maxAttempts = maxRequestAttempts;

export function getUrl(endpoint) {
  return baseUrl + endpoint + '.json';
}
