import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.user({ id: user.id });
    }
  },
  User: {
    fullName: (parent, __, { request }) => {
      console.log(parent);
      return "lalala";
    }
  }
};
