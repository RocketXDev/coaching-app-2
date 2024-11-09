import { stat } from "fs";
import { useEffect } from "react";

interface User {
    firstName: string;
    lastName: string;
    status: string; //Coach or Student
    email: string;
}

class Student implements User {

    firstName: string;
    lastName: string;
    status: string;
    email: string;
    coaches = [];
    lessons: Lesson[] = [];

    addCoach(coach){
        this.coaches.push(coach);
    }

    addLesson(lesson: Lesson): void {
        this.lessons.push(lesson);
    }

    getCoaches(): Coach[] {
        return this.coaches;
    }

    getLessons(): Lesson[] {
        return this.lessons;
    }

    constructor(firstName: string, lastName: string, status: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = status; 
        this.email = email;
    }

    partner: boolean;
}

class Coach implements User {

    firstName: string;
    lastName: string;
    status: string;
    email: string;
    private students: Student[] = [];
    private lessons: Lesson[] = [];

    addStudent(student: Student): void {
        this.students.push(student);
    }

    addLesson(lesson: Lesson): void {
        this.lessons.push(lesson);
    }

    getStudents(): Student[] {
        return this.students;
    }

    getLessons(): Lesson[] {
        return this.lessons;
    }

    constructor(firstName: string, lastName: string, status: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = status; 
        this.email = email;
    }

}

class Lesson {
    date: Date;
    length: String;
    type: String; //Private or group
    coach: Coach;
    student: Student;
} 

export default {Student, Coach, Lesson};