import "./style.css";

const AddDictionaryMenu = ({ onClose, handleChangeDictionary, newDictionary, onClick }) => {


  return (
    <div className="add-dictionary-menu-overlay">
      <div className="add-dictionary-menu d-flex flex-column align-items-center justify-content-center">
        <input
          className="input-add-dictionary"
          type="text"
          placeholder="Название словаря"
          onChange={handleChangeDictionary}
          value={newDictionary}
        />
        <button className="mt-3" onClick={onClick} >Добавить словарь</button>
        <button className="mt-1" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default AddDictionaryMenu;