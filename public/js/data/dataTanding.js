import { BASE_URL, TOKEN } from '../const.js';
import { status } from '../helpers/status.js';
import { tanding } from '../components/tanding.js';
import { pinJadwal, deletePinJadwal } from '../api/jadwal.controller.js';
export default async function getTanding() {
  const url = new URL(`${BASE_URL}teams/65/matches`),
    params = { status: 'SCHEDULED' };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key]),
  );

  if ('caches' in window) {
    caches.match(url).then((response) => {
      if (response) {
        response.json().then((data) => {
          let tandingHtml = '';
          data.matches.forEach((res) => {
            tandingHtml += tanding(res);
          });
          return (document.getElementById(
            'data-tanding',
          ).innerHTML = tandingHtml);
        });
      }
    });
  }

  let total = '';
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
      let tandingHtml = '';
      total += data.matches.length;
      data.matches.forEach((res) => {
        tandingHtml += tanding(res);
      });
      return (document.getElementById(
        'data-tanding',
      ).innerHTML = tandingHtml);
    })
    .catch((error) => {
      console.log(`Error: ${new Error(error)}`);
    });
  for (let i = 0; i < total; i++) {
    const btn = document.querySelectorAll('.pin_jadwal')[i];
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const kompetisi = btn.dataset.kompetisi;
      const matchday = btn.dataset.matchday;
      const awayTeam = btn.dataset.awayteam;
      const homeTeam = btn.dataset.hometeam;
      const tglTanding = btn.dataset.tgl;

      const icon = document.getElementById(id);
      if (icon.innerHTML === 'favorite_border') {
        icon.innerHTML = 'favorite';
        pinJadwal(
          id,
          kompetisi,
          matchday,
          awayTeam,
          homeTeam,
          tglTanding,
        ).then(() => {
          M.toast({
            html: 'Berhasil pin jadwal',
            classes: 'rounded',
          });
        });
      } else {
        icon.innerHTML = 'favorite_border';
        deletePinJadwal(id).then(() => {
          M.toast({
            html: 'Berhasil hapus pin jadwal',
            classes: 'rounded',
          });
        });
      }
    });
  }
}
