import React, { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { AiOutlineLogout, AiOutlineQuestionCircle, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import Calendar from 'react-calendar';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';

const Header = ({ handlePrevious, handleNext, currentDate, setCurrentWeek }: any) => {
    const router = useRouter();
    const [viewCalendar, setViewCalendar] = useState(false);
    const [value, setValue] = useState(new Date());
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [name, setName] = useState('Guest');

    const openCalendar = () => {
        setViewCalendar(!viewCalendar)
    }

    const selectDate = (e: any) => {
        setValue(e)
        setViewCalendar(!viewCalendar)
        setCurrentWeek(e)
    }

    const selectToday = () => {
        setCurrentWeek()
        setValue(new Date())
        if (viewCalendar) {
            setViewCalendar(false)
        }
    }

    const handleProfileModal = () => {
        setIsProfileOpen(!isProfileOpen)
    }

    const handleLogout = () => {
        localStorage.removeItem("calendar_auth_token");
        localStorage.removeItem("calendar_user_info");
        router.push('/login')
    }

    useEffect(() => {

        if (typeof window !== 'undefined') {
            const userInfo = localStorage.getItem("calendar_user_info");
            if (userInfo) {
                setName(JSON.parse(userInfo).name)
            }
        }
    }, [])

    return (
        <div className="flex justify-between mb-4 h-[60px] items-center w-full px-2 border border-gray-200">
            <div className="left flex items-center justify-between w-[550px]">
                <div className="md:flex items-center gap-x-3 cursor-default hidden">
                    <img src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_10_2x.png" width={40} />
                    <span className="text-[#3c4043] font-normal text-[22px] leading-5">Calendar</span>
                </div>
                <div className="sm:w-[300px] w-0 flex justify-between gap-x-5 items-center">
                    <div onClick={() => selectToday()} className="flex items-center justify-center border border-gray-300 rounded-[4px] sm:h-9 sm:w-[60px] h-7 w-14 sm:px-10 px-8  cursor-pointer hover:bg-gray-200/80 transition-all duration-500">
                        <span className="text-[#3c4043] sm:text-sm text-xs font-medium">Today</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div onClick={handlePrevious} className="hover:bg-gray-200/80 rounded-full p-1 transition-all duration-500">
                            <GrFormPrevious className='text-[#3c4043] sm:text-[20px] text-[16px]'/>
                        </div>
                        <div onClick={handleNext} className="hover:bg-gray-200/80 rounded-full p-1 transition-all duration-500">
                            <GrFormNext className='text-[#3c4043] sm:text-[20px] text-[16px]' />
                        </div>
                    </div>
                    <div className='flex flex-col relative'>
                        <div onClick={() => openCalendar()} className="hover:bg-gray-200/80 py-1 px-2 rounded-[4px] cursor-pointer transition-all duration-500 flex whitespace-nowrap w-full open-calendar">
                            <span className='text-[#3c4043] font-normal sm:text-[22px] text-[16px]'>{moment(currentDate).format('MMMM') + ' ' + moment(currentDate).get('year')}</span>
                        </div>
                        {viewCalendar && <div className='absolute mt-12 -ml-20 z-50'>
                            <Calendar onChange={(e) => selectDate(e)} value={value} />
                        </div>}
                    </div>
                </div>
            </div>

            <div className="relative right w-[200px] flex items-center justify-evenly sm:text-[22px] sm:text-[#3c4043] text-[16px]">
                <div className="hover:bg-gray-200/80 rounded-full p-1 transition-all duration-500 cursor-pointer">
                    <AiOutlineSearch />
                </div>
                <div className="hover:bg-gray-200/80 rounded-full p-1 transition-all duration-500 cursor-pointer">
                    <AiOutlineQuestionCircle />
                </div>
                <div onClick={() => handleProfileModal()} className="hover:bg-gray-200/80 rounded-full p-1 transition-all duration-500 cursor-pointer">
                    <AiOutlineUser />
                </div>
                {isProfileOpen && (
                    <Transition appear show={isProfileOpen} as={Fragment}>
                        <Dialog as="div" className="fixed top-10 right-0" onClose={() => setIsProfileOpen(false)}>
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
                                    <Dialog.Panel className="w-[166px] bg-white shadow-lg shadow-gray-400/50 transition ease-in-out duration-500 rounded-lg z-50">
                                        <Dialog.Title>
                                            <div className='flex flex-col divide-y divide-gray-400'>
                                                <div className="text-sm font-medium p-4">
                                                    <span className="text-[#3c4043] font-medium text-sm">Hi, {name}</span>
                                                </div>
                                                <div onClick={() => handleLogout()} className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-200/70 transition-all duration-500">
                                                    <span className="text-[#c2262e] text-sm">
                                                        Sign Out
                                                    </span>
                                                    <AiOutlineLogout />
                                                </div>
                                            </div>
                                        </Dialog.Title>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>
                )}
            </div>
        </div>
    );
};

export default Header;
