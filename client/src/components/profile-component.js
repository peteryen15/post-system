import { useParams, useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/formatDateTime";
import { useEffect, useState } from "react";
import AccountService from "../services/account.service";

const ProfileComponent = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [authorProfile, setAuthorProfile] = useState({});

  useEffect(() => {
    if (name) {
      AccountService.get(name)
        .then((data) => {
          setAuthorProfile(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [name]);

  const handleClick = () => {
    const url = `/posts?author=${name}`;

    navigate(url);
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div style={{ maxWidth: "24rem" }} className="mx-auto">
        {!authorProfile && <div>找不到該作者的個人檔案。</div>}
        {authorProfile && (
          <div>
            <h2>以下是{name}的個人檔案：</h2>

            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">姓名：</th>
                  <td>
                    <strong>{authorProfile.name}</strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">用戶ID: </th>
                  <td>
                    <strong>{authorProfile._id}</strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">電子信箱:</th>
                  <td>
                    <strong> {authorProfile.email}</strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">註冊時間:</th>
                  <td>
                    <strong>{formatDateTime(authorProfile.date)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-grid mx-auto" style={{ maxWidth: "10rem" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                查看{name}的貼文
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
