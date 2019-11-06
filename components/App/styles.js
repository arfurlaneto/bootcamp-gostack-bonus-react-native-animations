import { Platform } from 'react-native';
import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding-top: ${Platform.OS === 'ios' ? 40 : 20};
  padding-left: 15px;
  padding-right: 15px;
  background: #2e93e5;
  height: 200;
`;

export const HeaderImage = styled.Image`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: 900;
  color: #fff;
  background: transparent;
  position: absolute;
  left: 15;
  bottom: 20;
`;
