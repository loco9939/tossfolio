import sessionStore from '@/stores/sessionStore';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import useSession from '@/hooks/useSession';

const StyledLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;

  max-width: 50rem;
  margin-inline: auto;

  main {
    position: relative;
    padding: 1.2rem;
  }
`;

const Layout = () => {
  const navigate = useNavigate();
  const session = sessionStore(state => state.session);

  useSession();

  if (!session) {
    navigate('/landing');
  }

  return (
    <StyledLayout>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
