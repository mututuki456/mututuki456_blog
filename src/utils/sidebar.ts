import { getCollection, type CollectionEntry } from 'astro:content';

// 1. BlogとTechの記事型をまとめた型を作る
type Post = CollectionEntry<'blog'> | CollectionEntry<'tech'>;

// キャッシュの型を更新
let _cache: {
    recentPosts: Post[];
    allTags: { name: string; count: number }[];
    allGenres: { name: string; count: number }[]; // 追加
} | null = null;

export async function getSidebarData() {
    if (_cache) {
        return _cache;
    }

    const blogPosts = await getCollection('blog');
    const techPosts = await getCollection('tech');
    const allPosts: Post[] = [...blogPosts, ...techPosts];

    // ソート処理 (既存)
    const sortedPosts = allPosts.sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    // --- タグ集計 (既存) ---
    const tagCounts: Record<string, number> = {};
    allPosts.forEach((post) => {
        if (post.data.tags) {
            post.data.tags.forEach((tag: string) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        }
    });
    const sortedTags = Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    // --- ジャンル集計 (新規追加) ---
    const genreCounts: Record<string, number> = {};
    allPosts.forEach((post) => {
        if (post.data.genre) {
            const genre = post.data.genre;
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        }
    });
    // ジャンルは名前順、あるいは件数順など好みに合わせてソート
    const sortedGenres = Object.entries(genreCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name)); // 名前順

    _cache = {
        recentPosts: sortedPosts.slice(0, 5),
        allTags: sortedTags,
        allGenres: sortedGenres, // 追加
    };

    return _cache;
}