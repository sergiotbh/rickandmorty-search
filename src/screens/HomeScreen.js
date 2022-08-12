import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { APP_WHITE, DARK_GREY, LIGHT_GREY, NEUTRAL_GREY } from '../colors';
import { Feather } from '@expo/vector-icons';
import { filterCharacter } from '../api';

const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${APP_WHITE};
  padding: 10px;
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
      <SearchBar onSearch={handleSearch}/>
      
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