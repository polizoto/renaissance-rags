import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import IntroPage from './pages/introPage';
import store from './utils/store';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Success from './pages/Success';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Nav from './components/Nav';
import Vendor from './pages/Vendor';
import OrderHistory from './pages/OrderHistory';
import Background from './components/Background';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="mycontainer">
        <Provider store={store}>
          <Nav id="b" />
          <Background id="c" />
          <Switch>
            <Route exact path="/" component={IntroPage} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/orderHistory" component={OrderHistory} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/costumes/:id" component={Detail} />
            <Route exact path="/vendors/:id" component={Vendor} />
            <Route exact path="/success" component={Success} />
            <Route component={NoMatch} />
          </Switch>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
