import { useState, useEffect } from 'react';
import { Link, Accordion, AccordionSummary, AccordionDetails, Typography, Fade } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NotificationElm = (props) => {
  const { notification, expandAll } = props
  const [expanded, setExpanded] = useState(expandAll || false);
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return <Accordion
    expanded={expanded}
    onChange={handleExpansion}
    slots={{ transition: Fade }}
    slotProps={{ transition: { timeout: 400 } }}
    sx={{
      '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
      '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id={notification.id}
    >
      <Typography>{notification.title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        <Link href={notification.url}>
          {notification.description}
        </Link>
      </Typography>
    </AccordionDetails>
  </Accordion>
}

export default function AccordionTransition(props) {
  const { expandAll } = props
  const lsNotifications = JSON.parse(localStorage.getItem('notifications')) || []
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (lsNotifications) setNotifications(lsNotifications)
  }, [lsNotifications])

  return (
    <div>
      {notifications.map(notification =>
        <NotificationElm notification={notification} expandAll={expandAll} />
      )}
    </div>
  );
}
