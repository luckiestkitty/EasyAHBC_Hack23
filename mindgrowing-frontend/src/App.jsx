import React from 'react';
import {useRoutes, Outlet} from 'react-router-dom'
import routes from './routes'
import './App.css'

function App() {
  const elements = useRoutes(routes)

  return (
    <div className="container">
      <Outlet/>
      
      {/* Adding Routes */}
      {elements}
    </div>
  );
}

export default App;
