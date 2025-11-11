import axios from 'axios';

const API_BASE_URL = 'https://b83x3s56f1.execute-api.us-west-2.amazonaws.com/prod';

export interface User {
  user_id: string;
  name: string;
  email: string;
}

export async function getUsers(): Promise<User[]> {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
}

export async function createUser(user: User): Promise<any> {
  const response = await axios.post(`${API_BASE_URL}/users`, user);
  return response.data;
}

export async function deleteUser(userId: string): Promise<any> {
  const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
  return response.data;
}
