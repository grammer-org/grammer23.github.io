import content from './content.js';

export default function loadnav() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status != 200) return;

      document
        .querySelectorAll('.sidenav, .topnav')
        .forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

      document
        .querySelectorAll('.sidenav a, .topnav a')
        .forEach((elm) => {
          elm.addEventListener('click', (e) => {
            const sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            const page = e.target.getAttribute('href').substr(1);
            content(page);
          });
        });
    }
  };
  xhttp.open('GET', 'nav.html', true);
  xhttp.send();
}
