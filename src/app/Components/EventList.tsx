import React, { useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const EventList = ({ date, events, setEvents, fn }: any) => {
  const [hoveredEventId, setHoveredEventId] = useState(null);
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

  const handleCardHover = (eventId: any) => {
    setHoveredEventId(eventId);
  };

  const handleCardLeave = () => {
    setHoveredEventId(null);
  };

  return (
    <div className="flex flex-col justify-center items-center absolute mt-2 -ml-[75px]">
      {filteredEvents.map((event: any) => (
        <div
          key={event.id}
          className="p-2 bg-[#039BE5] mb-2 flex items-center gap-x-5 justify-between w-[200px] rounded-md card"
          onMouseEnter={() => handleCardHover(event.id)}
          onMouseLeave={handleCardLeave}
        >
          <div>
            <div className="font-bold text-white">{event.title}</div>
            <div className="text-white">
              {event.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          {hoveredEventId === event.id && (<div className="flex flex-col gap-y-4">
            <div className="cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" onClick={() => deleteEvent(event)}>
              <AiFillDelete style={{color: '#4d4d4d'}}/>
            </div>
            <div className="cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" onClick={() => updateEvent(event)}>
              <AiFillEdit style={{color: '#4d4d4d'}}/>
            </div>
          </div>)}
        </div>
      ))}
    </div>
  );
};

export default EventList;
