import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'authors' : []
            }
     }

    componentDidMount() {
        const authors = [
            {
                'first_name': 'Fedor',
                'last_name' : 'Dostoevsky',
                'birthday_year': 1821
            },
            {
                'first_name': 'Alex',
                'last_name' : 'Grin',
                'birthday_year': 1880
            },
        ]
        this.setState(
            {
                'authors': authors
            }
        )
    }

    render () {
        return (
            <div>
                <AuthorList authors={this.state.authors} />
            </div>
        )
    }
}

export default App;

//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;