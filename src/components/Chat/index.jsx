import { useEffect, useState } from "react";
import "./Chat.css";
import useChat from "../../hooks/useChat";
import { Card, CardContent, IconButton } from "@mui/material";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import Storage from "../../modules/storage";
import PropTypes from "prop-types";
import DotLoader from "../Common/DotLoader";
import PromptTemplates from "./PromptTemplates";
import ChatOptions from "./ChatOptions";

function ChatWindow() {
  const { getChat, setChat } = Storage();
  const { send, getCurrentChatID, getHasActiveChatSession } = useChat();
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState(
    getHasActiveChatSession() ? [...getChat(getCurrentChatID())] : []
  );
  const [waitingOnResponse, setReponseWaiting] = useState(false);

  useEffect(() => {
    if (getHasActiveChatSession()) {
      const storageMessages = getChat(getCurrentChatID());
      if (storageMessages.length > messages.length)
        setMessages(storageMessages);
    }
  }, [messages, userInput]);

  const handleSend = (text) => {
    const userMessage = {
      text: text ? text : userInput,
      sender: "user",
      timestamp: Date.now(),
    };
    // sets chat in local storage
    setChat(messages.length === 0, userMessage);
    setMessages((messages) => [...messages, userMessage]);
    setReponseWaiting(true);
    send(userInput).then((responseText) => {
      const botMessage = {
        text: responseText,
        sender: "ai",
        timestamp: Date.now(),
      };
      const savedChats = getChat(getCurrentChatID());
      setChat(savedChats.length === 0, botMessage);
      setUserInput("");
      setMessages([
        ...messages,
        { ...botMessage, timestamp: parseTimestamp(botMessage.timestamp) },
      ]);
      setReponseWaiting(false);
    });
  };
  const parseTimestamp = (t) => {
    const date = new Date(t);
    const isToday = new Date().getDate() === date.getDate();
    const isYesterday = new Date().getDate() - date.getDate() === 1;
    if (isToday) {
      const hours = new Date().getHours() - date.getHours();
      const minutes = new Date().getMinutes() - date.getMinutes();
      const seconds = new Date().getSeconds() - date.getSeconds();
      if (hours > 0) {
        return `${hours} hours ago.`;
      } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago.`;
      } else if (seconds > 0) {
        return `${seconds} seconds ago.`;
      }
    } else if (isYesterday) {
      return "Yesterday.";
    } else {
      return date.toLocaleString() ?? "";
    }
  };

  return (
    <div className={`chat-window ${messages.length === 0 ? "chat-window--full" : ""}`}>
      {getHasActiveChatSession() && <ChatOptions />}
      <div className={`messages ${messages.length > 0 ? "messages--full" : ""}`}>
        {getHasActiveChatSession() &&
          messages.map((message, index) => {
            const timestamp = parseTimestamp(message.timestamp);
            return (
              <div key={index} className={`row row--${message.sender}`}>
                <Card
                  sx={{
                    display: "flex",
                    textAlign: "start",
                    maxWidth: "60%",
                    color: "var(--white)",
                    bgcolor: "var(--main-surface-secondary)",
                    borderRadius: "1rem",
                    ...(message.sender === "ai" && {
                      bgcolor: "transparent",
                      boxShadow: "none",
                      borderRadius: 0,
                    }),
                  }}
                >
                  <CardContent
                    sx={{
                      padding: "1rem",
                      ":last-child": { paddingBottom: "1rem" },
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: message.text,
                      }}
                    ></div>
                    {message.sender === "ai" && (
                      <div className="message-timestamp">
                        {timestamp ? "Bot - " + timestamp : "Bot"}
                      </div>
                    )}
                  </CardContent>
                </Card>
                {message.sender === "user" && (
                  <div className="message-timestamp message-timestamp--user">
                    {timestamp ? "You - " + timestamp : "You"}
                  </div>
                )}
              </div>
            );
          })}
        {waitingOnResponse && (
          <div className={`row row--ai`}>
            <DotLoader />
          </div>
        )}
      </div>
      {!getHasActiveChatSession() && (
        <PromptTemplates handleSend={handleSend} />
      )}
      <div className="prompt">
        <div className="prompt__controls">
          <input
            autoFocus
            className="prompt__input"
            type="text"
            value={userInput}
            placeholder="Type your message here.."
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            onKeyPress={(e) =>
              e.key === "Enter" && e.target.value.length > 0 && handleSend()
            }
          />
          <IconButton
            aria-label="settings"
            disabled
            {...(userInput.length > 0 && {
              onClick: handleSend,
              disabled: false,
            })}
          >
            <ArrowCircleUpRoundedIcon
              sx={{
                height: "30px",
                width: "30px",
                ...(userInput.length > 0 && {
                  color: "var(--white)",
                }),
              }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {
  hasExtraFeatures: PropTypes.bool,
};

export default ChatWindow;
