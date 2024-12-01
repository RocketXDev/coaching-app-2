"use client"

import 'boxicons';
import "../css/schedulePage.css"

export default function Schedule() {
    return (
        <div className="schedule-wrapper">
            <div className="calender-app">
                <div className="calender">
                    <h1 className="heading">Schedule</h1>
                    <div className="navigate-date">
                        <h2 className="month">November</h2>
                        <h2 className="year">2024</h2>
                        <div className="buttons">
                            <box-icon name="chevron-left"></box-icon>
                            <box-icon name="chevron-right"></box-icon>
                        </div>
                    </div>
                    <div className='weekdays'>
                        <span>Sun</span>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                    </div>
                    <div className="days">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                        <span>11</span>
                        <span>12</span>
                        <span>13</span>
                        <span id='cur'>14</span>
                        <span>15</span>
                        <span>16</span>
                        <span>17</span>
                        <span>18</span>
                        <span>19</span>
                        <span>20</span>
                        <span>21</span>
                        <span>22</span>
                        <span>23</span>
                        <span>24</span>
                        <span>25</span>
                        <span>26</span>
                        <span>27</span>
                        <span>28</span>
                        <span>29</span>
                        <span>30</span>
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