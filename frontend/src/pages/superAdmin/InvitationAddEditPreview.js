import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const InvitationAddEditPreview = (props) => {
  const { type, open, setOpen, data, handleAddOrEdit } = props;

  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [receiver, setReceiver] = React.useState("");
  const [sender, setSender] = React.useState("");

  React.useEffect(() => {
    if (type !== "add") {
      setSubject(data.subject);
      setMessage(data.message);
      setReceiver(data.receiver);
      setSender(data.sender);
    } else {
      setSubject("");
      setMessage("");
      setReceiver("");
      setSender("");
    }
  }, [data]);

  const handleSubmit = () => {
    let data1 = {
      id: (type !== 'add') ? data.id : undefined,
      subject: subject,
      message: message,
      receiver: receiver,
      sender: sender,
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
            ? "Add New Invitation"
            : type === "edit"
            ? "Edit Invitation"
            : "Preview Invitation"}
        </DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="Subject"
            label="Subject"
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={type === "preview"}
          />{" "}
          <br />
          <TextField
            id="Message"
            label="Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={type === "preview"}
          />{" "}
          <br />
          <TextField
            id="Receiver"
            label="Receiver"
            variant="outlined"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            disabled={type === "preview"}
          />{" "}
          <br />
          <TextField
            id="Sender"
            label="Sender"
            variant="outlined"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
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

export default InvitationAddEditPreview;
