import React from "react";
import Course from '../UI/Course'
import Calendar from '../pages/Calendar'
import UpcomingHW from '../UI/UpcomingHW'

const Dashboard = () => {
    return (
        <div>
            Dashboard Page
            <Course />
            <Calendar />
            <UpcomingHW />
        </div>
    )
}

export default Dashboard;