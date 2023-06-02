import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const Popup = ({ onSave, onClose, isUpdate, updateData }: any) => {
  const [value, onChange]: any = useState(!isUpdate ? new Date() : new Date(updateData.date));
  const [title, setTitle]: any = useState(!isUpdate ? '' : updateData.title);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white w-96 p-4 rounded shadow">
        <div className="text-xl font-bold mb-4">Add Event</div>
        <div className="p-4 flex flex-col gap-y-5">
          <input type="text" value={title} placeholder="Add Title" className="eventInput" onChange={(e) => setTitle(e.target.value)}/>
            <DateTimePicker onChange={onChange} value={value} />
        </div>
        <div className="flex justify-end gap-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => !isUpdate ? onSave({title, dateTime: value}) : onSave({id: updateData.id, title, dateTime: value})}
          >
            {!isUpdate ? 'Save' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
