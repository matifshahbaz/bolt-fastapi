import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CourseExperience } from '@/components/site/course-experience';
import { getCourseBySlug } from '@/lib/content-api';
import type { Course } from '@/lib/data';

const siteUrl = 'https://shama.pk';

type CourseDetailPageProps = {
	params: { id: string };
};

function getAbsoluteUrl(url: string) {
	return url.startsWith('http') ? url : `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`;
}

function getCanonicalUrl(course: Course) {
	return `${siteUrl}/course/${course.slug}`;
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
	const course = await getCourseBySlug(params.id);

	if (!course) {
		return {
			title: 'کورس نہیں ملا',
			robots: { index: false, follow: false },
		};
	}

	const canonicalUrl = getCanonicalUrl(course);
	const title = course.seoTitle ?? course.title;
	const description = course.metaDescription ?? course.description;
	const imageUrl = getAbsoluteUrl(course.coverImage);

	return {
		title,
		description,
		alternates: { canonical: canonicalUrl },
		openGraph: {
			title: `${course.title} | شمع.pk`,
			description: course.openGraphDescription ?? description,
			url: canonicalUrl,
			locale: 'ur_PK',
			type: 'website',
			images: [{ url: imageUrl, alt: course.title }],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${course.title} | شمع.pk`,
			description: course.openGraphDescription ?? description,
			images: [imageUrl],
		},
	};
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
	const course = await getCourseBySlug(params.id);

	if (!course) {
		notFound();
	}

	const canonicalUrl = getCanonicalUrl(course);
	const priceAmount = course.price.match(/\d+(?:\.\d+)?/)?.[0];

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Course',
		name: course.title,
		description: course.metaDescription ?? course.description,
		url: canonicalUrl,
		image: getAbsoluteUrl(course.coverImage),
		inLanguage: 'ur-PK',
		provider: {
			'@type': 'Organization',
			name: 'شمع.pk',
			sameAs: siteUrl,
		},
		hasCourseInstance: {
			'@type': 'CourseInstance',
			courseMode: 'online',
			inLanguage: 'ur-PK',
			instructor: {
				'@type': 'Person',
				name: course.instructor.name,
			},
		},
		...(priceAmount
			? {
				offers: {
					'@type': 'Offer',
					price: priceAmount,
					priceCurrency: 'PKR',
					url: canonicalUrl,
					availability:
						course.availability === 'coming-soon'
							? 'https://schema.org/PreOrder'
							: 'https://schema.org/InStock',
				},
			}
			: {}),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
			/>
			<CourseExperience course={course} />
		</>
	);
}
