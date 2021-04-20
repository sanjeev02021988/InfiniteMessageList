const intervals = [
    { label: "year", seconds: 365 * 24 * 60 * 60 },
    { label: "month", seconds: 30 * 24 * 60 * 60 },
    { label: "day", seconds: 24 * 60 * 60 },
    { label: "hour", seconds: 60 * 60 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];
  
  export const timeSince = date => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find((i) => i.seconds < seconds);
    if (!interval) {
      return "now";
    }
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
  }
  
  const MouseToTouchEventNameMap = {
    "mousemove" : "touchmove",
    "onmouseup" : "ontouchend"
  };
  
  export const getEventName = (event, eventName) => {
    if ('touches' in event && MouseToTouchEventNameMap[eventName]) {
      return MouseToTouchEventNameMap[eventName];
    } 
    return eventName;
  };