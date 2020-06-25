import { database } from './db.js';

export const pinPemain = (
  id,
  nama,
  posisi,
  no_baju,
  tgl_lahir,
  status,
) => {
  return new Promise((resolve, reject) => {
    database
      .then((db) => {
        const tx = db.transaction('pin_pemain', 'readwrite');
        const store = tx.objectStore('pin_pemain');
        const data = {
          id: id,
          nama: nama,
          posisi: posisi,
          no_baju: no_baju,
          tgl_lahir: tgl_lahir,
          status: status,
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

export const getPinPemain = () => {
  return new Promise((resolve, reject) => {
    database
      .then((db) => {
        const tx = db.transaction('pin_pemain', 'readonly');
        const store = tx.objectStore('pin_pemain');
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

export const deletePinPemain = (id) => {
  return new Promise((resolve, reject) => {
    database
      .then((db) => {
        const tx = db.transaction('pin_pemain', 'readwrite');
        const store = tx.objectStore('pin_pemain');
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
