import './App.css';
import Dropdown from '../src/components/base/dropdown'
import Navbar from '../src/components/base/navbar'

function App() {
  return (
    <div className="App">
      <h1 className="flex flex-row bg-red-500 border-2 border-green-500">
        Cottages are Great - Time to Stay In One
      </h1>
      <Navbar />
      <br></br>
      <Dropdown />
     
    </div>
  );
}

export default App;
