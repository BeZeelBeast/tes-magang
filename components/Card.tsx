"use client";

import { useEffect, useState } from "react";
import { fetchIdeas } from "@/lib/api";

interface Idea {
  id: number;
  title: string;
  published_at: string;
  small_image?: { url: string } | null;
}

export default function Card() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("-published_at");
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    setLoading(true);
    fetchIdeas({ pageNumber: page, pageSize, sort: sortOrder }).then((data) => {
      setIdeas(data);
      setLoading(false);
    });
  }, [page, pageSize, sortOrder]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <main className="p-6 max-w-6xl mx-auto min-h-screen text-black px-10">
      <div className="flex justify-between items-center mb-6">
        <p>
          Showing {start}-{end} of {totalItems}
        </p>

        <div className="flex gap-4 items-center">
          <p>Show per page:</p>
          <select
            className="border rounded-full px-2 py-1"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <p>Sort by:</p>
          <select
            className="border rounded-full px-2 py-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {ideas.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={item.small_image?.url || "https://via.placeholder.com/400"}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-left">
              <p className="text-gray-500 text-xs mb-1 uppercase">
                {new Date(item.published_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-3">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-4 py-2 rounded ${
              num === page
                ? "bg-orange-500 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </main>
  );
}
