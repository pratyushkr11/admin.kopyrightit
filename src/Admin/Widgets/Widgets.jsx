import { useFormContext } from '../Home/FormContext'; // Import the useFormContext hook
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimerIcon from '@mui/icons-material/Timer';
import CopyrightIcon from '@mui/icons-material/Copyright';

import './Widgets.css';
import { Link } from 'react-router-dom';

const Widgets = ({ type }) => {
  const formData = useFormContext(); // Access the form data from the context

  let data;

  switch (type) {
    case 'applications':
      data = {
        title: 'Total Applications',
        isMoney: false,
        link: 'see all applications',
        icon: (
          <AssignmentIcon
            className="icon"
            sx={{
              color: 'crimson',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }}
          />
        ),
        value: formData.length, // Use the form data from the context
      };
      break;
    case 'pending':
      // const pendingApps = formData.filter((formData) => formData.status === 'Pending').length;
      const pendingApps = formData.length
      data = {
        title: 'Pending Applications',
        isMoney: false,
        link: 'see pending applications',
        icon: (
          <PendingActionsIcon
            className="icon"
            sx={{
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
        value: pendingApps, // Calculate the number of pending applications
      };
      break;
    case 'tat':
      // Calculate the number of applications nearing TAT
      const today = new Date();
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);
      const appsNearingTAT = formData.filter((formData) => new Date(formData.date) <= twoDaysAgo).length;
      data = {
        title: 'Applications Nearing TAT',
        isMoney: false,
        link: 'see applications TAT',
        icon: (
          <TimerIcon
            className="icon"
            sx={{
              backgroundColor: 'rgba(128, 0, 128, 0.2)',
              color: 'purple',
            }}
          />
        ),
        value: appsNearingTAT,
      };
      break;
    case "copyright":
      const TotalCopyright = 0
      data = {
        title: "Total Copyright Registered",
        isMoney: false,
        link: "see total copyright registered",
        icon: (<CopyrightIcon className="icon" sx={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }} />),
        value: TotalCopyright,
      }
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="number">{(data.isMoney && '₹') || ''}{data.value}</span>
        <Link className="link">{data.link}</Link>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widgets;
