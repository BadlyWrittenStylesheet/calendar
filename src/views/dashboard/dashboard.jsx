import { useContext, useEffect, useState } from "react";
import "./dashboard.scss";

import days from "./days";
import lessons from "./lessons";
import subjects from "./subjects";
import Select from 'react-select';
import { AppContext } from "../../context/app.context";

const Dashboard = () => {
    const [logged, setLogged] = useState(false);
    const { plan, setPlan } = useContext(AppContext);
    
    const logout = () => {
        window.sessionStorage.clear();
        setLogged(false);
    };

    const selectHandle = (subject, day, lesson) => {
        const planCopy = Object.assign(plan, {});

        planCopy[day.toLowerCase()][lesson] = subject ? subject.label : "";
        console.log(subject, day, lesson);

        setPlan(planCopy);
        localStorage.setItem('school-plan', JSON.stringify(planCopy));
    };

    useEffect(() => {
        const isLogged = window.sessionStorage.getItem("logged");

        if (!isLogged) {
            window.location.href = "/admin";
            return;
        };

        setLogged(true);
        console.log('l', lessons, 'd', days, 'p', plan);
    }, [logged]);

    return(
        <div className="app-dashboard-container">
            <div className="logout container">
                <button onClick={logout}>Logout</button>
            </div>
            <div className="container">
                <div className="scroll">
                    <div className="table">
                    {days.map(day => (
                        <div className="col" key={day}>
                            <div className="day">{day}</div>
                            {lessons.map(lesson => (
                                <div key={lesson} className="row">
                                    <div className="lesson">{lesson}.</div>
                                    <div className="subject">
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        name="color"
                                        options={subjects}
                                        isClearable={true}
                                        onChange={(subject) => selectHandle(subject, day, lesson)}
                                        defaultInputValue={plan[day.toLowerCase()][lesson]}
                                    />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
