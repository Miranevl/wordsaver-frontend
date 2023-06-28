import "./style.css";


const DeleteSelectedWords = ({ checkboxOn, deleteWords , onClose}) => {
    return (
      <div className="d-flex align-items-center justify-content-center mt-3">
        {checkboxOn && (
          <div className="delete-word-menu-delete d-flex flex-column align-items-center justify-content-center">
            <button className="mb-2"onClick={deleteWords} >Удалить выбранные слова</button>
          </div>
        )}
      </div>
    );
  };
export default DeleteSelectedWords;