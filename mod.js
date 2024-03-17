const events = new Array(...document.querySelectorAll("[data-eventchip]")).map(
  (e) => e.children[0].innerText
);

const uniqueEvents = new Set(events);

const calculateTime = (timeStart, timeEnd) => {
  const [hourStart, minuteStart] = timeStart.split(":");
  let [hourEnd, minuteEnd] = timeEnd.split(":");

  if (Number(hourStart) > Number(hourEnd)) {
    hourEnd = String(Number(hourEnd) + 24);
  }

  const timeStartInMinutes = Number(hourStart) + Number(minuteStart) / 60;
  const timeEndInMinutes = Number(hourEnd) + Number(minuteEnd) / 60;

  return timeEndInMinutes - timeStartInMinutes;
};

const mapEventDuration = new Map();

[...uniqueEvents].map((event) => {
  const [rawTime, title] = event.split(",");

  const timeStartToEnd = rawTime
    .split(" - ")
    .map((str) => str.substring(str.length - 5, str.length));

  const duration = calculateTime(...timeStartToEnd);

  if (mapEventDuration.has(title)) {
    mapEventDuration.set(title, mapEventDuration.get(title) + duration);
  } else {
    mapEventDuration.set(title, duration);
  }
});

console.log(mapEventDuration);
