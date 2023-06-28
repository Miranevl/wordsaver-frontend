
import "./style.css";

const AddWordMenu = ({ onClose, handleChangeWordToTranslate, handleChangeTranscription, handleChangeTranslatedWord, onClick }) => {
    return (
        <>
            <div className="add-word-menu-overlay">
                <div className="add-word-menu d-flex flex-column align-items-center justify-content-center">
                    <input className="input-add-word mt-1" type="text" placeholder="Введите слово на иностранном языке" onChange={handleChangeWordToTranslate} />
                    <input className="input-add-word mt-2" type="text" placeholder="Введите транскрипцию (опционально)" onChange={handleChangeTranscription} />
                    <input className="input-add-word mt-2" type="text" placeholder="Введить перевод слова" onChange={handleChangeTranslatedWord} />
                    <button className="mt-3" onClick={onClick}>Добавить в словарь</button>
                    <button className="mt-1" onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </>
    )
}

export default AddWordMenu;