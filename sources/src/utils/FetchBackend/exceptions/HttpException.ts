export default class HttpException extends Error {
  HTTP_METHOD: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  HTTP_STATUS: number;
  HTTP_URL: string;
  RESPONSE: Response;

  constructor(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    reponse: Response,
  ) {
    super('HttpException');
    this.name = 'HttpException';
    // eslint-disable-next-line no-console
    console.log(`${method} ${reponse.url} ${reponse.status}`);

    this.HTTP_METHOD = method;
    this.HTTP_STATUS = reponse.status;
    this.HTTP_URL = reponse.url;
    this.RESPONSE = reponse;
  }
}
