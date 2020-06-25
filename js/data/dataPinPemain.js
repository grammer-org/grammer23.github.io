import {
  getPinPemain,
  deletePinPemain,
} from '../api/pemain.controller.js';
import { pinPemain } from '../components/pinPemain.js';

export default async function pinPlayer() {
  let pinPemainHtml = '';
  let total = '';
  await getPinPemain().then((data) => {
    total += data.length;
    data.forEach((res) => {
      pinPemainHtml += pinPemain(res);
    });
    return (document.getElementById(
      'pin-pemain',
    ).innerHTML = pinPemainHtml);
  });
  for (let i = 0; i < total; i++) {
    const btnPinPemain = document.querySelectorAll('.hps-pemain')[i];
    // console.log(btnPinPemain);
    btnPinPemain.addEventListener('click', () => {
      const id = btnPinPemain.dataset.id;

      deletePinPemain(id).then(async () => {
        M.toast({
          html: 'Berhasil hapus pin pemain',
          classes: 'rounded',
        });
        await getPinPemain().then((data) => {
          let pinHtml = '';
          data.forEach((res) => {
            pinHtml += pinPemain(res);
          });
          return (document.getElementById(
            'pin-pemain',
          ).innerHTML = pinHtml);
        });
      });
    });
  }
}
