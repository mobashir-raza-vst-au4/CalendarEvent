import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const EventList = ({ date, events, setEvents, fn }: any) => {
  // Filter events for the current date
  const filteredEvents = events.filter((event: any) => {
    return (
      new Date(event.date).getDate() === date.getDate() &&
      new Date(event.date).getMonth() === date.getMonth() &&
      new Date(event.date).getFullYear() === date.getFullYear()
    );
  });

  const deleteEvent = (event: any) => {
    const newEventList = events.filter((el: any) => el.id !== event.id);
    setEvents(newEventList);
  };

  const updateEvent = (event: any) => {
    fn(event);
  };

  return (
    <div>
      {filteredEvents.map((event: any) => (
        <div
          key={event.id}
          className="p-2 bg-gray-100 mb-2 flex items-center gap-x-5 justify-evenly"
        >
          <div>
            <div className="font-bold">{event.title}</div>
            <div>
              {event.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="cursor-pointer" onClick={() => deleteEvent(event)}>
              <AiOutlineDelete />
            </div>
            <div className="cursor-pointer" onClick={() => updateEvent(event)}>
              <AiOutlineEdit />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
