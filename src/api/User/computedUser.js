import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    isFollowing: async (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        const exist = await prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id: parentId } }]
        });
        console.log(exist);
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
    isSelf: async (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    post: ({ id }) => prisma.user({ id }).post(),
    postsCount: ({ id }) =>
      prisma
        .postsConnection({
          where: { user: { id } }
        })
        .aggregate()
        .count(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms()
  }
};
