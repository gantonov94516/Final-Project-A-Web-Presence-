// Created by Gleb Antonov (Firey)
// This file handles all the validation logic for the FCA Access Terminal

// This is the main function that runs when the user clicks "Verify & Access"
function validateForm() {

    // Grab whatever the user typed into the First Name box
    var firstName = document.getElementById("fName").value;

    // Grab whatever the user typed into the Last Name box
    var lastName = document.getElementById("lName").value;

    // Grab whatever the user typed into the Zip Code box
    var zip = document.getElementById("zipCode").value;

    // Grab the warning message element so we can write to it
    var warningElement = document.getElementById("warningMsg");

    // Grab the secret message element so we can show or hide it
    var secretElement = document.getElementById("secretMessage");

    // Clear any old warning messages from a previous attempt
    warningElement.innerHTML = "";

    // Hide the secret message in case it was showing from before
    secretElement.style.display = "none";

    // Reset the border back to the original orange color
    document.getElementById("loginContainer").style.borderColor = "#993300";

    // --- NAME VALIDATION ---

    // Combine first name + a space + last name into one full name string
    var fullName = firstName + " " + lastName;

    // Check if the first name box is empty
    if (firstName.trim() == "") {
        // Tell the user they forgot to enter a first name
        warningElement.innerHTML = "WARNING: First name cannot be empty.";
        // Stop the function here, do not continue
        return;
    }

    // Check if the last name box is empty
    if (lastName.trim() == "") {
        // Tell the user they forgot to enter a last name
        warningElement.innerHTML = "WARNING: Last name cannot be empty.";
        // Stop the function here, do not continue
        return;
    }

    // Check if the full name is longer than 20 characters
    if (fullName.length > 20) {
        // Tell the user the name is too long and show how many characters they used
        warningElement.innerHTML = "WARNING: Full name too long! (" + fullName.length + "/20 characters max).";
        // Stop the function here, do not continue
        return;
    }

    // --- ZIP CODE VALIDATION ---

    // Check if the zip code box is empty
    if (zip.trim() == "") {
        // Tell the user they forgot to enter a zip code
        warningElement.innerHTML = "WARNING: Access Code cannot be empty.";
        // Stop the function here, do not continue
        return;
    }

    // Check if the zip code is exactly 5 characters long
    if (zip.length != 5) {
        // Tell the user the zip is the wrong length
        warningElement.innerHTML = "WARNING: Access Code must be exactly 5 digits. You entered " + zip.length + ".";
        // Stop the function here, do not continue
        return;
    }

    // Loop through each character of the zip to make sure they are all digits
    // This catches things like "1234a" which is 5 chars but not all numbers
    for (var i = 0; i < zip.length; i++) {
        // isNaN checks if a character is NOT a number
        if (isNaN(zip[i])) {
            // Tell the user the zip must only contain numbers
            warningElement.innerHTML = "WARNING: Access Code must contain digits only. No letters or symbols.";
            // Stop the function here, do not continue
            return;
        }
    }

    // --- SUCCESS: All inputs passed validation ---

    // Put the user's full name inside the welcome message span
    document.getElementById("userFullName").innerHTML = fullName;

    // Reveal the secret message by changing display from "none" to "block"
    secretElement.style.display = "block";

    // Change the border to green to visually confirm success
    document.getElementById("loginContainer").style.borderColor = "#00FF00";
}
