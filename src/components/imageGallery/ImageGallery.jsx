import React, { Component } from 'react';
import styles from './ImageGallery.module.css';
import { Modal } from 'components/modal/Modal';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    openModal: false,
    imageUrl: '',
  };

  handleOpenModal = url => {
    this.setState({ openModal: true, imageUrl: url });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false, imageUrl: '' });
  };

  render() {
    const { children } = this.props;
    const { openModal, imageUrl } = this.state;

    return (
      <div>
        <ul className={styles.ImageGallery}>
          {children.map(({ webformatURL, largeImageURL, id, alt }) => (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              modalImg={largeImageURL}
              tags={alt}
              handleOpenModal={this.handleOpenModal}
            />
          ))}
        </ul>

        {openModal && (
          <Modal
            imageUrl={imageUrl}
            closeModal={this.handleCloseModal}
            handleKeyPress={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
