# CS3780 Project 2: Passwords and Authentication

### Environment
For this project, I selected the Node.js javascript runtime environment. It is a popular choice for server-side applications that interface with databases and send information across API's, so I felt that it was a perfect use case for working with passwords and authentication in this project.

### Running
1. Clone the repo
2. Run `npm install`
3. Run `node index.js` to run the project

### Hashing Libraries

This project uses 2 libraries: bcrypt and md5. Originally, I was just going to use bcrypt. However, I realized that bcrypt does not allow the user to hash a password without providing a salt as well. Therefore, I'm using md5 to get a hash, and bcrypt to get a salt and use the salt with the hash.