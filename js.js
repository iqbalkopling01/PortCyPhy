const text = document.querySelector("#dynamic-text");  // Seleksi elemen dengan id "dynamic-text"

// Mendapatkan atribut dari elemen span
const typingSpeed = parseInt(text.getAttribute("typing-speed")) || 100;  // Default 100ms jika tidak ada
const typingDelay = parseInt(text.getAttribute("typing-delay")) || 1000;  // Default 1000ms jika tidak ada
const words = text.getAttribute("words").split(',');  // Memecah kata berdasarkan koma

// Generator (iterate from 0 to words.length - 1)
function* generator() {
  let index = 0;
  while (true) {
    yield index++;
    if (index >= words.length) {
      index = 0;
    }
  }
}

// Fungsi untuk mengubah durasi dan steps animasi
function changeAnimationSpeed(duration, steps) {
  document.documentElement.style.setProperty('--typing-duration', `${duration}s`);
  document.documentElement.style.setProperty('--steps', steps);
}

// Fungsi untuk mengubah animasi penghapusan (delete)
function changeDeleteAnimationSpeed(duration) {
  document.documentElement.style.setProperty('--deleting-duration', `${duration}s`);
}

// Printing effect
function printChar(word) {
  let i = 0;
  text.innerHTML = "";
  let id = setInterval(() => {
    if (i >= word.length) {
      deleteChar();
      clearInterval(id);
    } else {
      text.innerHTML += word[i];
      i++;
    }
  }, typingSpeed);  // Gunakan typingSpeed dari atribut
}

// Deleting effect
function deleteChar() {
  let word = text.innerHTML;
  let i = word.length - 1;
  let id = setInterval(() => {
    if (i >= 0) {
      text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
      i--;
    } else {
      printChar(words[gen.next().value]); // Mulai menulis kata berikutnya setelah penghapusan selesai
      clearInterval(id);
    }
  }, 200); // Kecepatan penghapusan lebih cepat (200ms)
}

// Initializing generator
let gen = generator();

// Menunggu typingDelay sebelum mulai mengetik
setTimeout(() => {
  printChar(words[gen.next().value]);  // Mulai efek pengetikan dengan kata pertama
}, typingDelay);

