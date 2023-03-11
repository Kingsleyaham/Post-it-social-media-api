export const updateComment = {
  put: {
    tags: ["comments"],
    summary: "Update comment by id",
    description:
      "Updates a user comment. Only the owner of a comment can edit or update the comment.",
    parameters: [
      {
        $ref: "#/components/parameters/postId",
      },
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
