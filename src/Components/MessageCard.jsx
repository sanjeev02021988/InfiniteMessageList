import { useRef, useCallback } from "react";
import { BASE_URL } from "../Services/MessageService";
import { timeSince, getEventName } from "../Utils/MessageUtils";

const MessageCard = (props) => {
  const { message, remove } = props;
  const { content, updated, author, id } = message;
  const { name, photoUrl } = author;

  const cardRef = useRef(null);

  const onMouseDown = useCallback((event) => {
    const messageCard = cardRef.current;
    // Prepare to move: make item relative.
    messageCard.style.position = "relative";

    let iPageX;
    const onMouseMove = (event) => {
      let pageX = "touches" in event ? event.touches[0].clientX : event.pageX;
      !iPageX && (iPageX = pageX);
      messageCard.style.userSelect = "none";
      messageCard.style.left = Math.max(0, pageX - iPageX) + "px";
      messageCard.style.opacity = parseInt(messageCard.style.left) > messageCard.offsetWidth / 3 ? 0.5 : 1;
    };

    // Move the card on mousemove
    document.addEventListener(getEventName(event, "mousemove"), onMouseMove);

    const mouseUp = () => {
      document.removeEventListener(
        getEventName(event, "mousemove"),
        onMouseMove
      );
      iPageX = undefined;
      messageCard[getEventName(event, "onmouseup")] = null;
      if (parseInt(messageCard.style.left) > messageCard.offsetWidth / 3) {
        remove(id);
      } else {
        messageCard.style.userSelect = "auto";
        messageCard.style.position = "static";
        messageCard.style.left = 0;
      }
    };
    // Remove unneeded handlers
    document[getEventName(event, "onmouseup")] = mouseUp;
  }, [remove, id]);

  return (
    <div
      className="message__card"
      ref={cardRef}
      role="listitem"
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <div className="message__meta">
        <div className="message__user-image">
          <img src={`${BASE_URL}${photoUrl}`} alt={name} />
        </div>
        <div>
          <div className="message__user-name">{name}</div>
          <div className="message__time">{timeSince(new Date(updated))}</div>
        </div>
      </div>
      <div className="message__content">{content}</div>
    </div>
  );
};

export default MessageCard;
