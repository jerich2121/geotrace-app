import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { ipService, isValidIp, parseCoords } from '../services/ipService';
import { historyService } from '../services/historyService';
import GeoCard from '../components/GeoCard';
import MapView from '../components/MapView';
import HistoryList from '../components/HistoryList';
import '../styles/HomePage.css';

const HomePage = () => {
  const { user, token, logout } = useAuth();

  const [myGeoData, setMyGeoData] = useState(null);
  const [currentGeoData, setCurrentGeoData] = useState(null);
  const [isMyIp, setIsMyIp] = useState(true);

  const [ipInput, setIpInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  const fetchMyGeo = useCallback(async () => {
    try {
      const data = await ipService.getMyGeoInfo();
      setMyGeoData(data);
      setCurrentGeoData(data);
    } catch {
      // silently fail
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    if (!token) return;
    setHistoryLoading(true);
    try {
      const data = await historyService.getHistory(token);
      setHistory(data.history);
    } catch {
      // silently fail
    } finally {
      setHistoryLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchMyGeo(), fetchHistory()]);
      setInitialLoading(false);
    };
    init();
  }, [fetchMyGeo, fetchHistory]);

  const handleSearch = async () => {
    const trimmed = ipInput.trim();
    if (!trimmed) {
      setInputError('Please enter an IP address.');
      return;
    }
    if (!isValidIp(trimmed)) {
      setInputError('Invalid IP address format.');
      return;
    }

    setInputError('');
    setSearchLoading(true);
    try {
      const data = await ipService.getGeoInfo(trimmed);
      setCurrentGeoData(data);
      setIsMyIp(false);

      // Save to history
      await historyService.addHistory(token, trimmed, data.city ? `${data.city}, ${data.country}` : null);
      await fetchHistory();
    } catch (err) {
      setInputError('Failed to fetch geolocation. Check the IP address.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClear = () => {
    setIpInput('');
    setInputError('');
    setCurrentGeoData(myGeoData);
    setIsMyIp(true);
  };

  const handleHistorySelect = async (ip) => {
    setIpInput(ip);
    setInputError('');
    setSearchLoading(true);
    try {
      const data = await ipService.getGeoInfo(ip);
      setCurrentGeoData(data);
      setIsMyIp(false);
    } catch {
      setInputError('Failed to fetch geolocation for selected history.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleHistoryDelete = async (ids) => {
    try {
      await historyService.deleteHistory(token, ids);
      await fetchHistory();
    } catch {
      // silently fail
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const coords = currentGeoData ? parseCoords(currentGeoData.loc) : null;

  if (initialLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-header__brand">
          <span className="home-header__icon">◉</span>
          <span className="home-header__name">GeoTrace</span>
        </div>
        <div className="home-header__user">
          <span className="home-header__greeting">
            {user?.name}
          </span>
          <button className="home-header__logout" onClick={logout}>
            Sign out
          </button>
        </div>
      </header>

      <main className="home-main">
        <div className="home-main__left">
          <div className="search-section">
            <h2 className="search-section__title">IP Lookup</h2>
            <div className="search-bar">
              <input
                type="text"
                className={`search-bar__input ${inputError ? 'search-bar__input--error' : ''}`}
                placeholder="Enter IP address (e.g. 8.8.8.8)"
                value={ipInput}
                onChange={(e) => {
                  setIpInput(e.target.value);
                  if (inputError) setInputError('');
                }}
                onKeyDown={handleKeyDown}
              />
              <button
                className="search-bar__btn search-bar__btn--primary"
                onClick={handleSearch}
                disabled={searchLoading}
              >
                {searchLoading ? '...' : 'Search'}
              </button>
              <button
                className="search-bar__btn search-bar__btn--secondary"
                onClick={handleClear}
                disabled={isMyIp}
              >
                Clear
              </button>
            </div>
            {inputError && (
              <p className="search-error">{inputError}</p>
            )}
          </div>

          <GeoCard data={currentGeoData} isMyIp={isMyIp} />

          <div className="history-section">
            <h3 className="history-section__title">Search History</h3>
            {historyLoading ? (
              <p className="history-section__loading">Loading history...</p>
            ) : (
              <HistoryList
                history={history}
                onSelect={handleHistorySelect}
                onDelete={handleHistoryDelete}
              />
            )}
          </div>
        </div>

        <div className="home-main__right">
          <MapView coords={coords} label={currentGeoData?.ip} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
