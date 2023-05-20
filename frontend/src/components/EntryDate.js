import './css/EntryDate.css'
import EntryDetails from './EntryDetails';

const EntryDate = ({ date, entries }) => {
  date = new Date(date);
  date.setDate(date.getDate()+1);

  return (
    <div className="entry-date">
      <h4>{date.toLocaleString('en-US', {year: "numeric",month: "long",day: "numeric" })}</h4>
      <h3>{date.toLocaleString('en-US', {weekday: "long"})}</h3>
      <div className="columns">
        <p><strong>Store</strong></p>
        <p><strong>Item</strong></p>
        <p><strong>Total Cost</strong></p>
      </div>
      {entries.map((entry) => {
        return <EntryDetails key={entry._id} entry={entry}/>
      })}
    </div>
  )
};

export default EntryDate;