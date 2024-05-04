# MERN Stack E-Commerce Online Clothing Store

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![npm](https://img.shields.io/npm/v/react)

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack-based e-commerce platform for a clothing online store. Users can browse through various categories such as women's, men's, and kids' clothing. Upon clicking on an item, users are directed to an item page where they can add the item to their cart. They can view their cart, which automatically calculates the total price of all items. Users can also create an account using their email and password, allowing them to log in and out of the website. User data, including their username and cart items, are stored securely in a MongoDB database. Even if users log out and log back in, their cart remains intact. The platform includes a fully functioning admin panel, enabling administrators to perform CRUD (Create, Read, Update, Delete) operations on items in the MongoDB database. Additionally, the website is responsive, providing optimal viewing and interaction experience across various screen sizes, including tablets and mobile devices.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Usage](#usage)
4. [Deployment](#deployment)
5. [Contributing](#contributing)
6. [License](#license)
7. [Acknowledgements](#acknowledgements)
8. [Further Development](#further-development)

## Technologies Used
- MongoDB
- Express.js
- React.js
- Node.js
- JWT (JSON Web Tokens) for authentication
- Multer for handling file uploads
- CORS (Cross-Origin Resource Sharing) for enabling cross-origin requests

## Getting Started
### Prerequisites
- Node.js and npm installed on your machine
- MongoDB Atlas account (or a local MongoDB instance)

### Installation
1. Clone this repository to your local machine.
2. Navigate to the root folder of the project in your terminal.
3. Install dependencies by running `npm install`.
4. Set up your MongoDB database. Replace the MongoDB connection string in `app.js` with your database connection string.
5. Start the development server by running `npm run dev`.
6. The frontend and backend servers will be running concurrently.

## Usage
1. Visit `http://localhost:4000` to access the website.
2. Browse through different categories and add items to your cart.
3. Create a user account or log in with existing credentials.
4. Access the admin panel by navigating to the admin page.
5. Perform CRUD operations on items in the database as an admin user.

## Deployment
To deploy this application, follow the instructions provided by your hosting provider for deploying Node.js applications. Make sure to set up environment variables for sensitive information such as database credentials and JWT secret.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
- The project was built using the MERN stack.
- Special thanks to [GreatStack](https://www.youtube.com/@GreatStackDev/) for the tutorial video that inspired this project.

## Further Development
- Implement functionality for non-functional buttons and clickable text sections.
- Make the email capture input fully functional for collecting emails and sending welcome messages.
