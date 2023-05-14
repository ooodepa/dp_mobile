export default class NotFoundException extends Error {
  constructor() {
    super('404');
    this.name = '404';
    // eslint-disable-next-line no-console
    console.log('NotFoundException');
  }
}
