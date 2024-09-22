import React from 'react';
import { IoMdAddCircleOutline  } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { FaBoxArchive } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        
        <div className='sidebar'>
            <div className="sidebarOptions">
                
                <NavLink to='/products' className="sidebarOption">
                    <div className="optionIcon">
                    <FaList />

                    </div>
                    <p>Products</p>
                </NavLink>
                <NavLink to='/orders' className="sidebarOption">
                    <div className="optionIcon">
                    <FaBoxArchive />

                    </div>
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;