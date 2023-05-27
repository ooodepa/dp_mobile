import env from '../../env';
import MyLocalStorage from '../MyLocalStorage/MyLocalStorage';
import HttpException from './exceptions/HttpException';
import UpdateSessionResponseDto from './rest/api/sessions/dto/update-session-response.dto';

interface FetchBackendResult {
  response: Response;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

async function update() {
  const refreshToken = await MyLocalStorage.getItem('refresh');

  if (!refreshToken) {
    throw new Error('Войдите в аккаунт');
  }

  const method = 'PATCH';
  const URL = `${env.REACT_NATIVE__BACKEND_URL}/api/v1/sessions`;
  // eslint-disable-next-line no-console
  console.log({method, URL});

  const response = await fetch(
    `${env.REACT_NATIVE__BACKEND_URL}/api/v1/sessions`,
    {
      method,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  if (response.status === 200) {
    const json: UpdateSessionResponseDto = await response.json();
    const accessToken = json.dp_accessToken;
    await MyLocalStorage.removeItem('access');
    await MyLocalStorage.setItem('access', accessToken);
    return true;
  }

  if (response.status === 401) {
    await MyLocalStorage.removeItem('access');
    await MyLocalStorage.removeItem('refresh');
    throw new HttpException('PATCH', response);
  }

  throw new HttpException('PATCH', response);
}

export default async function FetchBackend(
  type: 'none' | 'access',
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  uri: string,
  body: any = {},
): Promise<FetchBackendResult> {
  const token =
    type === 'access'
      ? `Bearer ${await MyLocalStorage.getItem('access')}`
      : undefined;

  const URL = `${env.REACT_NATIVE__BACKEND_URL}/api/v1/${uri}`;
  const BODY = JSON.stringify(body);
  // eslint-disable-next-line no-console
  console.log({method, URL, isUseAssess: type === 'access'});

  if (method === 'GET') {
    const response = await fetch(URL, {
      headers: {
        ...(token ? {Authorization: token} : {}),
      },
    });

    if (response.status === 401) {
      await update();
      const newToken = `Bearer ${await MyLocalStorage.getItem('access')}`;
      const response2 = await fetch(URL, {
        headers: {
          Authorization: newToken,
        },
      });
      return {response: response2, method};
    }

    return {response, method};
  }

  if (method === 'POST') {
    const response = await fetch(URL, {
      method,
      body: BODY,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? {Authorization: token} : {}),
      },
    });

    if (response.status === 401) {
      await update();
      const newToken = `Bearer ${await MyLocalStorage.getItem('access')}`;
      const response2 = await fetch(URL, {
        method,
        body: BODY,
        headers: {
          Authorization: newToken,
        },
      });
      return {response: response2, method};
    }

    return {response, method};
  }

  if (method === 'PUT') {
    const response = await fetch(URL, {
      method,
      body: BODY,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? {Authorization: token} : {}),
      },
    });

    if (response.status === 401) {
      await update();
      const newToken = `Bearer ${await MyLocalStorage.getItem('access')}`;
      const response2 = await fetch(URL, {
        method,
        body: BODY,
        headers: {
          Authorization: newToken,
        },
      });
      return {response: response2, method};
    }

    return {response, method};
  }

  if (method === 'PATCH') {
    const response = await fetch(URL, {
      method,
      body: BODY,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? {Authorization: token} : {}),
      },
    });

    if (response.status === 401) {
      await update();
      const newToken = `Bearer ${await MyLocalStorage.getItem('access')}`;
      const response2 = await fetch(URL, {
        method,
        body: BODY,
        headers: {
          Authorization: newToken,
        },
      });
      return {response: response2, method};
    }

    return {response, method};
  }

  const response = await fetch(URL, {
    method: 'DELETE',
    headers: {
      ...(token ? {Authorization: token} : {}),
    },
  });

  if (response.status === 401) {
    await update();
    const newToken = `Bearer ${await MyLocalStorage.getItem('access')}`;
    const response2 = await fetch(URL, {
      method: 'DELETE',
      headers: {
        Authorization: newToken,
      },
    });
    return {response: response2, method};
  }

  return {response, method};
}
