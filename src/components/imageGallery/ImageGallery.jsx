import styles from './ImageGallery.module.css';
import { Modal } from 'components/modal/Modal';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { useState } from 'react';

export const ImageGallery = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleOpenModal = url => {
    setOpenModal(true);
    setImageUrl(url);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setImageUrl('');
  };

  return (
    <div>
      <ul className={styles.ImageGallery}>
        {children.map(({ webformatURL, largeImageURL, id, alt }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            modalImg={largeImageURL}
            tags={alt}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </ul>

      {openModal && (
        <Modal
          imageUrl={imageUrl}
          closeModal={handleCloseModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};
