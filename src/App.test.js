import { render, waitFor, screen } from "@testing-library/react";
import * as MessageService from "./Services/MessageService";
import App from "./App";

describe("Tested if app", () => {
  test("renders messages", async () => {
    const messages = [
      {
        content: "Her pretty looks have been mine enemies.",
        updated: "2015-02-01T07:46:23Z",
        id: 1,
        author: {
          name: "William Shakespeare",
          photoUrl: "/photos/william-shakespeare.jpg",
        },
      },
    ];

    jest
      .spyOn(MessageService, "fetchNextMessages")
      .mockImplementation(
        () => new Promise((resolve, reject) => resolve({ messages }))
      );

    const { container } = render(<App />);
    await waitFor(() => screen.getAllByRole("listitem"));

    const messagesEle = container.querySelector(".messages");
    expect(messagesEle.children.length).toEqual(1);
  });
});
