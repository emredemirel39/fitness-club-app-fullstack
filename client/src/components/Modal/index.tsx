import React, { FC, ReactNode } from 'react';
import styles from './Modal.module.scss';

type Props = {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    children: ReactNode
};

const Modal: FC<Props> = ({modal, setModal, children}) => {
  return (
    <div onClick={() => setModal(false)} className={`${styles.modal} ${modal ? styles.modalActive : ''}`}>
        <div onClick={e => e.stopPropagation()} className={styles.modalInner}>
            {children}
        </div>
    </div>
  )
}

export default Modal