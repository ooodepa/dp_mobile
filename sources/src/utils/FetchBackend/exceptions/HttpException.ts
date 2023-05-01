export default class HttpException extends Error {
  constructor(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    reponse: Response,
  ) {
    super('HttpException');
    this.name = 'HttpException';
    console.log(`${method} ${reponse.url} ${reponse.status}`);
  }
}
