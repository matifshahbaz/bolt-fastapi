import type { Metadata } from 'next';
import CoursePage from '@/app/course/page';

export const metadata: Metadata = {
	title: 'نوجوانوں کے لیے کیریئر رہنمائی کورس',
	description: 'پاکستانی نوجوانوں کے لیے اردو میں کیریئر انتخاب، مہارتوں، نوکری اور کاروبار کا عملی کورس۔',
	alternates: { canonical: 'https://shama.pk/course/youth-career-guidance' },
	openGraph: {
		title: 'نوجوانوں کے لیے کیریئر رہنمائی کورس | شمع.pk',
		description: 'پاکستانی نوجوانوں کے لیے اردو میں کیریئر انتخاب، مہارتوں، نوکری اور کاروبار کا عملی کورس۔',
		url: 'https://shama.pk/course/youth-career-guidance',
		locale: 'ur_PK',
		type: 'website',
	},
};

export default CoursePage;
