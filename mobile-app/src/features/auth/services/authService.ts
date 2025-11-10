import { apiClient } from '../../../core/api/apiClient';
import { saveToken, removeToken, hasToken } from '../../../core/storage/tokenStorage';
import { AuthRequest, AuthResponse } from '../../../core/types';

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    await saveToken(response.data.accessToken);
    return response.data;
  }

  async register(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', {
      email,
      password,
    });

    await saveToken(response.data.accessToken);
    return response.data;
  }

  async logout(): Promise<void> {
    await removeToken();
  }

  async isAuthenticated(): Promise<boolean> {
    return await hasToken();
  }
}

export const authService = new AuthService();

