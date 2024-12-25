import { cookies } from 'next/headers';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies(); // Await the cookies() function
  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  let accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    // Refresh the access token
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: refreshToken.value }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    accessToken = data.accessToken;
    if (accessToken) {
      cookieStore.set('accessToken', accessToken, { httpOnly: true, secure: true });
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // If the response is 401, delete the access token and try again
    cookieStore.delete('accessToken');
    return fetchWithAuth(url, options);
  }

  return response;
}

export { fetchWithAuth };


