import { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntries } from '../store/entries/entriesSlice';

import './css/Home.css'

// components
import EntryDate from '../components/EntryDate'


const Home = () => {
  const dispatch = useDispatch();
  const { entries: currentEntries } = useSelector(state => state.entries);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchEntries({ token: user.token }));
  }, [dispatch, user.token]);
  
  // functions for sorting / filtering entries for display

  const getUniqueDates = () => {
    const uniqueDatesSet = new Set();
    currentEntries.forEach(entry => {
      let newDate = new Date(entry.date);
      uniqueDatesSet.add(newDate.toString());
    });

    let uniqueDates = [];
    uniqueDatesSet.forEach(date => {
      uniqueDates.push(date);
    })
    uniqueDates.sort((date1, date2) => new Date(date2)-new Date(date1));
    return uniqueDates;
  }

  const filterEntries = (date) => {
    const filteredEntries = currentEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.toString() === date;
    })
    return filteredEntries;
  }

  // rendered component

  return(
    <div className="home">
      <div className="entries">
        {currentEntries && getUniqueDates().map((date) => {
          return <EntryDate key={date} date={date} entries={filterEntries(date)}/>
        })}
      </div>
    </div>
  )
};

export default Home;