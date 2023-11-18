import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './Navbar.css';

const Navbar = ({ setStartDate, setEndDate }) => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {

        // Increment the end date by one day before setting it
        const incrementedEndDate = new Date(date);
        incrementedEndDate.setDate(incrementedEndDate.getDate() + 1);

        setSelectedEndDate(date);
        setEndDate(incrementedEndDate);
    };

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchIcon />
                </div>
                <div className="date-picker">
                    <div className="react-datepicker-wrapper">
                        <DatePicker
                            selected={selectedStartDate}
                            onChange={handleStartDateChange}
                            selectsStart
                            startDate={selectedStartDate}
                            endDate={selectedEndDate}
                            placeholderText="Start Date"
                            className="react-datepicker__input-container"
                        />
                    </div>
                    <div className="react-datepicker-wrapper">
                        <DatePicker
                            selected={selectedEndDate}
                            onChange={handleEndDateChange}
                            selectsEnd
                            startDate={selectedStartDate}
                            endDate={selectedEndDate}
                            minDate={selectedStartDate}
                            placeholderText="End Date"
                            className="react-datepicker__input-container"
                        />
                    </div>
                </div>
                <div className="items">
                    <div className="item">
                        <NotificationsNoneIcon />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <PersonIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
