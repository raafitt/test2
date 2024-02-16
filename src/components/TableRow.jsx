import React from 'react';
import styles from '../styles/table.module.css'
const TableRow = ({ user, setVisible, setUserIndex, index }) => {
    return (
        <tr>
            <td style={{ cursor: 'pointer' }} onClick={() => { setVisible(true); setUserIndex(index) }} className={styles.td}>{user.firstName + ' ' + user.maidenName + ' ' + user.lastName}</td>
            <td className={styles.td}>{user.age}</td>
            <td className={styles.td}>{user.gender}</td>
            <td className={styles.td}>{user.phone}</td>
            <td className={styles.td}>{user.address.city + '. ' + user.address.address}</td>
        </tr>
    );
};

export default TableRow;