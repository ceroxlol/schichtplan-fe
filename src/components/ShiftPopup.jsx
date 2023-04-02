function ShiftPopup({ selectedShift, onClose }) {
    const [shift, setShift] = useState(selectedShift);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setShift((prevShift) => ({ ...prevShift, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: Handle form submission
      onClose();
    };
  
    const handleDelete = () => {
      // TODO: Handle shift deletion
      onClose();
    };
  
    return (
      <div className="popup">
        <div className="popup-content">
          <h3>{shift.id ? "Edit Shift" : "Add Shift"}</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Start Time:
              <input
                type="text"
                name="start"
                value={shift.start}
                onChange={handleInputChange}
              />
            </label>
            <label>
              End Time:
              <input
                type="text"
                name="end"
                value={shift.end}
                onChange={handleInputChange}
              />
            </label>
            <div className="popup-buttons">
              <button type="submit">{shift.id ? "Save" : "Add"}</button>
              {shift.id && (
                <button type="button" onClick={handleDelete}>
                  Delete
                </button>
              )}
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }