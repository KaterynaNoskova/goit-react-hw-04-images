import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, image, onImageClick }) => {
  return (
    <li className={css.ImageGalleryItem} key={id} onClick={() => onImageClick(id)}>
      <img className={css.ImageGalleryItemImage} src={image} alt="Img" />
    </li>
  );
};
