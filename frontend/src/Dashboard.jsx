import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';




class Dashboard extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            superAdmin: false
        }
        this.renderSideNavigation = this.renderSideNavigation.bind(this);
        this.renderDashboard = this.renderDashboard.bind(this);
    }

    // renderSideNavigation(){
    //     const user_role = localStorage.getItem('user_role');
    //     const is_login = localStorage.getItem('is_login');
    //     if(is_login != '1'){
    //             return false;
    //     }else{
    //         if(user_role == 'employee'){
    //             return (
                     
    //             );
    //         }
    //         if(user_role == 'stock member'){
    //             return (
                    
    //             );
    //         }
    //         if(user_role == 'production team member'){
    //             return (
                   
    //             );
    //         }
    //         if(user_role == 'Super Admin'){
    //             return (
                    
    //             );
    //         }if(user_role == 'finance team member'){
    //             return (
                     
    //             );
    //         }else{
    //             return false;
    //         }
    //     }
    // }



    // renderDashboard(){
    //     const user_role = localStorage.getItem('user_role')
    //     const is_login = localStorage.getItem('is_login')
    //     if(is_login != '1'){
    //         return (
    //             <div>
    //                 <Route path= '/' exact component={login} />
    //             </div>
    //         );
    //     }else{
    //         if(user_role == 'employee'){
    //             return (
    //                 <div>
    //                     <Route path= '/' exact component={} />
    //                 </div>
    //             );
    //         }if(user_role == 'vendor'){
    //             return (
    //                 <div>
                       
    //                 </div>
    //             );
    //             }if(user_role == 'cutomer'){
    //                 return (
    //                     <div>
                           
    //                     </div>
    //                 );
    //             }if(user_role == 'super Admin'){
    //                 return (
    //                     <div>
                           
    //                     </div>
    //                 );
    //             }else{
    //             return false;
    //         }
    //     }
    // }

    render(){
       return(
           <div>
            Dashboard Renderd
                 {/* {this.renderSideNavigation()}
                 {this.renderDashboard()} */}
           </div> 
       );
    }
}

export default Dashboard;
