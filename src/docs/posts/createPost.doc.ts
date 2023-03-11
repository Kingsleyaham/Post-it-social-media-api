export const createPost = {
  post: {
    tags: ["posts"],
    summary: "Create a new post",
    description: "Creates a new post in database",
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
