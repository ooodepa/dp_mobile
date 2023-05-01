export default class UnauthorizedException extends Error {
  constructor() {
    super('401');
    this.name = '401';
    console.log('UnauthorizedException');
  }
}
