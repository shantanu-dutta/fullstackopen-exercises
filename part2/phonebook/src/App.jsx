import { useEffect, useState } from "react";

import personsService from "./services/persons";

import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value.toLocaleLowerCase());
  }

  function addNewContact(e) {
    e.preventDefault();

    const person = persons.find(
      (person) =>
        person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    if (person) {
      const shouldUpdatePerson = window.confirm(
        `${person.name} is already added to the phonebook, replace the old number with a new one?`
      );

      if (!shouldUpdatePerson) {
        return;
      }

      const newPersonObj = {
        ...person,
        number: newNumber,
      };

      personsService
        .update(person.id, newPersonObj)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id === person.id ? returnedPerson : p))
          );
          setNewName("");
          setNewNumber("");

          setSuccessMessage(`Successfully updated ${returnedPerson.name}.`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information on ${newPersonObj.name} has already been removed from the server.`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });

      return;
    }

    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

    personsService.create(newPersonObj).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`Successfully added ${returnedPerson.name}.`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  }

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const isRemoveConfirmed = window.confirm(
      `Are you sure want to remove ${person.name}?`
    );
    if (!isRemoveConfirmed) {
      return;
    }
    personsService.remove(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id));
      setSuccessMessage(`Successfully removed ${person.name}.`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };

  const filteredPersons = searchTerm
    ? persons.filter((person) =>
        person.name.toLocaleLowerCase().includes(searchTerm)
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      {successMessage ? (
        <Notification type="success" message={successMessage} />
      ) : errorMessage ? (
        <Notification type="error" message={errorMessage} />
      ) : null}

      <Filter searchTerm={searchTerm} onChange={handleSearchTermChange} />

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addNewContact}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onRemove={removePerson} />
    </div>
  );
};

export default App;
