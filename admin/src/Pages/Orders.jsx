import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API_URL from '../../../serenesoil_fe/src/Config/api_url';
import { FaBoxArchive } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Orders = () => {
    const [orders, setOrders] = useState([])

    const navigate = useNavigate()
    useEffect(()=>{
      const token = localStorage.getItem('adminToken')
      if(!token){
        navigate('/')
      }
    },[])
    // ------------------------------fetch order---------------------------
    const fetchOrders = async()=>{
        try {
            const response = await axios.get(`${API_URL}/api/orders/allOrders`)
            // console.log(response)
            setOrders(response.data.allOrders)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{fetchOrders()},[])

    // --------------------------handle status change-------------------------
    const handleStatusChange = async(status, orderID)=>{
        // console.log(status, orderID)
        try {
            const response = await axios.post(`${API_URL}/api/orders/changeStatus`,{status:status, orderID:orderID})
            // console.log(response)
            fetchOrders()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='order add'>
            <h3 className='pageTitle'>Orders Page</h3>
            <div className="orderList">
                {orders&&orders.map((ele, index)=>(
                        <div key={index} className='orderItem'>
                            <div className="orderIcon">
                             <FaBoxArchive />
                            </div>
                            <p className="orderItemDetails">
                            {ele.items.map((ele2,index)=>{
                                if(index===ele.items.length - 1){
                                    return ele2.name + 'X' +ele2.quantity
                                }
                                else{
                                    return ele2.name + 'x' + ele2.quantity + ','
                                }
                            })}
                        </p>
                        <p className="orderedUserName">{ele.address.firstName + ' ' + ele.address.lastName}</p>
                        <div className="orderUserAddress">
                        <p>{ele.address.street+','}</p>
                        <p>{ele.address.city+', '+ele.address.state+', India -  '+ele.address.zipcode}</p>
                        </div>
                        <p className='orderUserPhone'>{ele.address.phone}</p>
                        <select name="Status" id="status" value={ele.status} onChange={(e)=>handleStatusChange(e.target.value,ele._id)}>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Out For Delivery">Out For Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Delivery Failed">Delivery Failed</option>
                        </select>
                        </div>
                        
                    )
                )}
            </div>
        </div>
    );
};

export default Orders;