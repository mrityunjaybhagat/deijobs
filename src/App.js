import './App.css';
import Header from '../src/front/includes/Header';
import Footer from '../src/front/includes/Footer';
import HomePage from './front/Home';
function App() {
  return (
    <div className="App">
      <Header/>
      <HomePage/>
      <Footer/>
    </div>
  );
}
export default App;
