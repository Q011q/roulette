import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserName, removeApplication } from '../store/ortSlice';
import Header from './Header';

const Profile = () => {
    const { user, points, hasApplication, applicationData } = useSelector((state) => state.ortGame);
    const dispatch = useDispatch();
    const [nameInput, setNameInput] = useState(user);

    const handleSaveName = () => {
        if (nameInput.trim()) {
            dispatch(updateUserName(nameInput));
            alert('Личное дело обновлено!');
        }
    };

    const handleDeleteApplication = () => {
        if (window.confirm('Вы уверены, что хотите отозвать заявку на поступление? Документы будут возвращены.')) {
            dispatch(removeApplication()); 
        }
    };

    const getFacultyName = (value) => {
        switch(value) {
            case 'it': return 'Информационные Технологии';
            case 'economy': return 'Экономика';
            case 'law': return 'Юриспруденция';
            default: return value;
        }
    };

    return (
        <div style={{ minHeight: '100vh', fontFamily: 'Montserrat, sans-serif' }}>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '50px 20px', position: 'relative', zIndex: 10 }}>
                <div style={{ 
                    background: '#f7efdf', border: '6px solid #cbb291', borderRadius: '50px 20px 50px 20px', 
                    padding: '40px', width: '100%', maxWidth: '550px', 
                    boxShadow: '12px 18px 0 rgba(100, 75, 50, 0.3), 0 20px 30px rgba(90, 70, 50, 0.3)' 
                }}>
                    
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', color: '#3e332b', marginBottom: '25px', borderBottom: '2px solid #c9a87c', paddingBottom: '10px', textAlign: 'center' }}>
                        Личное дело
                    </h2>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#6b5b4e', fontWeight: '600' }}>Имя и Фамилия</label>
                        <input 
                            type="text" 
                            value={nameInput} 
                            onChange={(e) => setNameInput(e.target.value)}
                            style={{ width: '100%', padding: '15px', borderRadius: '30px', border: '1px solid #dcc9b0', background: '#e7d9c5', color: '#3e332b', fontSize: '1rem', fontFamily: 'Montserrat, sans-serif' }}
                        />
                        <button onClick={handleSaveName} style={{ marginTop: '15px', background: '#c9a87c', color: '#2f2a24', border: 'none', padding: '12px 20px', borderRadius: '30px', cursor: 'pointer', width: '100%', fontWeight: 'bold', borderBottom: '4px solid #7a644b' }}>
                            Внести правки
                        </button>
                    </div>

                    <div style={{ marginBottom: '35px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#6b5b4e', fontWeight: '600' }}>Баллы ОРТ (Печать комиссии)</label>
                        <input 
                            type="text" 
                            value={`${points} баллов`} 
                            disabled 
                            style={{ width: '100%', padding: '15px', borderRadius: '30px', border: '1px dashed #b8a386', background: '#dcc9b0', color: '#5a4a3c', fontSize: '1rem', cursor: 'not-allowed', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}
                        />
                    </div>

                    {/* Блок с заявкой */}
                    <div style={{ background: '#e7d9c5', padding: '25px', borderRadius: '30px 10px 30px 10px', border: '2px solid #dcc9b0' }}>
                        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#3e332b', marginBottom: '15px' }}>Статус поступления</h3>
                        
                        {hasApplication && applicationData ? (
                            <div>
                                <p style={{ color: '#2e7d32', marginBottom: '15px', fontWeight: '700' }}>📜 Заявка на рассмотрении ректората.</p>
                                
                                <div style={{ background: '#f9f1e2', padding: '15px 20px', borderRadius: '20px', marginBottom: '20px', fontSize: '0.95rem', color: '#6b5b4e', border: '1px solid #dcc9b0' }}>
                                    <p style={{ marginBottom: '8px' }}><b>Факультет:</b> {getFacultyName(applicationData.faculty)}</p>
                                    <p style={{ marginBottom: '8px' }}><b>Телефон:</b> {applicationData.phone}</p>
                                    {applicationData.motivation && (
                                        <p><b>Мотивация:</b> <i>"{applicationData.motivation}"</i></p>
                                    )}
                                </div>

                                <button onClick={handleDeleteApplication} style={{ background: 'transparent', color: '#b76b5a', border: '2px solid #b76b5a', padding: '12px', borderRadius: '30px', width: '100%', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}>
                                    ❌ Забрать документы (Удалить заявку)
                                </button>
                            </div>
                        ) : (
                            <p style={{ color: '#8b7a66', fontStyle: 'italic' }}>Папка пуста. Подайте прошение на главной странице.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;