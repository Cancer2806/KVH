# Cottage Bookings
Accommodation Website and Booking Application

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
  

## Description

The application allows visitors to browse the Site and then to book accommodation once happy that it meets their needs.  In order to finalise a booking, a visitor must create a User profile.  Once the User profile is complete, a logged in Guest can view their bookings, current and previous, and also view their profile.  The application uses the MERN stack, with a GraphQl/Apollo middleware arrangement.  Users with 'admin' privileges can view and update bookings (update/confirm/cancel), property details, cottage/room details and users (determining who should have admin privileges).  
The application is currently a work in progress.  

<br>
  
## Table of Contents

- [Installation](#installation-notes)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

<br>

## Installation Notes  

  The application is deployed on Heroku using MongoDB and Atlas.  
  The application can be cloned to a personal computer at this point in time.  Once on your computer, use Node to setup.  npm i will initiate the root package.  After that, run the following scripts:  'npm run install', followed by 'npm run seed' and then 'npm run develop'.  The application should open automatically on your browser, using the localhost.  Use React Version 17 as it has not yet been tested on later React versions.  This also applies to the other packages in the package.json files.   

<br>

## Usage 

  Once complete, the application will be completely intuitive for users.  Note that User profiles cannot be viewed unless the User has logged in (the menu access will only appear once logged in).  Likewise, the Administrator console only becomes available once a User with 'admin' privileges has logged in.   

  The application is deployed at:  https://mernbooksearch007.herokuapp.com/
 
  <br>

  The Git repository for the applicaton is held at:  https://github.com/Cancer2806/Mern_Booksearch.  The original REST code can be found at: https://github.com/Cancer2806/Rest_Booksearch

<br>

  Following are screenshots showing the application in use:  


Login Screen:
<br>
<img src="./assets/images/LoginScreen.png" width=700 alt = "Login Screen">  
This screen allows a previous User to Login.  It also provides a button to allow a new User to Signup and create a profile.   

<br>

Saved Books:
<br>
<img src="./assets/images/Saved Books.png" width=700 alt = "Saved Books View">  
Provides a view of the Books saved by the User and allows the User to delete a book if no longer wanted   

<br>

Search Screen:
<br>
<img src="./assets/images/BookSearch.png" width=700 alt = "Logged In Blog View">  
Landing page for the application.  From here, a visitor can conduct a book search or choose to Signup and create a profile.  Similarly, a previously signed up User can log in.   

<br>

## Features  

  Users passwords are encrypted using bcrypt.  JWT Tokens are used for User authentication, once the User has logged in.   

<br>

## Credits  

  The UWA Full Stack Web Developers Bootcamp provided the starter code as part of the Bootcamp.  Heroku and Atlas were used for Deployment of the App.  The app makes use of the full MERN stack.  Apollo and GraphQL were used for route control and database access.      

<br>

## Contributing  

  Please advise by email if there are any contributions you'd like to make.      



<br>

## Questions
Please use email for any questions you may have   

Github:  https://github.com/Cancer2806

Email:  frank.lavery@westnet.com.au

<br>

## License
This project is licensed under [MIT](https://opensource.org/licenses/MIT).

