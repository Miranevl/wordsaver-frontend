import "./style.css";

const UserWordsList = (props) => {
  const handleCheckboxChange = () => {
    props.getOneWord(props._id); // Используйте _id вместо индекса
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="user-words-block d-flex justify-content-center align-items-center mt-4">
            {props.showCheckbox ? (
                <input
                className="col"
                  type="checkbox"
                  checked={props.selectedCheckbox.includes(props._id)} // Используйте _id
                  onChange={handleCheckboxChange}
                />
            ) : (
              <div className="col">{props.serialNumber}</div>
            )}
            <div className="col">{props.textOne}</div>
            <div className="col">{props.textTwo}</div>
            <div className="col">{props.textThree}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWordsList;
