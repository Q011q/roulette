import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setApplicationStatus } from '../store/ortSlice';
import Header from './Header'; // Импортируем хедер

const University = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, points, hasApplication } = useSelector((state) => state.ortGame);

    const handleApply = () => {
        dispatch(setApplicationStatus(true));
        alert('Заявка успешно подана! Вы можете отслеживать её в Профиле.');
    };

    return (
        <div style={styles.page}>
            <Header /> {/* Добавили хедер сверху */}
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={styles.title}>Государственный Университет Азарта и Удачи (ГУАУ)</h1>
                    
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="University" style={styles.image} />
                    
                    <p style={styles.text}>Добро пожаловать, <b>{user}</b>! Ваш балл ОРТ: <b>{points}</b>.</p>
                    
                    <div style={styles.buttonsWrapper}>
                        {/* Кнопка стандартной подачи (CREATE) */}
                        <button 
                            style={hasApplication ? styles.buttonDisabled : styles.buttonStandard} 
                            onClick={handleApply}
                            disabled={hasApplication}
                        >
                            {hasApplication ? 'ЗАЯВКА УЖЕ ПОДАНА' : 'ПОДАТЬ ОБЫЧНУЮ ЗАЯВКУ'}
                        </button>

                        <p style={styles.orText}>— ИЛИ —</p>

                        {/* Переход в казино */}
                        <button style={styles.buttonCasino} onClick={() => navigate('/game')}>
                            ПОСТУПИТЬ ЧЕРЕЗ РУЛЕТКУ (Рискнуть баллами)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { backgroundColor: '#1a1a2e', minHeight: '100vh', fontFamily: 'Montserrat, sans-serif' },
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' },
    card: { background: '#16213e', borderRadius: '20px', padding: '40px', maxWidth: '700px', textAlign: 'center', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
    title: { color: '#e94560', marginBottom: '20px', fontSize: '2rem' },
    image: { width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px', marginBottom: '20px' },
    text: { fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px', color: '#e0e0e0' },
    buttonsWrapper: { display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' },
    buttonStandard: { background: '#2e7d32', color: '#fff', border: 'none', padding: '15px 40px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', width: '80%' },
    buttonDisabled: { background: '#555', color: '#aaa', border: 'none', padding: '15px 40px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '10px', cursor: 'not-allowed', width: '80%' },
    orText: { color: '#888', margin: '10px 0', fontSize: '0.9rem' },
    buttonCasino: { background: 'linear-gradient(45deg, #e94560, #ff007f)', color: '#fff', border: 'none', padding: '15px 40px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 0 20px rgba(233, 69, 96, 0.6)', transition: '0.3s', width: '90%' }
};

export default University;