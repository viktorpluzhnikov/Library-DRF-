import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js';
import BookList from './components/Books.js';
import AuthorBookList from './components/AuthorBook.js';
import axios from 'axios';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie';

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

        this.state = {
            'authors' : [],
            'books' : [],
            'token': ''
            }
     }

     set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
     }

     is_authenticated() {
        return this.state.token != ''
     }

     logout () {
        this.set_token('')          //удаляем токен для логаута
     }

     get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
     }

     get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: login, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный пароль'))
     }

     get_headers() {
        let headers = {
            'Content-type': 'application/json',
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token' + this.state.token
        }
        return headers
     }

    createBook(name, author) {
        const headers = this.get_headers()
        const data = {name: name, author: author}
        axios.post('http//127.0.0.1:8000/api/books/', data, {headers})
            .then(response => {
            let new_book = response.data
            const author = this.state.authors.filter((item) => item.id === new_book.author)[0]
            new_book.author = author
            this.setState({books: [...this.state.books, new_book]})
            }).catch(error => console.log(error))
    }

    deleteBook(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/books/${id}`, {headers})
            .then(response => {
                this.setState({books: this.state.books.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/authors/', {headers})
            .then(response => {
                const authors = response.data
                    this.setState(
                    {
                        'authors' : authors['results']
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/books/', {headers})
            .then(response => {
                const books = response.data
                    this.setState(
                    {
                        'books' : books['results']
                    }
                )
            }).catch(error => console.log(error))
    }


    componentDidMount() {
        this.get_token_from_storage()
        this.load_data()

    }



    render () {
        return (
            <div className='App'>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Authors</Link>
                            </li>
                            <li>
                                <Link to='/books'>Books</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path ='/' component={() => <AuthorList authors={this.state.authors} />} />
                        <Route exact path ='/books' component={() => <BookList items={this.state.books} deleteBook={(id)=>this.deleteBook(id)} />} />
                        <Route exact path ='/author/:id' component={() => <AuthorBookList items={this.state.books} />} />
                        //<Route path="/author/:id"> <AuthorBookList items={this.state.books} /> </Route>
                        <Route exact path ='/login' component={() => <LoginForm get_token={(login, password) => this.get_token(login, password)} />} />
                        <Redirect from ='/authors' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;

