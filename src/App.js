import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dialogs from './Components/Dialogs/Dialogs';
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import Profile from './Components/Profile/Profile';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Setting from './Components/Setting/Setting';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header className='header'/>
        <div className='content'>
          <NavBar className='navBar'/>
          {/* <Profile className='profile'/> */}
          <Routes>
            <Route path='profile' element={<Profile/>}/>
            <Route path='dialogs' element={<Dialogs/>}/>
            <Route path='news' element={<News/>}/>
            <Route path='music' element={<Music/>}/>
            <Route path='setting' element={<Setting/>}/>
          </Routes>

        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
