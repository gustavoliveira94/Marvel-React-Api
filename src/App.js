import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    characters: []
  }

  componentDidMount() {
    fetch('https://gateway.marvel.com:443/v1/public/characters?apikey=46ddcc696410797f092cd0b95e6dfc7c')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ characters: data.data.results });
      })
      .catch(error => {
        console.error("Não foi possível carregar a api.", error)
      })
  }

  render() {
    return (
      <div className="App">
        <h1 className="h1">© 2018 MARVEL</h1>
        <div className="container">
          <div className="row">
            {
              this.state.characters.map(character => {
                return (
                  <ul key={character.id} className="col-sm-12 col-md-6 col-lg-4 box-character">
                    <div className="card">
                      <img className="card-img-top" height="350px" src={character.thumbnail.path + "." + character.thumbnail.extension} />
                      <div className="card-body">
                        <h5 className="card-title">{character.name}</h5>
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#" + character.name.replace(/\W/g, '').replace(/[0-9]/g, '')} aria-expanded="false" aria-controls={character.name.replace(/\W/g, '').replace(/[0-9]/g, '')}>
                          Descrição do personagem
                        </button>
                        <div className="collapse" id={character.name.replace(/\W/g, '').replace(/[0-9]/g, '')}>
                          <p className="card-text">{character.description ? character.description : 'Um personagem da Marvel'}</p>
                        </div>
                        <a target="_blank" className="btn btn-primary" href={character.urls[0].url}>See all about this character</a>
                      </div>
                    </div>
                  </ul>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
