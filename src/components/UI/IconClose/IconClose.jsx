import s from './IconClose.module.css'

export default function IconClose({ isAddPhoto = false, onClick }) {
    return (
        <svg
            className={`${s.svg} ${isAddPhoto && s.svgRotate}`}
            onClick={onClick}
            width="43"
            height="43"
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M31.8197 10.6066L10.6065 31.8198"
                stroke="#d9d9d9"
                strokeWidth="2"
            />
            <path
                d="M31.8197 31.8198L10.6065 10.6066"
                stroke="#d9d9d9"
                strokeWidth="2"
            />
        </svg>
    );
}
