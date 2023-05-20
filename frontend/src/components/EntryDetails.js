import { Link } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntry } from '../store/entries/entriesSlice'

const EntryDetails = ({ entry }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleDelete = async () => {
    // User Validation: return if no user
    if (!user) return;

    // Authorization Headers: use user.token in headers Authorization to make authorized request
    dispatch(deleteEntry({ token: user.token, entry }));
  }

  return (
    <div className="entry-details">
      <p>{entry.store}</p>
      <p>{entry.item}</p>
      <p>${entry.totalCost}</p>
      <div className="entry-details-buttons">
        <Link to={'/edit-entry/' + entry._id}>
          <span className="material-symbols-outlined entry-details-button">edit</span>
        </Link>
        <span className="material-symbols-outlined entry-details-button" onClick={handleDelete}>delete</span>
      </div>
    </div>
  );
};

export default EntryDetails;