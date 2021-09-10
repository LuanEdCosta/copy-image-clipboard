import styled from 'styled-components'

import { Button } from 'src/components'

export const Container = styled.div`
  min-height: 100%;
  padding: 2.4rem 4.8rem;

  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding: 1.6rem;
  }
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

export const Item = styled.div`
  margin: 1.6rem;

  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`

export const Image = styled.img`
  height: 25rem;
  width: 25rem;

  border-radius: 1rem;

  margin-bottom: 0.8rem;

  @media only screen and (max-width: 1280px) {
    height: 20rem;
    width: 20rem;
  }

  @media only screen and (max-width: 768px) {
    height: 15rem;
    width: 15rem;
  }
`

export const CopyButton = styled(Button)`
  width: 100%;
`

export const Paste = styled.div`
  margin: 1.6rem;
  padding: 1.6rem;

  border: 0.5rem dotted ${(props) => props.theme.border};

  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`

export const PasteText = styled.div`
  font-size: 1.8rem;
  color: ${(props) => props.theme.secondaryText};
`

export const PasteImage = styled.img`
  max-width: 100%;
  border-radius: 1rem;
`
