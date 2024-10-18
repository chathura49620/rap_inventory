import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import '../common/common.css';

const Notifications = (props) => {
    const { list, refresh } = props;

    return (
        <div className='notify-body' style={{ width: '30%' }}>
            <div className='notify-header'>Notifications&nbsp;&nbsp;
                <Button variant='outlined' onClick={refresh}><RefreshIcon fontSize="small" /></Button>
            </div>

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
                        {data.request &&
                            <Button variant='outlined' onClick={() => window.location.href = `/request-vendor?id=${data}`}>Request More</Button>
                        }
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}

export default Notifications;