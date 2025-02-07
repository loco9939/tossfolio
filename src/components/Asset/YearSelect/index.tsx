import { ChevronLeftBtn } from '@/components/UI';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

type YearSelectProps = {
  year: number;
  month?: number;
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.2rem;
  align-items: center;
  justify-content: center;
`;

const ChevronRightBtn = styled(ChevronLeftBtn)`
  svg {
    rotate: 180deg;
  }
`;

const Year = styled.span.attrs({
  role: 'year',
})`
  font-size: ${props => props.theme.fontSize.lg};
`;

const YearSelect = ({ year, month }: YearSelectProps) => {
  const [, setParams] = useSearchParams();

  const onClickPrev = () => {
    if (month) {
      setParams(`year=${year - 1}&month=${month}`);
    } else {
      setParams(`year=${year - 1}`);
    }
  };

  const onClickNext = () => {
    if (month) {
      setParams(`year=${year + 1}&month=${month}`);
    } else {
      setParams(`year=${year + 1}`);
    }
  };

  return (
    <Container>
      <ChevronLeftBtn role='prev' onClick={onClickPrev} />
      <Year>{year}</Year>
      <ChevronRightBtn role='next' onClick={onClickNext} />
    </Container>
  );
};

export default YearSelect;
