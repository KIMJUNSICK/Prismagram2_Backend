import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleFollow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id } = args;
      try {
        const existingFollow = await prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id } }]
        });
        if (existingFollow) {
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
        } else {
          await prisma.updateUser({
            where: {
              id: user.id
            },
            data: {
              following: {
                connect: {
                  id
                }
              }
            }
          });
          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
