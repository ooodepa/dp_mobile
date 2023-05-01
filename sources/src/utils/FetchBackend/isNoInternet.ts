import ToastController from '../Toast';

export default function isNoInternet(exception: any): boolean {
  if (
    exception instanceof TypeError &&
    exception.message === 'Network request failed'
  ) {
    ToastController.toastShort('Нет доступа к интернету...');
    console.log('- Network request failed');
    console.log(exception);
    return true;
  }

  return false;
}
