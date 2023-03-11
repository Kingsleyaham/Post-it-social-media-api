export const getPosts = {
  get: {
    tags: ["posts"],
    summary: "Fetch all posts",
    description: "Fetches all posts from database sorted by newest first",
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                success: true,
                posts: [
                  {
                    _id: "640b2f7c703e2ad47fa2602c",
                    content: "chilling out with the big boys at tarvana",
                    user: "640b17f371de7b285372163f",
                    isDeleted: false,
                    deletedAt: null,
                    createdAt: "2023-03-10T13:24:12.715Z",
                    updatedAt: "2023-03-10T13:24:12.715Z",
                    __v: 0,
                  },
                  {
                    _id: "640b2ed0703e2ad47fa2602a",
                    content:
                      "this is a new post am creating for myself and i am very much proud of it",
                    user: "640b17f371de7b285372163f",
                    isDeleted: false,
                    deletedAt: null,
                    createdAt: "2023-03-10T13:21:20.467Z",
                    updatedAt: "2023-03-10T13:21:20.467Z",
                    __v: 0,
                  },
                ],
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
