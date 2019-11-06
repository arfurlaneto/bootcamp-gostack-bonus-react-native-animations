import React, { useState, useCallback } from 'react';
import {
  Dimensions,
  Animated,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Container, Header, HeaderImage, HeaderText } from './styles';

import User from '../User';
import usersData from '../../usersData';

const { width } = Dimensions.get('window');

export default () => {
  const [scrollOffset] = useState(new Animated.Value(0));
  const [listProgress] = useState(new Animated.Value(0));
  const [userInfoProgress] = useState(new Animated.Value(0));
  const [userSelected, setUserSelected] = useState(null);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [users] = useState([...usersData]);

  const selectUser = useCallback(
    user => {
      setUserSelected(user);

      Animated.sequence([
        Animated.timing(listProgress, { toValue: 100, duration: 300 }),
        Animated.timing(userInfoProgress, { toValue: 100, duration: 500 }),
      ]).start(() => {
        setUserInfoVisible(true);
      });
    },
    [listProgress, userInfoProgress]
  );

  const renderDetail = useCallback(
    () => (
      <View>
        <User user={userSelected} onPress={() => {}} />
      </View>
    ),
    [userSelected]
  );

  const renderList = useCallback(
    () => (
      <Container
        style={[
          {
            transform: [
              {
                translateX: listProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, width],
                }),
              },
            ],
          },
        ]}
      >
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollOffset } } },
          ])}
        >
          {users.map(user => (
            <User key={user.id} user={user} onPress={() => selectUser(user)} />
          ))}
        </ScrollView>
      </Container>
    ),
    [listProgress, scrollOffset, selectUser, users]
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" />

      <Header
        style={[
          {
            height: scrollOffset.interpolate({
              inputRange: [0, 140],
              outputRange: [200, 70],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <HeaderImage
          source={userSelected ? { uri: userSelected.thumbnail } : null}
          style={[
            {
              opacity: userInfoProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
              }),
            },
          ]}
        />

        <HeaderText
          style={[
            {
              fontSize: scrollOffset.interpolate({
                inputRange: [120, 140],
                outputRange: [24, 16],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateX: userInfoProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, width],
                  }),
                },
              ],
            },
          ]}
        >
          GoNative
        </HeaderText>

        <HeaderText
          style={[
            {
              transform: [
                {
                  translateX: userInfoProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [width * -1, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {userSelected ? userSelected.name : ''}
        </HeaderText>
      </Header>
      {userInfoVisible ? renderDetail() : renderList()}
    </Container>
  );
};
