import categoriesData from "../../models/categories/categories.model.js"
import Directory from "../../components/directory/directory.component.jsx";


const Home = () => {

  return (
    <Directory categories={categoriesData}/>
  );
}

export default Home;