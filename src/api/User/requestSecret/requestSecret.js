import { prisma } from "../../../../generated/prisma-client";
import { secretGenerator, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      console.log(request.user);
      const { email } = args;
      const loginSecret = secretGenerator();
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ where: { email }, data: { loginSecret } });
        return true;
      } catch (e) {
        return false;
      }
    }
  }
};
