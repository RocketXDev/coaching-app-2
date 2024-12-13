"use client"

import 'boxicons';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import TimePicker from 'rsuite/TimePicker';
import 'rsuite/TimePicker/styles/index.css';
import "react-datepicker/dist/react-datepicker.css";
import "../css/schedulePage.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {auth, app} from '../../../firebase/config';

export default function Schedule() {

    //DB Connection
    const userUid = auth.currentUser.uid;
    const db = getFirestore(app);

    const sendData = async() => {
        try {
            await addDoc(collection(db,'users', userUid, 'schedule'), lessonData);
        } catch (err) {
            console.log("Error with DB connection (error to follow):")
            console.log(err);
        }
    }

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDay = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDay.getFullYear());
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const [selectedDate, setSelectedDate] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [repeatDates, setRepeatDates] = useState(false);
    const [addEvent, setAddEvent] = useState(false);

    const [lessonData, setLessonData] = useState({
        title: "",
        date: currentDay,
        startTime: "",
        endTime: "",
        repeat: false,
        repeatDays: []
    });
    const [lessonsArray, setLessonsArray] = useState([]);

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth-1));
        setCurrentYear((prevYear)=> (currentMonth === 0 ? prevYear - 1 : prevYear));
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth+1));
        setCurrentYear((prevYear)=> (currentMonth === 11 ? prevYear + 1 : prevYear));
    }

    const handleAddEvent = () => {
        setAddEvent(true);
    }
    
    const handleSaveEvent = (e) => {
        e.preventDefault;
        try {
            sendData();
            setAddEvent(!addEvent);
        }
        catch(err) {
            console.log("Error with function calling DB (error to follow):")
            console.log(err);
        }
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
                            <span onClick={() => handleAddEvent()} className={(day + 1 === currentDay.getDate() && currentMonth === currentDay.getMonth() && currentYear === currentDay.getFullYear()) ? "current-day" : ""} key={day+1}>{day + 1}
                            <div className='event-wrapper'>
                                <div className='event'>Dallas Classic</div>
                                <div className='event'>Lesson with Nikolai</div>
                            </div>
                            <div className="event-extra">+ 3</div>
                            </span>
                        ))}
                    </div>
                </div>
                {addEvent ? 
                <div className="events">
                    <div className="event-popup">
                        <div className="event-title">
                            <input onChange={(e) => {setLessonData({...lessonData, title: e.target.value})}} placeholder='Title' type="text" name='title' />
                        </div>
                        <div className="event-date">
                            <DatePicker wrapperClassName='date-picker-wrapper' selected={startDate}  onChange={(date) => {setStartDate(date); setLessonData({...lessonData, date: date.toLocaleDateString()})}}/>
                        </div>
                        <div className="event-time">
                            <div className="start-time">
                                <label>Start Time:</label>
                                <TimePicker
                                    showMeridiem="true"
                                    size='sm'
                                    onChange={(date) => {setLessonData({...lessonData, startTime: date.toLocaleTimeString()})}}
                                />
                            </div>
                            <div className="end-time">
                                <label htmlFor='end-time'>End time:</label>
                                <TimePicker
                                    showMeridiem="true"
                                    size='sm'
                                    onChange={(date) => {setLessonData({...lessonData, endTime: date.toLocaleTimeString()})}}
                                />
                            </div>
                        </div>
                        <div className="event-repeat">
                            <div className="repeat-qa">
                                <label>Repeat?</label>
                                <input onChange={(e)=>{(setRepeatDates(!repeatDates)); setLessonData({...lessonData, repeat: !lessonData.repeat})}} type='checkbox'/>
                            </div>
                            {repeatDates ? 
                                <div className='repeat-dates'>
                                    <div className="rep-date">
                                        <label htmlFor="sun">Sun</label>
                                        <input type="checkbox" name='sun' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="mon">Mon</label>
                                        <input type="checkbox" name='mon' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="tue">Tue</label>
                                        <input type="checkbox" name='tue' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="wed">Wed</label>
                                        <input type="checkbox" name='wed' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="thu">Thu</label>
                                        <input type="checkbox" name='thu' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="fri">Fri</label>
                                        <input type="checkbox" name='fri' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="sat">Sat</label>
                                        <input type="checkbox" name='sat' />
                                    </div>
                                </div>
                                :
                                ""
                            }
                        </div>
                        <button onClick={(e) => handleSaveEvent(e)}className='event-add-btn'>Save</button>
                        <button onClick={()=>{setAddEvent(false)}} className='close-event-btn'>
                            <box-icon size="md" color="white" name="x"></box-icon>
                        </button>
                    </div>
                </div>
                :
                ""
                }
            </div>
        </div>
    )
}