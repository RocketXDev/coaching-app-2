"use client"
import {useEffect, useState } from "react";
import { auth, app } from "../../../firebase/config";
import { getFirestore, getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import 'boxicons';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input/input';

export default function Home() {

    const [students, setStudents] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayAddStudent, setDisplayAddStudent] = useState(false);
    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        parent: {
            name: "",
            phoneNumber: "",
            email: ""
        },
        discipline: "single",
        partner: {
            name: "",
            phoneNumber: "",
            email: ""
        }
    });
    const [studentPhoneNumber, setStudentPhoneNumber] = useState("");
    const [parentPhoneNumber, setParentPhoneNumber] = useState("");
    const [partnerPhoneNumber, setPartnerPhoneNumber] = useState("");
    const [parentNeeded, setParentNeeded] = useState(false);

    useEffect(() => {
        fetchData();
    }, [students, lessons]);

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
        console.log(students);
    }

    const closeAddStudentPopup = () => {
        setDisplayAddStudent(false);
        setStudentData({...studentData, discipline:"single"});
        setParentNeeded(false);

    }

    const openAddStudentPopup = () => {
        setDisplayAddStudent(true);
    }

    const saveStudent = async() => {

        const docRef = await addDoc(collection(db, 'users', userUid, "students"), {
            name: studentData.name,
            email: studentData.email,
            phoneNumber: studentPhoneNumber,
            parent: {
                name: studentData.parent.name,
                phoneNumber: parentPhoneNumber,
                email: studentData.parent.email
            },
            discipline: studentData.discipline,
            partner: {
                name: studentData.partner.name,
                phoneNumber: partnerPhoneNumber,
                email: studentData.partner.email
            }
        });

        setDisplayAddStudent(false);

    }

    const deleteStudent = async(studentId) => {
        await deleteDoc(doc(db, 'users', userUid, 'students', studentId))
    }

    const addStudentPopup = () => {

        return (
            <div className="add-popup">
                <div className="form-wrapper">
                    <div className="add-popup-title">Student Info</div>
                    <div className="form-name">
                        <input onChange={(e) => {setStudentData({...studentData, name: e.target.value})}} placeholder='Athlete name' type="text"  />
                    </div>
                    <div className="form-email">
                        <input onChange={(e) => {setStudentData({...studentData, email: e.target.value})}} placeholder='Athlete email' type="email"  />
                    </div>
                    <div className="form-number">
                        <PhoneInput
                            placeholder="Athlete phone number"
                            country="US"
                            value={studentPhoneNumber}
                            onChange={setStudentPhoneNumber}
                        />
                    </div>
                    <div className="age-verification"> Under 18?
                        <div className="age-option">
                            <input onChange={() => setParentNeeded(!parentNeeded)} name="age-verify" value={parentNeeded} type="checkbox"/> Yes
                        </div>
                    </div>
                    
                    {parentNeeded ? 
                    <div className = "additional-info-wrapper">
                        <div className="form-name">
                            <input onChange={(e) => {setStudentData({...studentData, parent: {...studentData.parent, name: e.target.value}})}} placeholder='Parent name' type="text"  />
                        </div>
                        <div className="form-email">
                            <input onChange={(e) => {setStudentData({...studentData, parent: {...studentData.parent, email: e.target.value}})}} placeholder='Parent email' type="email"  />
                        </div>
                        <div className="form-number">
                            <PhoneInput
                                placeholder="Parent phone number"
                                country="US"
                                value={parentPhoneNumber}
                                onChange={setParentPhoneNumber}
                            />
                        </div>
                    </div>
                    :
                    ""}
                    
                    <label className="discipline-title" htmlFor="discipline">Discipline:
                        <select name="discipline" onChange={(e) => setStudentData({...studentData, discipline: e.target.value})} className="discipline">
                            <option value="single">Single</option>
                            <option value="ice dance">Ice Dance</option>
                            <option value="solo ice dance">Solo Ice Dance</option>
                            <option value="pairs">Pairs</option>
                        </select>
                    </label>

                    {studentData.discipline === "ice dance" || studentData.discipline === "pairs" ?
                    <div className = "additional-info-wrapper">
                        <div className="form-name">
                            <input onChange={(e) => {setStudentData({...studentData, partner: {...studentData.partner, name: e.target.value}})}} placeholder='Partner name' type="text"  />
                        </div>
                        <div className="form-email">
                            <input onChange={(e) => {setStudentData({...studentData, partner: {...studentData.partner, email: e.target.value}})}} placeholder='Partner email' type="email"  />
                        </div>
                        <div className="form-number">
                            <PhoneInput
                                placeholder="Partner phone number"
                                country="US"
                                value={partnerPhoneNumber}
                                onChange={setPartnerPhoneNumber}
                            />
                        </div>
                    </div>
                    :
                    ""}

                    <button onClick={() => saveStudent()} className="form-add-btn">Save</button>

                    <button onClick={()=>{closeAddStudentPopup()}} className='close-popup-btn'>
                            <box-icon size="md" color="white" name="x"></box-icon>
                    </button>
                </div>
            </div>
        )
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
                    <div className="dash-block-title" onClick={() => openAddStudentPopup()}>Students</div>
                    <div className="dash-block-main">
                        {loading ? "Loading students..." : 
                        <>
                            {(students.length > 0) ? 
                                <div className="data">
                                    {students.map((student) => {
                                        return (
                                        <div className="dash-block-data">{student.name}
                                            <img onClick={() => deleteStudent(student.id)} className="data-logo-delete" src="/images/delete.png"></img>
                                        </div>);
                                    })}
                                </div>:
                                <>
                                    <div className="empty-msg">No students yet...</div>
                                    <div onClick={() => openAddStudentPopup()} className="add-data">+</div>
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
                {displayAddStudent ? addStudentPopup() : ""}
            </div>
        </>
    )
}