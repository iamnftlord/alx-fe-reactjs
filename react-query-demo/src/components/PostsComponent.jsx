// src/components/PostsComponent.jsx

import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

export default function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({ // Using the object syntax for useQuery options
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // --- FIX START: Add the required options ---
    staleTime: 1000 * 60,            // 1 minute (You already had this - determines when data is "fresh")
    cacheTime: 1000 * 60 * 5,        // 5 minutes (How long inactive/unused data stays in cache)
    refetchOnWindowFocus: false,     // Disable automatic refetching when window regains focus
    // Not directly related to caching, but often used for loading states:
    // This tells React Query to hold onto the previous successful data while new data is fetching
    keepPreviousData: false,         
    // --- FIX END ---
  });

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Posts</h2>

      <button onClick={refetch}>Refetch Posts</button>

      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}