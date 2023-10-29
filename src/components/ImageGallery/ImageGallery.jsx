import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul key={images.id} className={css.ImageGallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem
            image={image.webformatURL}
            id={image.id}
            key={image.id}
            onImageClick={() => onImageClick(image)}
          />
        );
      })}
    </ul>
  );
};
