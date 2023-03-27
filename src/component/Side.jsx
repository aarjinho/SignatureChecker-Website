import { Link } from 'react-router-dom';
import React, { useState } from "react";
import "./Side.css";
import {Sidebar,Menu,MenuItem,useProSidebar} from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import {BsSearch} from "react-icons/bs"
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


function Side()  {
    const { collapseSidebar } = useProSidebar();
    const menucollapse = () => {
        if (menuCollapse) {
            setMenuCollapse(false);
        } else {
            setMenuCollapse(true);
        }
    };
    const [menuCollapse, setMenuCollapse] = useState(false);

//custom function that will change menucollapse state from false to true and true to false
const menuIconClick = () => {
//condition checking to change state from true to false and vice versa
menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
//calling collapseSidebar function from react-pro-sidebar module
collapseSidebar();
};

return (
            <>
            <div id="header">
                <Sidebar >
                <div className="logotext">
                </div>
                <div className="closemenu" onClick={menuIconClick}>
                {menuCollapse ? (<FiArrowRightCircle/> ) : (<FiArrowLeftCircle/>)}
                </div>
                <Menu iconShape="square">
                <MenuItem active={true} icon={<FiHome />} component={<Link to="/Acceuil" />} >Home
                </MenuItem>
                <MenuItem icon={<BsSearch />} component={<Link to="/Search" />}>Search</MenuItem>
                <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
                <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
                <MenuItem icon={<BiCog />}>Settings</MenuItem>
                </Menu>

                <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                </Menu>
            </Sidebar>

            </div>
            </>
    )
}

export default Side