/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


// Styles
const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`;
const Check = styled.div`
  width: 1rem;
  height: 1rem;
  border: 1px solid ${props => props.attention ? '#FF3333' : '#D1D1D1'};
  padding: 1px;
  /* background-color: ${props => props.isSelected ? '#373737' : '#fff'}; */
  border-radius: 5px;
  overflow: hidden;
`
const CheckIcon = styled.div`
  background-color: #373737;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;
const Text = styled.p`
  margin-left: .5rem;
  font-size: 1rem;
  font-weight: normal;
  color: #373737;
  >strong{
    font-weight: bold;
  }
`;

const CheckBox = ({ attention, isSelected, onClick }) => {

  return (
    <Content onClick={onClick}>
      <Check attention={attention}>
        {isSelected && <CheckIcon />}
      </Check>
      <Text>Concordo com os <strong>termos de serviço</strong> do app ...</Text>
    </Content>  
  );
}

export default CheckBox;