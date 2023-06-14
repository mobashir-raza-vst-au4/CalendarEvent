import React, { Fragment, useState } from "react";
import { BiDotsVerticalRounded, BiPencil } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { deleteSingleEvent } from "../services/EventService";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";

const EventList = ({ date, events, setEvents, fn }: any) => {
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [clickedEventId, setClickedEventId] = useState(null);
  const [deleteEventId, setDeleteEventId] = useState(null);

  // const [isLoading, setIsLoading] = useState(false);

  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);

  // Filter events for the current date
  let filteredEvents = events.filter((event: any) => {
    return (
      new Date(event.dateTime).getDate() === date.getDate() &&
      new Date(event.dateTime).getMonth() === date.getMonth() &&
      new Date(event.dateTime).getFullYear() === date.getFullYear()
    );
  });

  filteredEvents = filteredEvents.sort((a: any, b: any) => a.dateTime - b.dateTime);

  const deleteEvent = (event: any) => {
    setDeleteEventId(event._id);
    setShowPopup(false);
    toast.info('Deleting Event')
    // setIsLoading(true);
    deleteSingleEvent(`${process.env.NEXT_PUBLIC_HOST}/api/event/${event._id}/delete`)
      .then(function () {
        const newEventList = events.filter((el: any) => el._id !== event._id);
        // setIsLoading(false);
        setEvents(newEventList);
        toast.success(`Event with this id: ${event._id} deleted.`)
      }).catch(function (error) {
        console.log("error while delete an event", error)
        toast.error(error)
        // setIsLoading(false);
        setDeleteEventId(null);
      })

  };

  const updateEvent = (event: any) => {
    setShowPopup(false);
    fn(event);
  };

  const handleCardHover = (eventId: any) => {
    setHoveredEventId(eventId);
  };

  const handleCardLeave = () => {
    setHoveredEventId(null);
  };

  const handleClick = (e: any, data: any) => {
    console.log("x--", e.clientX)
    console.log("y--", e.clientY)
    console.log("innerWidth--", window.innerWidth)
    let l = e.clientX + 10
    let h = e.clientY
    if ((window.innerWidth - e.clientX) < 230) {
      l = l - 200;
    }

    if ((window.innerHeight - e.clientY) < 100) {
      h = h - 100;
    }

    setPopupPosition({ x: l, y: h });
    setClickedEventId(data._id);
    setShowPopup(true);
  };

  const onCloseModal = () => {
    setShowPopup(false);
    setClickedEventId(null);
  }

  const style = {
    left: `${popupPosition.x}px`,
    top: `${popupPosition.y}px`,

  }
  return (
    <div className="flex flex-col justify-center items-center absolute sm:mt-2 mt-3 sm:-ml-[2%] ml-0 w-[10%]">
      {filteredEvents.map((event: any) => (
        <div
          onClick={(e) => handleClick(e, event)}
          key={event._id}
          className={`${event._id === deleteEventId ? 'bg-blue-300' : 'bg-[#039BE5]'} mb-2 flex items-center gap-x-5 justify-between rounded-md w-full relative p-2 cursor-pointer`}
          onMouseEnter={() => handleCardHover(event._id)}
          onMouseLeave={handleCardLeave}
        >
          <div className="flex flex-col gap-y-1 w-full">
            <p className="font-bold text-white text-xs truncate ">{event.title}</p>
            <div className="text-white text-xs">
              {new Date(event.dateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          {showPopup && clickedEventId === event._id && (
            <Transition appear show={showPopup} as={Fragment}>
              <Dialog as="div" className={`absolute`} style={style} onClose={() => onCloseModal()}>
                <div className="flex min-h-full p-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-[200px] bg-gray-50 shadow-lg shadow-gray-400/60 border-[1.5px] border-gray-100 transition ease-in-out duration-500 rounded-lg z-50 pt-1 pb-3">
                      <Dialog.Title>
                        <div className="flex items-center justify-end gap-x-2 mb-2 pl-5 pr-1 border border-b-1 border-t-0 border-x-0 pb-1">
                          <div onClick={() => updateEvent(event)} className="hover:bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center p-[5px] transition-all duration-500 cursor-pointer">
                            <BiPencil style={{ color: '#4d4d4d' }} />
                          </div>
                          <div onClick={() => deleteEvent(event)} className="hover:bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center p-[5px] transition-all duration-500 cursor-pointer">
                            <RiDeleteBin6Line style={{ color: '#4d4d4d' }} />
                          </div>
                          <div onClick={() => onCloseModal()} className="hover:bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center p-[5px] transition-all duration-500 cursor-pointer">
                            <RxCross1 />
                          </div>
                        </div>

                        <div className="flex flex-col gap-y-1 text-[#3c4043] font-normal px-5">
                          <p className="text-lg ">{event.title}</p>
                          <p className="text-xs font-medium">{moment(event.dateTime).tz(moment.tz.guess()).format('llll')}</p>
                        </div>
                      </Dialog.Title>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
