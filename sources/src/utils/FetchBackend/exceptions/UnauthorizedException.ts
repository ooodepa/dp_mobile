export default class UnauthorizedException extends Error {
  constructor() {
    super('401');
    this.name = '401';
    // eslint-disable-next-line no-console
    console.log('UnauthorizedException');
  }
}
