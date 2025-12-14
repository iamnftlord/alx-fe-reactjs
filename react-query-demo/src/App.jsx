// src/App.jsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // 👈 Import these
import PostsComponent from "./components/PostsComponent";

// 1. Create a client instance outside the component
const queryClient = new QueryClient();

function App() {
  return (
    // 2. Wrap the components that use React Query
    <QueryClientProvider client={queryClient}> 
      <div>
        <h1>React Query Demo</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;