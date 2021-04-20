export const BASE_URL = "https://message-list.appspot.com";
export const LIMIT = 20;

let currentPageToken;
export const fetchNextMessages = limit => {
  return fetchMessages(currentPageToken, limit).then(data => {
    currentPageToken = data.pageToken;
    return data;
  });
}

export const fetchMessages = (pageToken, limit = LIMIT) => {
  let url = `${BASE_URL}/messages?limit=${limit}`;
  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }
  return fetch(url).then(resp => resp.json());
}
