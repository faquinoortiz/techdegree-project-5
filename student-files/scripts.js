
async function fetchData() {
  const response = await fetch('https://randomuser.me/api/?results=12');
  const data = await response.json();
  return data.results;
}


function createUserCard(user, index) {
  const gallery = document.getElementById('gallery');
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-img-container">
        <img class="card-img" src="${user.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
    </div>
  `;
  card.addEventListener('click', () => openModal(user, index));
  gallery.appendChild(card);
}

function openModal(user, index) {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';
  modalContainer.innerHTML = `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${user.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.city}</p>
            <hr>
            <p class="modal-text">${user.cell}</p>
            <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.state}, ${user.location.postcode}</p>
            <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleDateString()}</p>
        </div>
    </div>
  `;

}