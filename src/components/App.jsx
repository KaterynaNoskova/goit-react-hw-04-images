import { useState, useEffect, useCallback } from 'react';
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

export function App() {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  const loadImages = useCallback(async (searchQuery, pageNumber) => {
    setIsLoading(true);
    try {
      const fetchedImages = await fetchImages(searchQuery, pageNumber);
      const {hits, totalHits} = fetchedImages;
      setTotalHits(totalHits);
      setImages(prevImages => [...prevImages, ...hits]);
    }catch (error){
      setError(error);
    }finally{
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (searchItem !== '' || page !== 1) {
      loadImages(searchItem, page);
    }
  }, [searchItem, page, loadImages]);

  useEffect(() => {
    if (images.length >= totalHits) {
      setAllImagesLoaded(true);
    } else {
      setAllImagesLoaded(false);
    }
  }, [images, totalHits]);

  const submit = searchQuery => {
    setSearchItem(searchQuery);
    setPage(1);
    setImages([]);
    setAllImagesLoaded(false);
    setSelectedImage(null);
  };

  const showMoreImages = () => {
    if (!allImagesLoaded) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const showSelectedImage = selectedImage => {
    setSelectedImage(selectedImage);
    toggleModal();
  };
    return (
      <ImageApp >
        <Searchbar onSubmit={submit} />
        {error && <p>Try more: {error.message}</p>}
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={showSelectedImage} />
        )}
        {isLoading && (<InfinitySpin width={200} color="pink" />)}
        {images.length > 0 && (
          <Button
            text="Load more"
            disabled={allImagesLoaded}
            click={showMoreImages}
            isLoading={isLoading}
          />
        )}
        {showModal && (
          <Modal onClick={toggleModal}>
            {selectedImage && (
              <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
            )}
          </Modal>
        )}
      </ImageApp>
    );
  }