import sessionStore from '@/stores/sessionStore';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  padding-top: 0.4rem;
  list-style: none;

  li {
    position: relative;
    cursor: pointer;
    user-select: none;
    padding: 0.2rem;

    &:not(:hover) {
      color: ${props => props.theme.colors['text-secondary']};
    }

    &:hover::after {
      position: absolute;
      bottom: -0.2rem;
      left: 0;
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: ${props => props.theme.colors['text-primary']};
    }
  }

  @media (max-width: 460px) {
    font-size: 1rem;
    gap: 0.4rem;
  }
`;

const Gnb = () => {
  const signOut = sessionStore(state => state.signOut);
  const navigate = useNavigate();
  const year = dayjs().year();

  const handleLogout = () => {
    signOut();
    navigate('/landing');
  };
  return (
    <Nav>
      <li onClick={() => navigate('/')}>홈으로</li>
      <li onClick={() => navigate(`/assets?year=${year}`)}>자산관리</li>
      <li onClick={handleLogout}>로그아웃</li>
    </Nav>
  );
};

export default Gnb;
