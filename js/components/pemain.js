import convertDate from '../helpers/convertDate.js';

export const pemain = (res, i) => {
  return `
  <tr>
    <td>${i + 1}</td>
    <td>${res.name}</td>
    <td>${res.position === null ? 'N/a' : res.position}</td>
    <td>${res.shirtNumber === null ? 'N/a' : res.shirtNumber}</td>
    <td>${convertDate(res.dateOfBirth, false)}</td>
    <td>${res.role}</td>
    <td>
      <a data-id="${res.id}" data-nama="${res.name}" data-posisi=${
    res.position === null ? 'N/a' : res.position
  } data-nobaju="${
    res.shirtNumber === null ? 'N/a' : res.shirtNumber
  }" data-tgllahir=${res.dateOfBirth} data-role=${
    res.role
  } class="waves-effect waves-light btn indigo lighten-2 pin-pemain">
        <i id=${
          res.id
        } class="material-icons right">favorite_border</i>
      Pin ini
      </a>
    </td>
  </tr>
  `;
};
