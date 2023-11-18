import { useState } from "react";
import SideNav from "../SideNav/SideNav";
import Navbar from "../Navbar/Navbar";
import FormModal from "../FormModal/FormModal";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";

import "./Applications.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Applications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedFormRef = useRef();

  const handleModal = (formData) => {
    selectedFormRef.current = formData; // Set the selected form data in the ref
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

    // Function to filter forms based on date range
    const filterFormsByDate = (start, end) => {
      if (start && end) {
        const filteredForms = forms.filter(
          (formData) =>
            new Date(formData.date) >= start && new Date(formData.date) <= end
        );
        return filteredForms;
      }
      return forms;
    };
    

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3001/getforms`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setForms(response.data);
            // if (response.data.length > 0) {
                selectedFormRef.current = response.data[0];
                console.log(selectedFormRef.current)

            //   }
          } else {
            console.error("Invalid response data:", response.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);


  // Filter forms based on selected date range
  const filteredForms = filterFormsByDate(startDate, endDate);

  return (
    <>
      {isModalOpen && (
        <FormModal
          isOpen={isModalOpen}
          setIsOpen={closeModal}
          contentLabel={"Preview"}
          forms={selectedFormRef.current}
        />
      )}
      <div className="home">
        <SideNav />
        <div className="homeContainer">
        <Navbar setStartDate={setStartDate} setEndDate={setEndDate} />
          <div className="applications_table">
            <TableContainer
              component={Paper}
              className="table"
              sx={{ textAlign: "center" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="tableCell">
                      Application Type
                    </StyledTableCell>
                    <StyledTableCell className="tableCell" align="center">
                      Customer
                    </StyledTableCell>
                    <StyledTableCell className="tableCell" align="center">
                      Date
                    </StyledTableCell>
                    <StyledTableCell className="tableCell" align="center">
                      Status
                    </StyledTableCell>
                    <StyledTableCell className="tableCell" align="center">
                      Application Details
                    </StyledTableCell>
                    <StyledTableCell className="tableCell" align="center">
                      Copyright ID
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredForms.map((formData, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell className="tableCell">
                        <div className="cellWrapper">
                          {formData.formType.toUpperCase()} COPYRIGHT
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className="tableCell" align="center">
                        {formData.form1.name}
                      </StyledTableCell>
                      <StyledTableCell className="tableCell" align="center">
                        {new Date(formData.date).getDate()}{" "}
                        {shortMonths[new Date(formData.date).getMonth()]}{" "}
                        {new Date(formData.date).getFullYear()}
                      </StyledTableCell>
                      <StyledTableCell className="tableCell" align="center">
                        <span className={`status`}>Pending</span>
                      </StyledTableCell>
                      <StyledTableCell
                        className="tableCell"
                        align="center"
                        onClick={() => handleModal(formData)} // Pass the form data to handleModal
                        sx={{ cursor: "pointer" }}
                      >
                        <u>View Details</u>
                      </StyledTableCell>
                      <StyledTableCell className="tableCell" align="center">
                        301
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Applications;
