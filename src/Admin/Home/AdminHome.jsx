import React from 'react';
import Navbar from '../Navbar/Navbar';
import SideNav from '../SideNav/SideNav';
import Widgets from '../Widgets/Widgets';
import Featured from '../Featured/Featured';
import Chart from '../Chart/Chart';
import Table from '../Table/Table';
import { FormProvider } from './FormContext'; // Import FormProvider

import './Home.css';

const Home = () => {
  return (
    <FormProvider> {/* Wrap your Home component with FormProvider */}
      <div className="home">
        <SideNav />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widgets type="applications" />
            <Widgets type="pending" />
            <Widgets type="tat" />
            <Widgets type="copyright" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 Months (Applications)" aspect={2 / 1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Applications</div>
            <Table />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Home;
