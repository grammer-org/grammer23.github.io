import convertDate from '../helpers/convertDate.js';

export const pinPemain = (res) => {
  return `
    <div class="col s12 m12 l6">
        <div class="card" style="padding:3%">
            <p class="indigo-text darken-1 left-align">Manchester city player</p>
            <h3 class="indigo-text darken-1 center-align">${
              res.no_baju
            }</h3>
            <center>
                <div class="indigo darken-1 center-align" style="width: 50%;padding: 2%;">
                    <p class="white-text">${res.nama}</p>
                </div>
            </center>
            <div class="center-align" style="margin-top: 5%;margin-bottom: 5%;">
                <p>Posisi: <span class="indigo-text darken-1">${
                  res.posisi
                }</span></p>
                <p>Tanggal lahir: <span class="indigo-text darken-1">${convertDate(
                  res.tgl_lahir,
                  false,
                )}</span></p>
                <p>Status pemain: <span class="indigo-text darken-1">${
                  res.status
                }</span></p>
            </div>
            <div class="card-action">
                <a data-id="${
                  res.id
                }" class="waves-effect waves-light btn indigo lighten-2 hps-pemain">
                    <i class="material-icons right">delete</i>Hapus
                </a>
            </div>
        </div>
    </div>
    `;
};
