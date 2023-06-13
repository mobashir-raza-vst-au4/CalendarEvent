"use client";
import { useEffect, useState } from "react";
import EventList from "./Components/EventList";
import Popup from "./Components/Popup";
import moment from "moment-timezone";
import Header from "./Components/Header";
import 'react-calendar/dist/Calendar.css';
import WithAuth from "./Components/WithAuth";
import { createEvent, getAllEvents, updateSingleEvent } from './services/EventService';
import { toast } from "react-toastify";

const Page = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [events, setEvents]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const addEvent = (obj: any) => {
    obj.timezone = moment.tz.guess();
    obj.dateTime = new Date(obj.dateTime).getTime();
    setIsLoading(true);

    createEvent(`${process.env.NEXT_PUBLIC_HOST}/api/event/create`, obj)
      .then(function (data) {
        // console.log("created", data);
        const newEvent = data.data;
        setIsLoading(false);
        setEvents([...events, newEvent])
        setShowPopup(false);
        toast.success("Event created successfully");
      }).catch(function (error) {
        console.log("error while creating event", error)
        setIsLoading(false);
        toast.error(error);
      })
  }

  const updateEvent = (obj: any) => {
    obj.timezone = moment.tz.guess();
    obj.dateTime = new Date(obj.dateTime).getTime();
    setIsLoading(true);
    updateSingleEvent(`${process.env.NEXT_PUBLIC_HOST}/api/event/${obj._id}/update`, obj)
      .then(function (data) {
        // console.log("updated---data---", data);
        const updatedEvent = data.event;
        const newArray = events.map((item: any) => {
          if (item._id === updatedEvent._id) {
            return updatedEvent;
          }
          return item;
        });
        setIsLoading(false);
        setEvents(newArray)
        setShowPopup(false);
        setIsUpdate(false);
        setUpdateData(null);
        toast.success("Event updated successfully");
      }).catch(function (error) {
        console.log("error while updating event", error)
        setIsLoading(false);
        toast.error(error);
      })
  }

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

  useEffect(() => {
    //Call an API to get all events for a user.
    getAllEvents(`${process.env.NEXT_PUBLIC_HOST}/api/event/get-events`)
      .then(function (data) {
        // console.log("recieve events", data)
        setEvents(data.events)
      }).catch(function (error) {
        console.log("error while getting events", error)
        toast.error(error)
      })
  }, [])

  return (
    <div>
      <div>
        {showPopup && (
          <Popup onSave={addEvent} onUpdate={updateEvent} onClose={onClose} isUpdate={isUpdate} updateData={updateData} isLoading={isLoading} />
        )}
      </div>

      <Header handlePrevious={handlePreviousWeek} handleNext={handleNextWeek} currentDate={currentDate} setCurrentWeek={handleSetCurrentWeek} />

      <div className="flex justify-evenly items-center h-20 relative border-b-[1px]">
        <div
          onClick={() => setShowPopup(true)}
          className="md:h-14 md:w-14 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-gray-400/50 transition-all duration-500"
        >
          <img src="/plus.png" className="sm:h-8 h-5"/>
        </div>
        {dates.map((date) => (
          <div key={date.getTime()} className="mr-4">
            <div className="flex flex-col items-center gap-y-2 text-[#70757a]">
              <span className="sm:text-[11px] text-[8px] font-medium">{moment(date).format('dddd').substring(0, 3).toUpperCase()}</span>
              {moment(date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? <span className="sm:text-[26px] text-[12px] font-normal bg-[#1967D2] text-white sm:h-10 sm:w-10 h-8 w-8 rounded-full flex items-center justify-center">{moment(date).get('date')}</span> : <span className="sm:text-[26px] text-[12px] font-normal sm:h-10 sm:w-10 h-8 w-8 rounded-full flex items-center justify-center">{moment(date).get('date')}</span>}
            </div>
            <EventList date={date} events={events} setEvents={setEvents} fn={showPopupOnUpdate} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WithAuth(Page)
