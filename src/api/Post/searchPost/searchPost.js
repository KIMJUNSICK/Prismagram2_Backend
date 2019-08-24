import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      const { term } = args;
      if (term.length > 0) {
        return prisma.posts({
          where: {
            OR: [
              {
                caption_starts_with: term
              },
              {
                location_starts_with: term
              }
            ]
          }
        });
      } else {
        throw Error("Search Something...");
      }
    }
  }
};
