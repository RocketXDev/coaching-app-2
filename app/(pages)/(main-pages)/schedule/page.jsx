"use client"

import 'boxicons';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import TimePicker from 'rsuite/TimePicker';
import 'rsuite/TimePicker/styles/index.css';
import "react-datepicker/dist/react-datepicker.css";
import "../css/schedulePage.css";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import {auth, app} from '../../../firebase/config';

export default function Schedule() {

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDay = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDay.getFullYear());
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const [selectedDate, setSelectedDate] = useState();
    const [repeatDates, setRepeatDates] = useState(false);
    const [addEvent, setAddEvent] = useState(false);
    const [lessonData, setLessonData] = useState({
        title: "",
        date: new Date(),
        startTime: "",
        endTime: "",
        repeat: false,
        repeatDays: []
    });
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updState, setUpdState] = useState(true);

    //DB Connection
    const userUid = auth.currentUser.uid;
    const db = getFirestore(app);

    const sendData = async() => {
        try {
            await addDoc(collection(db,'users', userUid, 'schedule'),lessonData);
            setUpdState(!updState);
        } catch (err) {
            console.log("Error with DB connection (error to follow):")
            console.log(err);
        }
    }

    //

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth-1));
        setCurrentYear((prevYear)=> (currentMonth === 0 ? prevYear - 1 : prevYear));
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth+1));
        setCurrentYear((prevYear)=> (currentMonth === 11 ? prevYear + 1 : prevYear));
    }

    const addDaysToRepeatDaysArray = (e) => {
        setLessonData({...lessonData, repeatDays: [...lessonData.repeatDays, e.target.value]})
    }

    const handleAddEvent = () => {
        setAddEvent(true);
    }

    const handleCloseEvent = () => {
        setAddEvent(false); 
        {repeatDates === true ? setRepeatDates(!repeatDates) : ""}
    }
    
    const handleSaveEvent = (e) => {
        e.preventDefault;
        try {
            sendData();
            setAddEvent(!addEvent);
            {repeatDates === true ? setRepeatDates(!repeatDates) : ""}
        }
        catch(err) {
            console.log("Error with function calling DB (error to follow):")
            console.log(err);
        }
    }

    const handleDayClick = (day) => {
        const clickedDay = new Date(currentYear, currentMonth, day);
        const today = new Date();

        if (today != clickedDay) {
            setSelectedDate(clickedDay);
            setLessonData({...lessonData, date: clickedDay})
        } else {
            setSelectedDate(today);
        }

    }
    
    const isSameDay = (date1, date2) => {
        return (
            date1.toDate().getFullYear() === date2.getFullYear() &&
            date1.toDate().getMonth() === date2.getMonth() &&
            date1.toDate().getDate() === date2.getDate()
        )
    }

    const fetchData = async() => {
        const collectionOfDocs = collection(db, 'users', userUid, 'schedule');
        let getLessonsFromFirestore = [];
        const docsSnap = await getDocs(collectionOfDocs);     
        docsSnap.forEach((doc) => {
            getLessonsFromFirestore.push({...doc.data(), id: doc.id})
        });
        setLessons(getLessonsFromFirestore);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [loading, updState])

    return (
        <div className="schedule-wrapper">
            <div className="calender-app">
                <div className="calender">
                    <h1 className="heading">Schedule</h1>
                    <div className="navigate-date">
                        <h2 className="month">{monthsOfYear[currentMonth]}</h2>
                        <h2 className="year">{currentYear}</h2>
                        <div className="buttons">
                            <box-icon onClick={prevMonth} color="lightgrey" name="chevron-left"></box-icon>
                            <box-icon onClick={nextMonth} color="lightgrey" name="chevron-right"></box-icon>
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
                            <span onClick={() => {handleAddEvent(); handleDayClick(day+1)}} className={(day + 1 === currentDay.getDate() && currentMonth === currentDay.getMonth() && currentYear === currentDay.getFullYear()) ? "current-day" : ""} key={day+1}>{day + 1} 
                                                       
                            <div className="event-wrapper">
                            {lessons.map((lesson)=> {
                                if (isSameDay(lesson.date, new Date(currentYear, currentMonth, day + 1))) {
                                    return (
                                        <div key={lesson.id} className='event'>
                                            <div className="title">{lesson.title}</div>
                                        </div>
                                    )
                                }
                            })}
                            </div> 
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
                            <DatePicker wrapperClassName='date-picker-wrapper'
                            selected={selectedDate} onChange={(date) => {setSelectedDate(date); setLessonData({...lessonData, date: date})}}/>
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
                                        <input value="Sun" onChange={(e) => addDaysToRepeatDaysArray(e)} type="checkbox" name='sun' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="mon">Mon</label>
                                        <input value="Mon" onChange={(e) => addDaysToRepeatDaysArray(e)} type="checkbox" name='mon' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="tue">Tue</label>
                                        <input value="Tue" onChange={(e) => addDaysToRepeatDaysArray(e)} type="checkbox" name='tue' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="wed">Wed</label>
                                        <input value="Wed" onChange={(e) => addDaysToRepeatDaysArray(e)} type="checkbox" name='wed' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="thu">Thu</label>
                                        <input value="Thu" onChange={(e) => addDaysToRepeatDaysArray(e)} type="checkbox" name='thu' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="fri">Fri</label>
                                        <input value="Fri" onChange={(e) => addDaysToRepeatDaysArray(e)} type="checkbox" name='fri' />
                                    </div>
                                    <div className="rep-date">
                                        <label htmlFor="sat">Sat</label>
                                        <input value="Sat" onChange={(e) => addDaysToRepeatDaysArray(e)} type="checkbox" name='sat' />
                                    </div>
                                </div>
                                :
                                ""
                            }
                        </div>
                        <button onClick={(e) => handleSaveEvent(e)}className='event-add-btn'>Save</button>
                        <button onClick={()=>{handleCloseEvent()}} className='close-event-btn'>
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