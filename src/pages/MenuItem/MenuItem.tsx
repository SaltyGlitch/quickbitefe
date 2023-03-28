import { Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import Counter from "../../components/Counter/Counter";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./MenuItem.css";

function MenuItem() {
  return (
    <main>
    <main>
      <Header/>
      <ItemCard />
      <div className="itemcard-container">
        <Counter/>
        <Link to="/cart">
        <button className="addtocart-button">Add to Cart</button>
        </Link>  
      </div>
      <Footer/>
    </main>
    </main>
  );
}
export default MenuItem;
