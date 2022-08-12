import React from 'react';
import styled from 'styled-components';
import { ALIVE_GREEN, APP_WHITE, DARK_GREY, DEAD_RED, MEDIUM_GREY_TRANSLUCENT, NEUTRAL_GREY } from '../colors';
import { Feather } from '@expo/vector-icons';

const ScreenContainer = styled.View`
  position: relative;
  flex: 1;
  background-color: ${DARK_GREY};
`

const DetailWrapper = styled.ScrollView`
  padding: 16px 12px 0;
`

const DetailLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${NEUTRAL_GREY};
  margin-top: 8px;
`

const DetailValue = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: ${APP_WHITE};
`

const ProfilePhoto = styled.Image`
  display: flex;
  height: 300px;
`

const ProfileTitle = styled.Text`
  font-size: 36px;
  font-weight: 800;
  color: ${APP_WHITE};
`

const StatusIndicator = styled.View`
  height: 8px;
  width: 8px;
  border-radius: 10px;
  background-color: ${p => p.status === 'Alive' ? ALIVE_GREEN : DEAD_RED};
  margin-right: 10px;
`

const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`

const BackButton = styled.TouchableOpacity`
  position: absolute;
  background-color: ${MEDIUM_GREY_TRANSLUCENT};
  top: 16px;
  left: 16px;
  padding: 4px;
  border-radius: 99px;
`

const ProfileScreen = ({navigation, route}) => {

  const {image, name, species, status, location, gender, origin} = route.params.profileData

  const handleBackButton = () => navigation.goBack()

  return(
    <ScreenContainer>
      <ProfilePhoto
        source={{
          uri: image
        }}
      />
      <DetailWrapper>
        <ProfileTitle>{name}</ProfileTitle>
        <DetailRow>
          <StatusIndicator status={status}/>
          <DetailValue>{status} - {species}</DetailValue>
        </DetailRow>
        <DetailLabel>Location:</DetailLabel>
        <DetailValue>{location.name}</DetailValue>
        <DetailLabel>Gender:</DetailLabel>
        <DetailValue>{gender}</DetailValue>
        <DetailLabel>Origin:</DetailLabel>
        <DetailValue>{origin.name}</DetailValue>
      </DetailWrapper>
      <BackButton
        onPress={handleBackButton}
      >
        <Feather name='arrow-left' color={APP_WHITE} size={24}/>
      </BackButton>
    </ScreenContainer>
  )
}

export default ProfileScreen;