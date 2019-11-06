import React, { useState, useCallback } from 'react';
import { Animated, View, StatusBar, ScrollView } from 'react-native';
import { Container, Header, HeaderImage, HeaderText } from './styles';

import User from '../User';
import usersData from '../../usersData';

// const { width } = Dimensions.get('window');

export default () => {
  const [scrollOffset] = useState(new Animated.Value(0));
  const [userSelected, setUserSelected] = useState(null);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [users] = useState([...usersData]);

  const selectUser = user => {
    setUserSelected(user);
    setUserInfoVisible(true);
  };

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
      <Container>
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
    [scrollOffset, users]
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
        />

        <HeaderText
          style={[
            {
              fontSize: scrollOffset.interpolate({
                inputRange: [120, 140],
                outputRange: [24, 16],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          {userSelected ? userSelected.name : 'GoNative'}
        </HeaderText>
      </Header>
      {userInfoVisible ? renderDetail() : renderList()}
    </Container>
  );
};
