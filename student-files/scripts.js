/**
 * Treehouse JavaScript Techdegree 
 * Project 5-API Public Request
 * @Author Flor Aquino Ortiz
 */

//Will load and display the users data
let users = [];

fetchData().then(data => {
  users = data;
  users.forEach((user, index) => createUserCard(user, index));
});


//Function will fetch data from the Random User API
async function fetchData() {
  const response = await fetch('https://randomuser.me/api/?results=12');
  const data = await response.json();
  return data.results;
}

//Function to create and append a user card to the gallery
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

//The function will create a modal window and then display it for a user
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

//Creating a "Previous" button, the conditional statement displays only if there is a previous user to navigate to 
  if (index > 0) {
    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.id = 'modal-prev';
    prevButton.className = 'modal-prev btn';
    prevButton.textContent = 'Prev';
    prevButton.addEventListener('click', () => openModal(users[index - 1], index - 1));
    modalContainer.appendChild(prevButton);
  }
// Function creates a "Next" button, the 'click' event listener will set up the openModal.Allowing the user to navigate through the modal
  if (index < users.length - 1) {
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.id = 'modal-next';
    nextButton.className = 'modal-next btn';
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => openModal(users[index + 1], index + 1));
    modalContainer.appendChild(nextButton);
  }

  modalContainer.querySelector('#modal-close-btn').addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });

  document.body.appendChild(modalContainer);
}


