import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreatePost.scss";
import { createPost } from "../Redux/Features/PostSlice";
const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, post, error } = useSelector((state) => ({ ...state.app }));
  const [showPost, setShowPost] = useState(false);
  const initialState = {
    title: "",
    body: "",
  };
  const [values, setValues] = useState(initialState);
  console.log(values, "values");
  const { title, body } = values;
  console.log(values, "values");
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(createPost({ values }));
    setValues(initialState);
    setShowPost(true);
  };
  const changeHandler = (event) => {
    setValues(() => ({
      ...values,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <>
      <div className="create">
        <h1 className="create-title">CREATE POST</h1>
      </div>
      <form onSubmit={submitHandler} className="form">
        <div className="form-container">
          <input
            onChange={changeHandler}
            value={title}
            id="title"
            className="form-container__input"
          />
          <textarea
            onChange={changeHandler}
            value={body}
            id="body"
            className="form-container__textarea"
          />
        </div>
        <div className="form-btn">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="form-btn__home"
          >
            Go Home
          </button>
          <button className="form-btn__post">Post</button>
        </div>
      </form>
      {showPost ? (
        loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error.message}</h1>
        ) : (
          <div className="card">
            <p className="card-title">{post[0].title}</p>
            <p className="card--body">{post[0].body}</p>
          </div>
        )
      ) : null}
    </>
  );
};

export default CreatePost;
