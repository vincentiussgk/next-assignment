const API_URL = "http://localhost:8080";

export const fetchBaseUrl = async (
  endpoint: string,
  options: RequestInit
): Promise<Response> => {
  const request: RequestInit = { ...options };

  const response = await fetch(`${API_URL}/${endpoint}`, request);
  return response;
};

export const manipWithFetch = async <T, U>(
  urlPath: string,
  body: T,
  method: string = "POST"
): Promise<U> => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetchBaseUrl(urlPath, {
    method,
    body: JSON.stringify(body),
    headers,
  });
  if (!response.ok) {
    const errorJson = await response.json();
    const error = new Error(errorJson.message ?? errorJson.statusText);
    throw error;
  }
  const resJson = await response.json();
  return resJson;
};
