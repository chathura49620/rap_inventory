import Notifications from "./../../components/customer/Notifications"
import { Typography } from '@mui/material';

const NotificationsPg = () => {
  return (
    <>
      <Typography gutterBottom variant="h5" style={{ marginBottom: 16 }}>
        Notifications
      </Typography>
      <Notifications expandAll={true} />
    </>
  )
}

export default NotificationsPg