import uuid from "react-uuid";

export default function localStorage() {
  const localDB = window.localStorage;
  const sessionDB = window.sessionStorage;

  let chatId = sessionDB.getItem("currentChatId");
  const setChat = (isNewChat, newMessage) => {
    if (isNewChat) {
      chatId = uuid();
      window.sessionStorage.setItem("currentChatId", chatId);
      newMessage.chatId = chatId;
      localDB.setItem(
        "chatsStore",
        JSON.stringify({
          history: {
            [chatId]: [newMessage],
          },
        })
      );
    } else {
      const currentChat = JSON.parse(localDB.getItem("chatsStore")).history[
        chatId
      ];
      newMessage.chatId = chatId;
      currentChat.push(newMessage);
      localDB.setItem(
        "chatsStore",
        JSON.stringify({
          history: {
            [chatId]: currentChat,
          },
        })
      );
    }
  };

  const getChat = (chatId) => {
    return JSON.parse(localDB.getItem("chatsStore")).history[chatId];
  };
  return {
    setChat,
    getChat,
  };
}
