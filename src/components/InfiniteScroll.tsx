import React, { useRef, useState, useEffect, CSSProperties } from "react";
import { Loading } from "./Loading/index";

// styling container wrapper
const containerStyle = {
  maxWidth: "1280px",
  margin: "0 auto",
};

// styling post container
const divStyle: CSSProperties = {
  color: "blue",
  height: "250px",
  textAlign: "center",
  padding: "5px 10px",
  background: "#eee",
  marginTop: "15px",
};

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: "20px", // ルートの範囲を拡張
  threshold: 1.0, // コールバックを実行するターゲットの見えている割合
};

export const InfiniteScroll = () => {
  const [postList, setPostList] = useState<{ list: number[] }>({
    list: [1, 2, 3, 4],
  });
  const [page, setPage] = useState<number>(1);
  const loader = useRef<HTMLDivElement | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader?.current);
    }
  }, [page]);

  useEffect(() => {
    const max = postList.list[postList.list.length - 1];

    setPostList({
      list: [...postList.list, max + 1, max + 2, max + 3, max + 4],
    });
    setLoading(false);
  }, [page]);

  const handleObserver: IntersectionObserverCallback = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
      setLoading(true);
    }
  };

  return (
    <div className="container" style={containerStyle}>
      <div className="post-list">
        {postList.list.map((post, index) => {
          return (
            <div
              key={index}
              ref={index === postList.list.length - 1 ? loader : null}
              className="post"
              style={divStyle}
            >
              <h2> {post} </h2>
            </div>
          );
        })}
      </div>
      <div>{isLoading && <Loading />}</div>
    </div>
  );
};
