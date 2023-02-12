import ReactDOM from "react-dom/client";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/about">About</Link> </li>
          <li> <Link to="/file/fileA">FileA</Link> </li>
          <li> <Link to="/file/fileB">FileB</Link> </li>
          <li> <Link to="/file/fileC">FileC</Link> </li>
          <li> <Link to="/wrong">Wrong Link</Link> </li>
        </ul>
      </div>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/file/:id" element={<File />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function File() {
  let { id } = useParams();
  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}


const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);
