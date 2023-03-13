export const getUserComments = {
  get: {
    tags: ["users"],
    summary: "Fetch all user comments on a post ",
    description:
      "Fetch users comment on a post from database using user id or @username",
    parameters: [
      {
        $ref: "#/components/parameters/userId",
      },
      {
        $ref: "#/components/parameters/postId",
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
                comments: [
                  {
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
                  {
                    _id: "640b395ce88fe049122b8f20",
                    content: "am proud of your post",
                    post: "640b38b8e88fe049122b8f1a",
                    user: "640b17f371de7b285372163f",
                    isDeleted: false,
                    deletedAt: null,
                    createdAt: "2023-03-10T14:06:20.418Z",
                    updatedAt: "2023-03-10T14:06:20.418Z",
                    __v: 0,
                  },
                ],
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
