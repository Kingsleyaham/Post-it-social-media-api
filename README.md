# Post-It

Post-it allows you to post anything on a single post-it. A post-it is a single post on the post-it app, just like a tweet. Other users can reply to a post-it. Replying to a post-it is like adding a comment to a post (post-it).

## Table of contents

- [Post-It](#post-it)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Challenge](#challenge)
    - [Installation](#installation)
  - [Links](#links)
    - [Api Documentation](#api-documentation)
    - [Database Design](#database-design)
  - [My process](#my-process)
    - [Built with](#built-with)
  - [Soft Delete](#soft-delete)
    - [How I Handled Soft Delete](#how-i-handled-soft-delete)
  - [Author](#author)

## Overview

### Challenge

- Implement soft delete on all resources.
- Users can create, update or delete their accounts.
- Users can create, edit and delete their own post-it.
- Users can reply to a post-it, but a post-it’s reply can not have another reply. So replies are not recursive.
- A post-it’s author cannot delete replies to their own post-its unless it is their own reply; if they delete their post-it the replies remain.
- A deleted comment should not be returned in a response.
- Users can delete their own post-its’ replies. [ User-A can delete his/her own reply and cannot delete User-B replies]
- When returning post-its they should be sorted by newest first. That is, newly created post-its should come first and the old ones last.

### Installation

- clone the repository
- install the dependencies: using `npm install`
- create a new file named `.env` in root folder of the project.
- Copy and paste the content of `.env.example` into `.env` and filling the value.
- You are advice to use atlas for the `DATABASE_URI` key but local database url is fine
- start the server in development by running: `npm run dev` and read the terminal output to make sure that the server is running and the database is connected properly

## Links

### Api Documentation

- Local Server: [http://localhost:5000/api/v1/docs](http://localhost:5000/api/v1/docs)
- Live Server: [https://kingsley-postit-api.onrender.com/api/v1/docs](https://kingsley-postit-api.onrender.com/api/v1/docs)
- NB: Your port above may differ from port 5000

### Database Design

- [Database Modeling](https://dbdesigner.page.link/BxBpcWwEp4EqrvoT8)

## My process

### Built with

- [NodeJS (LTS version)](https://nodejs.org/) - JavaScript runtime environment
- [Express Js](http://expressjs.com/) - Nodejs Framework
- [MongoDB](https://www.mongodb.com/) - A NoSql Database
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Mongoose (Object Data Mapper)](https://mongoosejs.com/) - Elegant mongodb object modeling for node.jsJoi
- [Joi](https://joi.dev/) - Schema description language
  and data validator for JavaScript
- [JWT](https://jwt.io/) - JSON Web Tokens

## Soft Delete

### How I Handled Soft Delete

- Created two fields in my collections namely: isDeleted and deletedAt.
- **isDeleted** has datatype of boolean with default value **_false_**
- **deletedAt** has datatype of datetime with default value **_null_**
- One a user sends a delete request i update the **_isDeleted_** field to **_truee_** and **_deletedAt_** to the date and time the request was made.
- When fetching data from database i fetch records which has **_isDeleted_** column as false

## Author

- Twitter - [@aham_kingsley8](https://twitter.com/aham_kingsley8)
- LinkedIn - [kingsley-aham-282a51225](https://www.linkedin.com/in/kingsley-aham-282a51225/)

_NB: some routes are protected. You have to pass in the accessToken generated once you login to the authorisation header to access those routes_
