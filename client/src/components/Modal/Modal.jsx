import "./Modal.scss";
const Modal = ({ show, handleCancle, handleSuccess }) => {
  return (
    <div data-show={show} className="modal-overlay">
      <div className="modal">
        <div className="modal-head"> Are you sure?</div>
        <div className="modal-body">
          <p>Do you want to delete this item?</p>
          <span> This action can't be undone.</span>
        </div>
        <div className="modal-footer">
          <button onClick={handleSuccess} className="primary">
            Delete
          </button>
          <button onClick={handleCancle} className="error">
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
