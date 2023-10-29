import css from './Button.module.css';

export const Button = ({ text, click, disabled, isLoading }) => {
  return (
    <button type="button" onClick={click} 
    className={isLoading ? css.visuallyHidden : css.Button}
    disabled={disabled}>
      {disabled ? 'No more images' : text}
    </button>
  );
};
