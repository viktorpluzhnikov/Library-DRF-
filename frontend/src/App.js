import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import BookList from './components/Books.js'
import AuthorBookList from './components/AuthorBook.js'
import axios from 'axios'
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу `{location.pathname}` не найдена</h1>
        </div>
    )
}

class App extends React.Component {

    constructor(props) {
        super(props)

        const author1 = {id : 1, first_name : 'Grin', birthday_year : 1880}
        const author2 = {id : 2, first_name : 'Pushkin', birthday_year : 1799}
        const authors = [author1, author2]

        const book1 = {id : 1, name : 'Паруса', author : author1}
        const book2 = {id : 2, name : 'Злотая цепь', author : author1}
        const book3 = {id : 3, name : 'Пиковая дама', author : author2}
        const book4 = {id : 4, name : 'Капитанская дочка', author : author2}
        const books = [book1, book2, book3, book4]

        this.state = {
            'authors' : authors,
            'books' : books,
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
            <div className='App'>
                <HashRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Authors</Link>
                            </li>
                            <li>
                                <Link to='/Books'>Books</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path ='/' component={() => <AuthorList authors={this.state.authors} />} />
                        <Route exact path ='/Books' component={() => <BookList items={this.state.books} />} />
                        <Route exact path ='/author/:id' component={() => <AuthorBookList items={this.state.books} />} />
                        <Redirect from ='/authors' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </HashRouter>
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