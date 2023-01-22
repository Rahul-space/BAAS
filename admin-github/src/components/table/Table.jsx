import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { Link,Navigate } from "react-router-dom";

const List = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const [newUsers, setNewUsers] = useState([]);



  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(`/users/${user._id}/users`);
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  console.log(newUsers);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Picture</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Time</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newUsers.slice(0,10).map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={(row.profileImg)?row.profileImg :"https://static.wikia.nocookie.net/ben10/images/e/e3/Gwen_AF_Swimsuit_1.png/revision/latest?cb=20220414004328"} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.username}</TableCell>
              <TableCell className="tableCell">{row.createdAt.slice(0,10)}</TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.isVerified?"true":"false"}`}>{row.isVerified?"Active":"Locked"}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
