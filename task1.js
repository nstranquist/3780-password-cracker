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

const USERNAME_LENGTH = 10
const PASSWORD_LENGTH = 10
const SALT_LENGTH = 4 // 1 byte

function main() {
  // ask user if they would like to create an account or authenticate


  // IF user wants to login:
  //    - accept their username, password, and verify it using 3 password files
  //    - put out success/error message for each of the 3 password file verifications


  // IF user wants to create an account:
  //    - create appropriate data in all 3 password files (will be used later to test parts 2 and 3)

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