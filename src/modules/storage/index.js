import localStorage from "./localStorage";

const Storage = () => {
  const module = {};
  const { getChat, setChat, removeChatHistory } = localStorage();
  module.setChat = setChat;
  module.getChat = getChat;
  module.removeChatHistory = removeChatHistory;

  // dedicated backend can be added here.
  return module;
};
export default Storage;
