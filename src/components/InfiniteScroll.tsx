import React, { useRef, useState, useEffect, CSSProperties } from "react";
// styling post container
const divStyle: CSSProperties = {
  color: "blue",
  height: "250px",
  textAlign: "center",
  padding: "5px 10px",
  background: "#eee",
  marginTop: "15px",
};

// styling container wrapper
const containerStyle = {
  maxWidth: "1280px",
  margin: "0 auto",
};

export const InfiniteScroll = () => {
  // initialize list of posts
  const [postList, setPostList] = useState<{ list: number[] }>({
    list: [1, 2, 3, 4],
  });
  // tracking on which page we currently are
  const [page, setPage] = useState<number>(1);
  // add loader reference
  const loader = useRef<HTMLDivElement | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    // initialize IntersectionObserver
    // add attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader?.current);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // here we simulate adding new posts to List
      const newList = postList.list.concat([1, 1, 1, 1]);
      setPostList({
        list: newList,
      });
      setLoading(false);
    }, 1000);
  }, [postList.list, page]);

  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
      setLoading(true);
    }
  };

  if (isLoading) {
    console.log("now loading ... ");
  }

  return (
    <div className="container" style={containerStyle}>
      <div className="post-list">
        {postList.list.map((post, index) => {
          return (
            <div key={index} className="post" style={divStyle}>
              <h2> {post} </h2>
            </div>
          );
        })}
        {/* Add Ref to Load More div */}
        <div className="loading" ref={loader}>
          <h2>Load More</h2>
        </div>
      </div>
    </div>
  );
};
