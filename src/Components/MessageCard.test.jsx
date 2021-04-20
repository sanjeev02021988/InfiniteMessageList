import React from "react";
import { render } from "@testing-library/react";
import MessageCard from "./MessageCard";

describe("Tested if message card", () => {
  test("renders properly", () => {
    const handleRemove = jest.fn();
    const message = {
      content: "Her pretty looks have been mine enemies.",
      updated: "2015-02-01T07:46:23Z",
      id: 1,
      author: {
        name: "William Shakespeare",
        photoUrl: "/photos/william-shakespeare.jpg",
      },
    };
    const { container } = render(
      <MessageCard message={message} remove={handleRemove} />
    );

    const messageTextEle = container.querySelector(".message__content");
    expect(messageTextEle.textContent).toEqual(message.content);

    const userNameEle = container.querySelector(".message__user-name");
    expect(userNameEle.textContent).toEqual(message.author.name);

    const userNameImgEle = container.querySelector(".message__user-image");
    expect(userNameImgEle.src).toEqual(message.author.image);
  });
});
