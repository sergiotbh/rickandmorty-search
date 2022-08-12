import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { APP_WHITE, DARK_GREY, LIGHT_GREY, NEUTRAL_GREY } from '../colors';
import { Feather } from '@expo/vector-icons';
import { filterCharacter } from '../api';
import RickAndMortyLogo from '../../assets/Rick_and_Morty.svg';
import ProfileCard from '../components/ProfileCard';

const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${APP_WHITE};
`

const HeaderContainer = styled.View`
  padding: 24px 12px;
`

const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
`

const HeaderTitle = styled.Text`
  font-size: 42px;
  font-weight: 900;
  flex: 1;
`

const SearchButton = styled.TouchableOpacity`
  padding: 10px;
`

const SearchBarWrapper = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${LIGHT_GREY};
  color: ${DARK_GREY};
  border-radius: 10px;
`

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 10px;
`

const ListContainer = styled.View`
  display: flex;
  flex: 1;
  background-color: ${DARK_GREY};
`

const ResultList = styled.FlatList`
  padding-top: 10px;
`

const HomeScreen = () => {

  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(results)
  }, [results])

  const handleSearch = (searchTerm) => {
    filterCharacter(searchTerm)
    .then(res => setResults(res.results))
    .catch(e => console.log(e))
  }

  return(
    <ScreenContainer>
      <HeaderContainer>
        <Header>
          <HeaderTitle>Busca Perfiles de Rick y Morty</HeaderTitle>
          <RickAndMortyLogo height={56} width={56}/>
        </Header>
        <SearchBar
          onSearch={handleSearch}
        />
      </HeaderContainer>
      <ListContainer>
        <ResultList
          data={results}
          renderItem={({item}) => 
            <ProfileCard
              data={item}
            />
          }
        />
      </ListContainer>
    </ScreenContainer>
  )
}

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return(
    <SearchBarWrapper>
      <SearchInput
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        placeholder="Escribe el nombre del personaje..."
        placeholderTextColor={NEUTRAL_GREY}
      />
      <SearchButton
        onPress={() => onSearch(searchTerm)}
      >
        <Feather name='search' size={24} color={DARK_GREY} />
      </SearchButton>
    </SearchBarWrapper>
  )
}

export default HomeScreen;