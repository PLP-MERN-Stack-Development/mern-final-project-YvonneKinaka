import React, { useState, useEffect } from 'react';
import "./Results.css";
import Title from '../../Components/Title/Title';
import { Link, useLocation } from "react-router-dom";
import menu_icon from '../../assets/menu-icon.png';
import logo from '../../assets/logo.png';

const Result = () => {
    const location = useLocation();
    const { prediction } = location.state || {};
    
    const [mobileMenu, setMobileMenu] = useState(false);
    const toggleMenu = () => {
        setMobileMenu(prev => !prev);
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // Simulate a loading delay (e.g., fetching results)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000); // 4 seconds delay

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <div className="model_container">
                <Title subTitle={"Assess Your Cardiovascular Health in Seconds"} title='Heart Disease Risk Predictor' />
                <nav className={isMobile ? "" : "sidebar"}>
                    <img src={logo} alt='' className='logo' />
                    <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
                        <li><Link className='text' to='/home'>Home</Link></li>
                        <li><Link className='text' to='/model'>Predict</Link></li>
                        <li><Link className='text' to='/home'>Contact us</Link></li>
                    </ul>
                    <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu} />
                </nav>

                <div className="content">
                    {loading ? (
                        <p className="loading-text">⌛ Loading Results...</p>
                    ) : prediction !== undefined ? (
                        <div className={`result-card ${prediction === 1 ? "high-risk" : "low-risk"}`}>
                            {prediction === 1 ? (
                                <p className="high-risk-text">⚠️ High Risk of Cardiovascular Disease</p>
                            ) : (
                                <p className="low-risk-text">✅ Low Risk of Cardiovascular Disease</p>
                            )}
                        </div>
                    ) : (
                        <p className="error-text">❌ Error: No result available</p>
                    )}

                    <div className="result-actions">
                        <Link to="/model" className="btn">Go Back</Link>
                        <Link to="/" className="btn">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;
