import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API_URL from '../Config/api_url';


const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('authToken');

    // Fetching orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/orders/fetchOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(response.data.orders.reverse());
        } catch (error) {
            console.error(error);
            setError('Failed to fetch orders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

   

    if (loading) {
        return <div className="loading">Loading orders...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="myOrders">
            <h2>My Orders</h2>
            <div className="ordersContainer">
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="orderCard">
                            <div className="orderHeader">
                            <div className="orderDetails">
                                <h2> ₹{order.amount}</h2>
                                <br />  
                                <p><span className={`status ${order.status === 'Delivered' ? 'delivered' : 'notDelivered'}`}>{order.status}</span></p>
                                <br />
                                <p className='orderID'>Order ID: {order._id}</p>
                                <p>Ordered On: {new Date(order.date).toLocaleDateString()}</p>
                                <p>Delivery Address: {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipcode}</p>
                            </div>
                            <div className="orderItems">
                                <h4>Items:</h4>
                                <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>
                                            <div className="itemInfo">
                                                <img src={item.image} alt={item.name} className="itemImage" />
                                                <div>
                                                    <h4 className='orderItemTitle'>{item.name}</h4>
                                                    <p> Rs.{item.price} x {item.quantity}{item.quantity > 1?'nos':'no'}</p>
                                                    
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            </div>
                            
                            <br />
                            <br />
                            
                            
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;
