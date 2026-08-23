import type { ArticleSection, LessonArticle } from '@/lib/data';

const heading = (text: string): ArticleSection => ({ type: 'heading', text });
const paragraph = (text: string): ArticleSection => ({ type: 'paragraph', text });
const list = (items: string[]): ArticleSection => ({ type: 'list', items });
const quote = (text: string): ArticleSection => ({ type: 'quote', text });

export const webDevelopmentModule2Lesson2Notes: LessonArticle = {
  excerpt:
    'HTML کے img اور anchor tags سے بریانی کی تصویر، WhatsApp آرڈر لنک اور Google Maps لوکیشن اپنی ویب سائٹ میں شامل کریں۔',
  content: [
    heading('ماڈیول 2 — سبق 2.2: تصویر اور لنک لگانا — دکان کو اصلی بناؤ'),
    paragraph('عنوان: تصویر اور لنک — کلک پر واٹس ایپ آرڈر'),
    paragraph('دورانیہ: 30 منٹ ویڈیو + 30 منٹ پریکٹس'),
    paragraph('مقصد: آپ اپنی ویب سائٹ پر بریانی کی تصویر اور واٹس ایپ پر آرڈر والا بٹن لگا سکیں گے۔'),
    heading('ویڈیو کا ہک'),
    paragraph('صرف لکھا ہوا مینو کون پڑھے گا؟ جب تک خوشبو والی بریانی کی تصویر نہ ہو اور واٹس ایپ پر آرڈر کریں کا بٹن نہ ہو، گاہک آرڈر نہیں کرے گا۔ آج ہم اپنی ویب سائٹ کو اصلی دکان جیسا بنائیں گے۔'),
    heading('حصہ 1: تصویر کیسے لگاتے ہیں؟'),
    paragraph('تصویر لگانے کے لیے <img> ٹیگ استعمال ہوتا ہے۔ یہ سب سے چھوٹا ٹیگ ہے اور اسے بند کرنے کی ضرورت نہیں۔'),
    list([
      'src کا مطلب ہے کہ تصویر کہاں رکھی ہے۔',
      'alt میں وہ متن لکھا جاتا ہے جو انٹرنیٹ سست ہونے یا تصویر نہ کھلنے پر نظر آئے گا۔',
    ]),
    paragraph('آسان طریقہ: گوگل سے تصویر ڈاؤن لوڈ کریں، نام biryani.jpg رکھیں اور اسے اپنے meri-website فولڈر میں index.html کے ساتھ رکھ دیں۔'),
    heading('حصہ 2: لنک کیسے لگاتے ہیں؟'),
    paragraph('لنک کے لیے <a> ٹیگ استعمال ہوتا ہے۔ اس کا سب سے اہم حصہ href ہے، یعنی لنک نے کہاں جانا ہے۔'),
    list([
      'واٹس ایپ لنک اس طرح شروع ہوتا ہے: https://wa.me/923001234567',
      'نمبر لکھتے وقت شروع کا صفر ہٹا کر 92 لگانا ہے۔',
      'لنک نئے ٹیب میں کھولنے کے لیے target="_blank" لکھیں۔',
    ]),
    heading('حصہ 3: پریکٹیکل'),
    paragraph('اپنا index.html کھولیں اور یہ نیا کوڈ لکھیں:'),
    quote('<!DOCTYPE html><html><head><title>Lahore Biryani House</title></head><body><h1>Lahore Biryani House - Faisalabad</h1><p>Asli Karachi Style Biryani!</p><img src="biryani.jpg" alt="Garam Chicken Biryani" width="400"><h2>Hamara Menu</h2><ul><li>Chicken Biryani - 350 Rs</li><li>Mutton Biryani - 550 Rs</li></ul><h2>Abhi Order Karein</h2><a href="https://wa.me/923001234567" target="_blank">WhatsApp par Order Karein</a><br><br><a href="https://maps.google.com" target="_blank">Location Dekhein</a></body></html>'),
    heading('حصہ 4: بونس ٹرک'),
    paragraph('اگر آپ چاہتے ہیں کہ تصویر پر کلک کرتے ہی واٹس ایپ کھل جائے تو <img> ٹیگ کو <a> ٹیگ کے اندر ڈال دیں:'),
    quote('<a href="https://wa.me/923001234567" target="_blank"><img src="biryani.jpg" width="400"></a>'),
    heading('عام غلطیاں'),
    list([
      'تصویر کا نام Biryani.JPG اور کوڈ میں biryani.jpg لکھ دیا۔ چھوٹے اور بڑے حروف کا خیال رکھیں۔',
      'تصویر Downloads میں پڑی ہے اور کوڈ اسے meri-website میں ڈھونڈ رہا ہے۔ تصویر کو ہمیشہ index.html والے فولڈر میں رکھیں۔',
    ]),
    heading('کمائی سے کنکشن'),
    paragraph('آپ نے جو واٹس ایپ والا بٹن بنایا ہے، یہی وہ بٹن ہے جس کے لیے دکاندار آپ کو 5,000 روپے دے گا۔ گاہک مینو دیکھ کر اسی بٹن پر کلک کرکے سیدھا واٹس ایپ پر آرڈر بھیج دے گا۔'),
    heading('ہوم ورک'),
    paragraph('اپنی ویب سائٹ کا سکرین شاٹ اپلوڈ کریں جس میں تصویر اور واٹس ایپ والا لنک دونوں نظر آ رہے ہوں۔'),
  ],
};