import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import '../common/common.css';

const Notifications = (props) => {
    const { list } = props;

    return (
        <div className='notify-body' style={{ width: '30%' }}>
            <div className='notify-header'>Notifications</div>
            {list.map((data) => (
                <Accordion className='notify-card'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>{data.header}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {data.details}
                        </Typography>
                        <Button>Request More</Button>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}

export default Notifications;