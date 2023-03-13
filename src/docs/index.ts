import authDoc from "./auth";
import userDoc from "./users";
import postDoc from "./posts";
import commentDoc from "./comments";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Post-it Social Media Api",
    version: "1.0.0",
    contact: {
      email: "mailto:kingsleyaham6@gmail.com",
    },
    description: `PostIt is a simple social media app api built using NodeJs, Express, Typescript, MongoDB Database, Mongoose ODM`,
  },
  servers: [
    {
      url: `http://localhost:${port}/api/v1`,
      description: "Local server",
    },
    {
      url: "https://kingsley-postit-api.onrender.com/api/v1",
      description: "Prod server",
    },
  ],
  tags: [
    {
      name: "auth",
      description:
        "Authenticates a user i.e signup a new user and also login an existing user",
    },
    {
      name: "users",
      description:
        "Fetch all users, fetch a single user, update a user and delete a user",
    },
    {
      name: "posts",
      description:
        "Fetch all posts, fetch a single post, create a new post, update a post and delete a post",
    },
    {
      name: "comments",
      description:
        "Fetch all comments of a particular post, fetch a single comment, create a new comment, update a comment and delete a comment",
    },
  ],

  paths: {
    "/auth/signup": authDoc.signup,
    "/auth/login": authDoc.login,
    "/users": userDoc.baseUrl,
    "/users/{id}": userDoc.reqByID,
    "/users/{userId}/posts": postDoc.userPosts,
    "/users/{userId}/posts/{id}": postDoc.userSinglePost,
    "/users/{userId}/posts/{postId}/comments": commentDoc.userComments,
    "/users/{userId}/posts/{postId}/comments/{id}":
      commentDoc.userSingleComment,
    "/posts": postDoc.baseUrl,
    "/posts/{id}": postDoc.reqByID,
    "/posts/{postId}/comments": commentDoc.baseUrl,
    "/posts/{postId}/comments/{id}": commentDoc.reqByID,
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      user: {
        properties: {
          username: {
            type: "string",
            description: "username",
            example: "michael",
          },
          email: {
            type: "string",
            description: "user email",
            example: "kingsleyaham5@gmail.com",
          },
          password: {
            type: "string",
            description: "user password",
            example: "123456789",
          },
        },
      },
      post: {
        properties: {
          content: {
            type: "string",
            description: "post content",
            example: "chilling with the big guys",
          },
        },
      },
    },
    responses: {
      UnauthorizedError: {
        description: "Unathorized",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                success: false,
                message: "you are unauthenticated please login to access route",
              },
            },
          },
        },
      },
      Success: {
        Created: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  message: "Resource created successfully",
                },
              },
            },
          },
        },
        Updated: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  message: "Resource updated successfully",
                },
              },
            },
          },
        },
        Deleted: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  message: "Resource deleted successfully",
                },
              },
            },
          },
        },
      },
    },
    parameters: {
      id: {
        name: "id",
        in: "path",
        description: "ID of object to return",
        required: true,
        schema: {
          type: "string",
        },
      },
      postId: {
        name: "postId",
        in: "path",
        description: "ID of object to return",
        required: true,
        schema: {
          type: "string",
        },
      },
      userId: {
        name: "userId",
        in: "path",
        description: "ID of object to return",
        required: true,
        schema: {
          type: "string",
        },
      },
    },
  },
};

export default swaggerDoc;
