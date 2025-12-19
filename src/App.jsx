import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'; // Assumindo que você criou Filter.jsx
import PersonForm from './components/PersonForm'; // Assumindo que você criou PersonForm.jsx
import Persons from './components/Person'; // Assumindo que você criou Persons.jsx
import axios from 'axios';


const App = () => {

  

  // --- 1. ESTADO ---
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123456789', id: '1' },
  ]);
  const [newName, setNewName] = useState('');
  const [newContact, setNewContact] = useState('');
  const [search, setSearch] = useState('');


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
        console.log(response.data);
        console.log('Effect successful');
      });
  }, []);

  // --- 2. HANDLERS ---
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlContactChange = (e) => {
    setNewContact(e.target.value);
  };

  const addPessoa = (e) => {
    e.preventDefault();
    
    // Verificação de duplicidade (como estava comentado no seu código original)
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const PessoaObject = {
      name: newName,
      number: newContact,
      id: String(persons.length + 1),
    };

    setPersons(persons.concat(PessoaObject));
    setNewName('');
    setNewContact('');
  };

  // --- 3. LÓGICA DE FILTRAGEM ---
  // Filtra as pessoas com base no input de pesquisa (tanto por nome ou contacto)
  const personsToShow = persons.filter(person => 
    person.number.includes(search) || 
    person.newName.includes(search)
  );

  // --- 4. RENDERIZAÇÃO ---
  return (
    <div>
      <h2>Phonebook</h2>
      
      {/* Componente de Filtro */}
      <Filter 
        search={search} 
        handleSearchChange={handleSearchChange} 
      />

      <h2>Add a New</h2>
      
      {/* Componente de Formulário */}
      <PersonForm 
        addPessoa={addPessoa}
        newName={newName}
        handlNewNameChange={handlNewNameChange}
        newContact={newContact}
        handlContactChange={handlContactChange}
      />

      <h2>Numbers</h2>
      
      {/* Componente da Lista de Pessoas Filtrada */}
      <Persons 
        personsToShow={personsToShow} 
      />
      
    </div>
  );
};

export default App;
