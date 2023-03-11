export const login = {
  post: {
    tags: ["auth"],
    summary: "Login user",
    description:
      "Login a user using email and password and returns an access token.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "user email",
                example: "kingsleyaham@gmail.com",
              },
              password: {
                type: "string",
                description: "user password",
                example: "12345678",
              },
            },
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
                accessToken:
                  "eyJhbGbiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDBiMTdmMzcxZGU3YjI4NTM3MjE2M2YiLCJlbWFpbCI6ImtpbmdzbGV5YWhhbTZAZ21haWwuY29tIiwiaWF0IjoxNjc4NDQ4NzQ5LCJleHAiOjE2Nzg3MDc5NDl9.UZcFr1L-z5dUCXA3yGt6asezXzI9ryb-k9P_xkdcmhE",
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
                message: "Invalid email or password",
              },
            },
          },
        },
      },
    },
  },
};
