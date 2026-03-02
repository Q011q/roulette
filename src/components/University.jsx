import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { submitApplication } from '../store/ortSlice';
import Header from './Header'; 

const University = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, points, hasApplication } = useSelector((state) => state.ortGame);

    const [showModal, setShowModal] = useState(false);
    const [faculty, setFaculty] = useState('it');
    const [phone, setPhone] = useState('');
    const [motivation, setMotivation] = useState('');

    const handleApplySubmit = (e) => {
        e.preventDefault();
        dispatch(submitApplication({ faculty, phone, motivation }));
        setShowModal(false);
        alert('Заявка успешно подана! Вы можете отслеживать её в Профиле.');
    };

    return (
        <div style={styles.page}>
            <Header /> 
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={styles.title}>Университет Азарта и Удачи</h1>
                    
                    <img 
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="University" 
                        style={styles.image} 
                    />
                    
                    <p style={styles.text}>
                        Приветствуем, абитуриент <b>{user}</b>.<br/>
                        В вашем распоряжении <b>{points}</b> баллов ОРТ.
                    </p>
                    
                    <div style={styles.buttonsWrapper}>
                        <button 
                            style={hasApplication ? styles.buttonDisabled : styles.buttonStandard} 
                            onClick={() => !hasApplication && setShowModal(true)}
                            disabled={hasApplication}
                        >
                            {hasApplication ? ' ЗАЯВКА УЖЕ ПОДАНА' : ' ПОДАТЬ ОБЫЧНУЮ ЗАЯВКУ'}
                        </button>

                        <p style={styles.orText}>— ИЛИ —</p>

                        <button style={styles.buttonCasino} onClick={() => navigate('/game')}>
                            🤡 ПОСТУПИТЬ ЧЕРЕЗ РУЛЕТКУ
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalTitle}>Анкета абитуриента</h2>
                        <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            
                            <div>
                                <label style={styles.label}>Выберите факультет:</label>
                                <select value={faculty} onChange={(e) => setFaculty(e.target.value)} style={styles.input} required>
                                    <option value="it">Информационные Технологии</option>
                                    <option value="economy">Экономический факультет</option>
                                    <option value="law">Юридический факультет</option>
                                </select>
                            </div>

                            <div>
                                <label style={styles.label}>Контактный телефон:</label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+996..." style={styles.input} required />
                            </div>

                            <div>
                                <label style={styles.label}>Мотивационное письмо:</label>
                                <textarea value={motivation} onChange={(e) => setMotivation(e.target.value)} placeholder="Почему мы должны выбрать вас?..." rows="3" style={styles.input}></textarea>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                <button type="submit" style={styles.buttonSubmit}>Отправить</button>
                                <button type="button" onClick={() => setShowModal(false)} style={styles.buttonCancel}>Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    page: { 
        minHeight: '100vh', fontFamily: 'Montserrat, sans-serif'
    },
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', zIndex: 10, position: 'relative' },
    
    card: { 
        background: '#f7efdf', border: '6px solid #cbb291', borderRadius: '50px 20px 50px 20px', 
        padding: '45px', maxWidth: '600px', textAlign: 'center', color: '#3e332b', 
        boxShadow: '12px 18px 0 rgba(100, 75, 50, 0.3), 0 20px 30px rgba(90, 70, 50, 0.3)' 
    },
    title: { fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: '#3e332b', marginBottom: '20px', borderBottom: '2px solid #c9a87c', paddingBottom: '15px' },
    image: { width: '100%', height: '250px', objectFit: 'cover', borderRadius: '30px 10px 30px 10px', marginBottom: '25px', border: '4px solid #dcc9b0' },
    text: { fontSize: '1.1rem', color: '#6b5b4e', marginBottom: '30px', lineHeight: '1.6' },
    
    buttonsWrapper: { display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' },
    
    buttonStandard: { 
        background: '#c9a87c', color: '#2f2a24', border: 'none', padding: '16px 40px', 
        fontSize: '1.1rem', fontWeight: '700', borderRadius: '50px', cursor: 'pointer', 
        borderBottom: '6px solid #7a644b', width: '100%', fontFamily: 'Montserrat, sans-serif' 
    },
    buttonDisabled: { 
        background: '#dcc9b0', color: '#8b7a66', border: 'none', padding: '16px 40px', 
        fontSize: '1.1rem', fontWeight: '700', borderRadius: '50px', cursor: 'not-allowed', 
        borderBottom: '6px solid #b8a386', width: '100%' 
    },
    orText: { color: '#8b7a66', margin: '5px 0', fontSize: '0.9rem', fontStyle: 'italic' },
    buttonCasino: { 
        background: '#b76b5a', color: '#fff', border: 'none', padding: '16px 40px', 
        fontSize: '1.1rem', fontWeight: '700', borderRadius: '50px', cursor: 'pointer', 
        borderBottom: '6px solid #7a4e3e', width: '100%', fontFamily: 'Montserrat, sans-serif' 
    },
    
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(60, 40, 20, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
    modalContent: { background: '#f9f1e2', border: '8px solid #b8a386', padding: '35px', borderRadius: '40px 15px 40px 15px', width: '90%', maxWidth: '450px', boxShadow: '0 25px 0 #8f7b62, 0 35px 40px rgba(0,0,0,0.3)' },
    modalTitle: { fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', color: '#3e332b', marginBottom: '20px', textAlign: 'center' },
    label: { display: 'block', marginBottom: '5px', color: '#6b5b4e', fontSize: '0.95rem', fontWeight: '600' },
    input: { width: '100%', padding: '15px', borderRadius: '20px', border: '1px solid #dcc9b0', background: '#e7d9c5', color: '#3e332b', fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', marginBottom: '10px' },
    buttonSubmit: { background: '#c9a87c', color: '#2f2a24', border: 'none', padding: '15px', borderRadius: '30px', cursor: 'pointer', flex: 1, fontWeight: 'bold', borderBottom: '5px solid #7a644b' },
    buttonCancel: { background: '#dcc9b0', color: '#6b5b4e', border: 'none', padding: '15px', borderRadius: '30px', cursor: 'pointer', flex: 1, fontWeight: 'bold', borderBottom: '5px solid #b8a386' }
};

export default University;