import React from 'react';
import styles from './style/Community.module.css';

const Community = () => {
    return (
        <div id="community" className={`${styles.communityContainer} relative`}>
            <div className={styles.overlay}></div>
            <div className={styles.lockIcon}>
            </div>
        </div>
    );
}

export default Community;
