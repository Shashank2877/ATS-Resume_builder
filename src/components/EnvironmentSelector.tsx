import React, { useState, useEffect } from 'react';
import { Settings, Globe, Database, TestTube } from 'lucide-react';
import { config } from '../config/environment';
import './EnvironmentSelector.css';

interface EnvironmentSelectorProps {
  isVisible: boolean;
  onToggle: () => void;
}

const EnvironmentSelector: React.FC<EnvironmentSelectorProps> = ({ isVisible, onToggle }) => {
  const [currentEnv, setCurrentEnv] = useState(config.appConfig.env);
  const [configData, setConfigData] = useState({
    apiUrl: config.apiConfig.baseURL,
    appName: config.appConfig.name,
    version: config.appConfig.version,
    debug: config.featureFlags.debugLogs
  });

  useEffect(() => {
    // Update state when environment changes
    setCurrentEnv(config.appConfig.env);
    setConfigData({
      apiUrl: config.apiConfig.baseURL,
      appName: config.appConfig.name,
      version: config.appConfig.version,
      debug: config.featureFlags.debugLogs
    });
  }, []);

  const handleEnvironmentChange = (env: string) => {
    // In a real app, you might want to reload the app or reinitialize services
    // For now, we'll just show a message
    console.log(`Environment would be changed to: ${env}`);
    alert(`Environment switching to ${env} - please refresh the page to apply changes.`);
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="env-selector-toggle"
        title="Environment Settings"
      >
        <Settings size={20} />
      </button>
    );
  }

  return (
    <div className="env-selector-panel">
      <div className="env-header">
        <h3>Environment Configuration</h3>
        <button onClick={onToggle} className="close-btn">×</button>
      </div>
      
      <div className="current-env">
        <h4>Current Environment: <span className={`env-badge env-${currentEnv}`}>{currentEnv}</span></h4>
      </div>

      <div className="env-options">
        <div 
          className={`env-option ${currentEnv === 'development' ? 'active' : ''}`}
          onClick={() => handleEnvironmentChange('development')}
        >
          <TestTube size={16} />
          <span>Development</span>
          <small>Local development server</small>
        </div>

        <div 
          className={`env-option ${currentEnv === 'staging' ? 'active' : ''}`}
          onClick={() => handleEnvironmentChange('staging')}
        >
          <Database size={16} />
          <span>Staging</span>
          <small>Testing environment</small>
        </div>

        <div 
          className={`env-option ${currentEnv === 'production' ? 'active' : ''}`}
          onClick={() => handleEnvironmentChange('production')}
        >
          <Globe size={16} />
          <span>Production</span>
          <small>Live environment</small>
        </div>
      </div>

      <div className="env-details">
        <h4>Configuration Details</h4>
        <div className="config-item">
          <label>API URL:</label>
          <code>{configData.apiUrl}</code>
        </div>
        <div className="config-item">
          <label>App Name:</label>
          <code>{configData.appName}</code>
        </div>
        <div className="config-item">
          <label>Debug Mode:</label>
          <code>{configData.debug ? 'enabled' : 'disabled'}</code>
        </div>
        <div className="config-item">
          <label>Version:</label>
          <code>{configData.version}</code>
        </div>
      </div>

      {currentEnv === 'development' && (
        <div className="dev-tools">
          <h4>Development Tools</h4>
          <button 
            onClick={() => localStorage.clear()}
            className="dev-btn"
          >
            Clear Local Storage
          </button>
          <button 
            onClick={() => console.log('Form Data:', config)}
            className="dev-btn"
          >
            Log Config to Console
          </button>
        </div>
      )}


    </div>
  );
};

export default EnvironmentSelector;