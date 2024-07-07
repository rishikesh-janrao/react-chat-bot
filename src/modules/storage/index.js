import localStorage from "./localStorage";

const Storage = () => {
  const module = {};
  const { getChat, setChat } = localStorage();
  module.setChat = setChat;
  module.getChat = getChat;

  // dedicated backend can be added here.
  return module;
};
export default Storage;
