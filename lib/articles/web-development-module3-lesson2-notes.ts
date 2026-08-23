import type { ArticleSection, LessonArticle } from '@/lib/data';

const heading = (text: string): ArticleSection => ({ type: 'heading', text });
const paragraph = (text: string): ArticleSection => ({ type: 'paragraph', text });
const list = (items: string[]): ArticleSection => ({ type: 'list', items });
const quote = (text: string): ArticleSection => ({ type: 'quote', text });

export const webDevelopmentModule3Lesson2Notes: LessonArticle = {
  excerpt:
    'CSS Box Model کو بریانی کی پلیٹ کی مثال سے سمجھیں، پھر padding، margin، Flexbox اور cards سے مینو کو صاف ستھرا layout دیں۔',
  content: [
    heading('ماڈیول 3 — سبق 3.2: Box Model اور Layout — دکان کو ترتیب دینا'),
    paragraph('عنوان: Box Model — بریانی کی پلیٹ کی مثال سے'),
    paragraph('دورانیہ: 35 منٹ ویڈیو + 40 منٹ پریکٹس'),
    paragraph('مقصد: آپ اپنی ویب سائٹ کے حصوں کے درمیان صحیح فاصلہ رکھنا اور مینو کو cards کی شکل میں سجانا سیکھیں گے۔'),
    heading('ویڈیو کا ہک'),
    paragraph('آپ نے رنگ تو لگا دیا، لیکن سارا سامان ایک دوسرے کے اوپر چڑھا ہوا لگ رہا ہے۔ جیسے بریانی، رائتہ اور شامی کباب ایک ہی پلیٹ میں گھل مل گئے ہوں۔ آج ہم ان کو الگ الگ، صاف ستھری پلیٹوں میں سجائیں گے۔ اسی کو ڈیزائنر Box Model کہتے ہیں۔'),
    heading('حصہ 1: Box Model — بریانی کی پلیٹ والی مثال'),
    paragraph('ہر HTML ٹیگ ایک ڈبہ ہے، جیسے بریانی کی پلیٹ۔ اس ڈبے کے چار حصے ہیں:'),
    list([
      'Content — اصل بریانی، یعنی آپ کی لکھائی یا تصویر۔',
      'Padding — پلیٹ میں بریانی کے چاروں طرف اندر کی خالی جگہ، تاکہ بریانی گرے نہیں۔',
      'Border — پلیٹ کا کنارہ۔',
      'Margin — دو پلیٹوں کے درمیان باہر کا فاصلہ، تاکہ وہ آپس میں نہ ٹکرائیں۔',
    ]),
    quote('/* Padding = اندرونی فاصلہ */ h2 { padding: 15px; } /* Margin = بیرونی فاصلہ */ h2 { margin: 20px; margin-top: 30px; }'),
    heading('حصہ 2: مینو کو خوبصورت ڈبوں میں سجانا'),
    paragraph('ہم اپنے مینو کے لیے ایک خاص ڈبہ بنائیں گے۔ اس کے لیے <div> ٹیگ استعمال کریں گے اور اسے card نام کی class دیں گے۔ class کا مطلب نام ہے، جیسے سکول میں ہر بچے کا نام ہوتا ہے۔'),
    quote('<div class="card"><h3>Chicken Biryani</h3><p>350 Rs - Full Plate</p></div>'),
    paragraph('اب اس card کو CSS میں سجاتے ہیں:'),
    quote('.card { background-color: white; border: 1px solid #ddd; border-radius: 12px; padding: 20px; margin: 15px; width: 250px; display: inline-block; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }'),
    list([
      'width: 250px; سے card کی چوڑائی مقرر ہوئی۔',
      'display: inline-block; سے cards ایک لائن میں آ گئے۔',
      'box-shadow سے ہلکا سایہ آیا، جیسے card ہوا میں ہو۔',
    ]),
    heading('حصہ 3: سب کو درمیان میں لانا — Centering کا جادو'),
    paragraph('ساری ویب سائٹ کو درمیان میں لانے کے لیے ہم body کو text-align: center; دے چکے ہیں۔ card والے div کو درمیان میں لانے کے لیے margin: 0 auto; استعمال ہوتا ہے۔'),
    paragraph('نیا اور آسان طریقہ Flexbox ہے:'),
    quote('.menu-container { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }'),
    paragraph('display: flex; تمام cards کو قطار میں لگاتا ہے اور gap: 20px; ہر card کے درمیان 20 پکسل کا فاصلہ رکھتا ہے۔ flex-wrap: wrap; جگہ کم ہونے پر cards کو اگلی لائن میں لے جاتا ہے۔'),
    heading('حصہ 4: پریکٹیکل — مکمل card والا مینو'),
    paragraph('اپنا index.html کھولیں اور یہ نیا کوڈ <body> کے اندر لگائیں:'),
    quote('<style>.menu-container { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; margin-top: 20px; } .card { background: white; border-radius: 15px; padding: 20px; width: 220px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center; } .card h3 { color: #b71c1c; margin: 10px 0; } .card p { color: #555; }</style><div class="menu-container"><div class="card"><img src="biryani.jpg" width="100%" style="border-radius:10px;"><h3>Chicken Biryani</h3><p>350 Rs - Full Plate</p><a href="https://wa.me/923001234567">Order Karein</a></div><div class="card"><img src="mutton.jpg" width="100%" style="border-radius:10px;"><h3>Mutton Biryani</h3><p>550 Rs - Full Plate</p><a href="https://wa.me/923001234567">Order Karein</a></div></div>'),
    heading('خود کر کے دیکھو — ٹاسک'),
    list([
      'اپنے مینو کے لیے تین cards بنائیں اور menu-container میں ڈالیں۔',
      'ہر card میں padding کو 10px سے بڑھا کر 30px کریں اور فرق دیکھیں۔',
      'margin اور padding میں کیا فرق ہے؟ ایک پیراگراف میں لکھ کر شمع پر پوسٹ کریں۔',
    ]),
    heading('عام غلطیاں'),
    list([
      'کنفیوژن: padding اندر کا فاصلہ اور margin باہر کا فاصلہ ہے۔ بریانی کی پلیٹ والی مثال یاد رکھیں۔',
      'cards ایک دوسرے کے نیچے آ رہے ہیں؟ display: inline-block; یا display: flex; لگانا بھول گئے۔',
      'card بہت بڑا ہوگیا؟ width مقرر کرنا نہ بھولیں، جیسے width: 250px;',
    ]),
    heading('کمائی سے کنکشن'),
    paragraph('یہ Box Model والا ڈیزائن ہی آپ کو دوسرے لوگوں سے الگ کرتا ہے۔ عام شخص صرف لسٹ بنا دیتا ہے، آپ cards بناتے ہیں۔ card والی ویب سائٹ دیکھ کر دکاندار کہتا ہے کہ یہ تو بالکل Foodpanda جیسی لگ رہی ہے۔ اسی ایک چیز سے آپ 10,000 روپے اضافی مانگ سکتے ہیں۔'),
    heading('چھوٹا سا کوئز'),
    list([
      'ڈبے کے اندرونی فاصلے کو کیا کہتے ہیں؟ a) padding  b) margin — جواب: a',
      'دو ڈبوں کے درمیان بیرونی فاصلے کو کیا کہتے ہیں؟ a) padding  b) margin — جواب: b',
      'cards کو ایک قطار میں لانے کا آسان طریقہ کیا ہے؟ a) display: flex;  b) color: red; — جواب: a',
    ]),
    heading('ہوم ورک'),
    paragraph('اپنے تین cards والے مینو کا سکرین شاٹ اپلوڈ کریں۔'),
  ],
};