import React from "react";

const Footer = () => {
  return (
    <div>
      <footer
        className="footer_styles"
        style={{backgroundColor: "#e3f2fd", opacity: "70%"}}
      >
        <div className="github_link">&copy; 2023 NoteBook</div>
        <div>
          <a
            href="https://github.com/Rajat2024/NoteBook"
            target="_blank"
            rel="noopener noreferrer"
            className="github_link"
          >
            Checkout the project on Github ⭐
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
