import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const blogPosts = await getCollection('blog');
    const techPosts = await getCollection('tech');

	const allPosts = [...blogPosts, ...techPosts].sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

	return rss({
		title: `${SITE_TITLE}`,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allPosts.map((post) => ({
			...post.data,
			link: `/${post.collection}/${post.id}/`,
		})),
	});
}
