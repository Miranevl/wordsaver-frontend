import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Content from "./pages/Content/Content";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = ()  => {

  return (
<>
<Routes>
<Route path='/' element={<HomePage/>}></Route>
<Route path='/register' element={<Register/>}></Route>
<Route path='/login' element={<Login/> }></Route>
<Route path='/users/:userId' element={ <Content/>}></Route>
</Routes>
</>
  )
}

export default App