import type { ArticleSection, LessonArticle } from '@/lib/data';

const heading = (text: string): ArticleSection => ({ type: 'heading', text });
const paragraph = (text: string): ArticleSection => ({ type: 'paragraph', text });
const list = (items: string[]): ArticleSection => ({ type: 'list', items });
const quote = (text: string): ArticleSection => ({ type: 'quote', text });

export const webDevelopmentModule4Lesson1Notes: LessonArticle = {
  excerpt:
    'ڈومین اور ہوسٹنگ کو آسان مثالوں سے سمجھیں، اپنی ویب سائٹ Netlify پر مفت لائیو کریں، سائٹ کا نام بدلیں اور کلائنٹ کو لائیو لنک بھیجیں۔',
  content: [
    heading('ماڈیول 4 — سبق 4.1: ویب سائٹ کو انٹرنیٹ پر لائیو کرنا — ڈومین اور ہوسٹنگ'),
    paragraph('عنوان: اپنی بریانی شاپ کو دنیا کے سامنے کیسے لائیں؟'),
    paragraph('دورانیہ: 40 منٹ ویڈیو + 30 منٹ پریکٹس'),
    paragraph('مقصد: آپ اپنی meri-website کو ایسا لنک بنا دیں گے جسے آپ واٹس ایپ پر کسی کو بھی بھیج سکیں گے۔'),
    heading('ویڈیو کا ہک'),
    paragraph('آپ نے اتنی محنت سے بریانی شاپ بنائی، لیکن وہ صرف آپ کے لیپ ٹاپ میں ہے۔ کلائنٹ کو آپ کیا دکھائیں گے؟ آج ہم اسی شاپ کو انٹرنیٹ پر لائیو کریں گے، جیسے Daraz پر دکان لائیو ہوتی ہے۔ اس کے بعد آپ کے پاس ایک اصلی لنک ہوگا جیسے www.lahorebiryani.com، جسے آپ اپنے ابو کو بھی بھیج سکتے ہیں۔'),
    heading('حصہ 1: ڈومین اور ہوسٹنگ کو پاکستانی مثال سے سمجھو'),
    list([
      'ہوسٹنگ = زمین یا دکان کی جگہ: جیسے آپ کو بریانی کی دکان کھولنے کے لیے گھنٹہ گھر میں ایک جگہ چاہیے۔ انٹرنیٹ پر اس جگہ کو Hosting کہتے ہیں۔',
      'ڈومین = دکان کا نام اور بورڈ: جیسے Lahore Biryani House کا بورڈ۔ انٹرنیٹ پر اس بورڈ کو Domain کہتے ہیں، جیسے lahorebiryani.com۔',
    ]),
    quote('ہوسٹنگ کے بغیر ویب سائٹ رہ نہیں سکتی، ڈومین کے بغیر مل نہیں سکتی۔'),
    heading('حصہ 2: مفت ہوسٹنگ — Netlify کا جادو'),
    paragraph('شروع میں ہمیں پیسے خرچ کرنے کی ضرورت نہیں۔ ایک ویب سائٹ ہے جس کا نام ہے Netlify۔ یہ ہمیں مفت میں ہوسٹنگ دیتی ہے۔'),
    paragraph('دوسری مشہور سائٹس ہیں GitHub Pages اور Vercel لیکن ہمارے لیے Netlify سب سے آسان ہے۔'),
    heading('حصہ 3: پریکٹیکل — 3 منٹ میں ویب سائٹ لائیو'),
    heading('قدم 1: اکاؤنٹ بنانا'),
    paragraph('گوگل پر لکھیں Netlify.com اور Sign up with Google پر کلک کریں۔'),
    heading('قدم 2: فولڈر کو گھسیٹنا — Drag and Drop'),
    paragraph('لاگ ان ہونے کے بعد ایک جگہ لکھا ہوگا Drag and drop your site output folder here۔'),
    paragraph('اب اپنے ڈیسک ٹاپ والا meri-website والا فولڈر اٹھا کر وہاں گھسیٹ دیں۔'),
    paragraph('بس! 10 سیکنڈ میں آپ کو ایک لنک مل جائے گا جیسے: https://lahore-biryani-house-123.netlify.app'),
    paragraph('یہ آپ کی لائیو ویب سائٹ ہے۔ اسے اب دنیا میں کوئی بھی کھول سکتا ہے۔'),
    heading('قدم 3: نام بدلنا'),
    paragraph('اس لنک کا نام تھوڑا مشکل ہے۔ ہم اسے آسان بنا سکتے ہیں۔ Site settings > Change site name میں جا کر لکھیں lahore-biryani-faisalabad تو لنک بن جائے گا: https://lahore-biryani-faisalabad.netlify.app'),
    heading('حصہ 4: اپنا ذاتی ڈومین — .com کیسے خریدیں؟'),
    paragraph('جب کلائنٹ آپ کو 15,000 دے گا تو آپ اس کے لیے اصلی ڈومین خریدیں گے۔ ڈومین خریدنے کی مشہور جگہیں ہیں GoDaddy.com، Namecheap.com اور پاکستان میں PKNIC برائے .pk ڈومین۔'),
    paragraph('ایک .com ڈومین کی قیمت تقریباً سالانہ 3000 سے 4000 روپے ہوتی ہے۔'),
    paragraph('خریدنے کے بعد Netlify میں جا کر Domain settings > Add custom domain پر کلک کر کے اپنا ڈومین لگا دیں۔'),
    heading('حصہ 5: کلائنٹ کو کیسے بھیجیں؟'),
    paragraph('اب آپ کے پاس 2 چیزیں ہیں۔ ایک خوبصورت ویب سائٹ اور ایک لائیو لنک۔ اب آپ کلائنٹ کو واٹس ایپ پر یہ میسج بھیج سکتے ہیں:'),
    quote('As-salamu Alaikum Sir! Maine apki Lahore Biryani House ke liye ek sample website banayi hai. Aap is link par dekh sakte hain: https://lahore-biryani-faisalabad.netlify.app Agar apko pasand aaye to main isi ko apke naam par .com par live kar dunga. Shukriya! — Atif, Faisalabad'),
    heading('خود کر کے دیکھو — ٹاسک'),
    list([
      'اپنی meri-website کو Netlify پر لائیو کریں۔',
      'اس کا لنک اپنے کسی دوست کو واٹس ایپ کریں اور اس سے پوچھیں کہ کیا یہ موبائل پر ٹھیک کھل رہی ہے؟',
      'Netlify پر جا کر سائٹ کا نام بدل کر اپنی دکان کے نام پر رکھیں۔',
    ]),
    heading('عام غلطیاں'),
    list([
      'غلطی: پورا C: drive یا Downloads فولڈر گھسیٹ دیا۔ ہمیشہ صرف meri-website والا فولڈر گھسیٹنا ہے۔',
      'غلطی: index.html کا نام Index.html یا home.html رکھ دیا۔ ہوم پیج کا نام ہمیشہ چھوٹے حروف میں index.html ہی ہونا چاہیے۔',
      'غلطی: Netlify پر تصویر نہیں آ رہی۔ وجہ: تصویر meri-website فولڈر میں نہیں تھی۔',
    ]),
    heading('کمائی سے کنکشن'),
    paragraph('آج تک آپ اپنی ویب سائٹ صرف اپنے لیپ ٹاپ پر دکھا سکتے تھے۔ آج کے بعد آپ کے پاس ایک اصلی لنک ہے۔ یہی لنک آپ کا پورٹ فولیو ہے۔ آپ اسی لنک کو 10 دکانداروں کو بھیجیں گے۔ ان میں سے 2 نے ہاں کہہ دیا تو آپ کی پہلی 10,000 سے 20,000 کی کمائی پکی ہے۔ Fiverr اور Upwork پر بھی کلائنٹ سب سے پہلے لائیو لنک ہی مانگتا ہے۔'),
    heading('چھوٹا سا کوئز'),
    list([
      'ویب سائٹ کو رکھنے کی جگہ کو کیا کہتے ہیں؟ a) Hosting  b) Domain — جواب: a',
      'مفت میں ویب سائٹ لائیو کرنے کی بہترین سائٹ؟ a) Netlify  b) Facebook — جواب: a',
      'ہوم پیج کا نام کیا ہونا چاہیے؟ a) index.html  b) home.html — جواب: a',
    ]),
    heading('ہوم ورک'),
    paragraph('اپنی لائیو ویب سائٹ کا لنک ہمیں ای میل کریں۔ ساتھ لکھیں کہ آپ نے Netlify پر کیسے لائیو کیا۔'),
  ],
};