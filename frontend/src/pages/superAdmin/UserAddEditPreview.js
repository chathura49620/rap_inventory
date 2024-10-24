import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const AddEditPreview = (props) => {
  const { type, open, setOpen, data, handleAddOrEdit } = props;

  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (type !== "add") {
      setFname(data.firstname);
      setLname(data.lastname);
      setEmail(data.email);
      setRole(data.role);
    } else {
      setFname("");
      setLname("");
      setEmail("");
      setRole("");
      setPassword("")
    }
  }, [data]);

  const handleSubmit = () => {
    let data1 = {
      id: (type !== 'add') ? data.id : undefined,
      firstname: fname,
      lastname: lname,
      email: email,
      role:role,
      password: type == 'add' && password
    };

    handleAddOrEdit(type, data1);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "40%",
          },
        }}
      >
        <DialogTitle>
          {type === "add"
            ? "Add New User"
            : type === "edit"
            ? "Edit User"
            : "Preview User"}
        </DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="First Name"
            label="First Name"
            variant="outlined"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            disabled={type === "preview"}
          />{" "}
          <br />
          <TextField
            id="Last Name"
            label="Last Name"
            variant="outlined"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            disabled={type === "preview"}
          />{" "}
          <br />
          <TextField
            id="Email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={type === "preview"}
          />{" "}
          <br />
          {type == 'add' &&
            <>
              <TextField
                id="Password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <br />
            </>
          }
          <FormControl fullWidth variant="outlined">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
              disabled={type === 'preview'}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="MANAGER">MANAGER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </Select>
          </FormControl>
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {type !== "preview" && (
            <Button onClick={handleSubmit}>
              {type === "add" ? "Add" : "Edit"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddEditPreview;
