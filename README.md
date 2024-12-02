# Quiz App Project

This project was developed as a learning exercise and as part of my Fullstack course. The app allows users to create questions and answer them, making it a valuable tool for repetitive learning. Questions are organized by topics for better structure and focus. The app includes authentication features, enabling users to sign in as either regular users or admins. Admins have additional privileges, including the ability to add and manage topics, questions, and answers.

The link to the working project: https://quiz-app-2024.deno.dev/

Project Requirements (from the course): https://fitech101.aalto.fi/web-software-development-1-0/35-course-project-ii/1-project-handout/



## Developed, Tested, Built and Deployed With
- Deno (Hono)
- Svelte
- SvelteKit
- PostgresSQL
- Docker
- Flyway
- E2E Playwright\
- Deno Deploy

## Architecture, Overview and Learnings
### Development environment
Coding tool used was VS code and Development environment was setup in Docker, including FLyway, Server, client and E2E testing. First step of the project was creating Docker compose file manually and creating the project architecture. 

### Database and Schema
The app uses Posgres SQL for database. While developing, schema was setup using Flyway, in Docker. And later it was deployed to Neon DB online service and schema was setup manually using SQL querries. 

**New leanings:** Use of 'ON DELETE' in Database schema for Foreign keys, which helped reduce the amount code required for delete action and helped implement a less error prone delete function

**Want to learn and implement:** Enabling CI/CD and migration by connecting Neon with Github


### Svelte and SvelteKit
Client side was created using with Svelte using aditional support of SvelteKit. It works as SPA with conditional componets for each functinality. When I statrted coding I had only less than 15hrs of expeirence with Svelte. So the structure and many methods used in the app is not as clear as I wanted it to be, And many things learned while coding made me realise, it could have been structured and coded much better and clearly. Custom CSS is being used for now, so responsiveness and styling is not to the perfection

**New leanings:** use of $state for reactive states,   Svelte animation, in: and out: usage

**Want to learn and implement:** Routing in client side using SvelteKit,  Using Tailwind CSS, better components break down, cleaning up the code,


### Server - Deno(Hono)
Server side was created using Hono Web application framework. Inbuilt middlewares are being used for routing, CORS, logger and JWT tockens and authorisation. Architecture of the serverside was created following the course material.

**Want to learn and implement:** Want to restrict CORS to the exact domain of the client

### REST Api

### Autherisation of Users and Admins
JWT tokens are used for authorisation. And used inbuilt JWT middleware for checking and authorizing all users trying to access "/api/content/", and also it decodes the user info from the token for further server actions. An extra custom middleware was created for checking Admin authorization if the link starts with "/api/content/manage/".

**New leanings:** Use of JWT tockens and authenticater middleware

**Want to learn and implement:** Using HTTP-only cookies and JWT combined for better security


### Deplyment and CI/CD
GitHub and GitHub Actions are utilized for deployment. The server-side code is deployed automatically by linking the server-side project in Deno Deploy directly to its repository. For the client-side code, a separate GitHub Actions deployment workflow is implemented. This workflow builds the client-side application using Deno Build and deploys the compiled version to the client-side project in Deno Deploy.




