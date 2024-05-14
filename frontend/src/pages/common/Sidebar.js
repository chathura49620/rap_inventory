import React, { useState , useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
  background: #1976d2;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #1976d2;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  @media only screen and (max-width: 1920px) {
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  }
  left: 0;
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    localStorage.setItem("isOpen","no");
  }, [])
  
  const showSidebar = () => {
    let isOpen =  localStorage.getItem("isOpen");
    if(isOpen === "no"){
      if(document.querySelector(".stock-body")){
        document.querySelector(".stock-body").style.marginLeft = "248px";
      }
      if(document.querySelector("#add_product_button")){
        document.querySelector("#add_product_button").style.marginLeft = "248px";
      }
      if(document.querySelector("#portal_title")){
        document.querySelector("#portal_title").style.marginLeft = "248px";
      }
      localStorage.setItem("isOpen","yes");
    }else{
      if(document.querySelector(".stock-body")){
        document.querySelector(".stock-body").style.marginLeft = "0px";
      }
      if(document.querySelector("#add_product_button")){
        document.querySelector("#add_product_button").style.marginLeft = "16px";
      }
      if(document.querySelector("#portal_title")){
        document.querySelector("#portal_title").style.marginLeft = "15px";
      }
      localStorage.setItem("isOpen","no");
    }
   
    setSidebar(!sidebar)
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <span id="portal_title" style={{ color: "#fff" , marginLeft: "15px" }}>Stock Management</span>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
