function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} - Albin Zebi</p>
    </footer>
  );
}

export default Footer;
