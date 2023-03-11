export const deleteReply = {
  delete: {
    tags: ["replies"],
    summary: "Delete reply by id",
    description: "Delete user reply from database.",
    parameters: [
      { $ref: "#/components/parameters/postId" },
      { $ref: "#/components/parameters/commentId" },
      { $ref: "#/components/parameters/id" },
    ],
    responses: {
      200: { $ref: "#/components/responses/Success/Deleted" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
