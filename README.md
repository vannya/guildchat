# Guild Chat

Live Demo - https://www.guildchat.vantabbert.com
_(Caution: Messages are not able to be deleted, so please be mindful of what you type.)_

#### Dev Notes

Technology used - TypeScript. React v17, Firebase Real-time Database, React Router, Sass, Webpack/Babel, Jest/React Testing Library, ESLint/Prettier

Please have Node installed to run the application locally. Otherwise, you can view a live demo at the site shown above.

##### Setup/Installation

1. Clone or download the repo locally.
2. In top level of the application folder, install all packages with the command `npm i`.
3. Create a file named `.env` at the top level of the folder. This hold the environmental variables that allow the application to connect with the database. These will be provided for security reasons with the email to this repo. Take the variables from that text file and paste them into the `.env` file. Please reach out via email if you need them again. The following image demonstrates the location.
   ![Folder structure](/folder_structure.jpeg).
4. To start the local development server/site, run the script `npm start`. This should open a browser to the url http://localhost:9000/. If it does not, you can open a browser to that url to see the running application.
5. Log in with a demo user to send messages to one of the other demo users.
6. To test 2-way communication, you can either open a second browser page and choose a different user. Or, partner with a dev friend and talk to one another!
7. One last reminder that there is no 'delete message' functionality, so be mindful of your messages. I will check in and wipe them periodically for safety/security reasons.
