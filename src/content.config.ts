import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
		heroImage: image().optional(),
		tags: z.array(z.string()).optional(),
		genre: z.string().optional(),
		pickup: z.boolean().optional(),
	}),
});

const tech = defineCollection({
	loader: glob({ base: './src/content/tech', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
		heroImage: image().optional(),
		tags: z.array(z.string()).optional(),
		genre: z.string().optional(),
		pickup: z.boolean().optional(),
	}),
});

const policy = defineCollection({
  loader: glob({ base: './src/content/policy', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
  }),
});

const notice = defineCollection({
  loader: glob({ base: './src/content/notice', pattern: '**/*.{yml,yaml}' }),
  schema: z.object({
	date: z.string(),
	tag: z.string(),
	type: z.string(),
	message: z.string()
  })
});

export const collections = { blog, tech, policy, notice };
