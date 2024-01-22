import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import s from './AdvSetting.module.css';
import IconClose from '../../UI/IconClose/IconClose';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {
    useUpdateAdvMutation,
    useUploadImageAdvMutation,
    useDeleteImageAdvMutation,
} from '../../../serviceQuery/adv';

export default function AdvSettings({ setActive, data }) {
    const [title, setTitle] = useState(data.title || '');
    const [description, setDescription] = useState(data.description || '');
    const [price, setPrice] = useState(data.price || '');
    const [patchAdv] = useUpdateAdvMutation();
    const [postImageAdv] = useUploadImageAdvMutation();
    const [deleteImageAdv] = useDeleteImageAdvMutation();

    const [imagesUploaded, setImagesUploaded] = useState([]);
    const [imagesDatabase, setImagesDatabase] = useState(data.images || []);
    const [imagesRemovedDatabase, setImagesRemovedDatabase] = useState([]);
    const [images, setImages] = useState([
        ...imagesDatabase,
        ...imagesUploaded,
    ]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorFieled, setErrorFieled] = useState('');

    useEffect(() => {
        if (
            title !== data.title ||
            description !== data.description ||
            price !== data.price ||
            imagesUploaded.length > 0 ||
            imagesRemovedDatabase.length > 0
        ) {
            setIsDisabled(false);
        }
    }, [title, description, price, imagesUploaded, imagesRemovedDatabase]);

    useEffect(() => {
        setImages([...imagesDatabase, ...imagesUploaded]);
    }, [imagesUploaded, imagesDatabase]);

    const handleCloseClick = () => {
        setActive(false);
        setErrorFieled(false);
    };

    const removeImage = (index) => {
        if (index < imagesDatabase.length) {
            const removedImage = imagesDatabase[index];
            // Добавляем удаленное изображение в новый массив
            setImagesRemovedDatabase((prevRemovedImages) => [
                ...prevRemovedImages,
                removedImage,
            ]);

            const filterImagesDtabase = imagesDatabase.filter(
                (_, i) => i !== index,
            );

            setImagesDatabase(filterImagesDtabase);
        } else {
            const newIndex =
                imagesDatabase.length === 0
                    ? index
                    : index - imagesDatabase.length;

            const filterImages = imagesUploaded.filter(
                (_, i) => i !== newIndex,
            );

            setImagesUploaded(filterImages);
        }
    };

    const updateAdv = async () => {
        if (!title || !price) {
            setErrorFieled('Поле не может быть пустым');
            return;
        }
        try {
            if (
                data.title !== title ||
                data.description !== description ||
                data.price !== price
            ) {
                await patchAdv({
                    title,
                    description,
                    price,
                    id: data.id,
                });
            }

            if (imagesUploaded.length > 0) {
                imagesUploaded.forEach(async (image) => {
                    await postImageAdv({ image, id: data.id });
                });
            }

            if (imagesRemovedDatabase.length > 0) {
                imagesRemovedDatabase.forEach(async (image) => {
                    await deleteImageAdv({ url: image.url, id: data.id });
                });
            }

            setActive(false);
            setIsDisabled(true);
            setErrorFieled('');
            toast.success('Объявление изменено!');
        } catch (error) {
            toast.error(error.message, { className: s.error });
        }
    };

    return (
        <div className={s.wrapper}>
            <div className={s.block}>
                <h2 className={s.title}>Редактировать объявление</h2>
                <IconClose onClick={() => handleCloseClick()} />
            </div>
            <form className={s.form}>
                <div
                    className={`${s.formBlock} ${
                        data.title !== title && s.active
                    }  ${!title && errorFieled && s.errorFieledBlock}`}
                >
                    <label htmlFor="nameAdvSettings" className={s.name}>
                        Название
                    </label>
                    <Input
                        classes="areaAdv"
                        type="text"
                        name="name"
                        value={title}
                        placeholder="Введите название (обязательно)"
                        id="nameAdvSettings"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {!title && errorFieled && (
                        <p className={s.errorFieledText}>{errorFieled}</p>
                    )}
                </div>
                <div
                    className={`${s.formBlock} ${
                        data.description !== description && s.active
                    }`}
                >
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
                                            src={
                                                images[index].id
                                                    ? `http://localhost:8090/${images[index].url}`
                                                    : URL.createObjectURL(
                                                          images[index],
                                                      )
                                            }
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
                                    <label htmlFor={`fileAdvSettings${index}`}>
                                        <IconClose isAddPhoto />
                                    </label>
                                )}
                                <Input
                                    type="file"
                                    accept="image/*, .png, .jpg, .gif, .web, .jpeg"
                                    multiple
                                    id={`fileAdvSettings${index}`}
                                    onChange={(e) => {
                                        setImagesUploaded([
                                            ...imagesUploaded,
                                            e.target.files[0],
                                        ]);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={`${s.formBlock} ${s.blockPrice}  ${
                        data.price !== price && s.active
                    } ${!price && errorFieled && s.errorFieledBlock}`}
                >
                    <label htmlFor="rubSettings" className={s.name}>
                        Цена
                    </label>
                    <div className={s.iconRubDiv}>
                        <Input
                            classes="areaAdvPrice"
                            type="number"
                            name="name"
                            id="rubSettings"
                            value={price}
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
                    onClick={() => updateAdv()}
                >
                    Сохранить
                </Button>
            </form>
        </div>
    );
}
