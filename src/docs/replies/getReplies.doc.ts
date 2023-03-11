export const getReplies = {
  get: {
    tags: ["replies"],
    summary: "Fetch all comment replies",
    description: "Fetch user replies from database sorted by newest first.",
    parameters: [
      { $ref: "#/components/parameters/postId" },
      { $ref: "#/components/parameters/commentId" },
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
                results: [
                  {
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
                  {
                    _id: "640b4d57165cf6e267d8c562",
                    content: "you are right dear",
                    user: "640b3eb9e88fe049122b8f34",
                    comment: "640b395ce88fe049122b8f20",
                    isDeleted: false,
                    deletedAt: null,
                    createdAt: "2023-03-10T15:31:35.642Z",
                    updatedAt: "2023-03-10T15:31:35.642Z",
                    __v: 0,
                  },
                ],
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
