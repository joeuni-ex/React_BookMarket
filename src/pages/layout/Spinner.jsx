import styled from "styled-components";
import spinner from "../../assets/spinner.gif";

const Spinner = () => {
  const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  `;

  return (
    <SpinnerContainer>
      <img src={spinner} alt="로딩중.." />
    </SpinnerContainer>
  );
};

export default Spinner;
