import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startSpin, endSpin } from '../store/ortSlice';
import styles from './Game.module.css'; // Импорт как модуля

const Game = () => {
  const dispatch = useDispatch();
  const { user, points, isSpinning, status } = useSelector((state) => state.ortGame);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning || points < 10 || status !== 'applicant') return;

    dispatch(startSpin()); // Списываем 10 баллов

    // --- Симуляция Бэкенда (удали в проде) ---
    const roll = Math.random() * 100;
    let result = { prize: 'loss', points_change: 0, new_status: null, message: 'Проигрыш.' };
    let stopAngle = 0; // Сектор 1 (Ничего)

    if (roll <= 0.001) {
      result = { prize: 'budget', points_change: 0, new_status: 'student', message: 'БЮДЖЕТ! ПОЗДРАВЛЯЕМ!' };
      stopAngle = -36; // Сектор 2
    } else if (roll <= 2.001) {
      result = { prize: 'army', points_change: -points, new_status: 'soldier', message: 'ПОВЕСТКА! Игра окончена.' };
      stopAngle = -180; // Сектор 6
    } else if (roll <= 12.001) {
      result = { prize: '30_points', points_change: 30, message: 'Выигрыш 30 баллов!' };
      stopAngle = -144; // Сектор 5
    } else if (roll <= 32.001) {
      result = { prize: '20_points', points_change: 20, message: 'Выигрыш 20 баллов!' };
      stopAngle = -252; // Сектор 8
    } else if (roll <= 62.001) {
      result = { prize: '10_points', points_change: 10, message: 'Возврат 10 баллов.' };
      stopAngle = -288; // Сектор 9
    }
    // ----------------------------------------

    // Формула плавного вращения: (текущий_круг + 5 полных) + угол_остановки
    const newRotation = (Math.ceil(rotation / 360) * 360) + (360 * 5) + stopAngle;
    setRotation(newRotation);

    // Ждем анимацию (4.5сек)
    setTimeout(() => {
      dispatch(endSpin(result));
      alert(`${result.message}`);
    }, 4500);
  };

  return (
    <div className={styles.gameScene}>
      <div className={styles.pointsContainer}>
        Абитуриент: {user} <span>{points} 🪙 ОРТ</span>
      </div>

      <div className={styles.wheelWrapper}>
        <div className={styles.wheelPointer}></div>
        {/* Инлайн-стиль для динамического поворота */}
        <div 
          className={styles.wheel} 
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className={`${styles.wheelLabel} ${styles.lbl1}`}>Ничего</div>
          <div className={`${styles.wheelLabel} ${styles.lbl2}`}>БЮДЖЕТ</div>
          <div className={`${styles.wheelLabel} ${styles.lbl3}`}>Ничего</div>
          <div className={`${styles.wheelLabel} ${styles.lbl4}`}>Ничего</div>
          <div className={`${styles.wheelLabel} ${styles.lbl5}`}>30 Б</div>
          <div className={`${styles.wheelLabel} ${styles.lbl6}`}>ПОВЕСТКА</div>
          <div className={`${styles.wheelLabel} ${styles.lbl7}`}>Ничего</div>
          <div className={`${styles.wheelLabel} ${styles.lbl8}`}>20 Б</div>
          <div className={`${styles.wheelLabel} ${styles.lbl9}`}>10 Б</div>
          <div className={`${styles.wheelLabel} ${styles.lbl10}`}>Ничего</div>
        </div>
      </div>

      <button 
        className={styles.btnSpin} 
        onClick={handleSpin} 
        disabled={isSpinning || points < 10 || status !== 'applicant'}
      >
        {status === 'applicant' ? 'Попытать удачу (10 баллов)' : 'Игра окончена'}
      </button>
    </div>
  );
};

export default Game;