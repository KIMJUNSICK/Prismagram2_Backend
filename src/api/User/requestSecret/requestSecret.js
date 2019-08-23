import { prisma } from "../../../../generated/prisma-client";
import { secretGenerator } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = secretGenerator();
      try {
        await prisma.updateUser({ where: { email }, data: { loginSecret } });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
