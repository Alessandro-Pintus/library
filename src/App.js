import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import Case from './components/Case';
import Footer from './components/Footer';


const App = () => {
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const api_key =process.env.REACT_APP_API_KEY;
  
  function setFocus(id) {
    document.getElementById(id).focus();
  }
  window.onload = () => {
    setFocus('focus')
  }

  const handleChange = (e) => {
    const book = e.target.value;
    setBook(book);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${api_key}&maxResults=40`
    )
    .then(data => {
      console.log(data.data.items);
      setResult(data.data.items); 
      setBook(''); 
    })
    .catch(err => {
      console.log(err.response);
    });
  }

  return (
    <div>
      <div className='container'>
        <h1 className='title'>Google Books Search</h1>
        <div className='search-space'>
          <form  onSubmit={handleSubmit}  className='search-form'>
            <input className='search-bar' id='focus' type="text" value={book} onChange={handleChange} placeholder='Inserisci il nome del libro' />
            <button  className='search-button' type='submit'>&#128269;</button>
          </form>
        </div>
      </div>
      <div className='content'>
        {result.map(book => (
          <div key={book.id}>
            <Case 
              image={book.volumeInfo.imageLinks === undefined ? '' : book.volumeInfo.imageLinks.thumbnail}
              title={book.volumeInfo.title === undefined ? 'No title' : book.volumeInfo.title}
              authors={book.volumeInfo.authors === undefined ? 'Undefined authors' : book.volumeInfo.authors}
              link={book.volumeInfo.infoLink === undefined ? () => () => alert('Undefined Link') : book.volumeInfo.previewLink}
            />
          </div>
        ))}
      </div>
      <Footer  />
    </div>
  );
}

export default App;