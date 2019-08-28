import { prisma } from "../../generated/prisma-client";

export default {
  Comment: {
    user: ({ id }) => prisma.comment({ id }).user(),
    post: ({ id }) => prisma.comment({ id }).post()
  },
  Like: {
    user: ({ id }) => prisma.like({ id }).user(),
    post: ({ id }) => prisma.like({ id }).post()
  },
  Room: {
    participants: ({ id }) => prisma.room({ id }).participants(),
    messages: ({ id }) => prisma.room({ id }).messages()
  }
};
