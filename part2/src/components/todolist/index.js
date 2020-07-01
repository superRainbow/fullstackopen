import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from '../header';
import personsServer from '../../services/persons';

const Link = styled.a`
    color: red;
    margin-left: 20px;
`;

const TodoList = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');

  useEffect(() => {
    personsServer
      .getAll()
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const addPerson = { id: persons.length + 1,name: newName, number: newNumber };

      personsServer
        .add(addPerson)
        .then(response => {
            setPersons(persons.concat(response.data));
            setNewName('');
            setNewNumber('');
        });
    }
  };

  const remove = (event) => {
    const id = parseInt(event.target.dataset.id, 10);

    personsServer
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id));
      });
  };

  return (
    <div>
      <Header name='Phonebook' />
      <div>
        <p>filter name：<input value={filterName} onChange={handleFilterNameChange} /></p>
      </div>
      <Header name='add a New' />
      <div>
        <form onSubmit={addNote}>
          <div>name: <input value={newName} onChange={handleNameChange} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <Header name='Numbers' />
      <ul>
        {persons
          .filter((person) => person.name.includes(filterName))
          .map((person) =>
            <li key={person.id}>
              <span>{person.name}：</span>
              <span>{person.number}</span>
              <Link data-id={person.id} onClick={remove}>remove</Link>
            </li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
