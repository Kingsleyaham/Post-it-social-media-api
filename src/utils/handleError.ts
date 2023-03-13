export const handleError = (error: any) => {
  let message = "an error occured";

  if (error?.name === "MongoServerError" && error?.code === 11000) {
    message = "user already exist";
  } else {
    message = error.message;
  }

  return message;
};
