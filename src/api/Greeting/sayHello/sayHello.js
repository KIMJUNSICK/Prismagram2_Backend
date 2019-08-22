import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, agrs) => {
      const { id } = agrs;
      return prisma.user({ id });
    }
  }
};
