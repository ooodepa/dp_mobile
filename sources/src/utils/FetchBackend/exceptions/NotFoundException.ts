export default class NotFoundException extends Error {
  constructor() {
    super('404');
    this.name = '404';
    console.log('NotFoundException');
  }
}
