import type { ArticleSection, LessonArticle } from '@/lib/data';

const heading = (text: string): ArticleSection => ({ type: 'heading', text });
const paragraph = (text: string): ArticleSection => ({ type: 'paragraph', text });
const list = (items: string[]): ArticleSection => ({ type: 'list', items });
const quote = (text: string): ArticleSection => ({ type: 'quote', text });

export const webDevelopmentModule3Lesson3Notes: LessonArticle = {
  excerpt:
    'viewport، flexible images اور media queries استعمال کرکے بریانی شاپ کو desktop اور mobile دونوں پر خوبصورت اور قابلِ استعمال بنائیں۔',
  content: [
    heading('ماڈیول 3 — سبق 3.3: موبائل فرینڈلی ویب سائٹ — Responsive ڈیزائن'),
    paragraph('عنوان: موبائل پر ویب سائٹ کو خوبصورت کیسے دکھائیں؟'),
    paragraph('دورانیہ: 30 منٹ ویڈیو + 40 منٹ پریکٹس'),
    paragraph('مقصد: آپ کی بریانی شاپ لیپ ٹاپ اور موبائل دونوں پر بالکل صحیح نظر آئے گی۔'),
    heading('ویڈیو کا ہک'),
    paragraph('فیصل آباد میں 80% لوگ ویب سائٹ موبائل پر دیکھتے ہیں، لیپ ٹاپ پر نہیں۔ اگر آپ کی بریانی شاپ موبائل پر ٹوٹی ہوئی نظر آئی تو گاہک فوراً چلا جائے گا۔ آج ہم اپنی ویب سائٹ کو موبائل فرینڈلی بنائیں گے۔ یہی وہ چیز ہے جس کے لیے کلائنٹ سب سے زیادہ پیسے دیتا ہے۔'),
    heading('حصہ 1: Responsive کیا ہے؟'),
    paragraph('Responsive کا مطلب جواب دینے والی ہے۔ جیسے پانی جس برتن میں ڈالو اسی کی شکل اختیار کر لیتا ہے، ویسے ہی اچھی ویب سائٹ جس screen پر کھولو اسی کے حساب سے ڈھل جاتی ہے۔'),
    paragraph('desktop پر تین cards ایک قطار میں اور mobile پر ایک کے نیچے ایک۔ یہی Responsive Design ہے۔'),
    heading('حصہ 2: پہلا قدم — Viewport ٹیگ'),
    paragraph('سب سے پہلے browser کو بتانا ہے کہ یہ ویب سائٹ mobile کے لیے بھی بنی ہے۔ اس کے لیے <head> میں viewport ٹیگ لگاتے ہیں:'),
    quote('<meta name="viewport" content="width=device-width, initial-scale=1.0">'),
    paragraph('width=device-width کا مطلب ہے کہ ویب سائٹ کی چوڑائی screen کی چوڑائی کے برابر رکھی جائے۔ یہ ٹیگ ہر ویب سائٹ کے head میں لازمی ہونا چاہیے۔'),
    heading('حصہ 3: دوسرا قدم — لچکدار تصاویر'),
    paragraph('تصویر کو فکس width: 400px; نہ دیں، ورنہ وہ mobile screen سے باہر نکل جائے گی۔ اسے ہمیشہ لچکدار بنائیں:'),
    quote('img { max-width: 100%; height: auto; }'),
    paragraph('max-width: 100%; کا مطلب ہے کہ تصویر اپنے ڈبے سے زیادہ بڑی نہیں ہوگی، چاہے mobile ہو یا laptop۔'),
    heading('حصہ 4: تیسرا قدم — Media Query کا جادو'),
    paragraph('Media Query کا مطلب screen سے سوال پوچھنا ہے۔ اگر screen چھوٹی ہے تو کچھ اور کرو، بڑی ہے تو کچھ اور۔'),
    quote('@media (max-width: 600px) { /* موبائل کے لیے خاص ڈیزائن */ .card { width: 90%; } }'),
    paragraph('@media (max-width: 600px) کا مطلب ہے کہ اگر screen 600 pixels یا اس سے چھوٹی، یعنی mobile، ہے تو اندر والا design لگا دو۔ card کی width: 90%; کرنے سے mobile پر ایک card تقریباً پوری screen میں نظر آتا ہے۔'),
    heading('حصہ 5: پریکٹیکل — بریانی شاپ کو موبائل فرینڈلی بنانا'),
    paragraph('اپنا index.html کھولیں اور <head> اور <style> میں یہ مکمل کوڈ لگائیں:'),
    quote('<head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Lahore Biryani House</title><style>body { background-color: #fff8e1; font-family: Arial, sans-serif; margin: 0; padding: 10px; } h1 { color: #b71c1c; text-align: center; } img { max-width: 100%; height: auto; border-radius: 15px; } .menu-container { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; } .card { background: white; border-radius: 15px; padding: 20px; width: 250px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); } @media (max-width: 600px) { h1 { font-size: 24px; } .menu-container { flex-direction: column; align-items: center; } .card { width: 90%; } a { display: block; width: 90%; text-align: center; } }</style></head>'),
    paragraph('اب Chrome میں F12 دبائیں، اوپر mobile والے آئیکن پر کلک کریں اور دیکھیں کہ آپ کی ویب سائٹ mobile پر کیسی لگ رہی ہے۔'),
    heading('حصہ 6: ٹیسٹ کیسے کریں؟'),
    list([
      'لیپ ٹاپ پر: Chrome میں F12 دبائیں، پھر Ctrl+Shift+M دبائیں۔',
      'موبائل پر: اپنا Live Server والا لنک mobile پر کھولیں۔',
      'اگر mobile پر دائیں بائیں scroll نہیں کرنا پڑ رہا اور سب کچھ صاف نظر آ رہا ہے تو آپ کامیاب ہیں۔',
    ]),
    heading('خود کر کے دیکھو — ٹاسک'),
    list([
      'اپنی site میں @media (max-width: 600px) لگاکر h1 کا size mobile پر چھوٹا کر دیں۔',
      'mobile پر card کی width: 90%; کرکے ٹیسٹ کریں۔',
      'اپنے mobile کا screenshot لیں جس میں آپ کی site کھلی ہو۔',
    ]),
    heading('عام غلطیاں'),
    list([
      'سب سے بڑی غلطی <meta name="viewport"> ٹیگ لگانا بھولنا ہے۔ اس کے بغیر site صحیح mobile friendly نہیں بنے گی۔',
      'تصویر کو فکس width: 400px; دینا غلط ہے۔ ہمیشہ max-width: 100%; استعمال کریں۔',
      'Media Query کو <style> کے آخر میں لکھنا ہے، شروع میں نہیں۔',
    ]),
    heading('کمائی سے کنکشن'),
    paragraph('کلائنٹ آپ سے پہلا سوال یہی پوچھے گا کہ کیا یہ mobile پر ٹھیک چلے گی؟ اگر آپ کہیں گے جی ہاں، تو وہ آپ کو فوراً 10,000 روپے اضافی دے سکتا ہے۔ آج کل Google بھی mobile friendly sites کو ترجیح دیتا ہے۔ یہ ایک @media rule آپ کے کام کی قدر بڑھا دیتا ہے۔'),
    heading('چھوٹا سا کوئز'),
    list([
      'mobile friendly design کے لیے سب سے پہلا ٹیگ کون سا ہے؟ a) viewport  b) image — جواب: a',
      'تصویر کو لچکدار بنانے کے لیے کیا استعمال ہوگا؟ a) max-width: 100%;  b) width: 400px; — جواب: a',
      'mobile کے لیے خاص design کس میں لکھتے ہیں؟ a) @media  b) @color — جواب: a',
    ]),
    heading('ہوم ورک'),
    paragraph('اپنی ویب سائٹ کے desktop اور mobile، دونوں screenshots اپلوڈ کریں۔'),
  ],
};