import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const { user, points } = useSelector((state) => state.ortGame);

    return (
        <header style={styles.header}>
            <div style={styles.logo} onClick={() => navigate('/university')}>
                📜 ГУАУ
            </div>
            <div style={styles.userInfo}>
                
                <button 
                    style={styles.profileBtn} 
                    onClick={() => navigate('/profile')}
                    onMouseOver={(e) => e.target.style.background = '#e7d9c5'}
                    onMouseOut={(e) => e.target.style.background = 'transparent'}
                >
                    👤 Профиль ({user})
                </button>
            </div>
        </header>
    );
};

const styles = {
    header: { 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 40px', background: '#f7efdf', borderBottom: '6px solid #cbb291', 
        fontFamily: 'Montserrat, sans-serif', boxShadow: '0 10px 20px rgba(90, 70, 50, 0.1)' 
    },
    logo: { 
        fontSize: '2rem', fontWeight: 'bold', cursor: 'pointer', color: '#b76b5a', 
        fontFamily: 'Cormorant Garamond, serif' 
    },
    userInfo: { display: 'flex', alignItems: 'center', gap: '20px' },
    points: { 
        color: '#a0522d', fontWeight: 'bold', background: '#f3eadb', 
        padding: '8px 20px', borderRadius: '30px', border: '2px solid #dbb68c' 
    },
    profileBtn: { 
        background: 'transparent', color: '#3e332b', border: '2px solid #c9a87c', 
        padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', 
        transition: '0.2s ease', fontWeight: '600', fontFamily: 'Montserrat, sans-serif'
    }
};

export default Header;