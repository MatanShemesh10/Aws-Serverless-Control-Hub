import axios from "axios";

const API_BASE_URL = "https://b83x3s56f1.execute-api.us-west-2.amazonaws.com/prod";

export interface User {
  user_id: string;
  name?: string;
  email?: string;
}

export async function getLogs() {
  const response = await axios.get(`${API_BASE_URL}/logs`);
  return response.data;
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
}

export async function createUser(user: User): Promise<any> {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, user, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
}

export async function deleteUser(userId: string): Promise<any> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
}

/**
 * Helper to extract a clean message from AWS Lambda responses
 */
function handleAxiosError(err: unknown): never {
  if (axios.isAxiosError(err)) {
    const responseData = err.response?.data;

    // אם השרת מחזיר מחרוזת JSON, ננסה לפרסר
    let message: string | undefined;

    if (typeof responseData === "string") {
      try {
        const parsed = JSON.parse(responseData);
        message = parsed.message;
      } catch {
        message = responseData;
      }
    } else if (typeof responseData === "object" && responseData !== null) {
      message = (responseData as any).message;
    }

    throw new Error(message || `Request failed with status ${err.response?.status}`);
  } else {
    throw new Error("Unexpected error");
  }
}
