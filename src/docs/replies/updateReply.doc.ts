export const updateReply = {
  put: {
    tags: ["replies"],
    summary: "Update reply by id",
    description: "Update user reply in database.",
    parameters: [
      { $ref: "#/components/parameters/postId" },
      { $ref: "#/components/parameters/commentId" },
      { $ref: "#/components/parameters/id" },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/post" },
        },
      },
    },
    responses: {
      200: { $ref: "#/components/responses/Success/Updated" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
