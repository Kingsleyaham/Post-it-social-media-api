export const signup = {
  post: {
    tags: ["auth"],
    summary: "Create a new user",
    description:
      "Create a new user in database. A user is required to provide a username, email and password.",
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
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                success: true,
                user: {
                  username: "kingsley",
                  email: "kingsleyaham6@gmail.com",
                  avatarUrl:
                    "https://api.dicebear.com/5.x/pixel-art-neutral/svg?seed=kingsleyaham6-10hks-gmail-bgfha-com&size=200&radius=50",
                  isDeleted: false,
                  deletedAt: null,
                  _id: "640b17f371de7b285372163f",
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
        description: "Unathorized",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                success: false,
                message: "user already exist",
              },
            },
          },
        },
      },
    },
  },
};
