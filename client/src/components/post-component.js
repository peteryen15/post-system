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
      {currentUser && postData && (
        <div>
          <button
            className="btn btn-primary"
            style={{ width: "18rem", margin: "1rem" }}
          >
            新增貼文
          </button>
          {postData.length === 0 && (
            <div style={{ width: "18rem", margin: "1rem" }}>
              {console.log(postData.length)}
              您目前沒有任何貼文。
            </div>
          )}
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
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      type="button"
                      className="btn btn-light"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      編輯
                    </button>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Modal title
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">測試</div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" className="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
