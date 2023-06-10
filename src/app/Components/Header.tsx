import moment from 'moment'
import React from 'react'
import { AiOutlineQuestionCircle, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
const Header = ({ handlePrevious, handleNext, currentDate, setCurrentWeek }: any) => {
    console.log("currentDate in header", currentDate)
    return (
        <div className="flex justify-between mb-4 h-[60px] items-center w-full px-2 border border-gray-200">
            {/* <button className="px-4 py-2 bg-blue-500 text-white" onClick={handlePrevious}>
                Previous Week
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white" onClick={handleNext}>
                Next Week
            </button> */}
            <div className='left flex items-center justify-between w-[550px]'>
                <div className='md:flex items-center gap-x-3 cursor-default hidden'>
                    <img src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_10_2x.png" width={40} />
                    <span className='text-[#3c4043] font-normal text-[22px] leading-5'>Calendar</span>
                </div>
                <div className='w-[300px] flex justify-between gap-x-5 items-center'>
                    <div onClick={() => setCurrentWeek()} className='border border-gray-300 rounded-[4px] px-3 py-1 cursor-pointer hover:bg-gray-100 transition-all duration-500'>
                        <span className='text-[#3c4043] text-sm font-medium'>Today</span>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <div onClick={handlePrevious} className='hover:bg-gray-100 rounded-full p-1 transition-all duration-500'>
                            <GrFormPrevious style={{fontSize: "20px", color: "#3c4043"}}/>
                        </div>
                        <div onClick={handleNext} className='hover:bg-gray-100 rounded-full p-1 transition-all duration-500'>
                            <GrFormNext style={{fontSize: "20px", color: "#3c4043"}}/>
                        </div>
                    </div>
                    <div className='hover:bg-gray-100 py-1 px-2 rounded-[4px] cursor-pointer transition-all duration-500 flex whitespace-nowrap w-full'>
                        <span className='text-[#3c4043] font-normal text-[22px]'>{moment(currentDate).format('MMMM') + ' ' + moment(currentDate).get('year')}</span>
                    </div>
                </div>
            </div>

            <div className='right w-[200px] flex items-center justify-evenly' style={{fontSize: "22px", color: "#3c4043"}}>
                <div className='hover:bg-gray-100 rounded-full p-1 transition-all duration-500 cursor-pointer'>
                    <AiOutlineSearch />
                </div>
                <div className='hover:bg-gray-100 rounded-full p-1 transition-all duration-500 cursor-pointer'>
                    <AiOutlineQuestionCircle />
                </div>
                <div className='hover:bg-gray-100 rounded-full p-1 transition-all duration-500 cursor-pointer'>
                    <AiOutlineSetting />
                </div>
            </div>
        </div>
    )
}

export default Header