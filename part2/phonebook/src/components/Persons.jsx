const Persons = ({ persons, onRemove }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => onRemove(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
