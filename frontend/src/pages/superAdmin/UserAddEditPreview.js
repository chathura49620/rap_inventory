import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const AddEditPreview = (props) => {
  const { type, open, setOpen, data, handleAddOrEdit } = props;

  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [type1, setType1] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    if (type !== "add") {
      setFname(data.f_name);
      setLname(data.l_name);
      setPhone(data.phone);
      setType1(data.type);
      setEmail(data.email);
      setAddress(data.address);
      setRole(data.role);
    } else {
      setFname("");
      setLname("");
      setPhone("");
      setType1("");
      setEmail("");
      setAddress("");
      setRole("");
    }
  }, [data]);

  const handleSubmit = () => {
    let data1 = {
      id: (type !== 'add') ? data.id : undefined,
      f_name: fname,
      l_name: lname,
      type: type1,
      phone: phone,
      email: email,
      address: address,
      role:role,
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
            id="Phone"
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <TextField
            id="Address"
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={type === "preview"}
          />{" "}
          <br />
          <TextField
            id="Role"
            label="Role"
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={type === "preview"}
          />{" "}
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
