from app.schemas.content import (
    ArticleDetail,
    ArticleSection,
    ArticleSummary,
    Category,
    Course,
    CourseModule,
    Instructor,
    Lesson,
    LessonArticle,
)


def _lesson_article(module_title: str, lesson_title: str, focus: str, image_url: str) -> LessonArticle:
    return LessonArticle(
        excerpt=f"{module_title} کے اس سبق میں {focus} کے لیے ایک سادہ اور عملی فریم ورک دیا گیا ہے۔",
        cover_image=image_url,
        content=[
            ArticleSection(type="heading", text="اس سبق کا خلاصہ"),
            ArticleSection(
                type="paragraph",
                text=f"{lesson_title} میں ہم {focus} کو عملی مثالوں کے ساتھ دیکھتے ہیں تاکہ طلبہ اسے فوراً اپنے کورس یا کیریئر پلان میں استعمال کر سکیں۔",
            ),
            ArticleSection(type="quote", text="پہلے سمجھیں، پھر دیکھیں، پھر خود آزما کر دیکھیں۔"),
            ArticleSection(type="image", src=image_url, alt=f"{module_title} — {lesson_title}"),
            ArticleSection(type="heading", text="اہم نکات"),
            ArticleSection(
                type="callout",
                title="فوری عملی استعمال",
                tone="highlight",
                text=f"{focus} کو چھوٹے اقدامات میں تقسیم کریں: سمجھیں، نوٹ کریں، پھر ایک چھوٹا سا عمل آج ہی مکمل کریں۔",
            ),
            ArticleSection(
                type="checklist",
                title="اس سبق کے بعد چیک لسٹ",
                items=[
                    f"{lesson_title} کے تین اہم نکات لکھیں",
                    f"{focus} کے لیے ایک مثال اپنے الفاظ میں بنائیں",
                    "اگلے سبق سے پہلے 1 چھوٹا عملی قدم مکمل کریں",
                ],
            ),
            ArticleSection(type="heading", text="اگلا قدم"),
            ArticleSection(
                type="paragraph",
                text="یہ ایک placeholder text lesson ہے۔ بعد میں آپ یہاں اصل آڈیو، اسکرین شاٹس، نوٹس، یا مکمل مضمون replace کر سکتے ہیں۔",
            ),
        ],
    )


def _video_lesson(module_id: str, index: int, title: str, duration: str, video_uid: str) -> Lesson:
    return Lesson(
        id=f"{module_id}-v{index}",
        kind="video",
        title=title,
        duration=duration,
        video_uid=video_uid,
    )


def _text_lesson(
    module_id: str,
    index: int,
    module_title: str,
    lesson_title: str,
    focus: str,
    image_url: str,
) -> Lesson:
    return Lesson(
        id=f"{module_id}-t{index}",
        kind="text",
        title=f"{lesson_title} — نوٹس",
        duration="8 منٹ پڑھائی",
        article=_lesson_article(module_title, lesson_title, focus, image_url),
    )


def _module_lessons(module_id: str, module_title: str, videos: list[dict[str, str]]) -> list[Lesson]:
    placeholder_images = [
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1181326/pexels-photo-1181326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ]

    lessons: list[Lesson] = []
    for index, video in enumerate(videos, start=1):
        lessons.append(_video_lesson(module_id, index, video["title"], video["duration"], video["video_uid"]))
        lessons.append(_text_lesson(module_id, index, module_title, video["title"], video["focus"], placeholder_images[(index - 1) % len(placeholder_images)]))
    return lessons


