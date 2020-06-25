import getTanding from '../data/dataTanding.js';
import getPemain from '../data/dataPemain.js';
import pinPlayer from '../data/dataPinPemain.js';
import pinJadwal from '../data/dataPinJadwal.js';

export default function content(page) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      let content = document.getElementById('app');
      if (this.status === 200) {
        content.innerHTML = xhttp.responseText;
        loadApi(page);
      } else if (this.status === 404) {
        content.innerHTML = `<center><h2>Page not found :(</h2></center>`;
      } else {
        content.innerHTML = `<center><h2>Something went wrong</h2></center>`;
      }
    }
  };
  xhttp.open('GET', `pages/${page}.html`, true);
  xhttp.send();
}

function loadApi(page) {
  switch (page) {
    case 'tanding':
      getTanding();
      break;
    case 'pemain':
      getPemain();
      break;
    case 'pinpemain':
      pinPlayer();
      break;
    case 'pinjadwal':
      pinJadwal();
      break;
    default:
      break;
  }
}
