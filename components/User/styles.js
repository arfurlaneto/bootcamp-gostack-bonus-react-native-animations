import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

export const UserContainer = styled.View`
  margin-top: 10px;
  border-radius: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

export const Thumbnail = styled.Image`
  width: 100%;
  height: 150;
`;

export const InfoContainer = styled.View`
  background: #57bcbc;
  flex-direction: row;
  align-items: center;
  padding: 8px 15px;
  background: ${props => props.color};
`;

export const BioContainer = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  color: #fff;
  font-weight: 900;
  font-size: 10;
`;

export const Description = styled.Text`
  color: #fff;
  font-size: 13;
  margin-top: 2;
`;

export const LikesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  padding: 3px 8px;
  border-radius: 20px;
`;

export const Likes = styled.Text`
  color: #fff;
  font-size: 12;
  margin-left: 5;
`;

export const HeartIcon = styled(Icon).attrs({
  name: 'heart',
  size: 12,
  color: '#fff',
})``;
