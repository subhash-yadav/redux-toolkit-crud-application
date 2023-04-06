
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Post/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
      </Routes>
    </>
  );
}

export default App;
