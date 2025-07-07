/**
 * fetchApi - A reusable utility for making API calls with error handling and input validation.
 *
 * @param url - The endpoint URL (relative or absolute)
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns The parsed JSON response or throws a detailed error
 */
export async function fetchApi<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  if (typeof url !== "string" || !url) {
    throw new Error("fetchApi: URL must be a non-empty string");
  }

  // Default headers for JSON APIs
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Sanitize method
  const method = (options.method || "GET").toUpperCase();
  if (!["GET", "POST", "PUT", "DELETE", "PATCH"].includes(method)) {
    throw new Error(`fetchApi: Unsupported HTTP method: ${method}`);
  }

  // Sanitize body
  let body = options.body;
  if (body && typeof body !== "string") {
    try {
      body = JSON.stringify(body);
    } catch {
      throw new Error("fetchApi: Failed to serialize request body");
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      method,
      headers: defaultHeaders,
      body: method === "GET" || method === "HEAD" ? undefined : body,
    });

    const contentType = response.headers.get("content-type");
    let data: unknown = null;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${
          response.statusText
        } - ${JSON.stringify(data)}`
      );
    }

    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("fetchApi: An unknown error occurred during the API call.");
  }
}
