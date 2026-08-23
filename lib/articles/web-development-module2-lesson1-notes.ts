import type { ArticleSection, LessonArticle } from '@/lib/data';

const heading = (text: string): ArticleSection => ({ type: 'heading', text });
const paragraph = (text: string): ArticleSection => ({ type: 'paragraph', text });
const list = (items: string[]): ArticleSection => ({ type: 'list', items });
const quote = (text: string): ArticleSection => ({ type: 'quote', text });

export const webDevelopmentModule2Lesson1Notes: LessonArticle = {
  excerpt:
    'HTML headings، paragraphs اور ordered و unordered lists استعمال کرکے بریانی شاپ کا مکمل آن لائن مینو بنائیں۔',
  content: [
    heading('ماڈیول 2 — سبق 2.1: بریانی شاپ کا مینو بناتے ہیں — HTML کی لسٹیں'),
    paragraph('عنوان: بریانی شاپ کا مینو — Headings, Paragraphs اور Lists'),
    paragraph('دورانیہ: 25 منٹ ویڈیو + 30 منٹ پریکٹس'),
    paragraph('مقصد: طالب علم اپنی ویب سائٹ پر ہیڈنگ، پیراگراف اور لسٹ بنا کر کسی بھی دکان کا مینو بنا سکے گا۔'),
    heading('ویڈیو کا ہک'),
    paragraph('فیصل آباد گھنٹہ گھر کے پاس ایک بریانی والا ہے۔ اس کے پاس رش لگا رہتا ہے لیکن اس کی کوئی ویب سائٹ نہیں۔ اگر اس کی ویب سائٹ ہوتی تو لوگ گھر بیٹھے مینو دیکھ سکتے۔ آج ہم اسی بریانی والے کے لیے ایک آن لائن مینو بنائیں گے۔ اور یہی ایک صفحہ کل کو آپ 5,000 روپے میں بیچ سکتے ہیں۔'),
    heading('حصہ 1: پچھلے سبق کی دہرائی'),
    list([
      'h1 = دکان کا سب سے بڑا بورڈ',
      'p = بورڈ کے نیچے چھوٹی لائن',
    ]),
    heading('حصہ 2: دو طرح کی لسٹیں'),
    list([
      'بغیر نمبر والی لسٹ — ul: جیسے بریانی کی دکان پر چکن بریانی، مٹن بریانی اور شامی کباب لکھا ہوتا ہے۔ اس میں نمبر ضروری نہیں۔ اسے Unordered List کہتے ہیں اور اس کا ٹیگ <ul> ہے۔',
      'نمبر والی لسٹ — ol: جیسے آرڈر کرنے کا طریقہ: 1. مینو پسند کرو، 2. واٹس ایپ کرو، 3. ڈیلیوری لو۔ اس میں ترتیب ضروری ہے۔ اسے Ordered List کہتے ہیں اور اس کا ٹیگ <ol> ہے۔',
      'لسٹ کے اندر ہر چیز کو <li> یعنی List Item کہتے ہیں۔',
    ]),
    paragraph('فارمولا یاد رکھو: ul کے اندر li، اور ol کے اندر li۔'),
    heading('حصہ 3: پریکٹیکل — لاہور بریانی ہاؤس کا مینو'),
    paragraph('اپنا meri-website فولڈر کھولیں، index.html میں پرانا کوڈ مٹا کر یہ نیا کوڈ لکھیں:'),
    quote('<!DOCTYPE html><html><head><title>Lahore Biryani House</title></head><body><h1>Lahore Biryani House - Faisalabad</h1><p>Asli Karachi Style Biryani, 30 saal se aap ki khidmat me!</p><h2>Hamara Mashhoor Menu</h2><ul><li>Chicken Biryani - 350 Rs - Full Plate</li><li>Mutton Biryani - 550 Rs - Full Plate</li><li>Shami Kabab - 50 Rs - 1 Piece</li><li>Cold Drink - 100 Rs</li></ul><h2>Order Kaise Karein?</h2><ol><li>Upar diye gaye menu se pasand karein</li><li>Hamare WhatsApp 0300-1234567 par message karein</li><li>30 minute me garam garam biryani aap ke darwaze par!</li></ol></body></html>'),
    heading('خود کر کے دیکھو — ٹاسک'),
    paragraph('اب اسی کوڈ کو بدل کر اپنی خود کی دکان بناؤ۔'),
    list([
      'اگر آپ کو کرکٹ پسند ہے تو Shahid Afridi Sports Shop بناؤ اور بیٹ، بال اور شرٹ کی لسٹ شامل کرو۔',
      'اگر آپ کو موبائل پسند ہیں تو Atif Mobile Shop بناؤ۔',
      'h1 میں اپنی دکان کا نام، ul میں چار چیزیں اور ان کی قیمت، اور ol میں آرڈر کا طریقہ لکھو۔',
    ]),
    heading('عام غلطیاں'),
    list([
      'ul کے اندر سیدھا لکھ دیا اور li لگانا بھول گئے۔ li لازمی ہے۔',
      'ہر ul کا اختتام </ul> سے کرنا ہے۔ بند کرنا مت بھولیں۔',
    ]),
    heading('آج کی کمائی سے کنکشن'),
    paragraph('آپ نے جو مینو بنایا ہے، یہی وہ چیز ہے جس کے لیے گھنٹہ گھر کا بریانی والا آپ کو 5,000 روپے دے سکتا ہے۔ آپ اسے کہیں گے کہ بھائی جان، میں نے آپ کی دکان کا ایک نمونہ بنایا ہے۔ گاہک گوگل پر Faisalabad Biryani لکھے گا تو آپ کی دکان آئے گی۔'),
    heading('چھوٹا سا کوئز'),
    list([
      'بغیر نمبروں والی لسٹ کے لیے کون سا ٹیگ ہے؟ a) ul  b) ol — جواب: a',
      'لسٹ کے اندر ہر آئٹم کے لیے کیا لکھتے ہیں؟ a) li  b) p — جواب: a',
      'آرڈر کے مراحل میں 1، 2، 3 کی ترتیب ضروری ہو تو کون سی لسٹ استعمال ہوگی؟ a) ul  b) ol — جواب: b',
    ]),
    heading('ہوم ورک'),
    paragraph('اپنی دکان والا مینو بنا کر اس کا سکرین شاٹ اپلوڈ کریں۔ ساتھ لکھیں کہ آپ نے کس چیز کی دکان بنائی۔'),
  ],
};