import { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";

// components
import TopBar from "../components/TopBar";
import Book from "../components/Book";

const MainPage = () => {
  // 책 목록을 저장할 state
  const [bookList, setBookList] = useState([]);
  // 렌더링 상태를 나타낼 state
  const [render, setRender] = useState(1);

  const BASE_URL = import.meta.env.VITE_API_URL;

  //---------------------------------------

  // 문제 1) 로컬 스토리지에서 token 값을 받아와 token 변수에 할당하기
  const token = localStorage.getItem("token");
  // 문제 2) axios를 사용하여 책 목록을 받아오는 API를 호출하는 getBookList 함수를 작성하기. (이때 받아온 데이터는 setBookList를 사용하여 bookList에 저장해주세요.)

  const getBookList = async () => {
    await axios({
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
      method: "get",
      url: `${BASE_URL}book/`,
    })
      .then((response) => {
        console.log(response);
        setBookList(response.data.data);
      })

      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }

  //---------------------------------------

  // ⬇️ 컴포넌트가 마운트될 때 getBookList 함수를 호출하는 코드
  useEffect(() => {
    getBookList();
  }, [render]);

  return (
    <>
      <Wrapper>
        <Container>
          <TopBar />
          <BookList>
            {bookList.map((book) => (
              <Book
                key={book.id}
                book={book}
                render={render}
                setRender={setRender}
              />
            ))}
          </BookList>
        </Container>
      </Wrapper>
    </>
  );
};

export default MainPage;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookList = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
`;
