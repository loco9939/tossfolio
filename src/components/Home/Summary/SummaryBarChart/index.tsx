import { Asset } from '@/types';
import getTotalAssets from '@/utils/getTotalAsset';
import styled from 'styled-components';

type SummaryBarChartProps = {
  assetList: Asset[];
};

const Container = styled.div.attrs({
  role: 'summary-bar-chart',
})`
  display: flex;
  gap: 0.2rem;
  height: 2.8rem;
  border-radius: 1.2rem;
  overflow: hidden;
`;

const Bar_Dw = styled.div.attrs({
  role: 'dw-bar',
})`
  background-color: ${props => props.theme.colors['toss-yellow']};
`;

const Bar_Saving = styled.div.attrs({
  role: 'saving-bar',
})`
  background-color: ${props => props.theme.colors['toss-pink']};
`;

const Bar_Investment = styled.div.attrs({
  role: 'investment-bar',
})`
  background-color: ${props => props.theme.colors['toss-lightblue']};
`;

const Bar_Pension = styled.div.attrs({
  role: 'pension-bar',
})`
  background-color: ${props => props.theme.colors['toss-blue']};
`;

const Bar_Debt = styled.div.attrs({
  role: 'debt-bar',
})`
  background-color: ${props => props.theme.colors['toss-green']};
`;

const SummaryBarChart = ({ assetList }: SummaryBarChartProps) => {
  return (
    <Container>
      {Boolean(setWidth('dw', assetList)) && (
        <Bar_Dw
          style={{
            width: `${setWidth('dw', assetList)}%`,
          }}
        />
      )}
      {Boolean(setWidth('saving', assetList)) && (
        <Bar_Saving
          style={{
            width: `${setWidth('saving', assetList)}%`,
          }}
        />
      )}
      {Boolean(setWidth('investment', assetList)) && (
        <Bar_Investment
          style={{
            width: `${setWidth('investment', assetList)}%`,
          }}
        />
      )}
      {Boolean(setWidth('pension', assetList)) && (
        <Bar_Pension
          style={{
            width: `${setWidth('pension', assetList)}%`,
          }}
        />
      )}
      {Boolean(setWidth('debt', assetList)) && (
        <Bar_Debt
          style={{
            width: `${setWidth('debt', assetList)}%`,
          }}
        />
      )}
    </Container>
  );
};

export default SummaryBarChart;

function setWidth(key: string, assetList: Asset[]) {
  const totalAssetPrice = getTotalAssets(assetList);
  return (
    ((assetList.find(asset => asset.name === key)?.price ?? 0) /
      totalAssetPrice) *
    100
  );
}
