import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unFollow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id } = args;
      try {
        await prisma.updateUser({
          where: {
            id: user.id
          },
          data: {
            following: {
              disconnect: {
                id
              }
            }
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};