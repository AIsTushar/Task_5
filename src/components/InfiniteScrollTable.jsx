import React, { useRef, useEffect, useCallback } from "react";

const InfiniteScrollTable = ({ data, fetchMoreData, hasMore }) => {
  const observer = useRef();

  const lastRecordElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, fetchMoreData]
  );

  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Index</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            if (data.length === index + 1) {
              return (
                <tr ref={lastRecordElementRef} key={user.id}>
                  <td className="border px-4 py-2">{user.index}</td>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.address}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                </tr>
              );
            } else {
              return (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.index}</td>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.address}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InfiniteScrollTable;
