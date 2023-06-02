"use client";
import { useState } from "react";
import EventList from "./Components/EventList";
import Popup from "./Components/Popup";

export default function Page() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [events, setEvents]: any = useState([]);

  const handlePreviousWeek = () => {
    const previousWeek = new Date(currentWeek);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentWeek(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const startOfWeek = new Date(currentWeek);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Set to Sunday

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6); // Set to Saturday

  // Generate the array of dates for the week
  const dates = [];
  const currentDate = new Date(startOfWeek);
  while (currentDate <= endOfWeek) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const addEvent = ({ title, dateTime, id }: any) => {
    const newEvent = {
      id: id ? id : new Date().valueOf(),
      title,
      date: dateTime,
    };
    let flag = false;
    const newArray = events.map((item: any) => {
      if (item.id === newEvent.id) {
        flag = true;
        return newEvent;
      }
      return item;
    });
    setEvents(!flag ? [...events, newEvent] : newArray);
    setShowPopup(false);
    setIsUpdate(false);
    setUpdateData(null);
  };

  const showPopupOnUpdate = (event: any) => {
    setShowPopup(true);
    setIsUpdate(true);
    setUpdateData(event);
  };

  const onClose = () => {
    setShowPopup(false);
    setIsUpdate(false);
    setUpdateData(null);
  };

  return (
    <div>
      <div>
        {showPopup && (
          <Popup onSave={addEvent} onClose={onClose} isUpdate={isUpdate} updateData={updateData} />
        )}
      </div>

      <div className="flex justify-between mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white" onClick={handlePreviousWeek}>
          Previous Week
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white" onClick={handleNextWeek}>
          Next Week
        </button>
      </div>

      <div className="flex justify-evenly">
        <div
          onClick={() => setShowPopup(true)}
          className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          <span className="cursor-pointer text-xl">+</span>
        </div>
        {dates.map((date) => (
          <div key={date.getTime()} className="mr-4">
            <div className="font-bold">{date.toDateString()}</div>
            <EventList date={date} events={events} setEvents={setEvents} fn={showPopupOnUpdate} />
          </div>
        ))}
      </div>
    </div>
  );
}
