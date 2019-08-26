import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    amIFollowing: async (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        const exist = await prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: user.id }]
        });
        if (exist) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    itsMe: async (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    post: ({ id }) => prisma.user({ id }).post(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments()
  }
};
