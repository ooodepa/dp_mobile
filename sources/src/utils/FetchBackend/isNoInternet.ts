import ToastController from '../Toast';

export default function isNoInternet(exception: any): boolean {
  if (
    exception instanceof TypeError &&
    exception.message === 'Network request failed'
  ) {
    ToastController.toastShort('Нет доступа к интернету...');
    return true;
  }

  return false;
}
