function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright Albin ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
