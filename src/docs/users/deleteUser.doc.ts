export const deleteUser = {
  delete: {
    tags: ["users"],
    summary: "Delete user by id",
    description: "Updates a user detail in database using users id.",
    parameters: [
      {
        $ref: "#/components/parameters/id",
      },
    ],
    responses: {
      200: {
        $ref: "#/components/responses/Success/Deleted",
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
