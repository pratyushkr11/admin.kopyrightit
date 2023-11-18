import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useFormContext } from '../Home/FormContext'; // Import the useFormContext hook

import './Featured.css';

const Featured = () => {
  const formData = useFormContext(); // Access the form data from the context

  // Calculate the total number of applications registered today
  const today = new Date();
  const registeredToday = formData.filter(
    (formData) => new Date(formData.date).toDateString() === today.toDateString()
  ).length;

  // Calculate the number of applications for the previous day
  const previousDay = formData.filter((formData) => {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return new Date(formData.date).toDateString() === yesterday.toDateString();
  }).length;

  // Calculate the number of applications for the last week
  const lastWeek = formData.filter((formData) => {
    const lastWeekDate = new Date(today);
    lastWeekDate.setDate(today.getDate() - 7);
    return new Date(formData.date) >= lastWeekDate && new Date(formData.date) < today;
  }).length;

  // Calculate the number of applications for the last month
  const lastMonth = formData.filter((formData) => {
    const lastMonthDate = new Date(today);
    lastMonthDate.setMonth(today.getMonth() - 1);
    return new Date(formData.date) >= lastMonthDate && new Date(formData.date) < today;
  }).length;

  return (
    <div className="featured">
      <div className="top-featured">
        <h1 className="title">Applications Data</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom-featured">
        <p className="title-chart">Total No. Of Applications Registered Today</p>
        <p className="amount">{registeredToday}</p>
        <p className="desc">Previous applications processing. Last applications may not be included.</p>
        <div className="summary">
          <div className="item-fetaured">
            <div className="itemTitle">Previous Day</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon fontSize="small" />
              <div className="resultAmount">{previousDay}</div>
            </div>
          </div>
          <div className="item-fetaured">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">{lastWeek}</div>
            </div>
          </div>
          <div className="item-fetaured">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon fontSize="small" />
              <div className="resultAmount">{lastMonth}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
