import classNames from 'classnames';
import scss from './index.module.scss';

export default function Button({
  children,
  className,
  size = 'sm',
  color = 'green',
  borderColor,
  ...rest
}) {
  return (
    <button
      {...rest}
      className={classNames(
        scss.button,
        className,
        scss[`size-${size}`],
        scss[`color-${color}`],
        borderColor && scss[`borderColor-${color}`]
      )}
    >
      {children}
    </button>
  );
}
