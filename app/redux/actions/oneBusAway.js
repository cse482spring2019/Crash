const baseUrl = 'http://api.pugetsound.onebusaway.org/api/where/';
export const key = '68e81371-e5bf-44bc-b407-1c695948c02a';

export function getUrl(endpoint) {
  return baseUrl + endpoint + '.json';
}
