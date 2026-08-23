import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CourseExperience } from '@/components/site/course-experience';
import { getCourseBySlug } from '@/lib/content-api';

type CourseDetailPageProps = {
	params: { id: string };
};

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
	const course = await getCourseBySlug(params.id);

	if (!course) {
		return {
			title: 'کورس نہیں ملا',
			robots: { index: false, follow: false },
		};
	}

	const canonicalUrl = `https://shama.pk/course/${course.slug}`;

	return {
		title: course.seoTitle ?? course.title,
		description: course.metaDescription ?? course.description,
		alternates: { canonical: canonicalUrl },
		openGraph: {
			title: `${course.title} | شمع.pk`,
			description: course.openGraphDescription ?? course.metaDescription ?? course.description,
			url: canonicalUrl,
			locale: 'ur_PK',
			type: 'website',
			images: [{ url: course.coverImage, alt: course.title }],
		},
	};
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
	const course = await getCourseBySlug(params.id);

	if (!course) {
		notFound();
	}

	return <CourseExperience course={course} />;
}