def _featured_course_modules() -> list[CourseModule]:
    return [
        CourseModule(
            id="m1",
            title="بنیادیں: خود کو پہچانیں",
            lessons=_module_lessons(
                "m1",
                "بنیادیں: خود کو پہچانیں",
                [
                    {"title": "تعارف: کیریئر رہنمائی کی اہمیت", "duration": "12 منٹ", "focus": "کیریئر رہنمائی کا بنیادی مقصد", "video_uid": "05364cb45c1b5ac9bc091c709da5e527"},
                    {"title": "اپنی صلاحیتوں کی شناخت", "duration": "18 منٹ", "focus": "strengths اور interests map کرنے کا طریقہ", "video_uid": "placeholder-m1-v2"},
                    {"title": "دلچسپی اور مہارت کا توازن", "duration": "15 منٹ", "focus": "interest-skill fit", "video_uid": "placeholder-m1-v3"},
                    {"title": "روٹین اور وقت کی منصوبہ بندی", "duration": "14 منٹ", "focus": "daily planning system", "video_uid": "placeholder-m1-v4"},
                ],
            ),
        ),
        CourseModule(
            id="m2",
            title="کیریئر کا انتخاب",
            lessons=_module_lessons(
                "m2",
                "کیریئر کا انتخاب",
                [
                    {"title": "مختلف کیریئر کے راستے", "duration": "20 منٹ", "focus": "career tracks overview", "video_uid": "fb6e5f113a4ad665c7130baaf685a3e9"},
                    {"title": "پاکستان میں ابھرتے ہوئے شعبے", "duration": "25 منٹ", "focus": "emerging sectors in Pakistan", "video_uid": "placeholder-m2-v2"},
                    {"title": "صحیح فیصلہ کیسے کریں", "duration": "18 منٹ", "focus": "decision-making framework", "video_uid": "placeholder-m2-v3"},
                ],
            ),
        ),
        CourseModule(
            id="m3",
            title="نوکوری تلاش اور درخواست",
            lessons=_module_lessons(
                "m3",
                "نوکوری تلاش اور درخواست",
                [
                    {"title": "سی وی بنانے کا فن", "duration": "22 منٹ", "focus": "CV structure and clarity", "video_uid": "placeholder-m3-v1"},
                    {"title": "کور لیٹر لکھنا", "duration": "16 منٹ", "focus": "cover letter personalization", "video_uid": "placeholder-m3-v2"},
                    {"title": "آن لائن جاب پورٹلز کا استعمال", "duration": "14 منٹ", "focus": "job portals and applications", "video_uid": "placeholder-m3-v3"},
                    {"title": "نوکوری کی تلاش کی حکمت عملی", "duration": "20 منٹ", "focus": "job search system", "video_uid": "placeholder-m3-v4"},
                ],
            ),
        ),
        CourseModule(
            id="m4",
            title="انٹرویو کی تیاری",
            lessons=_module_lessons(
                "m4",
                "انٹرویو کی تیاری",
                [
                    {"title": "انٹرویو سے پہلے کی تیاری", "duration": "18 منٹ", "focus": "pre-interview checklist", "video_uid": "placeholder-m4-v1"},
                    {"title": "عام سوالات اور جوابات", "duration": "25 منٹ", "focus": "question and answer practice", "video_uid": "placeholder-m4-v2"},
                    {"title": "پریزنٹیشن اور باڈی لینگویج", "duration": "16 منٹ", "focus": "presentation and body language", "video_uid": "placeholder-m4-v3"},
                ],
            ),
        ),
        CourseModule(
            id="m5",
            title="کاروبار شروع کرنا",
            lessons=_module_lessons(
                "m5",
                "کاروبار شروع کرنا",
                [
                    {"title": "کاروباری ذہن کی تعمیر", "duration": "20 منٹ", "focus": "business mindset", "video_uid": "placeholder-m5-v1"},
                    {"title": "بزنس آئیڈیا کی پہچان", "duration": "18 منٹ", "focus": "finding a business idea", "video_uid": "placeholder-m5-v2"},
                    {"title": "بجٹ اور منصوبہ بندی", "duration": "22 منٹ", "focus": "budgeting and planning", "video_uid": "placeholder-m5-v3"},
                    {"title": "مارکیٹنگ کی بنیادیں", "duration": "16 منٹ", "focus": "basic marketing system", "video_uid": "placeholder-m5-v4"},
                ],
            ),
        ),
        CourseModule(
            id="m6",
            title="ذاتی ترقی اور نیٹ ورکنگ",
            lessons=_module_lessons(
                "m6",
                "ذاتی ترقی اور نیٹ ورکنگ",
                [
                    {"title": "ذاتی برانڈ کی تعمیر", "duration": "18 منٹ", "focus": "personal branding", "video_uid": "placeholder-m6-v1"},
                    {"title": "نیٹ ورکنگ کی اہمیت", "duration": "15 منٹ", "focus": "professional networking", "video_uid": "placeholder-m6-v2"},
                    {"title": "مسلسل سیکھنے کی عادت", "duration": "20 منٹ", "focus": "lifelong learning habits", "video_uid": "placeholder-m6-v3"},
                ],
            ),
        ),
    ]


