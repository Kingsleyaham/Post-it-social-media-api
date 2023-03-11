export const getUser = {
  get: {
    tags: ["users"],
    summary: "Find user by id",
    description: "returns a single user from database using users id",
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
                user: {
                  _id: "640b17f371de7b285372163f",
                  username: "kingsley",
                  email: "kingsleyaham6@gmail.com",
                  avatarUrl:
                    "https://api.dicebear.com/5.x/pixel-art-neutral/svg?seed=kingsleyaham6-10hks-gmail-bgfha-com&size=200&radius=50",
                  isDeleted: false,
                  deletedAt: null,
                  createdAt: "2023-03-10T11:43:47.840Z",
                  updatedAt: "2023-03-10T11:43:47.840Z",
                  __v: 0,
                  img: "<img src='https://api.dicebear.com/5.x/pixel-art-neutral/svg?seed=kingsleyaham6-10hks-gmail-bgfha-com&size=200&radius=50' alt='kingsley avatar' />",
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
