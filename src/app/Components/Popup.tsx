import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { AnimatePresence, motion } from "framer-motion";

const Popup = ({ onSave, onClose, isUpdate, updateData }: any) => {
  const [value, onChange]: any = useState(!isUpdate ? new Date() : new Date(updateData.date));
  const [title, setTitle]: any = useState(!isUpdate ? '' : updateData.title);
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };
  return (
    <AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-white w-96 p-4 rounded shadow-xl shadow-gray-400/50">
          <div className="text-lg font-semibold mb-4 text-[#3c4043]">Add Event</div>
          <div className="p-4 flex flex-col gap-y-5">
            <input type="text" value={title} placeholder="Add Title" className="eventInput" onChange={(e) => setTitle(e.target.value)} />
            <DateTimePicker onChange={onChange} value={value} />
          </div>
          <div className="flex justify-end gap-x-4 mt-4">
            <button
              className="bg-[#1967D2] hover:bg-blue-700 text-white font-semibold text-[14px] py-2 px-4 rounded transition-all duration-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`${title.length ? 'bg-[#1967D2] hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}  text-white font-semibold text-[14px] py-2 px-4 rounded transition-all duration-500`}
              onClick={() => !isUpdate ? onSave({ title, dateTime: value }) : onSave({ id: updateData.id, title, dateTime: value })}
              disabled={!title.length ? true : false}
            >
              {!isUpdate ? 'Save' : 'Update'}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

  );
};

export default Popup;
