// Created by Gleb Antonov (Firey)
// Palindrome checking logic for The Rune Mirror

// --- SOUND IMPLEMENTATION ---
// Create an Audio object linked to the sound file. 
// This loads once when the page loads, not on every click.
var magicSound = new Audio("magic_check.mp3"); 

// Main function that runs when the user submits the form
function checkPalindrome() {
  // Grab the text that the user typed into the input box
  var userInput = document.getElementById("userWord").value;

  // Grab the warning message element so we can write to it
  var warningElement = document.getElementById("warningMsg");

  // Grab the result message element so we can write to it
  var resultElement = document.getElementById("resultMsg");

  // Grab the detail message element so we can write to it
  var detailElement = document.getElementById("detailMsg");

  // Clear any old messages from a previous submission
  warningElement.innerHTML = "";
  resultElement.innerHTML = "";
  detailElement.innerHTML = "";

  // --- INPUT VALIDATION ---

  // Check if the input box is completely empty (trim removes invisible spaces)
  if (userInput.trim() == "") {
    // Tell the user that they forgot to type something
    warningElement.innerHTML = "⚠️ The Mirror sees nothing. Please enter a word or phrase.";
    // Stop the function so we don't check an empty string
    return;
  }

  // --- SOUND EFFECT TRIGGER ---
  // Play the sound effect ONLY after validation passes.
  // Reset to start time (in case the user clicks fast) and play.
  magicSound.currentTime = 0;
  magicSound.play();

  // --- STRING MANIPULATION ---

  // Convert the whole string to lowercase so Racecar == racecar
  var cleaned = userInput.toLowerCase();

  // Remove ALL non-letter characters using a regular expression
  // The replace() searches through the whole string (the 'g' means ALL matches)
  // [^a-z] means "any character that is NOT a letter a through z"
  // We replace every non-letter with "" (nothing), deleting it
  cleaned = cleaned.replace(/[^a-z]/g, "");

  // Remove ALL spaces from the string
  // The split(" ") breaks it into an array at every space
  // The join("") glues it back together with nothing in between
  cleaned = cleaned.split(" ").join("");

  // --- REVERSE THE STRING USING A LOOP ---
  // Start with an empty string to build our reversed version
  var reversed = "";

  // Loop through the cleaned string starting from the LAST character
  // i starts at the last index (length - 1) and counts down to 0
  for (var i = cleaned.length - 1; i >= 0; i--) {
    // Add each character to the reversed string one by one from back to front
    reversed = reversed + cleaned[i];
  }

  // --- PALINDROME CHECK ---

  // Compare the cleaned original to the reversed version
  if (cleaned == reversed) {

    // If they match it IS a palindrome
    resultElement.innerHTML = "✨ YES! The Mirror reflects it perfectly. It IS a palindrome! ✨";
    // Set result text color to gold for a win
    resultElement.style.color = "#c9a227";

  } else {

    // If they do not match it is NOT a palindrome
    resultElement.innerHTML = "💀 The Mirror is broken. It is NOT a palindrome.";
    // Set result text color to red for a loss
    resultElement.style.color = "#ff4444";
  }

  // Show the cleaned and reversed strings so the user can see what was compared
  detailElement.innerHTML = "Cleaned: \"" + cleaned + "\" | Reversed: \"" + reversed + "\"";
}