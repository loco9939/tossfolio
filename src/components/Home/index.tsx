import { useNavigate } from 'react-router-dom';
import AssetList from './AssetList';
import MonthlyChart from './MonthlyChart';
import Summary from './Summary';

import useFetchLatestAssets from '@/hooks/useFetchLatestAssets';

import sessionStore from '@/stores/sessionStore';
import convertAssetResponse from '@/utils/convertAssetResponse';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Spinner from '../UI/Spinner';

const Button = styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.2rem 1.4rem;
  border-radius: 0.8rem;
  font-size: ${props => props.theme.fontSize.lg};
  background-color: ${props => props.theme.colors['toss-blue']};

  &:hover {
    opacity: 0.8;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const session = sessionStore(state => state.session);
  const { loading, latestAssets } = useFetchLatestAssets({
    user_id: session?.user?.id ?? '',
  });
  const year = dayjs().get('year');

  if (loading) {
    return <Spinner />;
  }

  if (latestAssets.length === 0) {
    return (
      <Button onClick={() => navigate(`/assets?year=${year}`)}>
        자산 등록 하러 가기
      </Button>
    );
  }

  const currentAsset = latestAssets[0];

  const currentAssetList = convertAssetResponse(currentAsset);

  return (
    <>
      <Summary assetList={currentAssetList} />
      <AssetList assetList={currentAssetList} />
      <MonthlyChart latestAssets={latestAssets} />
    </>
  );
};

export default Home;
