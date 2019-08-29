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
  },
  Message: {
    from: ({ id }) => prisma.message({ id }).from(),
    to: ({ id }) => prisma.message({ id }).to(),
    room: ({ id }) => prisma.message({ id }).room()
  }
};
