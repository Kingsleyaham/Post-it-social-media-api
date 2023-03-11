export const getReply = {
  get: {
    tags: ["replies"],
    summary: "Find reply by id",
    description: "Fetch a single reply by id",
    parameters: [
      { $ref: "#/components/parameters/postId" },
      { $ref: "#/components/parameters/commentId" },
      { $ref: "#/components/parameters/id" },
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
                result: {
                  _id: "640b4daf165cf6e267d8c56b",
                  content: "reply with parent token",
                  user: "640b17f371de7b285372163f",
                  comment: "640b395ce88fe049122b8f20",
                  isDeleted: false,
                  deletedAt: null,
                  createdAt: "2023-03-10T15:33:03.237Z",
                  updatedAt: "2023-03-10T15:33:03.237Z",
                  __v: 0,
                },
              },
            },
          },
        },
      },
      401: { $ref: "#/components/responses/UnauthorizedError" },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
