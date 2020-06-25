import { BASE_URL, TOKEN } from '../const.js';
import { status } from '../helpers/status.js';
import { pemain } from '../components/pemain.js';
import { pinPemain, deletePinPemain } from '../api/pemain.controller.js';

export default async function getPemain() {
  const url = new URL(`${BASE_URL}teams/65`);
  let total = '';

  if ('caches' in window) {
    caches.match(url).then((response) => {
      if (response) {
        response.json().then((data) => {
          let pemainHtml = '';
          data.squad.forEach((res, i) => {
            pemainHtml += pemain(res, i);
          });
          return (document.getElementById(
            'data-pemain',
          ).innerHTML = pemainHtml);
        });
      }
    });
  }

  await fetch(url, {
    headers: {
      'X-Auth-Token': TOKEN,
    },
  })
    .then(status)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let pemainHtml = '';
      data.squad.forEach((res, i) => {
        pemainHtml += pemain(res, i);
      });
      total += data.squad.length;
      return (document.getElementById(
        'data-pemain',
      ).innerHTML = pemainHtml);
    })
    .catch((error) => {
      console.log(`Error: ${new Error(error)}`);
    });

  for (let i = 0; i < total; i++) {
    const btnPemain = document.querySelectorAll('.pin-pemain')[i];
    btnPemain.addEventListener('click', () => {
      const id = btnPemain.dataset.id;
      const nama = btnPemain.dataset.nama;
      const posisi = btnPemain.dataset.posisi;
      const noBaju = btnPemain.dataset.nobaju;
      const tgl_lahir = btnPemain.dataset.tgllahir;
      const role = btnPemain.dataset.role;
      const icon = document.getElementById(id);

      if (icon.innerHTML === 'favorite_border') {
        icon.innerHTML = 'favorite';
        pinPemain(id, nama, posisi, noBaju, tgl_lahir, role).then(
          () => {
            M.toast({
              html: 'Berhasil pin pemain',
              classes: 'rounded',
            });
          },
        );
      } else {
        icon.innerHTML = 'favorite_border';
        deletePinPemain(id).then(() => {
          M.toast({
            html: 'Berhasil hapus pin pemain',
            classes: 'rounded',
          });
        });
      }
    });
  }
}
