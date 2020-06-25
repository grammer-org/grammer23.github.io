import { database } from './db.js';

export const pinJadwal = (
  id,
  kompetisi,
  matchday,
  away_team,
  home_team,
  tgl_tanding,
) => {
  return new Promise((resolve, reject) => {
    database
      .then((db) => {
        const tx = db.transaction('pin_jadwal', 'readwrite');
        const store = tx.objectStore('pin_jadwal');
        const data = {
          id: id,
          kompetisi: kompetisi,
          matchday: matchday,
          away_team: away_team,
          home_team: home_team,
          tgl_tanding: tgl_tanding,
        };
        store.put(data);
        return tx;
      })
      .then((tx) => {
        if (tx.complete) {
          resolve(true);
        } else {
          reject(new Error(tx.onerror));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getPinJadwal = () => {
  return new Promise((resolve, reject) => {
    database
      .then((db) => {
        const tx = db.transaction('pin_jadwal', 'readonly');
        const store = tx.objectStore('pin_jadwal');
        return store.getAll();
      })
      .then((data) => {
        if (data !== undefined) {
          resolve(data);
        } else {
          reject(new Error(tx.onerror));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deletePinJadwal = (id) => {
  return new Promise((resolve, reject) => {
    database
      .then((db) => {
        const tx = db.transaction('pin_jadwal', 'readwrite');
        const store = tx.objectStore('pin_jadwal');
        store.delete(id);
        return tx;
      })
      .then((tx) => {
        if (tx.complete) {
          resolve(true);
        } else {
          reject(new Error(tx.onerror));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
