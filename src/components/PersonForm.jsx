// PersonForm.jsx

const PersonForm = ({ addPessoa, newName, handlNewNameChange, newContact, handlContactChange }) => {
  return (
    <form onSubmit={addPessoa}>
      <div>
        name: 
        <input 
          value={newName} 
          onChange={handlNewNameChange} 
        />
        <br />
        Contacto: 
        <input 
          value={newContact} 
          onChange={handlContactChange} 
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;