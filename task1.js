/**
 * Write a program that allows a user to create an account and then authenticate whether or not they have an account. However, the trick is that this is done through three different password files.
 * When the program starts, it should ask the user if they would like to create an account or authenticate. If they want to log in, your program should accept their username and password and verify that using all 3 password files (you should output separate messages for each verification, just in case a verification succeeded on one file but not the others). If they want to create an account, the program should create the appropriate data in all 3 password files. Note the primary purpose of this program is to allow testing of parts 2 and 3.

For ease of cracking later, your passwords must be restricted to only numbers (0-9) of configurable length (so make sure you don’t fix the size too small in your code). The length of the salt should be one byte for this project. In practice, salt should be of much greater size than this. We have restricted the size for this project in order to make cracking it easier.

Usernames should be restricted to 10 alphabetic characters only. I better see input validation for this also!

The three password files should be as follows:
A plaintext username password pair, stored in text in a file
A username and a hashed password, stored in some format in the file
A username, a salt and the result of the hashed (password + salt), stored in some format in the file
 */

const prompt = require('prompt-sync')({
  sigint: true
})
const fs = require('fs')
const { getCredentialsFromFile, generateHash, createFileV1, createFileV2, createFileV3, getPasswordWithSalt } = require('./utils')
const bcrypt = require('bcrypt')

const USERNAME_LENGTH = 10
const PASSWORD_LENGTH = 10
const SALT_ROUNDS = 1 // 1 byte

async function main() {
  let isValid = true;
  let choice, username, password;

  // ask user if they would like to create an account or authenticate
  do {
    choice = prompt("Would you like to (a) authenticate, or (b) create a new account? ");
    console.log('choice:', choice)
    if(choice !== "a" && choice !== "b") {
      console.log("Error: Invalid format for your choice. Please select option 'a' or 'b' \n")
      isValid = false
    }
    else isValid = true
  } while(!isValid)

  // IF user wants to login:
  //    - accept their username, password, and verify it using 3 password files
  //    - put out success/error message for each of the 3 password file verifications
  do {
    username = prompt("Please enter a username: ");
    
    // validate
    if(!username || username.length > USERNAME_LENGTH|| username.length <= 0) {
      console.log('error: username not correct length')
      isValid = false;
      continue;
    }

    // detect any numeric chars
    let hasNumber = false;
    for(let z=0; z<username.length; z++) {
      if(Number(username[z])) {
        hasNumber = true;
        break;
      }
    }
    
    if(hasNumber) {
      console.log('error: only aphabetic chars allowed in username')
      isValid = false;
      continue;
    }
    isValid = true;
  } while(!isValid)

  do {
    password = prompt("Please enter a numeric password: (max length " + PASSWORD_LENGTH + "): ");
    
    // validate
    if(!password || !Number(password) || password.length > PASSWORD_LENGTH || password.length < 1) {
      console.log('error: password is invalid')
      isValid = false
      continue;
    }
    isValid = true;
  } while(!isValid)


  if(choice === "a") {
    // read from the 3 files and validate the username/password data
    const file1 = getCredentialsFromFile("file1.txt")
    const file2 = getCredentialsFromFile("file2.txt")
    const file3 = getCredentialsFromFile("file3.txt")
    
    
    // file1
    if(file1.username === username && file1.password === password) {
      console.log('success: username and password match file1')
    }
    else console.log('validation 1: username and password do not match file1')

    // file2
    if(file2.username === username && file2.password === generateHash(password)) {
      console.log('success: username and password match file2')
    }
    else console.log('validation 2: username and password do not match file2')

    // file3
    // cannot use the createFileV3 to create this hash, unless I modify that code to be less useful
    // I will instead manually parse the salt, then manually run the same bcrypt algorithm to see if I can match
    let createdPassword;
    if(SALT_ROUNDS !== 1) {
      console.log("warning: hash + salt auth will not work unless SALT_ROUNDS is set to 1")
      // assign password to the old method, which will surely generate a different salt from what was used to salt the password originally
      createdPassword = createFileV3(username, password, SALT_ROUNDS, true)
    }
    else {
      console.log('len:', file3.password.length)
      let salt_length = file3.password.length / 2
      console.log('salt len:', salt_length)

      let parsedSalt = file3.password.slice(0, salt_length-1)
      console.log('parsed salt:', parsedSalt, 'len:', parsedSalt.length)
      
      createdPassword = await getPasswordWithSalt(password, parsedSalt)
      console.log('created password:', createdPassword)
    }
      if(file3.username === username && file3.password === createdPassword) {
      console.log('success: username and password match file3')
    }
    else console.log('validation 3: username and password do not match file3')
  }

  // IF user wants to create an account:
  //    - create appropriate data in all 3 password files (will be used later to test parts 2 and 3)
  else if(choice === "b") {
    // create data in the 3 files
    createFileV1(username, password)

    createFileV2(username, password)

    createFileV3(username, password, SALT_ROUNDS)

  }

  // Validation:
  // - usernames should be 10 alphabetic characters only
  // - passwords restricted to only numbers 0-9, of configurable length
  // - length of salt should be 1 byte for this project

  // Files:
  // 1. plaintext username/password pair, stored in text in the file
  // 2. username and a hashed password, stored in "some format" in the file
  // 3. username, salt, and result of hashed password (pw + salt), stored in "some format" in the file

}

main();

module.exports = {
  SALT_ROUNDS
}