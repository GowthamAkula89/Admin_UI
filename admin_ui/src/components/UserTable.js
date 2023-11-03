import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Container,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
const UserTable = ({
  users,
  selectedRows,
  onDelete,
  onEdit,
  onSelectRow,
  onSelectAll,
}) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const handleOnSelectAll = () => {
    if (selectAllChecked) {
      setSelectAllChecked(false);
      onSelectAll([]); // Deselect all users
    } else {
      setSelectAllChecked(true);
      onSelectAll(users.map((user) => user.id)); // Select all users
    }
  };

  const handleOnEditClick = (userId) => {
    setEditingRow(userId);
  };

  const handleOnSaveClick = (userId) => {
    setEditingRow(null);
  };

  const isRowEditing = (userId) => userId === editingRow;

  return (
    <TableContainer>
      {users.length === 0 ? (
        <Container>
          <h4>No results found</h4>
        </Container>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  onChange={handleOnSelectAll}
                  checked={selectAllChecked}
                />
              </TableCell>
              <TableCell>
                <h4>Name</h4>
              </TableCell>
              <TableCell>
                <h4>Email</h4>
              </TableCell>
              <TableCell>
                <h4>Role</h4>
              </TableCell>
              <TableCell>
                <h4>Action</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    onChange={() => onSelectRow(user.id)}
                    checked={selectedRows.includes(user.id)}
                  />
                </TableCell>
                <TableCell>
                  {isRowEditing(user.id) ? (
                    <TextField
                      type="text"
                      value={user.name}
                      onChange={(e) => onEdit(user.id, "name", e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {isRowEditing(user.id) ? (
                    <TextField
                      type="text"
                      value={user.email}
                      onChange={(e) => onEdit(user.id, "email", e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {isRowEditing(user.id) ? (
                    <TextField
                      type="text"
                      value={user.role}
                      onChange={(e) => onEdit(user.id, "role", e.target.value)}
                    />
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  {isRowEditing(user.id) ? (
                    <IconButton
                      aria-label="save"
                      size="large"
                      color="primary"
                      onClick={() => handleOnSaveClick(user.id)}
                    >
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="edit"
                      size="large"
                      color="primary"
                      onClick={() => handleOnEditClick(user.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="delete"
                    size="large"
                    color="error"
                    onClick={() => onDelete(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default UserTable;
