import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'; // Assumindo que você criou Filter.jsx
import PersonForm from './components/PersonForm'; // Assumindo que você criou PersonForm.jsx
import Persons from './components/Person'; // Assumindo que você criou Persons.jsx
import PersonServices from './services/persons'; // Serviço para lidar com requisições HTTP



const App = () => {

  // --- 1. ESTADO ---
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '123456789', id: '1' },
  // ]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newContact, setNewContact] = useState('');
  const [search, setSearch] = useState('');

  // --- 2. EFFECTS ---

 
  useEffect(() => {
    PersonServices.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);

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
       if (window.confirm(`${newName} is already added to phonebook. Do you want to update the contact number?`)) {
        //  PersonServices.updatePerson(persons.id, newContact);
        const existingPerson = persons.find(p => p.name === newName);
    
        // 2. Criar o novo objeto com o número atualizado
        const changedPerson = { ...existingPerson, number: newContact };
        PersonServices.updatePerson(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setNewName('');
            setNewContact('');
          });
       return;    
          
       }
    }

    const PessoaObject = {
      name: newName,
      number: newContact,
      id: String(persons.length + 1),
    };
    PersonServices.createPerson(PessoaObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewContact('');
    });
    
  };
  
  // --- 3. LÓGICA DE FILTRAGEM ---
  // Filtra as pessoas com base no input de pesquisa (tanto por nome ou contacto)
  const personsToShow = persons.filter(person => 
     person.number.includes(search) || 
     person.name.includes(search)
   );

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      PersonServices.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id));
    });
    }
  }

  // const personsToShow = persons.filter(person => { 
  //   const lowerCaseSearch = search.toLowerCase();
  //   return person.name.toLowerCase().includes(lowerCaseSearch) || 
  //          person.number.includes(search);
  // });

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
      {  <Persons 
        personsToShow={personsToShow} 
        deletePerson={deletePerson}
      /> }

    </div>
  );
};

export default App;
