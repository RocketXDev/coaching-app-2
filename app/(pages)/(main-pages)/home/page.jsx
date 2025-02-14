"use client"
import { Suspense, useEffect, useState } from "react";
import { auth, app } from "../../../firebase/config";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import LoadingPage from "../../../components/LoadingPage";

export default function Home() {

    const [students, setStudents] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    //TEMPORARY
    const [dammyState, setDammyState] = useState(false);

    useEffect(() => {
        setDammyState(!dammyState);
        fetchData();
    }, [students, lessons])

    const userUid = auth.currentUser.uid;
    const db = getFirestore(app);

    const fetchData = async() => {
        const collectionOfLessons = collection(db, 'users', userUid, 'lessons');
        const collectionOfStudents = collection(db, 'users', userUid, 'students');
        let getLessonsFromFirestore = [];
        let getStudentsFromFirestore = [];
        const docsSnapLessons = await getDocs(collectionOfLessons);   
        const docsSnapStudents = await getDocs(collectionOfStudents);   
        docsSnapLessons.forEach((doc) => {
            getLessonsFromFirestore.push({...doc.data(), id: doc.id})
        });
        docsSnapStudents.forEach((doc) => {
            getStudentsFromFirestore.push({...doc.data(), id: doc.id})
        });
        setLessons(getLessonsFromFirestore);
        setStudents(getStudentsFromFirestore);
        setLoading(false);
    }

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
                        {loading ? "Loading students..." : 
                        <>
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
                        </>
                        }
                    </div>
                </div>
                <div className="dashboard-block dash-lessons-history">
                    <div className="dash-block-title">Lesson History</div>
                    <div className="dash-block-main">
                    {loading ? "Loading lessons history..." : 
                    <>
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
                    </>
                    }
                    </div>
                </div>
            </div>
        </>
    )
}