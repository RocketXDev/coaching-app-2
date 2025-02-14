import { useState } from "react";
import "./css/addPopupWindow.css";

export default function AddStudentWindow() {

    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        parent: {
            name: "",
            phoneNumber: "",
            email: ""
        },
        discipline: "",
        partner: {
            name: "",
            phoneNumber: "",
            email: ""
        }
    });

    return (
        <div className="add-popup">
            <div className="form-wrapper">
                <div className="student-name">
                    <input onChange={(e) => {setStudentData({...studentData, name: e.target.value})}} placeholder='Athlete name' type="text"  />
                </div>
                <div className="student-email">
                    <input onChange={(e) => {setStudentData({...studentData, email: e.target.value})}} placeholder='Athlete email' type="email"  />
                </div>
                <div className="student=number">
                    <input onChange={(e) => {setStudentData({...studentData, phoneNumber: e.target.value})}} placeholder='Athlete phone number' type="tel" />
                </div>
            </div>
        </div>
    )
}