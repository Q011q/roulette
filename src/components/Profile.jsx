import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserName, setApplicationStatus } from '../store/ortSlice';
import Header from './Header';

const Profile = () => {
    const { user, points, hasApplication } = useSelector((state) => state.ortGame);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Локальный стейт для инпута имени
    const [nameInput, setNameInput] = useState(user);

    const handleSaveName = () => {
        if (nameInput.trim()) {
            dispatch(updateUserName(nameInput));
            alert('Имя успешно обновлено!');
        }
    };

    const handleDeleteApplication = () => {
        if (window.confirm('Вы уверены, что хотите отозвать заявку на поступление?')) {
            dispatch(setApplicationStatus(false));
        }
    };

    return (
        <div style={{ backgroundColor: '#1a1a2e', minHeight: '100vh', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '50px 20px' }}>
                <div style={{ background: '#16213e', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '500px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                    <h2 style={{ color: '#e94560', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Настройки профиля</h2>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Имя и Фамилия</label>
                        <input 
                            type="text" 
                            value={nameInput} 
                            onChange={(e) => setNameInput(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e94560', background: '#0f172a', color: '#fff', fontSize: '1rem' }}
                        />
                        <button onClick={handleSaveName} style={{ marginTop: '10px', background: '#e94560', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', width: '100%' }}>
                            Сохранить изменения
                        </button>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Баллы ОРТ (Изменение заблокировано)</label>
                        <input 
                            type="text" 
                            value={`${points} баллов`} 
                            disabled 
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #333', background: '#2a2a2a', color: '#888', fontSize: '1rem', cursor: 'not-allowed' }}
                        />
                    </div>

                    <div style={{ background: '#0f172a', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
                        <h3 style={{ marginBottom: '15px' }}>Статус заявки</h3>
                        {hasApplication ? (
                            <div>
                                <p style={{ color: '#4ade80', marginBottom: '15px' }}>✅ Заявка на рассмотрении комиссии.</p>
                                <button onClick={handleDeleteApplication} style={{ background: 'transparent', color: '#ff4d4f', border: '1px solid #ff4d4f', padding: '10px', borderRadius: '10px', width: '100%', cursor: 'pointer' }}>
                                    Удалить заявку (Отчислиться)
                                </button>
                            </div>
                        ) : (
                            <p style={{ color: '#aaa' }}>У вас нет активных заявок. Подайте её на главной странице.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;