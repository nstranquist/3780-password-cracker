/**
 * In this task you are writing a program to generate random password files to attempt to crack. When run, this program should prompt for a particular password range (for example, all passwords between length 3 and 8) and a number of accounts (100 for example). It will then create usernames and passwords for 100 accounts in the specified ranges for each of the 3 password files. For this purpose it is probably useful for this program to create usernames of a particular format (usraaaaaaa-usraaaaadv) for example.
 */
const prompt = require('prompt-sync')({
  sigint: true
});
const fs = require('fs');

function main() {
  let password_lower, password_upper; // min/max pw lengths to try
  let num_accounts;
  let isValid = false;

  // prompt for a password range (i.e. all passwords between legnth 3 and 8)
  do {
    let pw_lower = prompt('Enter the minimum password length: ');
    let pw_upper = prompt('Enter the maximum password length: ');

    if(!Number(pw_lower) || !Number(pw_upper)) {
      console.log('Please enter a number');
      isValid = false;
      continue;
    }
    password_lower = Number(pw_lower);
    password_upper = Number(pw_upper);

    if(password_lower > password_upper) {
      console.log('Please enter a valid range');
      isValid = false;
      continue;
    }
    if(password_lower < 0) {
      console.log('Please enter a valid range');
      isValid = false;
      continue;
    }

    isValid = true;
  } while(!isValid)
    
  // prompt for a number of accounts
  do {
    let num_accounts_str = prompt('Enter the number of accounts to generate: ');
    
    if(!Number(num_accounts_str)) {
      console.log('Please enter a valid number');
      isValid = false;
      continue;
    }

    num_accounts = Number(num_accounts_str);

    if(num_accounts < 0) {
      console.log('Please enter a positive number');
      isValid = false;
      continue;
    }

    isValid = true;  
  } while(!isValid)


  // create usernames and passwords for 100 accounts in specified pw ranges for each of the 3 password files
  //  - create usernames of a particular format (i.e. usraaaaaaa-usraaaaadv)??
  let dirname = "./generated-files"

  // remove any and all folders in /generated-files
  let files;
  try {
    files = fs.readdirSync(dirname, { withFileTypes: false });
    for(let i=0; i<files.length; i++) {
      console.log(files[i]);
      fs.rmSync(`${dirname}/${files[i].toString()}`, { recursive: true })
    }
  } catch(error) {
    console.log('error:', error)
    throw error;
  }
  
  for(let a=password_lower; a<=password_upper; a++) {
    fs.mkdirSync(dirname + "/" + a.toString())

    let subdirname = "/" + a.toString()
    for(let i=0; i<3; i++) {
      fs.mkdirSync(dirname + subdirname + "/" + i.toString())
    }
  }

  for(let a=password_lower; a<=password_upper; a++) {
    console.log("starting pw generation for length:", a)

    // generate num_accounts of password files for each of the 3 files, for each password length in range
    let subdirname = "/" + a.toString()
    for(let b=0; b<3; b++) {
      for(let i=0; i<num_accounts; i++) {
        // create 3 files, for each of the specified functions
        let temp_user = generateCredentialString(a);
        console.log('temp user:', temp_user)

        let temp_pw = generateCredentialString(a);
        console.log('temp pw:', temp_pw, "\n")

        // write temp_user and temp_pw to file
        fs.writeFileSync(dirname + subdirname + "/" + b.toString() + "/" + i.toString() + ".txt", `${temp_user}\n${temp_pw}\n`, {
          flag: "w",
        })
      }
    }
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

main()