import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'api';
import { InfinitySpin } from 'react-loader-spinner';
import styled from "styled-components";


const ImageApp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export class App extends Component {
  state = {
    images: [],
    showModale: false,
    isLoading: false,
    searchItem: '',
    error: null,
    page: 1,
    allImagesLoad: false,
    selectImage: null,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { searchItem, page } = this.state;
    if (searchItem !== prevState.searchItem || page !== prevState.page) {
      this.loadImages(searchItem, page);
    }
  }
  submit = searchQuery => {
    this.setState({
      images: [],
      searchItem: searchQuery,
      page: 1,
      allImagesLoad: false,
      selectImage: null,
      totalHits: null,
    });
  };
  async loadImages(searchItem, page) {
    this.setState({ isLoading: true, showModale: false });
    try {
      const images = await fetchImages(searchItem, page);
      const { totalHits } = images;

      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        totalHits,
        allImagesLoad:
          prevState.images.length + images.hits.length >= totalHits,
      }));

      if (this.state.images === totalHits) {
        this.setState({ allImagesLoad: true })      
      }
      
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  showMoreImages = () => {
    if (!this.state.allImagesLoad) {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }));
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModale: !prevState.showModale,
    }));
  };

  backdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.toggleModal();
    }
  };

  showSelectedImage = selectedImage => {
    this.setState({ selectedImage });
    this.toggleModal();
  };
  render() {
    const { images, isLoading, error, allImagesLoad, showModale, selectImage } =
      this.state;
    return (
      <ImageApp >
        <Searchbar onSubmit={this.submit} />
        {error && <p>Try more: {error.message}</p>}
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.showSelectedImage} />
        )}
        {isLoading && (<InfinitySpin width={200} color="pink" />)}
        {images.length > 0 && (
          <Button
            text="Load more"
            disabled={allImagesLoad}
            click={this.showMoreImages}
            isLoading={isLoading}
          />
        )}
        {showModale && (
          <Modal onClick={this.backdropClick}>
            {selectImage && (
              <img src={selectImage.largeImageURL} alt={selectImage.tags} />
            )}
          </Modal>
        )}
      </ImageApp>
    );
  }
}
