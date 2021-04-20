import { timeSince, getEventName } from "./MessageUtils";

describe("Tested if", () => {
  test("getEventName is returning right event name", () => {
    let eventName = "mousemove";
    let event = new MouseEvent(eventName);
    expect(getEventName(event, eventName)).toEqual(eventName);

    event = new TouchEvent("touchmove");
    expect(getEventName(event, eventName)).toEqual("touchmove");
  });

  test("timeSince is returning right time since value", () => {
    const date = new Date();

    expect(timeSince(date)).toEqual("now");

    date.setSeconds(date.getSeconds() - 5);
    expect(timeSince(date)).toEqual("5 seconds ago");

    date.setSeconds(date.getSeconds() - 60);
    expect(timeSince(date)).toEqual("1 minute ago");

    date.setMinutes(date.getMinutes() - 60);
    expect(timeSince(date)).toEqual("1 hour ago");

    date.setHours(date.getHours() - 24);
    expect(timeSince(date)).toEqual("1 day ago");

    date.setMonth(date.getMonth() - 1);
    expect(timeSince(date)).toEqual("1 month ago");

    date.setFullYear(date.getFullYear() - 1);
    expect(timeSince(date)).toEqual("1 year ago");

    date.setFullYear(date.getFullYear() - 1);
    expect(timeSince(date)).toEqual("2 years ago");
  });
});
