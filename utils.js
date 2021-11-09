// Util functions for creating the 3 password files
const fs = require("fs")
// import cryptographic hashing library
const bcrypt = require('bcrypt')
const md5 = require('md5')

const dir = "files/"
const file_1 = "pw1_"
const file_2 = "pw2_"
const file_3 = "pw3_"


function createFileV1(username, password) {
  // write to file_1 in plaintext
  let filename = file_1 + (Math.random() * 100000) + ".txt"
  fs.writeFileSync(filename, `${username}\n${password}\n`);
}

function createFileV2(username, password) {
  // hash password
  let hash = md5(password);

  console.log('got hash:', hash);

  // write to file_2 in "some format" i.e. plaintext
  let filename = file_2 + (Math.random() * 100000) + ".txt"
  fs.writeFileSync(filename, `${username}\n${hash}\n`);
}

function createFileV3(username, password, salt, salt_rounds) {
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
      let filename = file_3 + (Math.random() * 100000) + ".txt"
      fs.writeFileSync(filename, `${username}\n${hash}\n`)
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

module.exports = {
  createFileV1,
  createFileV2,
  createFileV3,
  getCredentialsFromFile
}