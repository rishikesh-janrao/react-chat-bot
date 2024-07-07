import useChat from "../../hooks/useChat";
import ThreeDotMenu from "../Common/ThreeDotMenu";

function ChatOptions() {
  const { newChat } = useChat();
  return (
    <div className="chat-options">
      <button className="chat-options__new-button" onClick={newChat}>
        <img
          width="24px"
          height="24px"
          src="./chat/new-chat.svg"
          alt="template-icon"
        />
      </button>
      <ThreeDotMenu />
    </div>
  );
}

export default ChatOptions;
