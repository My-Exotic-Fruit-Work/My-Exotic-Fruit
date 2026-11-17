// i think it makes sense to have constants which i can put anywhere in my html and easily change when needed
const CONSTANTS = {
  "$EKM-BLOG-LINK^": "https://my-exotic-fruit.28.ekm.shop/blogs",
  "$EKM-CONTACT-US-LINK^": "https://my-exotic-fruit.28.ekm.shop/about-us-31-w.asp#contact-us",
  "$EKM-WORKING-WITH-BRANDS-LINK^" : "https://my-exotic-fruit.28.ekm.shop/working-with-brands-28-w.asp",

  "$CROWN-MELON-PRODUCT^" : "https://my-exotic-fruit.28.ekm.shop/melon---crown-melon-luxury-fruit-for-gifting-13963-p.asp",
  "$PIONE-GRAPE-PRODUCT^" : "https://my-exotic-fruit.28.ekm.shop/grapes---pione-luxury-fruit-for-gifting-13658-p.asp",
  "$MIYAZAKI-MANGO-PRODUCT^" : "https://my-exotic-fruit.28.ekm.shop/mango---miyazaki-luxury-fruit-for-gifting-13906-p.asp",
  "$FUYU-PERSIMMON-PRODUCT^" : "https://my-exotic-fruit.28.ekm.shop/japanese-persimmon-luxury-fruit-for-gifting-14090-p.asp",
};

function fixBody(file, script, files) {
  for (const [placeholder, url] of Object.entries(CONSTANTS)) {
    file.body = file.body.replaceAll(placeholder, url);
  }

  return file.body;
}

module.exports = { fixBody };