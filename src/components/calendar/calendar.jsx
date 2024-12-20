import { useEffect, useState } from "react";
import "./calendar.scss";

const Calendar = ({ plan }) => {
    const [selected, setSelected] = useState("");
    const [selectedLessons, setSelectedLessons] = useState([]); // State for clicked lessons

    useEffect(() => {
        console.log(plan);
    }, []);

    let hoverTimeout;

    const handleClick = (day, lesson) => {
        hoverTimeout = setTimeout(() => {
            setSelected(plan[day][lesson]);
            console.log(`Hovered over day: ${day}`);
        }, 750);
    };

    const handleClickLeave = () => {
        clearTimeout(hoverTimeout);
    };

    const handleLessonClick = (day, lesson) => {
        const lessonId = `${day}-${lesson}`; // Create unique identifier for the lesson

        setSelectedLessons((prevSelected) => {
            if (prevSelected.includes(lessonId)) {
                // If already selected, remove it
                return prevSelected.filter((id) => id !== lessonId);
            } else {
                // If not selected, add it
                return [...prevSelected, lessonId];
            }
        });
    };

    return (
        <div className="app-calendar-container">
            <div className="table">
                {Object.keys(plan).map((day) => (
                    <div className="col" key={day}>
                        <p className="day">{day}</p>
                        {Object.keys(plan[day]).map((lesson) => {
                            const lessonId = `${day}-${lesson}`; // Unique identifier for the lesson
                            return (
                                <div
                                    key={lesson}
                                    className={`row ${
                                        selected === plan[day][lesson] ? "selected" : ""
                                    } ${selectedLessons.includes(lessonId) ? "highlighted" : ""}`}
                                    onMouseEnter={() => handleClick(day, lesson)}
                                    onMouseLeave={handleClickLeave}
                                    onClick={() => handleLessonClick(day, lesson)} // Pass day and lesson to handler
                                >
                                    <span className="lesson">{lesson}.</span>
                                    <span>{plan[day][lesson]}</span>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;

