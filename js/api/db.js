const DB_NAME = 'mc_info_db';
export const database = idb.open(DB_NAME, 1, (upgradeDb) => {
  if (!upgradeDb.objectStoreNames.contains('pin_pemain')) {
    const pemain = upgradeDb.createObjectStore('pin_pemain', {
      keyPath: 'id',
      autoIncrement: true,
    });
    pemain.createIndex('nama', 'nama', { unique: false });
    pemain.createIndex('posisi', 'posisi', { unique: false });
    pemain.createIndex('no_baju', 'no_baju', { unique: false });
    pemain.createIndex('tgl_lahir', 'tgl_lahir', { unique: false });
    pemain.createIndex('status', 'status', { unique: false });
  }

  if (!upgradeDb.objectStoreNames.contains('pin_jadwal')) {
    const jadwal = upgradeDb.createObjectStore('pin_jadwal', {
      keyPath: 'id',
      autoIncrement: true,
    });
    jadwal.createIndex('kompetisi', 'kompetisi', { unique: false });
    jadwal.createIndex('matchday', 'matchday', { unique: false });
    jadwal.createIndex('away_team', 'away_team', { unique: false });
    jadwal.createIndex('home_team', 'home_team', { unique: false });
    jadwal.createIndex('tgl_tanding', 'tgl_tanding', {
      unique: false,
    });
  }
});
