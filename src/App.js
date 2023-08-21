import { RecoilRoot } from 'recoil';
import './App.css';
import Routes from './Router/routes.jsx'

function App() {
  return (
    <div className="App">
      <RecoilRoot>
          <Routes/>
      </RecoilRoot>
    </div>
  );
}

export default App;
