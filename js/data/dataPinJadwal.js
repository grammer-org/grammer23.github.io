import { getPinTanding } from '../components/pinJadwal.js';
import {
  getPinJadwal,
  deletePinJadwal,
} from '../api/jadwal.controller.js';

export default async function pinJadwal() {
  let pinJadwalHtml = '';
  let total = '';
  await getPinJadwal().then((data) => {
    total += data.length;
    data.forEach((res) => {
      pinJadwalHtml += getPinTanding(res);
    });
    return (document.getElementById(
      'pin-jadwal',
    ).innerHTML = pinJadwalHtml);
  });

  for (let i = 0; i < total; i++) {
    const btnPinJadwal = document.querySelectorAll('.hps-jadwal')[i];
    btnPinJadwal.addEventListener('click', () => {
      const id = btnPinJadwal.dataset.id;
      deletePinJadwal(id).then(async () => {
        M.toast({
          html: 'Berhasil hapus pin pemain',
          classes: 'rounded',
        });
        await getPinJadwal().then((data) => {
          let pinHtml = '';
          data.forEach((res) => {
            pinHtml += getPinTanding(res);
          });
          return (document.getElementById(
            'pin-jadwal',
          ).innerHTML = pinHtml);
        });
      });
    });
  }
}
