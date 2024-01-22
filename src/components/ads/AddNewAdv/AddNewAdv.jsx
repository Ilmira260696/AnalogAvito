import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import s from './AddNewAdv.module.css';
import IconClose from '../../UI/IconClose/IconClose';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {
    useAddNewAdvTextMutation,
    useUploadImageAdvMutation,
} from '../../../serviceQuery/adv';

export default function AddNewAdv({ setActive, mobile = false }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [postNewAdvText] = useAddNewAdvTextMutation();
    const [postImageAdv] = useUploadImageAdvMutation();
    const [images, setImages] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorFieled, setErrorFieled] = useState('');

    const handleCloseClick = () => {
        setActive(false);
        setImages([]);
        setTitle('');
        setDescription('');
        setPrice('');
        setErrorFieled('');
    };

    useEffect(() => {
        if (title || description || price || images.length > 0) {
            setIsDisabled(false);
        }
    }, [title, description, price, images]);

    const removeImage = (index) => {
        const filterImages = images.filter((_, i) => i !== index);

        setImages(filterImages);
    };

    const addNewAdv = async () => {
        if (!title || !price) {
            setErrorFieled('Поле не может быть пустым');
            return;
        }
        try {
            const response = await postNewAdvText({
                title,
                description,
                price,
            });

            if (images.length > 0) {
                images.forEach(async (image) => {
                    await postImageAdv({ image, id: response.data.id });
                });
            }

            setActive(false);
            setIsDisabled(true);
            toast.success('Объявление создано!');
            navigate('/profile');
            setImages([]);
            setTitle('');
            setDescription('');
            setPrice('');
        } catch (error) {
            toast.error(error.message, { className: s.error });
        }
    };

    return (
        <div className={s.wrapper}>
            <div className={s.block}>
                <h2 className={s.title}>Новое объявление</h2>
                <IconClose onClick={() => handleCloseClick()} />
            </div>
            <form className={s.form}>
                <div
                    className={`${s.formBlock} ${
                        !title && errorFieled && s.errorFieledBlock
                    }`}
                >
                    <label
                        htmlFor={mobile ? 'nameAdvMob' : 'nameAdv'}
                        className={s.name}
                    >
                        Название
                    </label>
                    <Input
                        classes="areaAdv"
                        type="text"
                        name="name"
                        value={title}
                        placeholder="Введите название (обязательно)"
                        id={mobile ? 'nameAdvMob' : 'nameAdv'}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {!title && errorFieled && (
                        <p className={s.errorFieledText}>{errorFieled}</p>
                    )}
                </div>
                <div className={s.formBlock}>
                    <label className={s.name}>Описание</label>
                    <textarea
                        className={s.areaAdv}
                        type="text"
                        name="text"
                        cols="auto"
                        rows="10"
                        value={description}
                        placeholder="Введите описание"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className={s.formImg}>
                    <p className={s.formText}>
                        Фотографии товара <span>не более 5 фотографий</span>
                    </p>
                    <div className={s.formBarImg}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <div key={Math.random()} className={s.divImg}>
                                {images[index] ? (
                                    <>
                                        <img
                                            key={Math.random()}
                                            src={URL.createObjectURL(
                                                images[index],
                                            )}
                                            alt="adv"
                                        />
                                        <label
                                            className={s.labelRemove}
                                            onClick={() => removeImage(index)}
                                        >
                                            <IconClose />
                                        </label>
                                    </>
                                ) : (
                                    <label
                                        htmlFor={
                                            mobile
                                                ? `fileAdvMob${index}`
                                                : `fileAdv${index}`
                                        }
                                    >
                                        <IconClose isAddPhoto />
                                    </label>
                                )}
                                <Input
                                    type="file"
                                    accept="image/*, .png, .jpg, .gif, .web, .jpeg"
                                    multiple
                                    id={
                                        mobile
                                            ? `fileAdvMob${index}`
                                            : `fileAdv${index}`
                                    }
                                    onChange={(e) => {
                                        setImages([
                                            ...images,
                                            e.target.files[0],
                                        ]);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={`${s.formBlock} ${s.blockPrice} ${
                        !price && errorFieled && s.errorFieledBlock
                    }`}
                >
                    <label
                        htmlFor={mobile ? 'rubMob' : 'rub'}
                        className={s.name}
                    >
                        Цена
                    </label>
                    <div className={s.iconRubDiv}>
                        <Input
                            classes="areaAdvPrice"
                            type="number"
                            name="name"
                            value={price}
                            id={mobile ? 'rubMob' : 'rub'}
                            placeholder="Цена"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {!price && errorFieled && (
                        <p className={s.errorFieledText}>{errorFieled}</p>
                    )}
                </div>
                <Button
                    classes="btnAdv"
                    isDisabled={isDisabled}
                    onClick={() => addNewAdv()}
                >
                    Опубликовать
                </Button>
            </form>
        </div>
    );
}
