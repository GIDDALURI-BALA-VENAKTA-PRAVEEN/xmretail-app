import CardApp from "./Components/Cards/CardApp";
import Carousel from "./Components/Carousel/Carousel";
import Category from "./Components/categories/Category";
import Nav from "./Components/NavBar/Nav";
function App() {
  return (
    <>
      <div>
      <Nav />
      <Carousel />
      <Category />
      <CardApp/>
    </div>
     
    </>
  )
}

export default App
