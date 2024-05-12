import React, { useEffect, useState } from 'react';
import SideNav from '../../../components/vendor/sideNav/Sidebar'

const Invoice = () => {
    
    return (
        <div>
            <SideNav />
            <div className='stock-body'>
                 <h1 style={{textAlign:"center"}}>Invoice</h1>
            </div>
            
        </div>
    )
}

export default Invoice;