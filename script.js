// Add a variable "pet_info" equal to an object with the name (string),
// weight (number), and happiness (number) of your pet.
var pet_info = {
  name: "Chop",
  weight: 12,
  happiness: 8
};

$(function() { // Makes sure that all the DOM elements are ready to be used.
  // Called function to update the name, happiness, and weight of our pet in our HTML.
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will call the function for that button.
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.cuddle-button').click(clickedCuddleButton);
});

function clickedTreatButton() {
  // Increase pet happiness.
  pet_info.happiness += 5;
  // Increase pet weight.
  pet_info.weight += 2;
  checkAndUpdatePetInfoInHtml();
  showPetComment("Treat", "Damn its YUMMY!");
  animatePet();
}

function clickedPlayButton() {
  // Increase pet happiness.
  pet_info.happiness += 4;
  // Decrease pet weight.
  pet_info.weight -= 1;
  checkAndUpdatePetInfoInHtml();
  showPetComment("Play", "Yehey!!");
  animatePet();
}

function clickedExerciseButton() {
  // Decrease pet happiness.
  pet_info.happiness -= 3;
  // Decrease pet weight.
  pet_info.weight -= 2;
  checkAndUpdatePetInfoInHtml();
  showPetComment("Exercise", "Damn I'm tired!");
  animatePet();
}

// New action: cuddling raises happiness without changing weight.
function clickedCuddleButton() {
  pet_info.happiness += 6;
  checkAndUpdatePetInfoInHtml();
  showPetComment("Cuddle", "Yahoo!");
  animatePet();
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  // Add conditional so if weight is lower than zero, it becomes zero.
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  // Happiness must also stay at or above zero after repeated exercise clicks.
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
}

// Updates the HTML with the current values in your pet_info object.
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);

  // This extra behavior changes the mood below the happiness information.
  if (pet_info.happiness === 0) {
    $('.mood').text('in need of some love');
  } else if (pet_info.happiness < 15) {
    $('.mood').text('content');
  } else {
    $('.mood').text('absolutely loved');
  }
}

// Counts actions for the recent-activity display. Refreshing resets this counter.
var action_count = 0;

function showPetComment(action, message) {
  // .text() is a starter method. It safely displays the pet's comment as text.
  $('.pet-message').text(message);
  addActivity(action);
}

function addActivity(action) {
  action_count += 1;

  // UNIQUE JQUERY METHOD #1: .clone()
  // clone() makes a deep copy of the hidden list-item template, including its
  // child spans. 
  var entry = $('#activity-template').clone();

  
  // Remove the copied ID so every ID on the page remains unique, then unhide
  // only the new copy. Fill it with a snapshot of the stats after this action.
  var row = entry[0];
  row.removeAttribute('id');
  row.hidden = false;
  row.querySelector('.activity-number').textContent = '#' + action_count;
  row.querySelector('.activity-action').textContent = action;
  row.querySelector('.activity-details').textContent =
    pet_info.weight + ' lb / ' + pet_info.happiness + ' tail wags per min';

  // UNIQUE JQUERY METHOD #2: .insertBefore(target)
  // insertBefore() places our cloned row immediately before the target node.
  
  var list = document.getElementById('activity-list');
  entry.insertBefore(list.firstElementChild);
  document.getElementById('activity-empty').hidden = true;

  // Keep the five newest visible entries and discard the oldest with the DOM.
  var entries = list.querySelectorAll('.activity-entry:not([hidden])');
  if (entries.length > 5) {
    list.removeChild(entries[entries.length - 1]);
  }
}

function animatePet() {
  // A CSS animation keeps the photo bounce 
  // animation method. Removing the class and reading offsetWidth restarts it
  // on rapid clicks. CSS turns motion off for reduced-motion preferences.
  var image = document.querySelector('.pet-image');
  image.classList.remove('pet-bounce');
  void image.offsetWidth;
  image.classList.add('pet-bounce');
}
