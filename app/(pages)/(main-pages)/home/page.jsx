"use client"
import { useEffect, useState } from "react"
import "../css/homePage.css"

export default function Home() {

    const [students, setStudents] = useState([{name:"Artem"}, {name:"Elena"}]);
    const [lessons, setLessons] = useState([{title:"Lesson with Nikolai"}, {title: "Lesson with Sasha"}]);

    //TEMPORARY
    const [dammyState, setDammyState] = useState(false);

    useEffect((students) => {
        setDammyState(!dammyState);
    }, [students])
    //

    return (
        <>
            <div className="dashboard-wrapper">
                <div className="dashboard-block dash-schedule">
                    <div className="dash-block-title">Daily Schedule</div>
                    <div className="dash-block-main">
                        <div className="empty-msg">Nothing planned for today...</div>
                        <div className="add-data">+</div>
                    </div>
                </div>
                <div className="dashboard-block dash-students">
                    <div className="dash-block-title">Students</div>
                    <div className="dash-block-main">
                        {(students.length > 0) ? 
                        <div className="data">
                            {students.map((student) => {
                                return (<div className="dash-block-data">{student.name}</div>);
                            })}
                        </div>:
                        <>
                            <div className="empty-msg">No students yet...</div>
                            <div className="add-data">+</div>
                        </>
                        }
                    </div>
                </div>
                <div className="dashboard-block dash-lessons-history">
                    <div className="dash-block-title">Lesson History</div>
                    <div className="dash-block-main">
                    {(lessons.length > 0) ? 
                        <div className="data">
                            {lessons.map((lesson) => {
                                return (<div className="dash-block-data">{lesson.title}</div>);
                            })}
                        </div>:
                        <>
                            <div className="empty-msg">No lessons history yet...</div>
                            <div className="add-data">+</div>
                        </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}