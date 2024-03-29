import styled, { css } from 'styled-components'

export const Button = styled.button.attrs((props) => ({
  type: props.type || 'button',
}))`
  min-height: 5rem;

  outline: none;
  border: none;
  border-radius: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 1.6rem;
  color: white;

  padding: 0.8rem 2.4rem;

  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;

  background: ${(props) => props.theme.accent};

  ${(props) => {
    if (props.disabled) {
      return css`
        pointer-events: none;
        opacity: 0.6;
      `
    }
  }}

  &:hover,
  &:focus {
    background: ${(props) => props.theme.accentLight};
  }

  span {
    margin-right: 1.6rem;
  }
`