class ContentRepository:
    def __init__(self) -> None:
        self._categories = [
            Category(
                id="1",
                name="کیریئر رہنمائی",
                slug="career-guidance",
                icon="Compass",
                color="text-blue-600",
            ),
            Category(
                id="2",
                name="کاروباری",
                slug="entrepreneurship",
                icon="Rocket",
                color="text-orange-500",
            ),
            Category(
                id="3",
                name="نوکوری تلاش",
                slug="job-search",
                icon="Briefcase",
                color="text-green-600",
            ),
            Category(
                id="4",
                name="مہارتیں",
                slug="skills",
                icon="Sparkles",
                color="text-purple-600",
            ),
        ]

        self._featured_course = Course(
            id="career-guidance-for-pakistani-youth",
            title="پاکستانی نوجوانوں کے لیے کیریئر رہنمائی",
            subtitle="اپنے کیریئر کی سمت میں واضح رہنمائی حاصل کریں",
            description=(
                "یہ شمع.pk کا نمایاں اردو کورس ہے جو پاکستانی نوجوانوں کو "
                "کیریئر کا انتخاب، نوکوری کی تلاش، ذاتی برانڈ، اور کاروبار شروع "
                "کرنے کی عملی رہنمائی دیتا ہے۔"
            ),
            cover_image="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            duration="12 ہفتے",
            lessons=42,
            level="ابتدائی سے متوسط",
            language="اردو",
            rating=4.8,
            review_count=1240,
            learner_count="5,000+",
            price="Rs. 500",
            instructor=Instructor(
                name="ڈاکٹر عامر خان",
                title="کیریئر ماہر اور مصنف",
                bio=(
                    "ڈاکٹر عامر خان پچھلے 15 سال سے نوجوانوں کی کیریئر رہنمائی "
                    "کر رہے ہیں اور ہزاروں طلبہ کے ساتھ کام کر چکے ہیں۔"
                ),
                avatar="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
            ),
            outcomes=[
                "اپنی صلاحیتوں اور دلچسپیاں پہچانیں",
                "صحیح کیریئر کا انتخاب کرنا سیکھیں",
                "پروفیشنل سی وی اور کور لیٹر بنائیں",
                "انٹرویو کی تیاری اور اعتماد پیدا کریں",
                "نوکوری تلاش کرنے کے جدید طریقے سیکھیں",
                "کاروبار شروع کرنے کی بنیادی رہنمائی حاصل کریں",
            ],
            modules=_featured_course_modules(),
        )

        self._articles = [
            ArticleDetail(
                id="7",
                title="کاہلی اور سستی: اصل مسئلہ کیا ہے، اور آج سے اسے کیسے توڑا جائے؟",
                excerpt="کیا آپ بھی “کل سے” والی زندگی جی رہے ہیں؟ اگر پڑھائی، کام، یا نئے آغاز سے پہلے آپ بار بار ڈسٹریکشن کی طرف چلے جاتے ہیں، تو یہ مضمون اسی مزاحمت کو توڑنے کے بارے میں ہے۔",
                cover_image="/articles/kahli-cover.png",
                category="کیریئر رہنمائی",
                author="شمع.pk",
                published_at="24 جولائی 2026",
                reading_time="12 منٹ",
                content=[
                    ArticleSection(type="heading", text="کیا آپ بھی “کل سے” والی زندگی جی رہے ہیں؟"),
                    ArticleSection(type="heading", text="کبھی ایسا ہوا ہے؟"),
                    ArticleSection(type="paragraph", text="آپ کتاب کھولتے ہیں۔ قلم ہاتھ میں ہوتا ہے۔ یا کمپیوٹر آن ہے۔ ارادہ بھی پکا ہوتا ہے۔"),
                    ArticleSection(type="paragraph", text="پھر اچانک دل کہتا ہے: “بس پانچ منٹ موبائل دیکھ لیتا ہوں۔”"),
                    ArticleSection(type="paragraph", text="اور وہ پانچ منٹ آدھا گھنٹہ بن جاتے ہیں۔ کبھی گیم۔ کبھی ڈرامہ۔ کبھی واٹس ایپ۔ کبھی کرکٹ کلپس۔"),
                    ArticleSection(type="paragraph", text="آخر میں وہی پرانا جملہ: “کل سے صحیح روٹین شروع ہو گی۔”"),
                    ArticleSection(type="paragraph", text="اگر آپ یہ محسوس کرتے ہیں، تو آپ اکیلے نہیں ہیں۔ اور بھی بہت سے لوگ اسی راستے سے گزرتے ہیں۔"),
                    ArticleSection(type="paragraph", text="اور وقت ضائع کر کے اپنے خوابوں سے دور ہو جاتے ہیں۔"),
                    ArticleSection(type="image", src="/articles/kahli-2.png", alt="کاہلی اور سستی کے اصل مسئلے اور عملی حل کی علامتی تصویر"),
                    ArticleSection(type="heading", text="1۔ کاہلی کا اصل مسئلہ"),
                    ArticleSection(type="heading", text="1.1 اصل دشمن: اندرونی مزاحمت"),
                    ArticleSection(type="paragraph", text="کاہلی کا اصل نام اکثر “اندرونی مزاحمت” ہوتا ہے۔"),
                    ArticleSection(type="paragraph", text="کام شروع کرتے ہی دماغ سوال کرتا ہے:"),
                    ArticleSection(type="paragraph", text="اگر ناکام ہو گیا تو؟"),
                    ArticleSection(type="paragraph", text="اگر لوگ ہنسے تو؟"),
                    ArticleSection(type="paragraph", text="اگر مجھے سمجھ ہی نہ آیا تو؟"),
                    ArticleSection(type="paragraph", text="اگر میں اتنا اچھا نہ نکلا جتنا سوچتا ہوں؟"),
                    ArticleSection(type="paragraph", text="پھر دماغ آسان راستہ دکھاتا ہے۔ موبائل۔ بستر۔ چائے۔ گیم۔ ڈرامہ۔"),
                    ArticleSection(type="paragraph", text="اور دل کہتا ہے: “آج بس یہ قسط دیکھ لیتا ہوں۔ کل سے سنجیدہ ہو جاؤں گا۔”"),
                    ArticleSection(type="paragraph", text="مسئلہ گیم یا ڈرامہ نہیں۔ مسئلہ یہ ہے کہ ہم ہر بار اصل کام کو کل پر ڈال دیتے ہیں۔"),
                    ArticleSection(type="heading", text="2.1 پڑھائی شروع کرتے ہی سستی کیوں آتی ہے؟"),
                    ArticleSection(type="paragraph", text="مجھے کاہلی کا سب سے زیادہ تجربہ پڑھائی کے دوران ہوتا تھا۔"),
                    ArticleSection(type="paragraph", text="مضمون کھولتے ہی عجیب بے چینی شروع ہو جاتی۔ جیسے بس یہاں سے بھاگ جائیں۔ چائے پی لیں۔ موبائل دیکھ لیں۔ کچھ بھی کر لیں۔ مگر یہ کتاب نہ پڑھنی پڑے۔"),
                    ArticleSection(type="paragraph", text="یہی وجہ ہے کہ کئی طالب علم تین گھنٹے میز پر بیٹھے رہتے ہیں، مگر اصل پڑھائی شاید تیس منٹ بھی نہیں ہوتی۔"),
                    ArticleSection(type="paragraph", text="اگر آپ کے ساتھ بھی ایسا ہوتا ہے، تو یہ جان لیں: آپ عجیب نہیں ہیں۔"),
                    ArticleSection(type="paragraph", text="آپ کا دماغ مشکل کام کے شروع میں مزاحمت دکھا رہا ہے۔ اسے موٹیویشن نہیں، سسٹم چاہیے۔"),
                    ArticleSection(type="heading", text="1.3 کاہلی ہمیشہ سستی نہیں ہوتی"),
                    ArticleSection(type="paragraph", text="ہم سمجھتے ہیں کہ کاہل انسان وہ ہے جو بستر پر پڑا رہتا ہے۔"),
                    ArticleSection(type="paragraph", text="لیکن کبھی کبھی کاہلی حرکت کے اندر چھپی ہوتی ہے۔"),
                    ArticleSection(type="paragraph", text="آپ مصروف ہیں۔ مگر اصل کام نہیں کر رہے۔"),
                    ArticleSection(type="paragraph", text="آپ ای کامرس سیکھنے بیٹھتے ہیں۔ دس منٹ بعد سیاسی کمنٹس پڑھ رہے ہوتے ہیں۔ آپ کتاب کھولتے ہیں۔ مگر ذہن فیس بک، کسی ٹی وی پروگرام، گھر کے خرچ یا اگلے ہفتے کے کسی خیالی مسئلے میں پھنس جاتا ہے۔"),
                    ArticleSection(type="paragraph", text="یہی اصل مسئلہ ہے: آپ کچھ نہ کچھ کر رہے ہوتے ہیں۔ مگر وہ نہیں کر رہے ہوتے جو ضروری ہے۔"),
                    ArticleSection(type="heading", text="1.4 “لوگ کیا کہیں گے” بھی ایک رکاوٹ ہے"),
                    ArticleSection(type="paragraph", text="پاکستانی ماحول میں ایک بڑا جملہ ہے: “لوگ کیا کہیں گے؟”"),
                    ArticleSection(type="paragraph", text="آپ آن لائن اسٹور شروع کرنا چاہتے ہیں۔ کوئی کہتا ہے: “یہ سب چھوڑو، پکی نوکری دیکھو۔”"),
                    ArticleSection(type="paragraph", text="آپ سیلز کے لیے دکان میں داخل ہونا چاہتے ہیں۔ دل کہتا ہے: “اگر اس نے رد کر دیا تو؟”"),
                    ArticleSection(type="paragraph", text="آپ کلاس میں سوال پوچھنا چاہتے ہیں۔ دل کہتا ہے: “اگر سب ہنس پڑے تو؟”"),
                    ArticleSection(type="paragraph", text="یہ سستی نہیں۔ یہ خوف ہے۔ اور خوف کو چھوٹے عمل سے کم کیا جاتا ہے۔"),
                    ArticleSection(type="paragraph", text="خوف سوچنے سے کم نہیں ہوتا، عمل کرنے سے کم ہوتا ہے۔"),
                    ArticleSection(type="callout", title="اہم نکتہ", tone="highlight", text="کاہلی اکثر کم صلاحیتی کی علامت نہیں ہوتی۔ زیادہ تر مسئلہ یہ ہوتا ہے کہ دماغ شروع کے لمحے میں مزاحمت دکھاتا ہے اور ہم اسی مزاحمت کو حقیقت سمجھ بیٹھتے ہیں۔"),
                    ArticleSection(type="paragraph", text="اب سوال یہ ہے کہ اس مزاحمت اور خوف کو کیسے توڑا جائے؟ آئیے، تین آسان طریقوں سے شروع کرتے ہیں۔"),
                    ArticleSection(type="heading", text="کاہلی کو توڑنے کا خاکہ"),
                    ArticleSection(type="paragraph", text="مسئلہ ← تین طریقے ← آج کا پہلا قدم"),
                    ArticleSection(type="heading", text="2۔ کاہلی اور خوف کو کیسے توڑیں؟"),
                    ArticleSection(type="heading", text="2.1 پہلا طریقہ: پانچ منٹ کا اصول"),
                    ArticleSection(type="paragraph", text="یہ سب سے آسان طریقہ ہے۔"),
                    ArticleSection(type="paragraph", text="خود سے کہیں: “میں یہ کام صرف پانچ منٹ کروں گا۔”"),
                    ArticleSection(type="paragraph", text="نہ ایک گھنٹہ۔ نہ پورا باب۔ نہ مکمل روٹین۔ صرف پانچ منٹ۔"),
                    ArticleSection(type="paragraph", text="اگر پڑھنا ہے تو ایک پیراگراف۔ اگر کورس کرنا ہے تو پہلی ویڈیو کے پانچ منٹ۔ اگر کال کرنی ہے تو صرف نمبر ملائیں اور سلام کریں۔"),
                    ArticleSection(type="paragraph", text="پانچ منٹ دماغ کو دھوکا نہیں دیتے۔ وہ دماغ کو آغاز کا ثبوت دیتے ہیں۔"),
                    ArticleSection(type="image", src="/articles/kahli-3.png", alt="چھوٹے آغاز اور پانچ منٹ کے اصول کی علامتی تصویر"),
                    ArticleSection(type="heading", text="2.2 دوسرا طریقہ: ماحول کو آسان بنائیں"),
                    ArticleSection(type="paragraph", text="اگر موبائل سامنے ہے، نوٹیفکیشن آن ہیں، بستر پاس ہے، اور میز بکھری ہوئی ہے، تو آپ خود سے جنگ کر رہے ہیں۔"),
                    ArticleSection(type="paragraph", text="اور یہ جنگ ہر روز جیتنا مشکل ہے۔"),
                    ArticleSection(type="paragraph", text="یہ صرف میرا تجربہ نہیں۔"),
                    ArticleSection(type="paragraph", text="دنیا بھر میں ہونے والی تحقیقات یہی بتاتی ہیں کہ بار بار نوٹیفکیشن دیکھنے سے توجہ متاثر ہوتی ہے۔"),
                    ArticleSection(type="paragraph", text="ایک 2022ء کی پی ایل او ایس ون تحقیق میں دیکھا گیا کہ اسمارٹ فون نوٹیفکیشن کی آواز کے بعد شرکاء کے ردِعمل سست ہوئے۔ یعنی ایک چھوٹی سی “ٹن” بھی دماغ کو کام سے نکال دیتی ہے۔"),
                    ArticleSection(type="paragraph", text="پاکستان میں بھی اس مسئلے پر کام ہوا ہے۔ راولپنڈی کی دو نجی جامعات کے 360 طلبہ پر کی گئی تحقیق میں اسمارٹ فون کی عادت اور تعلیمی کارکردگی کے درمیان منفی تعلق سامنے آیا، جبکہ بہتر وقت کی تنظیم رکھنے والے طلبہ کے گریڈز نسبتاً بہتر پائے گئے۔"),
                    ArticleSection(type="callout", title="تحقیق کیا کہتی ہے؟", tone="research", text="2022ء کی ایک تحقیق میں دیکھا گیا کہ صرف نوٹیفکیشن کی آواز بھی ردِعمل کو سست کر سکتی ہے۔ پاکستان میں 360 طلبہ پر کی گئی ایک تحقیق نے اسمارٹ فون عادت اور تعلیمی کارکردگی کے درمیان منفی تعلق بھی دکھایا۔"),
                    ArticleSection(type="paragraph", text="سادہ بات یہ ہے: موبائل صرف وقت نہیں لیتا، یہ پڑھائی کے معیار پر بھی اثر ڈالتا ہے۔"),
                    ArticleSection(type="paragraph", text="اس لیے ماحول کو اپنے حق میں کریں:"),
                    ArticleSection(type="paragraph", text="موبائل دوسرے کمرے میں رکھیں۔"),
                    ArticleSection(type="paragraph", text="کتاب میز پر کھلی چھوڑیں۔"),
                    ArticleSection(type="paragraph", text="کام شروع کرنے سے پہلے صرف ایک چیز سامنے رکھیں۔"),
                    ArticleSection(type="paragraph", text="اگر الگ کمرہ نہیں تو میز کا ایک کونا ہی کافی ہے۔"),
                    ArticleSection(type="image", src="/articles/kahli-4.png", alt="کاہلی کے اصل اسباب اور روزمرہ ڈسٹریکشن کے چکر کی وضاحتی تصویر"),
                    ArticleSection(type="heading", text="2.3 تیسرا طریقہ: اعتماد چھوٹے ثبوتوں سے بنتا ہے"),
                    ArticleSection(type="paragraph", text="ہم اکثر اعتماد کا انتظار کرتے ہیں۔"),
                    ArticleSection(type="paragraph", text="جب اعتماد آئے گا، تب بات کریں گے۔"),
                    ArticleSection(type="paragraph", text="جب کانفیڈنس آئے گا، تب کاروبار شروع کریں گے۔"),
                    ArticleSection(type="paragraph", text="جب سب واضح ہوگا، تب پڑھائی شروع کریں گے۔"),
                    ArticleSection(type="paragraph", text="عملی زندگی کے شروع میں مجھے لگتا تھا کہ میٹنگ میں کوئی سینئر خود کہے گا:"),
                    ArticleSection(type="paragraph", text="“عاطف، اب آپ بات کریں۔ آپ کیا کہنا چاہتے ہیں؟”"),
                    ArticleSection(type="paragraph", text="لیکن حقیقت میں ایسا کم ہوتا ہے۔ آپ کو مناسب موقع دیکھ کر خود بولنا پڑتا ہے۔ آواز تھوڑی کانپے گی۔ جملہ مکمل پرفیکٹ نہیں ہوگا۔ لیکن بات اندر رکھنے سے اعتماد نہیں بنتا۔"),
                    ArticleSection(type="paragraph", text="عمل پہلے آتا ہے۔ اور اعتماد اُس کے بعد میں۔"),
                    ArticleSection(type="paragraph", text="جیمز کلیئر لکھتے ہیں: “آپ کا ہر عمل اس شخص کے حق میں ایک ووٹ ہے جو آپ بننا چاہتے ہیں۔”"),
                    ArticleSection(type="paragraph", text="چھوٹے ووٹ جمع ہوتے ہیں۔ پھر ایک دن آپ کو محسوس ہوتا ہے: “میں بدل رہا ہوں۔”"),
                    ArticleSection(type="paragraph", text="پانچ منٹ پڑھنا بھی ایک ووٹ ہے۔ ایک سوال پوچھنا بھی ایک ووٹ ہے۔ موبائل دور رکھنا بھی ایک ووٹ ہے۔"),
                    ArticleSection(type="quote", text="آپ کا ہر عمل اس شخص کے حق میں ایک ووٹ ہے جو آپ بننا چاہتے ہیں۔"),
                    ArticleSection(type="heading", text="عمل پہلے آتا ہے — اعتماد اُس کے بعد"),
                    ArticleSection(type="paragraph", text="قائداعظم محمد علی جناح کا ایک قول بھی اسی طرف اشارہ کرتا ہے: “ایمان، نظم و ضبط اور فرض سے بے لوث وابستگی کے ساتھ کوئی قابلِ قدر کام ایسا نہیں جو آپ حاصل نہ کر سکیں۔”"),
                    ArticleSection(type="paragraph", text="نظم و ضبط کسی ایک بڑے فیصلے سے نہیں بنتا، بلکہ روزانہ کے چھوٹے فیصلوں سے بنتا ہے۔"),
                    ArticleSection(type="heading", text="حل: تین آسان طریقے"),
                    ArticleSection(type="paragraph", text="3"),
                    ArticleSection(type="paragraph", text="چھوٹے ثبوت جمع کریں"),
                    ArticleSection(type="paragraph", text="ہر چھوٹا عمل اُس شخص کے حق میں ایک ووٹ ہے جو آپ بننا چاہتے ہیں۔"),
                    ArticleSection(type="paragraph", text="2"),
                    ArticleSection(type="paragraph", text="ماحول آسان بنائیں"),
                    ArticleSection(type="paragraph", text="موبائل دوسرے کمرے میں، کتاب کھلی، میز پر صرف ایک چیز۔"),
                    ArticleSection(type="paragraph", text="1"),
                    ArticleSection(type="paragraph", text="پانچ منٹ کا اصول"),
                    ArticleSection(type="paragraph", text="پورا باب نہیں — صرف ایک پیراگراف، ایک ویڈیو کے پانچ منٹ، ایک سلام۔"),
                    ArticleSection(type="heading", text="3۔ آج ہی عمل شروع کریں"),
                    ArticleSection(type="heading", text="3.1 آج کا چھوٹا سا پلان"),
                    ArticleSection(type="paragraph", text="کاہلی کا مطلب یہ نہیں کہ آپ میں صلاحیت نہیں۔ اکثر اس کا مطلب صرف یہ ہوتا ہے کہ آپ نے شروع کرنے کو بہت بڑا بنا دیا ہے۔"),
                    ArticleSection(type="paragraph", text="تو آج اسے چھوٹا کر دیں۔ بہت چھوٹا۔ اتنا چھوٹا کہ دماغ بہانہ نہ بنا سکے۔"),
                    ArticleSection(type="paragraph", text="آج پوری زندگی بدلنے کی کوشش نہ کریں۔"),
                    ArticleSection(type="paragraph", text="صرف اگلے پانچ منٹ بدل دیں۔"),
                    ArticleSection(type="paragraph", text="ایک صفحہ پڑھ لیں۔"),
                    ArticleSection(type="paragraph", text="ایک سوال حل کر لیں۔"),
                    ArticleSection(type="paragraph", text="ایک کال کر لیں۔"),
                    ArticleSection(type="paragraph", text="ایک پروڈکٹ لسٹنگ بنا لیں۔"),
                    ArticleSection(type="paragraph", text="ایک قدم اٹھا لیں۔"),
                    ArticleSection(type="paragraph", text="کیونکہ آخرکار..."),
                    ArticleSection(type="checklist", title="آج کا پلان — اگلے پانچ منٹ", items=["ایک صفحہ پڑھ لیں", "ایک سوال حل کر لیں", "ایک کال کر لیں", "ایک پروڈکٹ لسٹنگ بنا لیں", "موبائل دوسرے کمرے میں رکھ دیں"]),
                    ArticleSection(type="heading", text="3.2 نتیجہ"),
                    ArticleSection(type="paragraph", text="آپ نے سب کچھ ایک دن میں ٹھیک نہیں کرنا۔"),
                    ArticleSection(type="paragraph", text="بس اپنے آپ کو ڈسٹریکشن سے بچائیں۔ اور چند منٹ توجہ سے کام شروع کریں۔"),
                    ArticleSection(type="paragraph", text="نتیجہ خود آپ کے سامنے آ جائے گا۔"),
                    ArticleSection(type="paragraph", text="بس یاد رکھیں کہ کامیاب لوگ دوسروں سے زیادہ باصلاحیت نہیں ہوتے۔"),
                    ArticleSection(type="paragraph", text='وہ صرف وہ کام شروع کر دیتے ہیں جسے باقی لوگ "کل" پر چھوڑ دیتے ہیں۔'),
                    ArticleSection(type="image", src="/articles/kahli-6.png", alt="عمل اور نظم و ضبط سے تبدیلی لانے کی اختتامی علامتی تصویر"),
                ],
            ),
            ArticleDetail(
                id="1",
                title="توجہ کی معیشت: اسکرین، عادت، اور اپنی توجہ واپس لینے کا طریقہ",
                excerpt="کیا اسکرین آپ کے وقت پر قبضہ کر رہی ہے؟ یہ مضمون توجہ کی معیشت، سوشل میڈیا کے دباؤ، اور توجہ واپس لینے کے عملی طریقوں کو تین الگ کارڈز میں سادہ انداز سے سمجھاتا ہے۔",
                cover_image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                category="مہارتیں",
                author="شمع.pk",
                published_at="26 جولائی 2026",
                reading_time="9 منٹ",
                content=[
                    ArticleSection(type="heading", text="تعارف"),
                    ArticleSection(type="paragraph", text="آج کے دور میں مسئلہ صرف یہ نہیں کہ ہمارے پاس وقت کم ہے۔ اصل مسئلہ یہ ہے کہ ہماری توجہ بار بار ٹوٹتی ہے۔ نوٹیفکیشن، شارٹ ویڈیوز، اور endless scroll ہمارے فیصلوں کو اس حد تک متاثر کر دیتے ہیں کہ اصل کام پیچھے رہ جاتا ہے۔"),
                    ArticleSection(type="paragraph", text="یہ مضمون اسی مسئلے کو تین مختصر لیکن واضح حصوں میں توڑتا ہے تاکہ آپ سمجھ سکیں کہ توجہ کیوں بکھرتی ہے، سوشل میڈیا کہاں مدد کرتا ہے اور کہاں نقصان، اور پھر توجہ واپس کیسے لائی جائے۔"),
                    ArticleSection(type="heading", text="توجہ کی معیشت کیا ہے؟"),
                    ArticleSection(type="paragraph", text="جب کوئی ایپ آپ کی توجہ زیادہ دیر تک پکڑ لیتی ہے تو وہ اپنے اشتہار، اپنی فروخت، یا اپنی مصروفیت بڑھاتی ہے۔ اسی لیے پلیٹ فارم ایسے فیچرز بناتے ہیں جو آپ کو بار بار واپس لائیں۔"),
                    ArticleSection(type="callout", title="Card 01 — توجہ کہاں خرچ ہو رہی ہے؟", tone="highlight", text="توجہ کی معیشت میں ہر نوٹیفکیشن، ہر autoplay، اور ہر endless feed ایک چھوٹا سا دعویٰ ہے کہ آپ کا اگلا منٹ بھی اسی جگہ گزرے۔ یہ کارڈ دکھاتا ہے کہ وقت کے ساتھ ساتھ توجہ کی عادت بھی بدلتی ہے۔"),
                    ArticleSection(type="paragraph", text="اس کو سمجھنے کے بعد اگلا سوال یہ بنتا ہے: اگر پلیٹ فارم توجہ کھینچ رہے ہیں، تو صارف کے طور پر ہم کیا کر سکتے ہیں؟ جواب کا پہلا حصہ سوشل میڈیا کی صحیح اور غلط جگہوں کو الگ کرنا ہے۔"),
                    ArticleSection(type="heading", text="سوشل میڈیا: ذریعہ بھی، آزمائش بھی"),
                    ArticleSection(type="paragraph", text="سوشل میڈیا بذاتِ خود برا نہیں۔ مسئلہ اس وقت بنتا ہے جب ہم اسے ارادے کے بغیر کھولتے ہیں اور اپنے دن کا پہلا اور آخری گھنٹہ اسی میں گنوا دیتے ہیں۔"),
                    ArticleSection(type="paragraph", text="پوسٹس، ریلس، اور فیڈز بعض اوقات سیکھنے، جڑنے، اور کاروباری مواقع تک پہنچنے کا ذریعہ بنتے ہیں۔ لیکن اگر استعمال کا کوئی مقصد نہ ہو تو یہی پلیٹ فارم وقت، ذہنی توانائی، اور توجہ تینوں کھا جاتے ہیں۔"),
                    ArticleSection(type="callout", title="Card 02 — ایک ہی موبائل: دو راستے", tone="research", text="اہم سوال: یہ رسائی نوجوان کو علم و روزگار کی طرف لے جا رہی ہے یا وقت گزاری کی طرف؟", subtitle="الگورتھم آپ کی کمزوری نہیں ڈھونڈتا، وہ آپ کی عادت ڈھونڈتا ہے۔ جس چیز پر آپ تھوڑی دیر رکتے ہیں، پلیٹ فارم اسے اور بڑھا دیتا ہے۔"),
                    ArticleSection(type="paragraph", text="ایک واضح حد یہ ہو سکتی ہے کہ سوشل ایپس دن میں صرف دو مرتبہ کھولی جائیں: ایک بار دوپہر میں اور ایک بار شام کو۔ اس سے آپ user بھی رہتے ہیں اور machine کے ہاتھوں driven بھی نہیں بنتے۔"),
                    ArticleSection(type="heading", text="اپنی توجہ واپس لینے کے عملی طریقے"),
                    ArticleSection(type="paragraph", text="توجہ واپس لینا کسی بڑے عزم سے زیادہ ایک چھوٹے سسٹم کی ضرورت ہے۔ اگر ماحول بکھرا ہو، فون سامنے ہو، اور نوٹیفکیشن آن ہوں، تو صرف ارادے پر انحصار کافی نہیں ہوتا۔"),
                    ArticleSection(type="callout", title="Card 03 — 5 منٹ کا ری سیٹ", tone="tip", text="پہلے پانچ منٹ میں فون دور رکھیں، ایک کام منتخب کریں، اور صرف اتنا ہی شروع کریں کہ دماغ بہانہ نہ بنا سکے۔ پانچ منٹ کے بعد اکثر inertia ٹوٹ جاتی ہے اور اصل کام آسان لگنے لگتا ہے۔"),
                    ArticleSection(type="checklist", title="عملی چیک لسٹ: اپنی توجہ واپس لینے کے 5 قدم", text="روزمرہ میں توجہ واپس لینے کے لیے ایک سادہ، ادارتی فریم ورک۔", items=["روزانہ 30 منٹ کے لیے ایک ہی کام پر توجہ مرکوز کریں", "غیر ضروری نوٹیفکیشن بند کریں", "سوشل میڈیا کو مخصوص وقت تک محدود کریں", "بغیر سوچے موبائل اٹھانے کی عادت کم کریں", "ہر دن کے آخر میں اپنی پیش رفت کا جائزہ لیں"], footer="فرق نیت، وقت کی حد اور مقصد کے واضح ہونے سے پیدا ہوتا ہے۔"),
                    ArticleSection(type="heading", text="نتیجہ"),
                    ArticleSection(type="paragraph", text="توجہ کوئی مبہم چیز نہیں۔ آپ اسے محفوظ بھی کر سکتے ہیں اور آہستہ آہستہ واپس بھی لا سکتے ہیں۔ چھوٹے فیصلے، واضح حدیں، اور ایک سادہ روزمرہ سسٹم اس کا اصل حل ہیں۔"),
                ],
            ),
            ArticleDetail(
                id="2",
                title="کاروبار شروع کرنے کے 10 ضروری اقدامات",
                excerpt="اگر آپ اپنا کاروبار شروع کرنا چاہتے ہیں تو یہ مضمون منصوبہ بندی، بجٹ، مارکیٹ، اور آغاز کے بنیادی اصول واضح کرتا ہے۔",
                cover_image="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                category="کاروباری",
                author="ڈاکٹر عامر خان",
                published_at="10 جنوری 2025",
                reading_time="10 منٹ",
                content=[
                    ArticleSection(type="heading", text="پہلا قدم"),
                    ArticleSection(type="paragraph", text="کاروبار کی ابتدا واضح مسئلے، درست صارف، اور کم لاگت ابتدائی منصوبے سے کریں۔"),
                    ArticleSection(type="heading", text="عملی تیاری"),
                    ArticleSection(type="paragraph", text="بجٹ، مارکیٹ تحقیق، اور ابتدائی فروختی حکمت عملی کے بغیر آغاز کمزور رہتا ہے۔"),
                ],
            ),
        ]

    def list_categories(self) -> list[Category]:
        return self._categories

    def get_featured_course(self) -> Course:
        return self._featured_course

    def get_course_by_id(self, course_id: str) -> Course | None:
        if self._featured_course.id == course_id:
            return self._featured_course
        return None

    def list_articles(self) -> list[ArticleSummary]:
        return [ArticleSummary(**article.model_dump(exclude={"content"})) for article in self._articles]

    def get_article(self, article_id: str) -> ArticleDetail | None:
        return next((article for article in self._articles if article.id == article_id), None)