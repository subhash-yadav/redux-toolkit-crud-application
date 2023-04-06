import React, { useEffect, useState } from "react";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchPost,
  setEdit,
  updatePost,
} from "../Redux/Features/PostSlice";
import DataPost from "./DataPost";
import { useNavigate } from "react-router-dom";
const Post = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, error, body, edit } = useSelector((state) => ({
    ...state.app,
  }));
  console.log(post, "Post");
  const [searchId, setSearchId] = useState("");
  const [textBody, setTextBody] = useState("");
  const changeHandler = (event) => {
    event.preventDefault();
    setSearchId(event.target.value);
  };
  const fetchHandler = () => {
    if (!searchId) {
      window.alert("Please Provide ID");
    } else {
      dispatch(fetchPost(searchId));
    }
    setSearchId("");
  };
  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);
  const deleteHandler = (id) => {
    dispatch(deletePost(id));
    window.location.reload();
    window.alert("Are You Sure Want to Delete ?");
  };
  return (
    <>
      <form action="">
        <div className="search">
          <p className="search-title">Search By ID:</p>
          <input
            onChange={changeHandler}
            value={searchId}
            type="number"
            placeholder="Enter Id:"
            className="search-input"
          />
        </div>
      </form>
      <div className="btn">
        <button onClick={fetchHandler} type="submit" className="btn-fetch">
          Fetch Post
        </button>
        <button
          type="button"
          className="btn-create"
          onClick={() => navigate("/create-post")}
        >
          Create Post
        </button>
      </div>
      <>
        {post.length > 0 ? (
          loading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>{error.message}</h1>
          ) : (
            <div className="card">
              <h3 className="card-title">{post[0].title}</h3>
              {edit ? (
                <>
                  <textarea
                  className="card-textarea"
                    value={textBody}
                    cols="27"
                    rows="7"
                    onChange={(e) => setTextBody(e.target.value)}
                  ></textarea>
                  <div className="card-btn">
                    <button 
                    onClick={()=>{dispatch(updatePost({
                      id:post[0].id,
                      title:post[0].title,
                      body:textBody
                    }))
                    dispatch(setEdit(false))
                  }}
                    className="card-btn__edit">Save</button>
                    <button
                      onClick={() => dispatch(setEdit(false))}
                      className="card-btn__delete"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="card-body">{post[0].body}</p>
                </>
              )}
              {!edit && (
                <div className="card-btn">
                  <button
                    onClick={() =>
                      dispatch(setEdit({ edit: true, body: post[0].body }))
                    }
                    className="card-btn__edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHandler(post[0].id)}
                    className="card-btn__delete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )
        ) : null}
      </>
    </>
  );
};

export default Post;
