import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddStudent from './pages/AddStudent';
import Student from './pages/Student';
import EditStudent from './pages/EditStudent';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Student} />
        <Route path='/add-student' component={AddStudent} />
        <Route path='/edit-student/:id' component={EditStudent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
