import { urlBase64ToUint8Array } from '../helpers/uint8array.js';

export const webPush = () => {
  Notification.requestPermission().then((result) => {
    if (result == 'denied') {
      console.log('Fitur notifikasi tidak diijinkan');
    } else if (result == 'default') {
      console.error(
        'Pengguna menutup kontak dialog permintaan ijin.',
      );
      return;
    }
    if ('PushManager' in window) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        const PUBLIC_KEY =
          'BEaRB_LxsLYz7f-I8atJknT2oVqCtBmMxOplzi7Epz80Cy5ZctOP_p3fCcW3cgKtDb85snp8cRVfCbCYxVj-lHQ';
        reg.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
          })
          .then((subscribe) => {
            console.log(
              'Berhasil melakukan subscribe dengan endpoint: ',
              subscribe.endpoint,
            );
            console.log(
              'Berhasil melakukan subscribe dengan p256dh key: ',
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey('p256dh')),
                ),
              ),
            );
            console.log(
              'Berhasil melakukan subscribe dengan auth key: ',
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey('auth')),
                ),
              ),
            );
          })
          .catch((e) => {
            console.log('tidak bisa melakukan subscribe', e.meesage);
          });
      });
    }
  });
};
