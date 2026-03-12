import x from "./components/categories/categories.model.js"
import Directory from "./components/directory/directory.component.jsx";


const App = () => {

  return (
    <Directory categories={x}/>
  );
}

export default App;
