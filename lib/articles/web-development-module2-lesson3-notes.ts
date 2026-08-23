import type { ArticleSection, LessonArticle } from '@/lib/data';

const heading = (text: string): ArticleSection => ({ type: 'heading', text });
const paragraph = (text: string): ArticleSection => ({ type: 'paragraph', text });
const list = (items: string[]): ArticleSection => ({ type: 'list', items });
const quote = (text: string): ArticleSection => ({ type: 'quote', text });

export const webDevelopmentModule2Lesson3Notes: LessonArticle = {
  excerpt:
    'HTML form، label، input، textarea اور button استعمال کرکے بریانی شاپ کا آرڈر فارم اور تیار شدہ WhatsApp پیغام بنائیں۔',
  content: [
    heading('ماڈیول 2 — سبق 2.3: آرڈر فارم بنانا — گاہک سے ڈیٹا لینا'),
    paragraph('عنوان: گاہک سے نام، نمبر اور پتہ لینے کا فارم'),
    paragraph('دورانیہ: 30 منٹ ویڈیو + 40 منٹ پریکٹس'),
    paragraph('مقصد: آپ بریانی شاپ کے لیے ایسا فارم بنائیں گے جیسے Foodpanda پر ہوتا ہے۔'),
    heading('ویڈیو کا ہک'),
    paragraph('بریانی کی تصویر اور واٹس ایپ بٹن تو لگ گیا، لیکن گاہک اپنا نام اور پتہ کہاں لکھے گا؟ آج ہم ایک اصلی آرڈر فارم بنائیں گے۔ یہی فارم آپ کی ویب سائٹ کی قیمت 10,000 سے 20,000 روپے کر دے گا۔'),
    heading('حصہ 1: فارم کیا ہے؟'),
    paragraph('فارم ایک تھیلی کی طرح ہے۔ اس تھیلی کا نام <form> ہے۔ اس تھیلی کے اندر ہم inputs ڈالتے ہیں اور ہر input کا ٹیگ <input> ہوتا ہے۔'),
    heading('حصہ 2: لیبل اور ان پٹ کی جوڑی'),
    paragraph('لیبل کا مطلب پرچی ہے، جیسے دکان پر نام لکھا ہوتا ہے۔ اس کے لیے <label> ٹیگ استعمال ہوتا ہے۔'),
    quote('<label>Apka Naam:</label><input type="text" placeholder="Ahmed likhein">'),
    paragraph('یہاں type="text" کا مطلب سادہ لکھائی والا ڈبہ اور placeholder کا مطلب ہلکا سا اشارہ ہے جو ڈبے کے اندر نظر آتا ہے۔'),
    heading('اہم ان پٹ ٹائپس'),
    list([
      'type="text" — نام لکھنے کے لیے',
      'type="tel" — موبائل نمبر کے لیے، جیسے 0300 والا نمبر',
      'type="number" — پلیٹوں کی تعداد کے لیے',
      '<textarea> — لمبا پتہ لکھنے کے لیے',
      '<button> — آرڈر بھیجنے کے لیے',
    ]),
    heading('حصہ 3: پریکٹیکل — بریانی آرڈر فارم'),
    paragraph('اپنا index.html کھولیں اور تصویروں کے بعد یہ فارم والا کوڈ شامل کریں:'),
    quote('<h2>Order Form - Apna Order Yahan Likhein</h2><form><label>Apka Naam:</label><br><input type="text" placeholder="Apna naam likhein" required><br><br><label>Mobile Number:</label><br><input type="tel" placeholder="0300-1234567" required><br><br><label>Kitni Plate Chahiye?</label><br><input type="number" placeholder="1, 2, 3"><br><br><label>Apka Mukammal Pata:</label><br><textarea placeholder="Ghar ka pata, gali, muhalla"></textarea><br><br><button type="submit">Order Confirm Karein</button></form>'),
    paragraph('یہاں required کا مطلب ہے کہ یہ ڈبہ خالی نہیں چھوڑا جا سکتا۔'),
    heading('حصہ 4: بونس — فارم کو واٹس ایپ سے جوڑنا'),
    paragraph('اگر گاہک Order Confirm Karein پر کلک کرے تو سیدھا واٹس ایپ کھولنے کے لیے فی الحال بٹن کو لنک میں بدل دیں:'),
    quote('<a href="https://wa.me/923001234567?text=Salam!%20Mujhe%202%20Chicken%20Biryani%20chahiye" target="_blank"><button>WhatsApp par Order Bhejein</button></a>'),
    paragraph('?text= کے بعد جو لکھیں گے وہ واٹس ایپ میں خود بخود پہلے سے لکھا ہوا آ جائے گا۔'),
    heading('خود کر کے دیکھو — ٹاسک'),
    list([
      'اپنی دکان یا Atif Mobile Shop کے لیے ایسا ہی آرڈر فارم بنائیں۔',
      'ایک اضافی type="radio" ان پٹ شامل کریں جس میں پوچھیں: Chicken ya Mutton?',
      'فارم کے آخر میں اپنے واٹس ایپ نمبر والا بٹن لگائیں۔',
    ]),
    heading('عام غلطیاں'),
    list([
      '<input> ٹیگ کو بند نہیں کرنا، یہ خود بخود بند ہوتا ہے۔',
      'label اور input کے درمیان <br> لگانا نہ بھولیں، ورنہ سب ایک ہی لائن میں آ جائے گا۔',
      'فارم کے اندر required لگانا ضروری ہے تاکہ گاہک خالی فارم نہ بھیج دے۔',
    ]),
    heading('کمائی سے کنکشن'),
    paragraph('یہ فارم ہی آپ کی قیمت بڑھاتا ہے۔ صرف مینو والی سائٹ 5,000 روپے کی ہے، لیکن مینو، تصویر اور آرڈر فارم والی سائٹ 15,000 سے 20,000 روپے کی بکتی ہے۔ دکاندار کو کہیں: انکل، اب آپ کو بار بار فون پر پتہ نہیں پوچھنا پڑے گا، گاہک خود فارم میں سب کچھ لکھ کر بھیج دے گا۔'),
    heading('چھوٹا سا کوئز'),
    list([
      'فارم بنانے کے لیے کون سا ٹیگ ہے؟ a) <form>  b) <table> — جواب: a',
      'لمبا پتہ لکھنے کے لیے کون سا ٹیگ بہتر ہے؟ a) <input>  b) <textarea> — جواب: b',
      'ان پٹ خالی نہ چھوڑنے کے لیے کیا لگاتے ہیں؟ a) required  b) placeholder — جواب: a',
    ]),
    heading('ہوم ورک'),
    paragraph('اپنے آرڈر فارم کا سکرین شاٹ اپلوڈ کریں۔ فارم میں نام، نمبر اور پتے والے تینوں ڈبے نظر آنے چاہئیں۔'),
  ],
};