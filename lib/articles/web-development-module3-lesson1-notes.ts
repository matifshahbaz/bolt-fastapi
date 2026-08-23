import type { ArticleSection, LessonArticle } from '@/lib/data';

const heading = (text: string): ArticleSection => ({ type: 'heading', text });
const paragraph = (text: string): ArticleSection => ({ type: 'paragraph', text });
const list = (items: string[]): ArticleSection => ({ type: 'list', items });
const quote = (text: string): ArticleSection => ({ type: 'quote', text });

export const webDevelopmentModule3Lesson1Notes: LessonArticle = {
  excerpt:
    'CSS کا فارمولا اور بنیادی properties سیکھیں، پھر رنگ، فونٹ، بارڈر اور خوبصورت WhatsApp بٹن سے بریانی شاپ کو پروفیشنل بنائیں۔',
  content: [
    heading('ماڈیول 3 — سبق 3.1: ویب سائٹ کو رنگین بنانا — CSS کا جادو'),
    paragraph('عنوان: CSS کیا ہے؟ بریانی شاپ کو رنگین کیسے بنائیں'),
    paragraph('دورانیہ: 35 منٹ ویڈیو + 40 منٹ پریکٹس'),
    paragraph('مقصد: آپ اپنی سادہ بریانی شاپ کو رنگ، ڈیزائن اور اسٹائل دے کر پروفیشنل لک دیں گے۔'),
    heading('ویڈیو کا ہک'),
    paragraph('آپ کی بریانی شاپ تو بن گئی، لیکن وہ ابھی ایسی لگ رہی ہے جیسے بغیر رائتے کے بریانی۔ مزہ نہیں آ رہا۔ آج ہم اس میں رنگ، خوشبو اور ڈیزائن ڈالیں گے، جس کے بعد یہی ویب سائٹ 5,000 کی بجائے 20,000 کی لگے گی۔ اس جادو کا نام CSS ہے۔'),
    heading('حصہ 1: CSS کیا ہے؟ پاکستانی مثال سے'),
    list([
      'HTML = ڈھانچہ، جیسے گھر کی اینٹیں، دیواریں اور دروازے۔',
      'CSS = ڈیزائن، جیسے دیواروں پر رنگ، پردے، ٹائلیں اور لائٹیں۔',
    ]),
    paragraph('HTML سے ہم لکھتے ہیں کہ بریانی ہے۔ CSS سے ہم بتاتے ہیں کہ وہ سرخ، بڑی اور خوبصورت نظر آنی چاہیے۔'),
    heading('حصہ 2: CSS کیسے لگاتے ہیں؟'),
    paragraph('CSS لگانے کے تین طریقے ہیں۔ ہمارے لیے سب سے آسان Internal CSS ہے۔ ہم اپنے <head> کے اندر <style> ٹیگ لگائیں گے۔'),
    quote('<head><style>/* Yahan hum rang likhenge */</style></head>'),
    heading('حصہ 3: CSS کا فارمولا'),
    paragraph('فارمولا بہت آسان ہے:'),
    quote('selector { property: value; }'),
    paragraph('مثال: اگر h1 کو سرخ کرنا ہے تو لکھیں:'),
    quote('h1 { color: red; }'),
    paragraph('یہاں h1 selector، color property اور red value ہے۔'),
    heading('حصہ 4: کام کی سات properties'),
    list([
      'color — لکھائی کا رنگ، جیسے color: red;',
      'background-color — پیچھے والا رنگ، جیسے background-color: #fff8e1; یعنی ہلکا پیلا۔',
      'text-align — لکھائی کو درمیان میں لانے کے لیے text-align: center;',
      'font-family — فونٹ تبدیل کرنے کے لیے۔',
      'border — تصویر کے گرد بارڈر، جیسے border: 3px solid red;',
      'border-radius — کونوں کو گول کرنے کے لیے، جیسے border-radius: 10px;',
      'padding — اندرونی جگہ، مثلاً بٹن کو موٹا کرنے کے لیے۔',
    ]),
    heading('حصہ 5: پریکٹیکل — بریانی شاپ کو رنگین بناتے ہیں'),
    paragraph('اپنا index.html کھولیں اور <head> کے اندر یہ <style> والا کوڈ پیسٹ کریں:'),
    quote('<head><title>Lahore Biryani House</title><style>body { background-color: #fff8e1; font-family: Arial, sans-serif; text-align: center; } h1 { color: #b71c1c; background-color: #ffcc80; padding: 15px; border-radius: 10px; } h2 { color: #e65100; } img { border: 5px solid #b71c1c; border-radius: 15px; } a { background-color: #25D366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px; } ul, ol { text-align: left; display: inline-block; background-color: white; padding: 20px 40px; border-radius: 10px; }</style></head>'),
    paragraph('اب Go Live پر کلک کریں اور جادو دیکھیں۔ آپ کی بریانی شاپ اب بالکل Foodpanda جیسی پروفیشنل لگے گی۔'),
    heading('حصہ 6: بونس — بٹن کو خوبصورت بنانا'),
    paragraph('واٹس ایپ والے a ٹیگ کو ہم نے بٹن بنا دیا ہے۔ اس کی تین اہم چیزیں ہیں:'),
    list([
      'background-color: #25D366; — یہ واٹس ایپ والا ہرا رنگ ہے۔',
      'padding: 12px 20px; — اس سے بٹن موٹا اور بڑا لگتا ہے۔',
      'border-radius: 8px; — اس سے بٹن کے کونے گول ہو جاتے ہیں۔',
    ]),
    heading('خود کر کے دیکھو — ٹاسک'),
    list([
      'اپنی دکان کے h1 کا رنگ اپنی پسند کے مطابق بدلیں، جیسے blue یا green۔',
      'body کا background-color ہلکا نیلا #e3f2fd کر دیں۔',
      'اپنی تصویر پر border-radius: 50%; لگاکر دیکھیں۔ تصویر گول ہو جائے گی۔',
    ]),
    heading('عام غلطیاں'),
    list([
      'کولن : اور سیمی کولن ; لگانا نہ بھولیں۔ color red غلط اور color: red; درست ہے۔',
      'رنگ کا نام غلط نہ لکھیں۔ reed غلط اور red درست ہے۔',
      'پورا <style> کوڈ <head> کے اندر لکھنا ہے، <body> کے اندر نہیں۔',
    ]),
    heading('کمائی سے کنکشن'),
    paragraph('یاد رکھیں، کلائنٹ ڈیزائن کے پیسے دیتا ہے، صرف لکھائی کے نہیں۔ بغیر CSS والی سائٹ 5,000 کی ہے، لیکن یہی رنگین CSS والی سائٹ 15,000 سے 20,000 کی بکتی ہے۔ جب آپ دکاندار کو کہیں گے کہ بھائی جان، میں نے آپ کی سائٹ پر آپ کی دکان جیسے سرخ اور پیلے رنگ لگائے ہیں، تو وہ فوراً متاثر ہو جائے گا۔'),
    heading('چھوٹا سا کوئز'),
    list([
      'ویب سائٹ کو رنگین بنانے کے لیے کیا استعمال ہوتا ہے؟ a) CSS  b) HTML — جواب: a',
      'بیک گراؤنڈ کا رنگ بدلنے کے لیے کون سی property ہے؟ a) color  b) background-color — جواب: b',
      'کونوں کو گول کرنے کے لیے کیا استعمال ہوتا ہے؟ a) border-radius  b) border — جواب: a',
    ]),
    heading('ہوم ورک'),
    paragraph('اپنی رنگین بریانی شاپ کا سکرین شاٹ اپلوڈ کریں۔ ساتھ لکھیں کہ آپ نے کون سے دو رنگ استعمال کیے۔'),
  ],
};