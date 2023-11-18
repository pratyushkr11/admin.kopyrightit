import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";

import "./Table.css";

const List = () => {

  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3001/getforms`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setForms(response.data);
          } else {
            // Handle the case where the response is not an array
            console.error("Invalid response data:", response.data);
            // You may set forms to an empty array or handle the error appropriately.
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          // Handle the error appropriately.
        });
    } catch (error) {
      console.error("Error in useEffect:", error);
      // Handle the error appropriately.
    }
  }, []);


  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Application Type</TableCell>
            <TableCell className="tableCell">Customer Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            // Display a loading indicator, e.g., a spinner or message
            <TableRow>
              <TableCell colSpan={5} className="tableCell">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            // Map over the forms data when it's available
            forms.slice(0, 5).map((formData, index) => (
              <TableRow key={index}>
                <TableCell className="tableCell">{formData.formType.toUpperCase()} COPYRIGHT</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {formData.form1.name}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{formData.form1.mail}</TableCell>
                <TableCell className="tableCell">{new Date(formData.date).toLocaleDateString()}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status`}>In Progress</span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;