import axios from "axios";

const useChat = () => {
  const parseResponse = (text) => {
    let formattedText = text.replaceAll("\n", "<br/>");
    return formattedText;
  };

  const send = (userInput) => {
    // const aiResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    //   prompt: userInput,
    //   max_tokens: 150,
    //   temperature: 0.5
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    //   }
    // });
    // console.log('====================================');
    // console.log(aiResponse.data);
    // console.log('====================================');
    // return aiResponse.data.choices[0].text
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = parseResponse(
          'Hi there! How\'s it going? \n I am in currently development stage, I can only respond with static text.\n To experience advanced gpt bot assistant choose "Extra Features By Rishi" option'
        );
        resolve(response);
      }, 2000);
    });
  };
  const getHasActiveChatSession = () => {
    return !!window.sessionStorage.getItem("currentChatId");
  };
  const getCurrentChatID = () => {
    return window.sessionStorage.getItem("currentChatId");
  };

  return {
    getCurrentChatID,
    getHasActiveChatSession,
    send,
  };
};

export default useChat;
