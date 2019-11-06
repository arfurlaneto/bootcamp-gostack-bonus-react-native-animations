import React, { useState, useCallback } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { Container, Header, HeaderImage, HeaderText } from './styles';

import User from '../User';
import usersData from '../../usersData';

// const { width } = Dimensions.get('window');

export default () => {
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
        <ScrollView>
          {users.map(user => (
            <User key={user.id} user={user} onPress={() => selectUser(user)} />
          ))}
        </ScrollView>
      </Container>
    ),
    [users]
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" />

      <Header>
        <HeaderImage
          source={userSelected ? { uri: userSelected.thumbnail } : null}
        />

        <HeaderText>{userSelected ? userSelected.name : 'GoNative'}</HeaderText>
      </Header>
      {userInfoVisible ? renderDetail() : renderList()}
    </Container>
  );
};
