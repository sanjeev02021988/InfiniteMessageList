import { useRef, useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { fetchNextMessages } from "./Services/MessageService";
import MessageCard from "./Components/MessageCard";
import "./App.scss";

function App() {
  const ctrRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchNextMessages().then(({ messages }) => setMessages(messages));
  }, []);

  useEffect(() => {
    const ctrEle = ctrRef.current;
    const onScroll = debounce(function () {
      if (this.scrollTop + this.clientHeight * 2 > this.scrollHeight) {
        fetchNextMessages().then((data) => {
          setMessages((messages) => [...messages, ...data.messages]);
        });
      }
    }, 100);
    ctrEle.addEventListener("scroll", onScroll);

    return () => {
      ctrEle.removeEventListener("scroll", onScroll);
    };
  }, []);

  const removeMessage = useCallback(
    (id) =>
      setMessages((messages) =>
        messages.filter((message) => message.id !== id)
      ),
    []
  );

  return (
    <div className="app__ctr">
      <div className="app__hdr">
        <div className="app__hdr__title">Messages</div>
      </div>
      <div className="app__content" ref={ctrRef}>
        <div className="messages" role="list">
          {messages.map((msg) => (
            <MessageCard
              message={msg}
              key={msg.id}
              remove={removeMessage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
