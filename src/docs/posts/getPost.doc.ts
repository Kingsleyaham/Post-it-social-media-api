export const getPost = {
  get: {
    tags: ["posts"],
    summary: "Find post by id",
    description: "Fetch a single post from database using post id",
    parameters: [
      {
        $ref: "#/components/parameters/id",
      },
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
                post: {
                  _id: "640b2f7c703e2ad47fa2602c",
                  content: "chilling out with the big boys at tarvana",
                  user: "640b17f371de7b285372163f",
                  isDeleted: false,
                  deletedAt: null,
                  createdAt: "2023-03-10T13:24:12.715Z",
                  updatedAt: "2023-03-10T13:24:12.715Z",
                  __v: 0,
                },
              },
            },
          },
        },
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
