import React from 'react';
import styles from '../styles/UserInfo.module.css'
const UserInfo = ({ user }) => {

    return (
        <div className={styles['user-info-container']}>
            <h2 className={styles['user-info-title']}>Информация о пользователе</h2>
            <div className={styles['user-info-item']}>
                <span className={styles['user-info-label']}>ФИО:</span>
                <span className={styles['user-info-value']}>{user.firstName + ' ' + user.maidenName + ' ' + user.lastName}</span>
            </div>
            <div className={styles['user-info-item']}>
                <span className={styles['user-info-label']}>Возраст:</span>
                <span className={styles['user-info-value']}>{user.age}</span>
            </div>
            <div className={styles['user-info-item']}>
                <span className={styles['user-info-label']}>Адрес:</span>
                <span className={styles['user-info-value']}>{user.address.city}, {user.address.address}</span>
            </div>
            <div className={styles['user-info-item']}>
                <span className={styles['user-info-label']}>Рост:</span>
                <span className={styles['user-info-value']}>{user.height}</span>
            </div>
            <div className={styles['user-info-item']}>
                <span className={styles['user-info-label']}>Вес:</span>
                <span className={styles['user-info-value']}>{user.weight}</span>
            </div>
            <div className={styles['user-info-item']}>
                <span className={styles['user-info-label']}>Номер телефона:</span>
                <span className={styles['user-info-value']}>{user.phone}</span>
            </div>
            <div className={styles['user-info-item']}>
                <span className={styles['user-info-label']}>Email:</span>
                <span className={styles['user-info-value']}>{user.email}</span>
            </div>
        </div>
    );

};

export default UserInfo;