import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { ArrowDropDown, Home, Language, Search } from '../../assets/icons';
import { ReactComponent as AvatarPlaceholder } from '../../assets/placeholder.svg';
import useDropDownHandler from '../../hooks/useDropDownHandler';
import { languages } from '../../i18n/config';
import Button from '../Button/Button';
import Input from '../Input/Input';

import {
  AvatarContainer,
  Container,
  Divider,
  DropDownButton,
  DropDownContainer,
  DropDownDivider,
  DropDownItem,
  LanguageDropdown,
  LanguageSelector,
  LeftContent,
  NameContainer,
  RightContent,
  SearchButton,
  SearchDropdown,
  SearchInputContainer,
  SearchResult,
} from './sHeader';

interface UserInfo {
  firstName: string;
  lastName: string;
  companyName: string;
}

interface Route {
  key: string;
  path: string;
}

interface SearchTarget extends Route {
  translation: string;
}

interface DropDownItem {
  key: string;
  path: string;
}

interface HeaderProps {
  user: UserInfo;
  routes: Route[];
}

const Header: React.FC<HeaderProps> = ({ user, routes }) => {
  const history = useHistory();
  const { t, i18n } = useTranslation(['common', 'search-keywords']);

  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputContainerRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchTargets, setSearchTargets] = useState<SearchTarget[]>([]);
  const [searchResults, setSearchResults] = useState<SearchTarget[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownButtonRef = useRef<HTMLButtonElement>(null);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const { handleMouseClick: handleDropdown } = useDropDownHandler({
    dropdownRef,
    dropdownButtonRef,
    showDropdown,
    setShowDropdown,
  });

  useEffect(() => {
    document.addEventListener('click', handleDropdown);
    return () => document.removeEventListener('click', handleDropdown);
  }, [handleDropdown]);

  const { handleMouseClick: handleSearchMouseClick } = useDropDownHandler({
    dropdownRef: searchDropdownRef,
    dropdownButtonRef: searchButtonRef,
    showDropdown: showSearch,
    setShowDropdown: setShowSearch,
    exclude: [searchInputContainerRef],
  });

  useEffect(() => {
    document.addEventListener('click', handleSearchMouseClick);
    return () => document.removeEventListener('click', handleSearchMouseClick);
  }, [handleSearchMouseClick]);

  const { handleMouseClick: handleLanguageMouseClick } = useDropDownHandler({
    dropdownRef: languageDropdownRef,
    dropdownButtonRef: languageDropdownButtonRef,
    showDropdown: showLanguageDropdown,
    setShowDropdown: setShowLanguageDropdown,
  });

  useEffect(() => {
    document.addEventListener('click', handleLanguageMouseClick);
    return () =>
      document.removeEventListener('click', handleLanguageMouseClick);
  }, [handleLanguageMouseClick]);

  useEffect(
    () =>
      setSearchTargets(
        routes.map((route) => ({
          ...route,
          translation: t(`search-keywords:${route.key}`),
        }))
      ),
    [routes, t]
  );

  useEffect(
    () =>
      setSearchResults(
        search.length
          ? searchTargets.filter(
              (target) =>
                target.translation.toLowerCase().indexOf(search.toLowerCase()) >
                -1
            )
          : []
      ),
    [search, searchTargets]
  );

  useEffect(() => {
    if (!showSearch) setSearch('');
  }, [showSearch]);

  const handleUpgradeAccount = useCallback(() => {
    console.log('upgrade account button clicked');
  }, []);

  const handleLogout = useCallback(() => {
    // TODO: temporary, just for testing
    history.push('/login');
  }, [history]);

  const dropDownItems: DropDownItem[] = [
    {
      key: 'account',
      path: '/account',
    },
    {
      key: 'company-profile',
      path: '/company-profile',
    },
    {
      key: 'company-settings',
      path: '/company-settings',
    },
  ];

  return (
    <Container>
      <LeftContent>
        <Home />
        <h5>{user.companyName}</h5>
      </LeftContent>

      <RightContent>
        <Button id="upgrade-button" onClick={handleUpgradeAccount}>
          {t('header.upgrade')}
        </Button>

        <SearchButton ref={searchButtonRef}>
          <Search />
          <SearchDropdown
            ref={searchDropdownRef}
            $show={searchResults.length > 0 && showSearch}
          >
            {searchResults.map((result) => (
              <SearchResult
                key={result.key}
                onClick={() => {
                  setShowSearch(false);
                  history.push(result.path);
                }}
              >
                {result.translation}
              </SearchResult>
            ))}
          </SearchDropdown>
        </SearchButton>
        <SearchInputContainer $show={showSearch} ref={searchInputContainerRef}>
          <Input
            placeholder={t('header.search')}
            value={search}
            setValue={setSearch}
            focus={showSearch}
            isClearable
          />
        </SearchInputContainer>

        <LanguageSelector ref={languageDropdownButtonRef}>
          {i18n.language.toUpperCase()}
          <Language />
          <LanguageDropdown
            ref={languageDropdownRef}
            $isActive={showLanguageDropdown}
          >
            {languages.map((language) => (
              <DropDownItem
                key={language}
                onClick={() => {
                  setShowLanguageDropdown(false);
                  i18n.changeLanguage(language);
                }}
              >
                {language.toUpperCase()}
              </DropDownItem>
            ))}
          </LanguageDropdown>
        </LanguageSelector>

        <Divider />

        <NameContainer>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
        </NameContainer>

        <AvatarContainer>
          <AvatarPlaceholder />
        </AvatarContainer>

        <DropDownButton ref={dropdownButtonRef}>
          <ArrowDropDown id="drop-down" />
          <DropDownContainer ref={dropdownRef} $isActive={showDropdown}>
            {dropDownItems.map((item) => (
              <DropDownItem
                key={item.key}
                onClick={() => {
                  setShowDropdown(false);
                  history.push(item.path);
                }}
              >
                {t(`header.${item.key}`)}
              </DropDownItem>
            ))}
            <DropDownDivider />
            <DropDownItem id="logout" onClick={handleLogout}>
              {t('header.logout')}
            </DropDownItem>
          </DropDownContainer>
        </DropDownButton>
      </RightContent>
    </Container>
  );
};

export default Header;
