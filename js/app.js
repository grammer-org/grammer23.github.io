import loadnav from './components/nav.js';
import content from './components/content.js';
import { webPush } from './api/push.config.js';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelectorAll('.sidenav');
  M.Sidenav.init(el);
  let page = window.location.hash.substr(1);
  if (page === '') page = 'home';
  content(page);
  loadnav();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register("/sw.js")
       .then((registration) => {
         console.log("SW berhasil: ", registration)
       })
       .catch((err) => {
         console.log("Sw gagal: ", err)
       })
      webPush();
    });
  } else {
    M.toast({
      html: 'Browser anda tidak mendukung service worker',
      classes: 'rounded',
    });
    console.log('Browser anda tidak mendukung service worker');
  }
});
