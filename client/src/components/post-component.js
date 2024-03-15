import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";

const PostComponent = ({ currentUser, setCurrentUser }) => {
  const [postData, setPostData] = useState("");
  useEffect(() => {
    if (currentUser) {
      PostService.get()
        .then((data) => {
          setPostData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>在顯示您的貼文之前，請先登入會員。</div>}
      {currentUser && postData.length == 0 && <div>您目前沒有任何貼文。</div>}
      {currentUser && postData && (
        <div>
          {postData.map((post, index) => {
            return (
              <div
                className="card"
                style={{ width: "18rem", margin: "1rem" }}
                key={index}
              >
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                  <a href="#" className="card-link">
                    編輯
                  </a>
                  <a href="#" className="card-link">
                    刪除
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostComponent;
