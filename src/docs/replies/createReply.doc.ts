export const createReply = {
  post: {
    tags: ["replies"],
    summary: "Create a new reply",
    description: "Creates a reply for a comment in database",
    parameters: [
      { $ref: "#/components/parameters/postId" },
      { $ref: "#/components/parameters/commentId" },
    ],

    requestBody: {
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/post" },
        },
      },
    },
    responses: {
      200: { $ref: "#/components/responses/Success/Created" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
