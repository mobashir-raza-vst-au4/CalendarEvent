"use client";
import { useState } from "react";
import EventList from "./Components/EventList";
import Popup from "./Components/Popup";
import moment from "moment";
import Header from "./Components/Header";
import 'react-calendar/dist/Calendar.css';

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
  console.log(dates)
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

  const handleSetCurrentWeek = (e: any) => {
    setCurrentWeek(e ? e : new Date());
  }

  return (
    <div>
      <div>
        {showPopup && (
          <Popup onSave={addEvent} onClose={onClose} isUpdate={isUpdate} updateData={updateData} />
        )}
      </div>

      <Header handlePrevious={handlePreviousWeek} handleNext={handleNextWeek} currentDate={currentDate} setCurrentWeek={handleSetCurrentWeek} />

      <div className="flex justify-evenly items-center h-20 relative border-b-[1px]">
        <div
          onClick={() => setShowPopup(true)}
          className="h-14 w-14 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-gray-400/50 transition-all duration-500"
        >
          <img src="/plus.png" />
        </div>
        {dates.map((date) => (
          <div key={date.getTime()} className="mr-4">
            {/* <div className={`font-bold ${moment(date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? 'bg-[#3B82F6] text-white px-3 py-1 rounded-md' : ''}`}>{date.toDateString()}</div> */}
            <div className="flex flex-col items-center gap-y-2 text-[#70757a] ">
              <span className="text-[11px] font-medium">{moment(date).format('dddd').substring(0, 3).toUpperCase()}</span>
              {moment(date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? <span className="text-[26px] font-normal bg-[#1967D2] text-white h-10 w-10 rounded-full flex items-center justify-center">{moment(date).get('date')}</span> : <span className="text-[26px] font-normal h-10 w-10 rounded-full flex items-center justify-center">{moment(date).get('date')}</span>}
            </div>
            <EventList date={date} events={events} setEvents={setEvents} fn={showPopupOnUpdate} />
          </div>
        ))}
      </div>
    </div>
  );
}
