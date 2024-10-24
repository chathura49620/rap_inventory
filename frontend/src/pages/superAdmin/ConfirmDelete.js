import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmDelete = (props) => {

    const { open, setOpen, delete1, data } = props;

    const handleYes = () => {
        delete1();
        setOpen(false);
    };

    const handleNo = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete Product"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>Are you sure you want to delete this product?<br />
                            <ul>
                                <li>{`${data.id} - ${data.firstname} ${data.lastname} / ${data.role} (${data.email})`}</li>
                            </ul>
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>No</Button>
                    <Button onClick={handleYes} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ConfirmDelete;
