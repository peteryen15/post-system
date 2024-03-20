import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../services/post.service";
import { formatDateTime } from "../utils/formatDateTime";

const PostComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [postData, setPostData] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [editedPost, setEditedPost] = useState({
    _id: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    if (name) {
      PostService.get(name)
        .then((data) => {
          setPostData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      PostService.get()
        .then((data) => {
          setPostData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [name]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

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
    if (index != null) {
      setEditedPost({
        _id: postData[index]._id,
        title: postData[index].title,
        content: postData[index].content,
      });
    } else {
      setEditedPost({
        _id: "",
        title: "",
        content: "",
      });
    }
  };

  const handleAddPost = () => {
    PostService.post(editedPost.title, editedPost.content)
      .then((data) => {
        window.alert(data.data.message);
        navigate(0);
      })
      .catch((e) => {
        showAlert(e.response.data.message, "");
      });
  };

  const handleFindPost = () => {
    PostService.get(name, searchInput)
      .then((data) => {
        setPostData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdatePost = (index) => {
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
      {postData && (
        <div>
          {currentUser && (
            <div>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "24rem", margin: "1rem" }}
                data-bs-toggle="modal"
                data-bs-target="#addPostModal"
                onClick={() => handleEditPost()}
              >
                新增貼文
              </button>

              <div
                className="modal fade"
                id="addPostModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="addPostModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="addPostModalLabel">
                        <input
                          onChange={handleTitleChange}
                          type="text"
                          className="form-control"
                          placeholder="標題"
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
                        placeholder="內容"
                        value={editedPost.content}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleAddPost}
                        type="button"
                        className="btn btn-primary"
                      >
                        儲存
                      </button>
                    </div>
                  </div>
                  <div id="alertPlaceholder"></div>
                </div>
              </div>
            </div>
          )}

          <div
            className="input-group"
            style={{ width: "24rem", margin: "1rem" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="輸入標題"
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleFindPost}
            >
              查詢貼文
            </button>
          </div>

          {postData.length === 0 && (
            <div style={{ width: "24rem", margin: "1rem" }}>沒有任何貼文。</div>
          )}
          {postData.map((post, index) => {
            return (
              <div
                className="card"
                style={{ width: "24rem", margin: "1rem" }}
                key={index}
              >
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    作者：{post.author}
                  </h6>
                  <p className="card-text">{post.content}</p>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                    <div className="d-grid">
                      <small className="text-body-secondary">
                        創建日期：{formatDateTime(post.createdAt)}
                      </small>
                      <small className="text-body-secondary">
                        編輯日期：
                        {!!post.updatedAt && formatDateTime(post.updatedAt)}
                      </small>
                    </div>
                    {currentUser && post.author === currentUser.user.name && (
                      <div>
                        <button
                          type="button"
                          className="btn btn-light"
                          data-bs-toggle="modal"
                          data-bs-target={`#editPostModal${index}`}
                          onClick={() => handleEditPost(index)}
                        >
                          編輯
                        </button>

                        <div
                          className="modal fade"
                          id={`editPostModal${index}`}
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex="-1"
                          aria-labelledby={`editPostModalLabel${index}`}
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-scrollable">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id={`editPostModalLabel${index}`}
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
                                  onClick={() => handleUpdatePost(index)}
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
                                  data-bs-target={`#editPostModal${index}`}
                                  data-bs-toggle="modal"
                                  aria-label="取消"
                                ></button>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-target={`#editPostModal${index}`}
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
                    )}
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
