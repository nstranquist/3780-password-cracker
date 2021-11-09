const prompt = require('prompt-sync')({ sigint: true })
const fs = require('fs');
const bcrypt = require('bcrypt')
const { getCredentialsFromFile, generateHash, createFileV3, getPasswordWithSalt } = require('./utils')

const SALT_ROUNDS = 1

async function task3() {
  console.log('task 3')
  let isValid = false;
  let option, max_password_size;
  
  do {
    let option_str = prompt("Which would you like to crack? (1) or (2): ")

    if(!Number(option_str)) {
      console.log('error: invalid option, try again')
      isValid = false;
      continue;
    }

    option = Number(option_str)

    if(option !== 1 && option !== 2 && option !== 0) {
      console.log('error: invalid option, try again')
      isValid = false;
      continue;
    }

    isValid = true;
  } while(!isValid)

  // get max password size from user
  do {
    let max_password_size_str = prompt("Enter a max password size: ")
    if(!Number(max_password_size_str)) {
      console.log('error: invalid max password size, try again')
      isValid = false;
      continue;
    }

    max_password_size = Number(max_password_size_str)

    if(max_password_size < 1) {
      console.log('error: invalid max password size, try again')
      isValid = false;
      continue;
    }

    isValid = true;
  } while(!isValid)

  console.log('option:', option, 'max password size:', max_password_size)

  if(option === 1) {
    // use file2.txt, get hashed password
    const password = getCredentialsFromFile("file2.txt").password
    console.log('password:', password)
    const hashed_password = bruteForce(password, max_password_size)
    if(!hashed_password) {
      console.log('could not find hash')
    }
    else console.log('found result:', hashed_password)
    // attempt to brute force the password

    // generate hash with md5, compare the two
    // const hash = md5(password)

    // if(hash === password)
  }
  else if(option === 2) {
    // use file3.txt, get hashed and salted password
    const password = getCredentialsFromFile("file3.txt").password
    const hashed_password = await bruteForce(password, max_password_size, 2)
    if(!hashed_password) {
      console.log('could not find hash')
    }
    else console.log('found result:', hashed_password)
  }
  else if(option === 0) {
    const password = getCredentialsFromFile("file1.txt").password
    const hashed_password = bruteForce(password, max_password_size, 0)
    if(!hashed_password) {
      console.log('could not find hash')
    }
    else console.log('found result:', hashed_password)
  }
}

// 
const bruteForce = async (password, max_size, version=1) => {
  let startingLength = 1;
  let currentPassword;

  // set timer
  let startTime = Date.now();

  for(let i = startingLength; i<= max_size; i++) {
    let str, hashed_str;
    console.log('trying to crack with length:', i)

    // init string to modify

    // try [0-9], for i times
    for(let a=0; a<(10**i); a++) {
      str = String(a).padStart(i, '0')
      // console.log('str:', str)

      // try to match with password provided from file
      if(version===0)
        hashed_str = str;
      else if(version === 1)
        hashed_str = generateHash(str);
      else if(version === 2) {
        let bcrypt_salt = await bcrypt.genSalt(SALT_ROUNDS)
        hashed_str = await getPasswordWithSalt(str, bcrypt_salt)
        // console.log('got hashed password:', hashed_str)
        // hashed_str = await createFileV3("_", str, SALT_ROUNDS, true)
      }
      if(hashed_str === password) {
        console.log("MATCH:", password, 'plaintext:', str)
        currentPassword = password;
        break;
      }
    }
  }

  // end timer
  let endTime = Date.now()

  // get full time:
  let timeRan = endTime - startTime;

  console.log('total time ran:', timeRan)

  if(currentPassword) return currentPassword
  return undefined;
}

task3()
