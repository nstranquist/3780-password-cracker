const prompt = require('prompt-sync')({ sigint: true })

function main() {
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

    if(option !== 1 && option !== 2) {
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
    // use file2.txt
    
  } else if(option === 2) {
    // use file3.txt
    
  }
}

main()
