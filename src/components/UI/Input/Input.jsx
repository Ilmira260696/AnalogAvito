import s from './Input.module.css'

export default function Input({ classes, ...props }) {
    return <input className={s[classes]} {...props} />
}
