"use client"

import 'boxicons';
import "../css/schedulePage.css"
import { useState } from 'react';

export default function Schedule() {

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDay = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDay.getFullYear());
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const [selectedDate, setSelectedDate] = useState(currentDay);

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth-1));
        setCurrentYear((prevYear)=> (currentMonth === 0 ? prevYear - 1 : prevYear));
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth+1));
        setCurrentYear((prevYear)=> (currentMonth === 11 ? prevYear + 1 : prevYear));
    }

    return (
        <div className="schedule-wrapper">
            <div className="calender-app">
                <div className="calender">
                    <h1 className="heading">Schedule</h1>
                    <div className="navigate-date">
                        <h2 className="month">{monthsOfYear[currentMonth]}</h2>
                        <h2 className="year">{currentYear}</h2>
                        <div className="buttons">
                            <box-icon onClick={prevMonth} name="chevron-left"></box-icon>
                            <box-icon onClick={nextMonth} name="chevron-right"></box-icon>
                        </div>
                    </div>
                    <div className='weekdays'>
                       {daysOfWeek.map((day) => <span key={day}>{day}</span>)}
                    </div>
                    <div className="days">
                        {[...Array(firstDayOfMonth).keys()].map((_, index)=> (
                        <span key={`empty-${index}`}/>
                        ))}
                        {[...Array(daysInMonth).keys()].map((day)=>(
                            <span className={(day + 1 === currentDay.getDate() && currentMonth === currentDay.getMonth() && currentYear === currentDay.getFullYear()) ? "current-day" : ""} key={day+1}>{day + 1}</span>
                        ))}
                    </div>
                </div>
                <div className="events">
                <div className="event-popup">
                    <div className="time-input">
                        <div className="event-popup-time">Time</div>
                        <input className='hours' name = "hours" min={0} max={12} type="number" />
                        <input className='minutes' name = "minutes" min={0} max={60} type="number" />
                    </div>
                    <textarea placeholder='Enter event text (Max. 60)'></textarea>
                    <button className='event-popup-btn'>Add event</button>
                    <button className='close-event-popup'>
                        <box-icon name="x"></box-icon>
                    </button>
                </div>
                {/* <div className="event">
                    <div className="event-date-wrapper">
                        <div className="event-date">November 30, 2025</div>
                        <div className="event-time">10:00</div>
                    </div>
                    <div className="event-text">Lesson with Sasha</div>
                    <div className="event-buttons">
                        <box-icon type="solid" name="edit-alt"></box-icon>
                        <box-icon type="solid" name="message-alt-x"></box-icon>
                    </div>
                </div> */}
                </div>
            </div>
        </div>
    )
}