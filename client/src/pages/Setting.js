import React, { useState } from 'react';


function Settings() {
    
    const [newPassword, setNewPassword] = useState('');

    function handlePasswordReset() {
        // Handle password reset functionality
    }

    return (
        <div className='flex'>
         
            <div className="settings-container">
                <div className='setting_name'><h1 >SETTING</h1>
                </div>
                
               
                <div className='widjets'></div>
                <div className="settings-section">
                    <h3>Current Password</h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter current password"
                    />
                </div>
                <div className="settings-section">
                    <h3>New Password</h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </div>
                <div className="settings-section">
                    <h3>Confirm Password</h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter confirm password"
                    />
                    <button onClick={handlePasswordReset}>Reset Password</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;



