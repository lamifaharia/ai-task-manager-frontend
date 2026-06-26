const posts = [
  { id: 1, title: "How AI is Changing Task Management", date: "Jan 15, 2025", category: "AI", excerpt: "Explore how large language models like Claude are making productivity tools smarter and more intuitive than ever before.", readTime: "4 min read" },
  { id: 2, title: "5 Tips for Better Task Prioritization", date: "Jan 10, 2025", category: "Productivity", excerpt: "Prioritizing tasks effectively is one of the most powerful skills you can develop. Here are five proven strategies.", readTime: "3 min read" },
  { id: 3, title: "Building a Full-Stack App with React and Express", date: "Jan 5, 2025", category: "Development", excerpt: "A step-by-step guide to building a production-ready full-stack web application with React, Express, and modern tooling.", readTime: "8 min read" },
  { id: 4, title: "Dark Mode Design Best Practices", date: "Dec 28, 2024", category: "Design", excerpt: "Learn how to implement dark mode properly — including contrast ratios, color selection, and user preference persistence.", readTime: "5 min read" },
];

const categoryColors = {
  AI: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  Productivity: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  Development: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  Design: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
};

export default function Blog() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">TaskAI Blog</h1>
        <p className="text-gray-500 dark:text-slate-400">Productivity tips, AI insights, and development tutorials.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 card-hover">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[post.category]}`}>{post.category}</span>
              <span className="text-xs text-gray-400 dark:text-slate-500">{post.readTime}</span>
            </div>
            <h2 className="font-bold text-base mb-2 leading-snug">{post.title}</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 dark:text-slate-500">{post.date}</span>
              <button className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors">Read more →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}