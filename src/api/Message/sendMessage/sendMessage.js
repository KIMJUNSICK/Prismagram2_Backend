import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (room === undefined) {
        if (user.id !== toId) {
          room = await prisma.createRoom({
            participants: {
              connect: [{ id: user.id }, { id: toId }]
            },
            messages: {
              create: [
                {
                  message,
                  from: { connect: { id: user.id } },
                  to: { connect: { id: toId } }
                }
              ]
            }
          });
        }
      } else {
        room = await prisma.room({ id: roomId });
        if (!room) {
          throw Error("Room not found");
        }
      }
      return null;
    }
  }
};
