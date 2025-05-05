const toggleBtn = document.getElementById('toggleBtn');
const textOutput = document.getElementById('textOutput');

let recognition;
let listening = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';

  recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    textOutput.value += transcript + ' ';
  };

  recognition.onerror = function(event) {
    console.error('Speech recognition error', event.error);
  };
} else {
  alert("Your browser doesn't support Speech Recognition. Please use Chrome.");
}

toggleBtn.addEventListener('click', () => {
  if (listening) {
    recognition.stop();
    toggleBtn.textContent = '🎤 Start Listening';
  } else {
    recognition.start();
    toggleBtn.textContent = '🛑 Stop Listening';
  }
  listening = !listening;
});
