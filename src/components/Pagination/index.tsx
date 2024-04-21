import React, {FC} from 'react';

import style from './style.module.less';

type PaginationProps = {
    onNextPageClick: () => void;
    onPrevPageClick: () => void;
    disable: {
        left: boolean;
        right: boolean;
    };
    nav?: {
        current: number;
        total: number;
    };
};

const Pagination : FC<PaginationProps> = (props) => {
    const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

    const handleNextPageClick = () => {
        onNextPageClick();
    };
    const handlePrevPageClick = () => {
        onPrevPageClick();
    };

    return (
        <div className={style.paginator}>
            <button
                className={style.arrow}
                type="button"
                onClick={handlePrevPageClick}
                disabled={disable.left}
                style={{background:'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(2,54,73,1) 33%, rgba(2,54,73,0) 100%)'}}
            >
                {'<'}
            </button>
            {nav && (
                <span className={style.navigation} >
          {nav.current} / {nav.total}
        </span>
            )}
            <button
                className={style.arrow}
                type="button"
                onClick={handleNextPageClick}
                disabled={disable.right}
                style={{background:'linear-gradient(90deg, rgba(2,54,73,0) 0%, rgba(2,54,73,1) 33%, rgba(0,0,0,1) 100%)'}}
            >
                {'>'}
            </button>
        </div>
    );
};

export default React.memo(Pagination);