# React + Vite Project -BOOKSTORE
리액트 + FireBase + 알라딘API 를 활용한 웹 프로젝트 

## 💻 프로젝트 소개
도서 검색과 관심 도서 추가, 장바구니 추가 및 주문하기가 가능한 북스토어입니다. 

## ⚙️개발환경
**Front-end**
- React (Vite)
- Database : firebase 10
- axios 라이브러리로 서버통신 관리
  
**Back-end**
- express  : CORS 이슈 발생으로 직접 알라딘 API를 호출하는 데 제약이 발생하여 이 문제를 해결하기 위해 Express 서버를 도입해 CORS 미들웨어를 사용하여 문제를 해결했습니다.
- API

## 📌주요기능

#### 로그인
- firebase 인증 기능으로 이메일/ 구글 / 깃허브 인증 중 선택하여 로그인 가능
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/93486ac2-b80f-4cee-9c83-e27ab10e4e50)

#### 회원가입
- 이메일/ 비밀번호로 회원가입 가능
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/e8871478-8010-4f01-a7cb-84c2fccaadfe)

#### 도서 실시간 검색 
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/23a7a608-4383-4672-a9cf-5e189c38d551)
- 메인 화면의 검색창으로 실시간 검색 가능
- 원하는 도서에 포커스 시 도서 상세 정보 출력
- 클릭 시 알라딘 상세보기 페이지로 이동
  

#### 도서 검색 
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/67731c1f-f1c7-433b-9eb7-506c25f93053)
- 원하는 옵션으로 정렬 가능
- 출력 개수 선택 가능
##### 관심 도서 추가 
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/f3729094-538a-4455-8204-3fab014967e1)
- 추가 시 하트 아이콘 색상 변경
- 이미 추가되어 있는 경우 관심 도서에서 제거 가능 

##### 장바구니 추가
- 장바구니에 추가 가능
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/cbdf6a6b-b586-423a-b34b-b8fe5eca6b92)
- 이미 장바구니에 추가되어있는 도서의 경우 장바구니로 이동 가능

##### 바로 결제 하기
- 장바구니에 담지 않고 바로 결제 페이지로 이동

#### 장바구니 
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/72cfd8c1-a8db-4e2b-941b-ed17da98649b)
- 장바구니에 추가된 도서들 확인 가능
- 수량 선택 가능 및 선택된 수량과 금액으로 총 수량과 상품금액 계산
- 선택한 도서 삭제 가능 
##### 주문하기 
- 장바구니에서 주문하기 클릭 시 넘어오는 페이지
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/e717d03e-02fc-4902-b711-a2a2856a338e)
- 다음 우편 번호 찾기 api 활용으로 우편 번호 찾기 가능
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/b4e31c45-c005-4860-a5d0-67ae4d11e6ce)
- 주소 선택 시 주소창에 자동 입력
- 필수 항목 미기재 시 
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/a94a4d96-ca63-4c34-a542-34aaae2a1aeb)

##### 주문완료 
- 결제하기 클릭 후 정상적으로 주문 완료 시 
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/f48c4309-2ff1-41c9-9436-e28321e068d6)


#### 마이페이지
- 좌측의 메뉴를 통해 관심 도서 목록과 주문 목록 조회 가능

##### 관심 도서 조회
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/ce4b0736-1a00-4159-a022-ead029f185e6)
- 관심 도서에 추가한 도서 목록 확인 가능
- 관심 도서에서 제거 가능 및 장바구니에 추가 가능 

##### 주문 목록 조회
- ![image](https://github.com/joeuni-ex/React_BookMarket/assets/141595215/bc634173-9024-4074-8b72-69629f0d46b8)
- 주문 완료된 도서 확인 가능


#### 배포주소 
- https://react-bookstore-joeuni-ex.netlify.app/

