### API for project management

[![Build Status](https://github.com/ErickWendel/testing-serverless-apps/workflows/Docker%20Actions/badge.svg)](https://github.com/ErickWendel/testing-serverless-apps/actions)

### project description

This is in principle a very challenging project as it involves many tables and many relationships,
developed from the beginning, starting with data modeling, then it was time to choose the technologies,
I chose to develop with nestjs because it is robust and because I wanted to learn more about it, I used Postgres as the database.

### technologies used

- **Nest js** - Framework based on node js.
- **typescript** - By default, nest already comes with typescript.
- **Prisma** - ORM for relational databases.
- **Postgres** - Relational database.
- **Docker** – Containers to upload the database
- **Husky** - For commit routine, for example. Before making a commit, run tests or format the code.
- **Prettier** - To format the code and follow a pattern throughout the project
- **dbdiagram** - I used this software to model the data.

### system modeling
![modelagem-sistema](https://github.com/hebertsanto/API-project-management/assets/108555424/5b154751-4d69-4624-80c3-67442052ea0b)

## Features

### Authentication / security

- [x] Encrypt user passwords
- [x] Send email to confirm account
- [x] Validate email confirmation with token and change status in the database
- [x] auth with token jwt
- [ ] Email notifications
- [ ] Email templates in project
- [ ] Auth with github
- [ ] Reset password
- [ ] 2fa auth

### User

- [x] It is possible to create an account
- [x] It is possible to find an account by ID
- [x] It is possible to delete an account

### Profile

- [x] It is possible to have a profile
- [x] it is possible to find a profile by ID

### Projects

- [x] User can create a project
- [x] User can list a project by ID
- [x] User can list all his projects
- [x] User can delete a project
- [x] User can follow projects
- [x] User can stop following projects

### Project Tasks

- [x] User can create a task for a project
- [x] user can delete a task from a project
- [x] user can update a task from a project
- [ ] user can assign a project task to a participant
      
### Project ideas

- [x] It is possibel create a project idea
- [x] It is possibel delete a project idea
- [x] It is possible update a project idea
- [x] It is possible to find all project ideas that you created


### Project questions

- [x] User can add questions for a given project
- [x] User edit questions for a given project
- [x] User can delete questions from a given project
- [x] User can list all his created questions
      
### Project objectives

- [x] User can add objectives for a given project
- [x] User edit objectives for a given project
- [x] User can delete objectives from a given project
- [x] User can list all his created goals

### Project decisions

- [x] User can add decisions to a given project
- [x] User can update decisions for a given project
- [x] User can delete decisions for a given project
- [x] User can list a decision by ID
- [x] User can list all his decisions

### Project updates

- [x] User can add updates to a given project
- [x] User can edit updates to a given project
- [x] User can delete updates to a given project
- [x] User can list an update by ID
- [x] User can list all their updates
      
### Teams

- [x] User can create a team
- [x] User can list a team by ID
- [x] User can delete a team
- [x] User can edit team data
- [ ] User can invite participants by email

### Relationships

This is a project where there are several relationships which is really cool, besides being challenging, you get a lot of learning
with relational databases.

You can see all the relationships in the schema.prisma file,
I also provided a diagram where all the tables and relationships are.


### conclusion

It's been a challenging project and good for my evolution as a developer, I'm facing several
challenges, solving them and acquiring a lot of knowledge.

### contact

**email**: hebertsantosdeveloper@gmail.com

**linkedin**: [https://www.linkedin.com/in/hebert-santos-241429243/](https://www.linkedin.com/in/hebert-santos-241429243/)

**site** : [https://ihebert.vercel.app/](https://ihebert.vercel.app/)

  
