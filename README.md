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

## Detailed overview and Learnings
### Development environment
Coding tool used was VS code and Development environment was setup in Docker, including FLyway, Server, client and E2E testing. First step of the project was creating Docker compose file manually and creating the project architecture. 

### Database and Schema
The app uses Posgres SQL for database. While developing, schema was setup using Flyway, in Docker. And later it was deployed to Neon DB online service and schema was setup manually using SQL querries. 
**New leanings:** Use of 'ON DELETE' in Database schema for Foreign keys, which helped reduce the amount code required for delete action and helped implement a less error prone delete function
**Want to learn and implement:** Enabling CI/CD and migration by connecting Neon and Github

### Autherisation of Users and Admins
JWT tokens are used for authorisation. And used inbuilt JWT middleware for checking and authorizing all users trying to access "/api/content/", and also it decodes the user info from the token for further server actions. An extra custom middleware was created for checking Admin authorization if the link starts with "/api/content/manage/".
**New leanings:** Use of JWT tockens and authenticater
**Want to learn and implement:** Using HTTP-only cookies and JWT combined

### Svelte and Svelte KIT

### Server - Deno(Hono)

### REST Api and CORS
Currently CORS is enabled through CORS middleware and all API endpoints are openly accesible. 

### Deplyment and CI/CD




