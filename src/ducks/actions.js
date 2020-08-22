import * as t from "./types";

export const getActionMessage = (payload) => ({
  type: t.GET_SOCKET_MESSAGE,
  payload,
});
