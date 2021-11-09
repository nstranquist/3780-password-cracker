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

  // console.log('got hash:', hash);

  // write to file_2 in "some format" i.e. plaintext
  fs.writeFileSync("./files/file2.txt", `${username}\n${hash}\n`);
}

async function createFileV3(username, password, salt_rounds, returnHash = false) {
  // hash and salt password, write to file_3 in "some format" i.e. plaintext
  try {
    let result_salt = await bcrypt.genSalt(salt_rounds)
    console.log('bcrypt salt:', result_salt, 'len:', result_salt.length)

    let result_hash = await bcrypt.hash(password, result_salt)
    console.log('bcrypt hash:', result_hash, 'len:', result_hash.length)

    if(returnHash)
      return result_hash
      
    // else write username and hashed password to file_3
    fs.writeFileSync("./files/file3.txt", `${username}\n${result_hash}\n`)
  } catch (error) {
    console.log('error using bcrypt to generate hash and salt:', error)
    throw error;
  }
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
  let hash = md5(plaintext)
  // console.log("md5 hash:", hash)
  return hash
}

const getPasswordWithSalt = async (plaintext, salt) => {
  try {
    const result_hash = await bcrypt.hash(plaintext, salt)

    return result_hash
  }
  catch (error) {
    console.log('error getting password with salt:', error)
  }
}

const generateCredentialString = (size) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let username = '';
  for(let i=0; i<size; i++) {
    username += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return username;
}

module.exports = {
  createFileV1,
  createFileV2,
  createFileV3,
  getCredentialsFromFile,
  generateHash,
  getPasswordWithSalt,
  generateCredentialString
}