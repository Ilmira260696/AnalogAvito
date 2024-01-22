import s from './Button.module.css';

export default function Button({
    children,
    classes,
    onClick,
    isDisabled = false,
}) {
    return (
        <button
            type="button"
            className={`${s[classes]} ${isDisabled && s.disabled}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
}
