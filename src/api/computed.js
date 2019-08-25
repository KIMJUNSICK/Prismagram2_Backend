import { prisma } from "../../generated/prisma-client";

export default {
  User: {
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    post: ({ id }) => prisma.user({ id }).post(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments()
  },
  Comment: {
    user: ({ id }) => prisma.comment({ id }).user(),
    post: ({ id }) => prisma.comment({ id }).post()
  },
  Post: {
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
        .count()
  },
  Like: {
    user: ({ id }) => prisma.like({ id }).user()
  }
};
