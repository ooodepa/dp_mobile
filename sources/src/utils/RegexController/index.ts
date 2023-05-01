export default class RegexController {
  static isStringStartWithNumber(str: string) {
    return /^\d.*$/.test(str);
  }

  static isStringContainSpecialSymbols(str: string) {
    return /[!@#$%^&*(),.?":{}|<>]/.test(str);
  }

  static isStringContainSpace(str: string) {
    return /^.*\s.*$/.test(str);
  }

  static isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
