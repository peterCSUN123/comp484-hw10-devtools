// Homework 10: Console methods and genuine browser diagnostics in Giga Pet.
// This 
'use strict'; // this makes this makes the code in javascript into strict mode

function setLabStatus(message) {
  document.getElementById('lab-status').textContent = message;
}

function logInfo() {
  console.info('[GigaPet:INFO] Companion loaded: ' + pet_info.name);
  console.log('[GigaPet:INFO] Current pet snapshot', { ...pet_info });
}

function logWarning() {
  console.warn('[GigaPet:WARN] Practice warning: too many treats can increase weight.');
}

function logError() {
  // An application-authored error message. This does not throw an exception.
  console.error('[GigaPet:ERROR] Practice error: pet-save service is unavailable (simulated).');
}

function logTable() {
  console.table([
    { action: 'Treat', weightChange: 2, happinessChange: 5 },
    { action: 'Play', weightChange: -1, happinessChange: 4 },
    { action: 'Exercise', weightChange: -2, happinessChange: -3 },
    { action: 'Cuddle', weightChange: 0, happinessChange: 6 }
  ]);
}

function logGroup() {
  console.group('[GigaPet:GROUP] Companion health check');
  console.log('Name:', pet_info.name);
  console.log('Weight:', pet_info.weight, '| type:', typeof pet_info.weight);
  console.log('Happiness:', pet_info.happiness);
  console.groupEnd();
}

function logCustom() {
  console.log(
    '%cGIGA PET | ' + pet_info.name + ' is ready for adventure!',
    'background: #26351e; color: #e0e6b5; border: 1px solid #c5a47b; padding: 6px 10px; font-weight: bold;'
  );
}

function logAllExamples() {
  logInfo();
  logWarning();
  logError();
  logTable();
  logGroup();
  logCustom();
  setLabStatus('All console examples logged. Open the Console to inspect them.');
}

function cause404() {
  // This requests an actual missing resource. The browser reports the error.
  // The changing query prevents a cached failure from hiding a repeat request.
  const image = document.createElement('img');
  image.alt = '';
  image.addEventListener('error', function () {
    setLabStatus('Missing-image request failed. Check the Console and Network for HTTP 404.');
    image.remove();
  }, { once: true });
  image.src = 'missing-pet-badge.png?attempt=' + Date.now();
  document.getElementById('devtools-requests').appendChild(image);
}

function causeTypeError() {
  setLabStatus('Triggering an uncaught TypeError: pet_info.medicalRecord is undefined.');
  pet_info.medicalRecord.lastVisit.toUpperCase();
}

function causeViolation() {
  const start = performance.now();
  while (performance.now() - start < 3000) {
    // Intentionally block this event handler for approximately three seconds.
  }
}

function resetPet() {
  pet_info.name = 'Chop';
  pet_info.weight = 12;
  pet_info.happiness = 8;
  action_count = 0;
  document.querySelectorAll('#activity-list .activity-entry:not([hidden])').forEach(function (entry) {
    entry.remove();
  });
  document.getElementById('activity-empty').hidden = false;
  document.querySelector('.pet-message').textContent = "Woof! I'm Chop. Ready when you are.";
  checkAndUpdatePetInfoInHtml();
  console.info('[GigaPet:RESET] Weight 12, happiness 8.');
  setLabStatus('Pet reset. Click Treat to test the weight calculation.');
}

document.addEventListener('DOMContentLoaded', function () {
  const examples = {
    'log-info': logInfo,
    'log-warning': logWarning,
    'log-error': logError,
    'log-table': logTable,
    'log-group': logGroup,
    'log-custom': logCustom,
    'log-all': logAllExamples,
    'cause-404': cause404,
    'cause-typeerror': causeTypeError,
    'cause-violation': causeViolation,
    'reset-pet': resetPet
  };
  Object.entries(examples).forEach(function ([id, handler]) {
    document.getElementById(id).addEventListener('click', handler);
  });
});
