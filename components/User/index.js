import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {
  UserContainer,
  Thumbnail,
  InfoContainer,
  BioContainer,
  Name,
  Description,
  LikesContainer,
  Likes,
  HeartIcon,
} from './styles';

export default ({ user, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <UserContainer>
        <Thumbnail source={{ uri: user.thumbnail }} />

        <InfoContainer color={user.color}>
          <BioContainer>
            <Name>{user.name.toUpperCase()}</Name>
            <Description>{user.description}</Description>
          </BioContainer>
          <LikesContainer>
            <HeartIcon />
            <Likes>{user.likes}</Likes>
          </LikesContainer>
        </InfoContainer>
      </UserContainer>
    </TouchableWithoutFeedback>
  );
};
