import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import Products from './components/Products/Products'



function App() {

  //Se debe pasar en las props, una función al componente SearchBar para realizar la busqueda de
  //los productos, esta función la puse para que la recibiera el componente.
  //No cumple con su objetivo, por ahora.
  const searchAll = function(searchField){
    console.log("busqueda con el término: ",searchField);
  }
  return (
    <div className="App">

      <SearchBar/>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Products />

    </div>
  );
}

export default App;
