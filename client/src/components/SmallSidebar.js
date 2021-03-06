import Wrapper from "../assets/wrappers/Navbar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext.js";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import Logo from "./Logo.js";

const SmallSidebar = () => {
  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={() => console.log("toggle")}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">nav links</div>
        </div>
      </div>
      <h4>SmallSidebar</h4>
    </Wrapper>
  );
};

export default SmallSidebar;
