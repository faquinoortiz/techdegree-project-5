/**
 * Treehouse JavaScript Techdegree 
 * Project 5-API Public Request
 * @Author Flor Aquino Ortiz
 */

let users;
let currentIndex;

    fetchData().then(data => {
      users = data;
      currentIndex = 0;
      users.forEach((user, index) => createUserCard(user, index));
    });

//Funtion will fetch data from the Random User API
    async function fetchData() {
      const response = await fetch('https://randomuser.me/api/?results=12&nat=us');
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
      const modal = document.createElement('div');
      modal.className = 'modal-container';
      modal.innerHTML = `
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
            <button type="button" id="modal-prev-btn" class="modal-prev-btn">Previous</button>
            <button type="button" id="modal-next-btn" class="modal-next-btn">Next</button>
        </div>
      `;
  //Creating Event Listeners for the Buttons
      const closeModalButton = modal.querySelector('#modal-close-btn');
      closeModalButton.addEventListener('click', () => closeModal(modal));

      const prevButton = modal.querySelector('#modal-prev-btn');
      prevButton.addEventListener('click', () => showPreviousUser(modal, index));

      const nextButton = modal.querySelector('#modal-next-btn');
      nextButton.addEventListener('click', () => showNextUser(modal, index));

      document.body.appendChild(modal);
    }
//Function closes modal screen when "X" button is clicked on modal window
    function closeModal(modal) {
      document.body.removeChild(modal);
    }
  //Function is used to navigate to the previous employee's info, when the "Previous" button is selected on the modal window
    function showPreviousUser(modal, currentIndex) {
      currentIndex = (currentIndex - 1 + users.length) % users.length;
      const user = users[currentIndex];
      closeModal(modal);
      openModal(user, currentIndex);
    }
  //Function is used to navigate to the next employee's info, when the "Next" button is selected on the modal window
    function showNextUser(modal, currentIndex) {
      currentIndex = (currentIndex + 1) % users.length;
      const user = users[currentIndex];
      closeModal(modal);
      openModal(user, currentIndex);
    }