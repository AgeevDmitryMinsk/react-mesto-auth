import React from "react";

export default Footer;

function Footer() {
    return (
        <footer className="footer page__footer">
            <p className="footer__copyright">{`© 2020 - ${new Date().getFullYear()} Mesto Russia AgeevDmitryMinsk`}</p>
        </footer>
    );
}