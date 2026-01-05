import React from "react";
import {
  FooterContainer,
  FooterInner,
  SocialLinks,
  Legal,
  Copy,
} from "./styled";

const Footer = () => (
  <FooterContainer>
    <FooterInner>
      <Copy>
        © {new Date().getFullYear()} Oven Tales. Tous droits réservés.
      </Copy>
      <SocialLinks>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          Twitter
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          Facebook
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
      </SocialLinks>
      <Legal>
        <a href="/mentions-legales">Mentions légales</a>
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>
      </Legal>
    </FooterInner>
  </FooterContainer>
);

export default Footer;
