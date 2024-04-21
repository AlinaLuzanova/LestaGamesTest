import React, { FC } from 'react';
import styles from './style.module.less';

interface ProgressBarProps {
    value: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ value }) => {
    const widthPercentage = (value / 11) * 100;

    return (
        <div className={styles.progressBarWrapper}>
            <div className={styles.progressBar} style={{ width: `${widthPercentage}%` }}>level</div>
        </div>
    );
}

export default React.memo(ProgressBar);
