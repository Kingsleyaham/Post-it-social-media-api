export const getUsers = {
  get: {
    tags: ["users"],
    summary: "Fetch all users",
    description: "Returns all users",
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                success: true,
                users: [
                  {
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
                  },
                  {
                    _id: "640b1e7b71de7b2853721649",
                    username: "michael",
                    email: "james7@gmail.com",
                    avatarUrl:
                      "https://api.dicebear.com/5.x/miniavs/svg?seed=james7-rvlov-gmail-jqjd5-com&size=200&radius=50",
                    isDeleted: false,
                    deletedAt: null,
                    createdAt: "2023-03-10T12:11:39.674Z",
                    updatedAt: "2023-03-10T12:11:39.674Z",
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
