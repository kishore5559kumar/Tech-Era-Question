import {Switch, Route} from 'react-router-dom'

import './App.css'

import Home from './component/Home'

import CourseItemDetails from './component/CourseItemDetails'

import NotFound from './component/NotFound'

import Header from './component/Header'

// Replace your code here
const App = () => (
  <div className="app-container">
    <div className="responsive-container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/courses/:id" component={CourseItemDetails} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
)

export default App
