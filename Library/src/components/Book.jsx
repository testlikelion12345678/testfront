import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

// Data
import { bookCover } from "../_mock/bookData";

const Book = ({ book, render, setRender }) => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;
  //---------------------------------------

  // 문제 9) 책 스크랩 함수 작성하기
  const handleLikeBook = () => {
    // 로컬 스토리지에서 token 값을 받아와 token 변수에 할당
    const token = localStorage.getItem("token");
    // 토큰이 존재하면 axios를 사용하여 좋아요 여부 변경 API를 호출하고, 그게 아니면 navigate를 사용하여 로그인 페이지로 이동
    if (token) {
      axios({
        headers: {
        Authorization: token && `Bearer ${token}`,
        },
        method: "patch",
        url: `${BASE_URL}book/scrap/${book.id}/`,
      })
        .then((response) => {
          console.log(response);
          setRender(render + 1);
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    } else {
      navigate('/login');
    }
  };

  //---------------------------------------

  return (
    <Wrapper>
      <BookCover src={bookCover[book.id - 1]} />
      <TitleWrapper>
        {book.name}
        {book.is_liked ? (
          <img src="/fLikeIcon.svg" alt="flikeIcon" onClick={handleLikeBook} />
        ) : (
          <img src="/likeIcon.svg" alt="likeIcon" onClick={handleLikeBook} />
        )}
      </TitleWrapper>
    </Wrapper>
  );
};

export default Book;

const Wrapper = styled.div`
  width: 170px;
  display: flex;
  flex-direction: column;
  color: #6b6c6d;
  font-weight: 600;
  margin: 0 15px;
`;

const BookCover = styled.img`
  width: 100%;
  height: 240px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;

  img {
    width: 30px;
    height: 30px;
  }
`;
