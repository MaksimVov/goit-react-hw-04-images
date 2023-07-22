import React, { Component } from 'react';
import Notiflix from 'notiflix';

import { ImageGallery } from './imageGallery/ImageGallery';
import { Searchbar } from './searchbar/Searchbar';
import { getImages } from 'services/getImages';
import { Button } from './button/Button';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    search: '',
    page: 1,
    isEmpty: false,
    showBtn: false,
  };

  handleFormSubmit = async search => {
    this.setState({
      search,
      isEmpty: false,
      page: 1,
      images: [],
      showBtn: false,
    });
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ isLoading: true });
      getImages(search, page)
        .then(({ hits: photos, totalHits: total_results }) => {
          if (photos.length === 0) {
            this.setState({ isEmpty: true });
            Notiflix.Notify.failure(
              `❌ Sorry, there ${search}  are no images matching your search query. Please try again.`
            );
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...photos],
            showBtn: page < Math.ceil(total_results / 12),
          }));
        })
        .catch(error => {
          this.setState({ isError: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, showBtn, isLoading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images && <ImageGallery children={images} />}
        {showBtn && <Button onClick={this.handleClick} />}
        {isLoading ? Notiflix.Loading.standard() : Notiflix.Loading.remove()}
      </div>
    );
  }
}
