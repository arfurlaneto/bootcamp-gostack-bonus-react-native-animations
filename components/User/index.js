import React, { useState, useEffect } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
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
  const [opacity] = useState(new Animated.Value(0));
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 50 }));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500 }),
      Animated.spring(offset.y, { toValue: 0, speed: 5, bounciness: 20 }),
    ]).start();
  }, [offset.y, opacity]);

  return (
    <Animated.View
      style={[{ transform: [...offset.getTranslateTransform()] }, { opacity }]}
    >
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
    </Animated.View>
  );
};
