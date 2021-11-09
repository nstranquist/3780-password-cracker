// Util functions for creating the 3 password files
const fs = require("fs")
// import cryptographic hashing library
const bcrypt = require('bcrypt')
const md5 = require('md5')

const dir = "files/"

function createFileV1(username, password) {
  // write to file_1 in plaintext
  fs.writeFileSync("./files/file1.txt", `${username}\n${password}\n`);
}

function createFileV2(username, password) {
  // hash password
  let hash = generateHash(password)

  console.log('got hash:', hash);

  // write to file_2 in "some format" i.e. plaintext
  fs.writeFileSync("./files/file2.txt", `${username}\n${hash}\n`);
}

function createFileV3(username, password, salt_rounds, returnHash = false) {
  // hash and salt password, write to file_3 in "some format" i.e. plaintext
  bcrypt.genSalt(salt_rounds, function(err, salt) {
    if(err) {
      console.log('ERROR: Could not salt password:', err)
      return;
    }
    console.log('got salt:', salt)

    // hash and salt
    bcrypt.hash(password, salt, function(err, hash) {
      if(err) {
        console.log("ERROR: Could not hash password:", err)
        return;
      }
      console.log('got hash:', hash)

      // write username and hashed password to file_3
      if(!returnHash) {
        fs.writeFileSync("./files/file3.txt", `${username}\n${hash}\n`)
      }

      if(returnHash)
        return hash;
      else return undefined;
    });
  })
}

const getCredentialsFromFile = (filename) => {
  let file = fs.readFileSync(`./files/${filename}`, 'utf8')
  if(!file) {
    console.log("error: could not read from file")
    return;
  }

  let lines = file.split('\n')
  let username = lines[0]
  let password = lines[1]

  return {username, password}
}

const generateHash = plaintext => {
  return md5(plaintext)
}

module.exports = {
  createFileV1,
  createFileV2,
  createFileV3,
  getCredentialsFromFile,
  generateHash,
}