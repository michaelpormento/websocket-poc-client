import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { all, fork, take, call, put } from "redux-saga/effects";
import * as a from "./actions";

const socketEndpoint = "http://localhost:3000";

function connect() {
  const socket = io(socketEndpoint);

  // fix this error handler
  socket.on("error", () => {
    console.log(`Cannot connect to ${socketEndpoint}.`);
  });

  // TODO: add socket disconnection handling
  return socket.on("connect", async () => {
    await socket;
  });
}

const subscribe = (socket) => {
  return eventChannel((emit) => {
    const agnosticDataSenderHandler = (data) => {
      console.log(
        `Received message from channel - "agnostic data sender": ${data}`
      );
      emit(a.getActionMessage(data));
    };

    const errorHandler = (errorEvent) => {
      emit(new Error(errorEvent.reason));
    };

    socket.on("agnostic data sender", agnosticDataSenderHandler);

    socket.on("disconnect", (e) => {
      console.warn(`Disconnected to socket: ${socket}`);
    });

    socket.on("error", errorHandler);

    // this will be invoked when the saga calls `channel.close` method
    return () => {};
  });
};

function* processIO() {
  // Connect to Socket
  const socket = yield call(connect);

  // Subscribe to Socket
  const socketChannel = yield call(subscribe, socket);

  while (true) {
    try {
      const action = yield take(socketChannel);
      yield put(action);
      // Add reply emitter here - pong
    } catch (err) {
      console.error("socket error:", err);

      // NOTE: socketChannel is still open in catch block
      // If we want end the socketChannel, we need close it explicitly
      // socketChannel.close();
    }
  }
}

export default function* rootSaga() {
  yield all([fork(processIO)]);
}
