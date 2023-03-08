import bcrypt from "bcrypt";

export const passwordHash = async (password: string): Promise<string> => {
  try {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  } catch (err) {
    throw new Error("Errorr Hashing Password");
  }
};

export const passwordCompare = async (
  password: string,
  hashedPwd: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPwd);
  } catch (err) {
    throw new Error("invalid email or password");
  }
};
