import { useRef, useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";
import { fetchNextMessages, LIMIT } from "./Services/MessageService";
import MessageCard from "./Components/MessageCard";
import "./App.scss";

function App() {
  const ctrRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages automatically as soon as there are less then a threshold.
    if (messages.length < LIMIT) {
      fetchNextMessages().then((data) =>
        setMessages([...messages, ...data.messages])
      );
    }
  }, [messages]);

  useEffect(() => {
    const ctrEle = ctrRef.current;
    const onScroll = throttle(function () {
      if (this.scrollTop + this.clientHeight * 2 > this.scrollHeight) {
        fetchNextMessages().then((data) => {
          setMessages((messages) => [...messages, ...data.messages]);
        });
      }
    }, 500);
    ctrEle.addEventListener("scroll", onScroll);

    return () => {
      ctrEle.removeEventListener("scroll", onScroll);
    };
  }, []);

  const removeMessage = useCallback((id) => {
    setMessages((messages) => messages.filter((message) => message.id !== id));
  }, []);

  return (
    <div className="app__ctr">
      <div className="app__hdr">
        <div className="app__hdr__title">Messages</div>
      </div>
      <div className="app__content" ref={ctrRef}>
        <div className="messages" role="list">
          {messages.map((msg) => (
            <MessageCard message={msg} key={msg.id} remove={removeMessage} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
