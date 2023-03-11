export const updateUser = {
  put: {
    tags: ["users"],
    summary: "Update user by id",
    description: "Updates a user detail in database using users id.",
    parameters: [
      {
        $ref: "#/components/parameters/id",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/user",
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
