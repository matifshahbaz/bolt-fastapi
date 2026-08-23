import type { ArticleSection, LessonArticle } from '@/lib/data';

const heading = (text: string): ArticleSection => ({ type: 'heading', text });
const paragraph = (text: string): ArticleSection => ({ type: 'paragraph', text });
const list = (items: string[]): ArticleSection => ({ type: 'list', items });
const quote = (text: string): ArticleSection => ({ type: 'quote', text });

export const webDevelopmentModule4Lesson2Notes: LessonArticle = {
  excerpt:
    'تین لائیو نمونوں سے پورٹ فولیو بنائیں، لوکل کاروبار کو مؤثر پچ بھیجیں، Fiverr Gig تیار کریں اور پہلے آرڈر کی عملی کوشش کریں۔',
  content: [
    heading('ماڈیول 4 — سبق 4.2: پہلا کلائنٹ کیسے لیں؟ — Fiverr اور لوکل مارکیٹنگ'),
    paragraph('عنوان: 5,000 روپے کا پہلا آرڈر کیسے لیں؟'),
    paragraph('دورانیہ: 40 منٹ ویڈیو + 1 ہفتہ پریکٹس'),
    paragraph('مقصد: آپ اس ہفتے فیصل آباد کی کسی دکان سے یا Fiverr سے اپنا پہلا آرڈر لینے کی کوشش کریں گے۔'),
    heading('ویڈیو کا ہک'),
    paragraph('آپ نے ویب سائٹ بنانا سیکھ لیا، لائیو کرنا بھی سیکھ لیا۔ لیکن پیسے کیسے آئیں گے؟ آج میں آپ کو وہی طریقہ بتاؤں گا جس سے میرے پہلے طالب علم نے گھنٹہ گھر کے بریانی والے سے 5,000 روپے لیے تھے۔ اور یہی طریقہ Fiverr پر بھی کام کرتا ہے۔'),
    heading('حصہ 1: آپ کا ہتھیار — 3 لنکس والا پورٹ فولیو'),
    paragraph('کلائنٹ آپ کی ڈگری نہیں دیکھتا، وہ آپ کا کام دیکھتا ہے۔ آپ کے پاس اب 3 لائیو لنکس ہونے چاہئیں:'),
    list([
      'Lahore Biryani House والا لنک — https://lahore-biryani-faisalabad.netlify.app',
      'آپ کی اپنی ذاتی دکان والا لنک، جیسے Atif Mobile Shop',
      'ایک اور دکان، جیسے Afridi Sports یا Hira Tailors',
    ]),
    paragraph('یہ 3 لنک آپ کے واٹس ایپ کے About میں اور Fiverr پروفائل میں لگے ہونے چاہئیں۔'),
    heading('حصہ 2: لوکل کلائنٹ کو کیسے پچ کریں؟ — گھنٹہ گھر والا طریقہ'),
    paragraph('آپ کو دکان پر جا کر تقریر نہیں کرنی، صرف 2 منٹ کی بات کرنی ہے۔'),
    heading('قدم 1: مفت ڈیمو بناؤ'),
    paragraph('پہلے گھر بیٹھے اس دکان کے نام سے ایک ڈیمو بنا لیں۔ مثال کے طور پر Madina Biryani کے نام سے ایک سائٹ madina-biryani.netlify.app پر لائیو کر دیں۔'),
    heading('قدم 2: واٹس ایپ والا جادوئی میسج'),
    quote('As-salamu Alaikum Madina Biryani walay bhai! Main Faisalabad se baat kar raha hoon. Maine apki dukan ke liye ek choti si website banayi hai taake Google par customer apko asani se dhoond sakein. Yeh rahi sample: https://madina-biryani.netlify.app Isme apka menu, tasveer aur WhatsApp order button laga hai. Agar apko pasand aaye to main ye apke naam par .com par laga dunga. Iska kharcha sirf 5000 Rs hai, ek dafa ka. Kya main kal apki dukan par 2 minute ke liye aa sakta hoon? Shukriya — Atif, 0300-1234567'),
    paragraph('اس میسج میں 3 جادو ہیں: مفت ڈیمو، کم قیمت 5000، اور 2 منٹ کا وقت۔'),
    heading('قدم 3: دکان پر کیا کہنا ہے؟'),
    quote('بھائی جان، وہ واٹس ایپ والی ویب سائٹ دیکھی؟ اس سے آپ کو روز کے 2-3 آرڈر اضافی ملیں گے۔ Foodpanda 30% کمیشن لیتا ہے، میری سائٹ پر کوئی کمیشن نہیں۔'),
    heading('حصہ 3: آن لائن کمائی — Fiverr پر Gig کیسے بنائیں؟'),
    paragraph('Fiverr ایک ایسی مارکیٹ ہے جہاں باہر کے لوگ آپ سے ویب سائٹ بنواتے ہیں۔'),
    heading('Gig کا ٹائٹل'),
    quote('I will create a modern restaurant or biryani shop website with WhatsApp order button'),
    heading('Gig کے 3 پیکج'),
    list([
      'Basic — $20 میں ایک صفحے والی سائٹ جیسے آپ نے بنائی ہے۔',
      'Standard — $50 میں 3 صفحے + رنگین ڈیزائن + موبائل فرینڈلی۔',
      'Premium — $100 میں ڈومین، ہوسٹنگ اور 5 صفحے۔',
    ]),
    heading('Gig کی تفصیل میں کیا لکھنا ہے؟'),
    quote('Hello! I am Atif from Pakistan. I make fast, mobile-friendly websites for small restaurants and shops. What you will get: 1 Page Modern Website, Menu with images, WhatsApp Order Button, Mobile Friendly Responsive Design, and Free Hosting on Netlify. Check my demo: https://lahore-biryani-faisalabad.netlify.app Contact me before ordering!'),
    paragraph('ٹیگز میں لکھیں: restaurant website, biryani shop, small business website, html css'),
    heading('حصہ 4: پیسے کیسے لیں؟'),
    paragraph('لوکل کلائنٹ سے پیسے لینے کے لیے Easypaisa یا JazzCash بہترین ہے۔'),
    paragraph('پہلے 50% ایڈوانس لیں، جیسے 2500 Rs، پھر کام مکمل کر کے باقی 50%۔'),
    paragraph('آن لائن کلائنٹ کے لیے Fiverr خود ہی پیسے آپ کو دے دیتا ہے۔'),
    heading('حصہ 5: اعتراضات کا جواب'),
    paragraph('گاہک کہے گا: ہماری تو پہلے سے دکان چل رہی ہے۔ آپ کہیں: بھائی جان، اب زمانہ گوگل کا ہے، نئے گاہک آپ کو گوگل پر ڈھونڈتے ہیں۔'),
    paragraph('گاہک کہے گا: 5000 زیادہ ہے۔ آپ کہیں: بھائی جان، Foodpanda پر آپ مہینے کا 15,000 کمیشن دیتے ہو، میری سائٹ ایک بار کی فیس ہے۔'),
    heading('خود کر کے دیکھو — اس ہفتے کا ٹاسک'),
    list([
      'فیصل آباد کی 5 دکانوں کے نام لکھیں جن کی ویب سائٹ نہیں ہے۔',
      'ان میں سے 2 کے لیے مفت ڈیمو بنا کر Netlify پر لائیو کریں۔',
      'اوپر والا واٹس ایپ والا میسج ان کو بھیجیں۔',
      'Fiverr.com پر جا کر اپنا اکاؤنٹ بنائیں اور پہلی Gig کا ڈرافٹ بنائیں۔',
    ]),
    heading('عام غلطیاں'),
    list([
      'پہلے پیسے مانگنا، ڈیمو بعد میں دکھانا۔ ہمیشہ پہلے مفت ڈیمو۔',
      'انگریزی میں لمبی تقریر کرنا۔ دکاندار کو اردو میں سمجھائیں۔',
      'Fiverr پر بغیر ڈیمو لنک کے Gig بنانا۔ لنک لازمی ہے۔',
    ]),
    heading('کمائی سے کنکشن — آپ کا پہلا لاکھ'),
    paragraph('ایک ویب سائٹ 5,000 کی۔ مہینے میں 4 سائٹس = 20,000۔ سال میں 48 سائٹس = 240,000۔ اور جب آپ Fiverr پر 50 ڈالر والی سائٹ بیچنے لگیں گے تو ایک ہی سائٹ 14,000 کی بن جائے گی۔ یہی وہ راستہ ہے جس سے میرے بہت سے طلباء اب لاہور اور فیصل آباد میں اپنا چھوٹا سا سافٹ ویئر ہاؤس چلا رہے ہیں۔'),
    heading('ہوم ورک'),
    paragraph('اس ہفتے کم از کم 5 دکانوں کو پچ کریں اور شاما پر لکھیں کہ کتنے لوگوں نے جواب دیا اور کیا کہا۔ چاہے جواب نہ آئے، تب بھی لکھیں۔'),
  ],
};