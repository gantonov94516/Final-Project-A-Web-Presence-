// Created by Gleb Antonov
// Logic for "The Hand Mage's Deal"

// --- GLOBAL VARIABLES ---
// This holds the secret number of the "Safe" card (1, 2, or 3)
var safeCardNumber = 0;

// --- FUNCTION 1: START GAME ---
// Runs when you click "Make the Deal"
function startGame() {
    
    // 1. Reset the UI
    // Clear old win/loss text
    document.getElementById("resultText").innerHTML = "";
    // Hide the start button so you can't click it again yet
    document.getElementById("actionBtn").style.display = "none";
    // Show the card buttons
    document.getElementById("cardTable").style.display = "block";

    // 2. Determine the Safe Card
    // Math.random() * 3 gives 0.0 to 2.99
    // Math.ceil rounds up to 1, 2, or 3
    safeCardNumber = Math.ceil(Math.random() * 3);

    // 3. Dialogue Update
    // Update the mage's text to be dramatic
    document.getElementById("dialogueBox").innerHTML = 
        '"The cards are shuffled. My magic binds them. Do you feel lucky, traveler? Pick one..."';
}

// --- FUNCTION 2: PICK CARD (Parameter Function) ---
// This function takes "choice" (1, 2, or 3) from the button you clicked
function pickCard(choice) {

    // Hide the cards (you can only pick once!)
    document.getElementById("cardTable").style.display = "none";
    
    // Create a variable for the message
    var msg = "";
    var color = "";

    // --- CONDITIONAL LOGIC (The Game Rules) ---
    
    // Check if your choice matches the secret safe number
    if (choice == safeCardNumber) {
        // WIN CONDITION
        document.getElementById("dialogueBox").innerHTML = 
            '"Hmm... impressive. Fate smiles upon you today. You may leave... for now."';
        
        msg = "✨ YOU SURVIVED! You found the Safe Card. ✨";
        color = "green";
        
    } else {
        // LOSE CONDITION (Choice was wrong)
        document.getElementById("dialogueBox").innerHTML = 
            '"FOOLISH CHOICE! That card seals your doom! The shadows claim you!"';
        
        msg = "💀 YOU DIED! You picked a Death Card. 💀";
        color = "red";
    }

    // --- OUTPUT RESULTS ---
    var resElement = document.getElementById("resultText");
    
    // Set text and color
    resElement.innerHTML = msg;
    resElement.style.color = color;

    // Bring back the Start button, but change text to "Try Again"
    var btn = document.getElementById("actionBtn");
    btn.style.display = "inline"; // Show button
    btn.innerHTML = "Resurrect & Try Again"; // Change text
}
