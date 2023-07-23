import styles from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ imageUrl, closeModal, handleCloseModal }) => {
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.modal}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};
