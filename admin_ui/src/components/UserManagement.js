import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const rowsPerPage = 10;
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
        const response = await axios.get(url);
        setUsers(response.data);
        setFilteredData(response.data);
      } catch (err) {
        enqueueSnackbar("Fetching data failed", { variant: "error" });
      }
    };

    fetchData();
  }, []);
  
  const handleSearch = (searchValue) => {
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchValue)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
    if(filtered.length===0){
      enqueueSnackbar("Enter details not found",{variant:"error"});
    }
  };
  const deBounceSearch = (event, debounceTimeout) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimer);
    }
    const timer = setTimeout(() => {
      handleSearch(event.target.value);
    }, 500);
    setDebounceTimer(timer);
  };
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredData(updatedUsers);
  };
  const handleEdit = (id, property, newValue) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, [property]: newValue };
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredData(updatedUsers);
  };
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  const handleSelectAll = () => {
    if (selectedRows.length === visibleUsers.length) {
      setSelectedRows([]);
    } else {
      const allSelected = visibleUsers.map((user) => user.id);
      setSelectedRows(allSelected);
    }
  };
  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setFilteredData(updatedUsers);
    setSelectedRows([]);
  };

  const getTotalPages = () => Math.ceil(filteredData.length / rowsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleUsers = filteredData.slice(startIndex, endIndex);
  return (
    <Container>
      <div>
        <h1>Admin UI</h1>
        <TextField
          variant="outlined"
          label="Search"
          placeholder="Search by name, email or role"
          fullWidth
          onChange={(e) => deBounceSearch(e, debounceTimer)}
        />
        <UserTable
          users={visibleUsers}
          selectedRows={selectedRows}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
        />
        <br/>
        {visibleUsers.length !==0 && (
        <Box display={"flex"} justifyContent={"left"}>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
          >
            Delete Seleted
          </Button>
        </Box>
          )}
        <br/>
        <Box display={"flex"} justifyContent={"left"}>
          <Pagination
            users={visibleUsers}
            totalPages={getTotalPages()}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Box>
      </div>
    </Container>
  );
};
export default UserManagement;
