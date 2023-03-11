export const updatePost = {
  put: {
    tags: ["posts"],
    summary: "Update post by id",
    description:
      "Update a single post in database using post id. note: only the creator of a post can edit a post",
    parameters: [
      {
        $ref: "#/components/parameters/id",
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
        $ref: "#/components/responses/Success/Updated",
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
