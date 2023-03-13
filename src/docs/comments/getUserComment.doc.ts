export const getUserComment = {
  get: {
    tags: ["users"],
    summary: "Find a single user comment by id",
    description:
      "Fetch a single comment on a post by user from database using user id or @username and also comment and post id",
    parameters: [
      {
        $ref: "#/components/parameters/userId",
      },
      {
        $ref: "#/components/parameters/postId",
      },
      {
        $ref: "#/components/parameters/id",
      },
    ],
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                success: true,
                comment: {
                  _id: "640b396ae88fe049122b8f22",
                  content: "you are really intelligent",
                  post: "640b38b8e88fe049122b8f1a",
                  user: "640b17f371de7b285372163f",
                  isDeleted: false,
                  deletedAt: null,
                  createdAt: "2023-03-10T14:06:34.828Z",
                  updatedAt: "2023-03-10T14:06:34.828Z",
                  __v: 0,
                },
              },
            },
          },
        },
      },
      401: {
        $ref: "#/components/responses/UnauthorizedError",
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
