// Created by Gleb Antonov (Firey)

// === CLASS DEFINITION ===
class Player {
    constructor(name) {
        this.name = name;
        this.wins = 0;
        this.losses = 0;
        this.streak = 0;
    }

    recordWin() {
        this.wins++;
        this.streak++;
    }

    recordLoss() {
        this.losses++;
        this.streak = 0;
    }

    getTotalRounds() {
        return this.wins + this.losses;
    }
}

// === OBJECTS & ARRAYS ===
const winDialogues = [
    "The Hand Mage leans back. \"Interesting... you chose the one card that spares you.\"",
    "\"A lucky draw! The cards favor you this time.\"",
    "You sense approval in her gaze as she nods slowly."
];

const loseDialogues = [
    "The HandMage closes her eyes. \"A poor bargain. The dead card answered you first.\"",
    "\"Fate is cruel today,\" she murmurs, taking the death card.",
    "\"Not all deals end well,\" she says sympathetically."
];

// === LOOPS & HELPER FUNCTIONS ===
function resetCards() {
    // Clear revealed states and recreate wrapper structure
    for (let i = 1; i <= 3; i++) {
        const container = document.getElementById("card" + i + "Container");
        if (container) {
            // Remove old wrapper if exists
            const existingWrapper = container.querySelector(".card-wrapper");
            if (existingWrapper) {
                // Move front and back cards out of wrapper first
                const front = existingWrapper.querySelector(".front");
                const back = existingWrapper.querySelector(".back");
                container.appendChild(front);
                container.appendChild(back);
                existingWrapper.remove();
            }
            
            // Create the wrapper structure
            const wrapper = document.createElement("div");
            wrapper.className = "card-wrapper";
            
            const front = container.querySelector(".front");
            const back = container.querySelector(".back");
            
            wrapper.appendChild(front);
            wrapper.appendChild(back);
            container.appendChild(wrapper);
            
            container.classList.remove("revealed", "disabled");
        }
    }
}

function disableAllCards() {
    // Add 'disabled' class to prevent clicks
    for (let i = 1; i <= 3; i++) {
        document.getElementById("card" + i + "Container").classList.add("disabled");
    }
}

// === STRING MANIPULATION & VALIDATION ===
function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

function validateName(name) {
    let trimmed = name.trim();
    
    if (trimmed.length === 0) {
        return "⚠️ Name cannot be empty!";
    }
    
    if (trimmed.length < 2) {
        return "⚠️ Name must be at least 2 characters!";
    }
    
    if (trimmed.length > 20) {
        return "⚠️ Name must be under 20 characters!";
    }
    
    if (/[0-9]/.test(trimmed)) {
        return "⚠️ Names cannot contain numbers!";
    }
    
    return toTitleCase(trimmed);
}

// === GLOBAL VARIABLES ===
let player = null;
let safeCardNumber = 0;
let gameRunning = false;

// === INITIALIZATION ===
window.onload = setupPage;
function setupPage() {
    document.getElementById("enterBtn").onclick = function(e) { 
        e.preventDefault();
        submitName();
    };
    
    document.getElementById("startButton").onclick = startGame;
    document.getElementById("restartButton").onclick = resetTable;
    
    // Disable the "Begin the Deal" button until a name is entered
    document.getElementById("startButton").disabled = true;
}

// === NAME SUBMISSION FUNCTION ===
function submitName() {
    let nameInput = document.getElementById("playerName").value;
    let result = validateName(nameInput);
    
    if (typeof result === "string" && result.startsWith("⚠️")) {
        document.getElementById("nameWarning").innerHTML = result;
        return;
    }
    
    player = new Player(result);
    document.getElementById("playerNameDisplay").textContent = player.name;
    updateStats();
    
    document.getElementById("nameScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    
    // Enable "Begin the Deal" button only after a valid name is entered
    document.getElementById("startButton").disabled = false;
    
    playGameSound("startSound");
}

// === MAIN GAME FUNCTIONS ===
function startGame() {
    safeCardNumber = Math.floor(Math.random() * 3) + 1;
    gameRunning = true;
    
    // Reset cards for new round
    resetCards();
    
    document.getElementById("resultMessage").innerHTML = "";
    
    document.getElementById("startButton").disabled = true;
    document.getElementById("restartButton").disabled = false;
    
    playGameSound("startSound");
}

function chooseCard(cardChoice) {
    // Prevent clicks during game transitions
    if (!gameRunning) return;
    
    // Mark game as in progress but disable further clicks immediately
    disableAllCards();
    
    // Find the container for this card
    const cardContainer = document.getElementById("card" + cardChoice + "Container");
    
    // Reveal the clicked card using the wrapper approach
    if (cardContainer) {
        cardContainer.classList.add("revealed");  // Triggers flip animation
        
        const backFace = cardContainer.querySelector(".back");
        
        if (cardChoice == safeCardNumber) {
            // WIN SCENARIO
            player.recordWin();
            
            backFace.innerHTML = "SAFE";
            backFace.className = "card back safe";  // Green glow
            
            let randomLine = winDialogues[Math.floor(Math.random() * winDialogues.length)];
            document.getElementById("dialogueBox").innerHTML = randomLine;
            
            document.getElementById("resultMessage").innerHTML = "You survived the deal!";
            document.getElementById("resultMessage").style.color = "#9fffb0";
            
            playGameSound("winSound");
        } else {
            // LOSE SCENARIO
            player.recordLoss();
            
            backFace.innerHTML = "DEATH";
            backFace.className = "card back death";  // Red glow
            
            // Also reveal the safe card for transparency
            const safeContainer = document.getElementById("card" + safeCardNumber + "Container");
            if (safeContainer) {
                setTimeout(() => {
                    safeContainer.classList.add("revealed");
                    const safeBackFace = safeContainer.querySelector(".back");
                    safeBackFace.innerHTML = "SAFE";
                    safeBackFace.className = "card back safe";
                }, 500); // Slight delay for dramatic effect
            }
            
            let randomLine = loseDialogues[Math.floor(Math.random() * loseDialogues.length)];
            document.getElementById("dialogueBox").innerHTML = randomLine;
            
            document.getElementById("resultMessage").innerHTML = "You lost the deal.";
            document.getElementById("resultMessage").style.color = "#ff8c8c";
            
            playGameSound("loseSound");
        }
        
        gameRunning = false; // Prevent multiple clicks
        updateStats();
    }
}

function resetTable() {
    gameRunning = false;
    safeCardNumber = 0;
    
    resetCards();
    
    document.getElementById("dialogueBox").innerHTML = "The Hand Mage watches you quietly. \"When you are ready, begin the deal.\"";
    document.getElementById("resultMessage").innerHTML = "";
    
    document.getElementById("startButton").disabled = false;
    document.getElementById("restartButton").disabled = true;
}

// === HELPER FUNCTIONS ===
function updateStats() {
    if (!player) return;
    
    document.getElementById("wins").textContent = player.wins;
    document.getElementById("losses").textContent = player.losses;
    document.getElementById("streak").textContent = player.streak;
}

function playGameSound(soundId) {
    var sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Audio play blocked:", e));
}
