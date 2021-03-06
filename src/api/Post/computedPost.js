import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    user: ({ id }) => prisma.post({ id }).user(),
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    commentsCount: ({ id }) =>
      prisma
        .commentsConnection({
          where: {
            post: { id }
          }
        })
        .aggregate()
        .count(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    likesCount: ({ id }) =>
      prisma
        .likesConnection({
          where: {
            post: { id }
          }
        })
        .aggregate()
        .count(),
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id } }]
      });
    }
  }
};
