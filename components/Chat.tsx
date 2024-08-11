
import { useChat } from "ai/react";
import { useEffect, useRef,useState } from "react";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ content }) => {
  return (
    <div className="message-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};


const Chat = () => {
  const [selectedApi, setSelectedApi] = useState("/api/openai"); // Default to OpenAI
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: selectedApi,
  });
  const chatContainer = useRef<HTMLDivElement>(null);
  // Handle API selection change
  const handleApiChange = (event) => {
    setSelectedApi(event.target.value);
  };

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
                    ? "bg-[#1e293b] text-grey"
                    : "bg-[#0f172a] text-grey"
                }`}
                style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
              >
                <ChatMessage content={message.content} />
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
        {/* Chat messages container with overflow handling */}
        <div
          ref={chatContainer}
          className="flex-grow p-4 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 150px)' }} // Adjust height as needed
        >
          {renderResponse()}
        </div>
  
        {/* Input field fixed at the bottom */}
        <form
          onSubmit={handleSubmit}
          className="chat-form flex items-center bg-gray-800 p-3 rounded-full mx-4 mb-4"
        >
            
            
          
          
          <input
            name="input-field"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="How can I help..."
            className="flex-grow bg-transparent border-none text-white placeholder-gray-500 focus:outline-none px-3"
            autoComplete="off"
          />
          <div className="relative absolute left-0 mt-0 w-30 md:w-[150px] bg-gray-800 text-white rounded-md shadow-lg mx-4">
              <select
                value={selectedApi}
                onChange={handleApiChange}
                className="block w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none"
              >
                <option value="/api/openai">GPT-4o</option>
                <option value="/api/bedrock">llama3-70b</option>
              </select>
            </div>
          <button type="submit">
            <Image src="/send.png" alt="send" width={20} height={20} />
          </button>
        </form>
      </div>
    );
  };


export default Chat;

 