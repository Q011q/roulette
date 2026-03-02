import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const { user, points } = useSelector((state) => state.ortGame);

    return (
        <header style={styles.header}>
            <div style={styles.logo} onClick={() => navigate('/university')}>
                🎓 ГУАУ
            </div>
            <div style={styles.userInfo}>
                <span style={styles.points}>{points} ОРТ</span>
                <button style={styles.profileBtn} onClick={() => navigate('/profile')}>
                    👤 Профиль ({user})
                </button>
            </div>
        </header>
    );
};

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#16213e', borderBottom: '2px solid #e94560', color: '#fff', fontFamily: 'Montserrat, sans-serif' },
    logo: { fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', color: '#e94560' },
    userInfo: { display: 'flex', alignItems: 'center', gap: '20px' },
    points: { color: '#ffd700', fontWeight: 'bold' },
    profileBtn: { background: 'transparent', color: '#fff', border: '1px solid #e94560', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', transition: '0.2s' }
};

export default Header;