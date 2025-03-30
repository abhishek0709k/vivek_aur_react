import Home from './screen/Home/home'
import { Route, Routes } from "react-router-dom";
import About from './screen/About-us/aboutUs'
import Contact from './screen/contactUs/contact';
import GitHub from './screen/github/github';


function App() {

  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/about' element={ <About /> } />
      <Route path='/contact' element={ <Contact/> } />
      <Route path='/github/:username' element={ <GitHub/> } />
    </Routes>
  )
}

export default App
