import React from 'react';
import styles from '../styles/MyModal.module.css'

const MyModal = ({ children, visible, setVisible, setUserIndex }) => {

    const rootClasses = [styles.myModal]
    if (visible) {
        rootClasses.push(styles.active)
    }

    return (
        <div className={rootClasses.join(' ')}
            onClick={() => { setVisible(false); setUserIndex(0) }}>
            <div className={styles.myModalContent}
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}



export default MyModal;