import React from 'react';
import styles from './style/Community.module.css'; // Importăm CSS-ul specific

const CommunityMobile = () => {
    return (
        <div id="community" className={`${styles.communityContainer} relative pt-10`}>
            <div className={styles.overlay}></div>
            <div className={styles.lockIcon}>
            </div>
        </div>
    );
}

export default CommunityMobile;
