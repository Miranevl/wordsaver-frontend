import './style.css'

const UserWords = ({ text, selectedItem, setSelectedItem, deleteIdDictionary, index, onClick }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="myWords d-flex justify-content-center mb-2" onClick={onClick}>
          {selectedItem === index && (
            <img
              className="img-delete"
              src="https://w7.pngwing.com/pngs/581/991/png-transparent-close-cancel-cross-delete-exit-remove-trash-web-icon.png"
              width={10}
              height={10}
              style={{ marginRight: 10, cursor: 'pointer', marginTop: 8 }}
              onClick={() => {
                setSelectedItem(null);
                deleteIdDictionary(index);
              }}
            />
          )}
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default UserWords;

