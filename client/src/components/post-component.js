import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post.service";

const PostComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState("");
  const [editedPost, setEditedPost] = useState({
    _id: "",
    title: "",
    content: "",
  });

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
  }, [currentUser]);

  const handleTitleChange = (e) => {
    setEditedPost({
      ...editedPost,
      title: e.target.value,
    });
  };

  const handleContentChange = (e) => {
    setEditedPost({
      ...editedPost,
      content: e.target.value,
    });
  };

  const handleEditPost = (index) => {
    setEditedPost({
      _id: postData[index]._id,
      title: postData[index].title,
      content: postData[index].content,
    });
  };

  const handleSaveChange = (index) => {
    PostService.patch(editedPost._id, editedPost.title, editedPost.content)
      .then((data) => {
        window.alert(data.data.message);
        navigate(0);
      })
      .catch((e) => {
        showAlert(e.response.data.message, index);
      });
  };

  const handleDeletePost = () => {
    PostService.delete(editedPost._id)
      .then((data) => {
        window.alert(data.data.message);
        navigate(0);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showAlert = (message, index) => {
    const alertPlaceholder = document.getElementById(
      `alertPlaceholder${index}`
    );
    alertPlaceholder.innerHTML = [
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">`,
      `   <div>${message}</div>`,
      "</div>",
    ].join("");

    window.setTimeout(() => {
      alertPlaceholder.innerHTML = "";
    }, 3000);
  };

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
                      data-bs-target={`#postModal${index}`}
                      onClick={() => handleEditPost(index)}
                    >
                      編輯
                    </button>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id={`postModal${index}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby={`postModalLabel${index}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id={`postModalLabel${index}`}
                        >
                          <input
                            onChange={handleTitleChange}
                            type="text"
                            className="form-control"
                            value={editedPost.title}
                          />
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="取消"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <textarea
                          onChange={handleContentChange}
                          className="form-control"
                          style={{ height: "300px", resize: "none" }}
                          // placeholder="Leave a comment here"
                          value={editedPost.content}
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger me-auto"
                          data-bs-toggle="modal"
                          data-bs-target={`#deletePostModal${index}`}
                        >
                          刪除貼文
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          取消
                        </button>
                        <button
                          onClick={() => handleSaveChange(index)}
                          type="button"
                          className="btn btn-primary"
                        >
                          儲存變更
                        </button>
                      </div>
                    </div>
                    <div id={`alertPlaceholder${index}`}></div>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id={`deletePostModal${index}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby={`deletePostModalLabel${index}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id={`deletePostModalLabel${index}`}
                        >
                          確定刪除貼文？
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-target={`#postModal${index}`}
                          data-bs-toggle="modal"
                          aria-label="取消"
                        ></button>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-target={`#postModal${index}`}
                          data-bs-toggle="modal"
                        >
                          取消
                        </button>
                        <button
                          onClick={handleDeletePost}
                          type="button"
                          className="btn btn-danger"
                        >
                          確定刪除
                        </button>
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
