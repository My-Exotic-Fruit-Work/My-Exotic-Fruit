const links = {
  "$ekm-blog^": "https://my-exotic-fruit.28.ekm.shop/blogs",
  "$ekm-contact-us^": "https://my-exotic-fruit.28.ekm.shop/about-us-31-w.asp#contact-us",
  "$ekm-working-with-brands^" : "https://my-exotic-fruit.28.ekm.shop/working-with-brands-28-w.asp"
};

function fixBody(file, script, files) {
  for (const [placeholder, url] of Object.entries(links)) {
    file.body = file.body.replaceAll(placeholder, url);
  }

  return file.body;
}

module.exports = { fixBody };