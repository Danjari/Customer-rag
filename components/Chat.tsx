
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import Image from "next/image";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });
  const chatContainer = useRef<HTMLDivElement>(null);

  const scroll = () => {
    if (chatContainer.current) {
      const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current;
      if (scrollHeight >= scrollTop + offsetHeight) {
        chatContainer.current.scrollTo(0, scrollHeight);
      }
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const renderResponse = () => {
    return (
      <div className="response">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`chat-line ${
              message.role === "user" ? "user-chat" : "ai-chat"
            } flex items-start mb-4`}
          >
            <Image
              src={message.role === "user" ? "/user.png" : "/robot.png"}
              alt="avatar"
              width={40}
              height={40}
              className="avatar rounded-full"
            />
            <div className="ml-4 flex-grow">
              <p
                className={`message p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-[#1e293b] text-white"
                    : "bg-[#0f172a] text-white"
                }`}
              >
                {message.content}
              </p>
              {index < messages.length - 1 && (
                <div className="horizontal-line my-2" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="chat flex flex-col h-full">
      <div
        ref={chatContainer}
        className="flex-grow p-4 overflow-y-auto"
      >
        {renderResponse()}
      </div>
      <form
        onSubmit={handleSubmit}
        className="chat-form flex items-center bg-gray-800 p-3 rounded-full mb-4 mx-4"
      >
        <input
          name="input-field"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Give me a command..."
          className="flex-grow bg-transparent border-none text-white placeholder-gray-500 focus:outline-none px-3"
        />
        <button
          type="submit"
          className="send-button bg-yellow-400 text-black p-2 rounded-full ml-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;

