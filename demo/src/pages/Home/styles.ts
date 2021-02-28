import styled from 'styled-components'

import { Button } from 'src/components'

export const Container = styled.div`
  min-height: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  padding: 4.8rem;

  @media only screen and (max-width: 768px) {
    padding: 0;
  }

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: stretch;
  }
`

export const Item = styled.div`
  border-radius: 1rem;
  box-shadow: 1px 1px 16px 1px rgba(0, 0, 0, 0.1);

  padding: 1.6rem;
  margin: 1.6rem;

  background: ${(props) => props.theme.background};

  @media only screen and (min-width: 1000px) {
    flex: 1;
  }
`

export const Image = styled.img`
  height: 32rem;
  width: 100%;

  border-radius: 1rem;

  margin-bottom: 1.6rem;
`

export const CopyButton = styled(Button)``
