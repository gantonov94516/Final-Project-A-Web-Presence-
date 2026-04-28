// Created by Gleb Antonov (Firey)
// JavaScript to handle button enabling/disabling and image movement

// --- GLOBAL VARIABLES ---

// Variable to hold our timer/interval for the animation
var intervalId;

// Variable to track the image's X (left-to-right) position
var imgX = 10;

// Variable to track the image's Y (up-and-down) position
var imgY = 200;

// Variable to control how fast the image moves horizontally
var speedX = 5;

// Variable to control how fast the image moves vertically
var speedY = 5;

// --- BUTTON TOGGLE FUNCTIONS ---

// Function triggered when the Start button is clicked
function clickStart() {
    
    // Grabs the start button and disables it so it cannot be clicked again
    document.getElementById("startBtn").disabled = true;
    
    // Grabs the stop button and enables it so the user can stop the image
    document.getElementById("stopBtn").disabled = false;
    
    // Updates the status text using innerHTML (Required by assignment)
    document.getElementById("statusMsg").innerHTML = "Status: MEME IS ON THE MOVE!";
    
    // Calls the secondary function to actually start moving the image
    startMoving();
}

// Function triggered when the Stop button is clicked
function clickStop() {
    
    // Grabs the stop button and disables it
    document.getElementById("stopBtn").disabled = true;
    
    // Grabs the start button and enables it so the user can restart the movement
    document.getElementById("startBtn").disabled = false;
    
    // Updates the status text using innerHTML (Required by assignment)
    document.getElementById("statusMsg").innerHTML = "Status: MEME STOPPED.";
    
    // Calls the secondary function to actually stop the image
    stopMoving();
}

// --- MOVEMENT FUNCTIONS ---

// Secondary function that starts the animation
function startMoving() {
    
    // Uses setInterval to run the 'bounceLogic' function every 20 milliseconds
    // We save this timer in 'intervalId' so we can stop it later
    intervalId = setInterval(bounceLogic, 20);
}

// Secondary function that stops the animation
function stopMoving() {
    
    // Uses clearInterval to destroy the timer, freezing the image in place
    clearInterval(intervalId);
}

// Function that does the math to move the image and bounce it off walls
function bounceLogic() {
    
    // Grabs the meme image element from the HTML
    var meme = document.getElementById("memeImage");

    // Adds the speed to the current X position to move it left/right
    imgX = imgX + speedX;
    
    // Adds the speed to the current Y position to move it up/down
    imgY = imgY + speedY;

    // Checks if the image hits the RIGHT side or the LEFT side of the screen
    // window.innerWidth gets the total width of the browser window
    if (imgX + meme.width > window.innerWidth || imgX < 0) {
        // Multiplies the speed by -1 to reverse direction (bounce)
        speedX = speedX * -1;
    }

    // Checks if the image hits the BOTTOM side or the TOP side of the screen
    // window.innerHeight gets the total height of the browser window
    if (imgY + meme.height > window.innerHeight || imgY < 0) {
        // Multiplies the speed by -1 to reverse direction (bounce)
        speedY = speedY * -1;
    }

    // Applies the new X math to the CSS 'left' property to visually move the image
    meme.style.left = imgX + "px";
    
    // Applies the new Y math to the CSS 'top' property to visually move the image
    meme.style.top = imgY + "px";
}
