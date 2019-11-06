import React, { useState, useEffect, useMemo } from 'react';
import {
  Dimensions,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
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

const { width } = Dimensions.get('window');

export default ({ user, onPress }) => {
  const [opacity] = useState(new Animated.Value(0));
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 50 }));

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onPanResponderTerminationRequest: () => false,

        onMoveShouldSetPanResponder: (e, gestureState) => {
          return (
            Math.abs(gestureState.dx) >= 30 || Math.abs(gestureState.dy) >= 30
          );
        },

        onPanResponderMove: Animated.event([null, { dx: offset.x }]),

        onPanResponderRelease: () => {
          if (offset.x._value < -200) {
            Alert.alert('Deleted!');
          }

          Animated.spring(offset.x, { toValue: 0, bounciness: 10 }).start();
        },

        onPanResponderTerminate: () => {
          Animated.spring(offset.x, { toValue: 0, bounciness: 10 }).start();
        },
      }),
    [offset]
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500 }),
      Animated.spring(offset.y, { toValue: 0, speed: 5, bounciness: 20 }),
    ]).start();

    return () => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 500 }),
        Animated.spring(offset.y, { toValue: 0, speed: 5, bounciness: 20 }),
      ]).start();
    };
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          transform: [
            ...offset.getTranslateTransform(),
            {
              rotateZ: offset.x.interpolate({
                inputRange: [-width, width],
                outputRange: ['-50deg', '50deg'],
              }),
            },
          ],
        },
        { opacity },
      ]}
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
