import React, { useState } from 'react';




export default function Notification() {
  
    return (
        <>
            <div className='home-container'>
                <div className="notification-container">
                    <div className="notification-cards">
                        <div className="notification-card">
               
                            <div className="card-description">
                                <h1>Title</h1>
                                <p>Tshirt was purchased</p>

                                
                            </div>
                            
                        </div>

                        {/* Additional notification cards here */}
                    </div>
                </div>
            </div>
        </>
    );
}
