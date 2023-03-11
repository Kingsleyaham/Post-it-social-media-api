export const createComment = {
  post: {
    tags: ["comments"],
    summary: "Create a new comment",
    description: "Creates a new comment in database",
    parameters: [
      {
        $ref: "#/components/parameters/postId",
      },
    ],

    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/post",
          },
        },
      },
    },
    responses: {
      200: {
        $ref: "#/components/responses/Success/Created",
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
