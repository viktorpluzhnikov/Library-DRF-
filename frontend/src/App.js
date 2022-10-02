import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import axios from 'axios'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'authors' : []
            }
     }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/authors')
            .then(response => {
                const authors = response.data
                    this.setState(
                    {
                        'authors' : authors
                    }
                )
            }).catch(error => console.log(error))
    }
//        const authors = [
//            {
//                'first_name': 'Fedor',
//                'last_name' : 'Dostoevsky',
//                'birthday_year': 1821
//            },
//            {
//                'first_name': 'Alex',
//                'last_name' : 'Grin',
//                'birthday_year': 1880
//            },
//        ]
//        this.setState(
//            {
//                'authors': authors
//            }
//        )
//    }

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