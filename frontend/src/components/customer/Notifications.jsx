import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Fade } from '@mui/material';
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
        {notification.description}
      </Typography>
    </AccordionDetails>
  </Accordion>
}

export default function AccordionTransition(props) {
  const { expandAll } = props
  const notifications = [
    {
      id: 1,
      title: 'Your order #2459154 has been arrived',
      description: 'Shipment arrived to the given post office (Baththaramulla Main Post Office) at 15:23 p.m'
    },
    {
      id: 2,
      title: 'Your order #2459154 has been shipped',
      description: 'Shipment picked up from the pickup location (Colombo) by Amal Perera at 09:34 a.m'
    },
    {
      id: 3,
      title: 'Your order #4945684 has been shipped',
      description: 'Shipment picked up from the pickup location (Jaffna) by Kamal at 14:03 p.m'
    },
    {
      id: 4,
      title: 'Your order #4945684 has been booked',
      description: 'You have succesfully placed your order at 08.37 a.m'
    }
  ]

  return (
    <div>
      {notifications.map(notification =>
        <NotificationElm notification={notification} expandAll={expandAll} />
      )}
    </div>
  );
}
