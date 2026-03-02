import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/ortSlice';

const Registration = () => {
    const [name, setName] = useState('');
    const [ortScore, setOrtScore] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const score = Number(ortScore);
        
        // Небольшая валидация (в ОРТ обычно максимум 240+ баллов)
        if (!name || score < 10 || score > 250) {
            alert('Пожалуйста, введите корректное имя и балл ОРТ (от 10 до 250)');
            return;
        }

        // Диспатчим экшен в Redux
        dispatch(setUser({
            user: name,
            points: score
        }));

        // Перекидываем на страницу с колесом
        navigate('/university');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9f1e2' }}>
            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '20px', color: '#3e332b' }}>Приемная комиссия</h2>
                <p style={{ marginBottom: '20px', color: '#6b5b4e' }}>Введите свои данные, чтобы испытать удачу</p>
                
                <div style={{ marginBottom: '15px' }}>
                    <input 
                        type="text" 
                        placeholder="Ваше ФИО" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #c9a87c' }}
                        required
                    />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <input 
                        type="number" 
                        placeholder="Ваш балл ОРТ" 
                        value={ortScore}
                        onChange={(e) => setOrtScore(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #c9a87c' }}
                        required
                    />
                </div>
                
                <button type="submit" style={{ background: '#c9a87c', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
                    Внести баллы
                </button>
            </form>
        </div>
    );
};

export default Registration;