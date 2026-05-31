import React, { useCallback, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LenisProvider, useLenis } from './lenisContext';
import { LoadingScreen } from './components/LoadingScreen';
import { PortfolioHome } from './components/PortfolioHome';
import { ProjectDetailPage } from './components/ProjectDetailPage';

const ScrollToTopOnRouteChange: React.FC = () => {
  const location = useLocation();
  const { scrollTo } = useLenis();

  React.useEffect(() => {
    scrollTo(0, { duration: 0.8 });
  }, [location.pathname, scrollTo]);

  return null;
};

const AppInner: React.FC = () => {
  const navigate = useNavigate();

  const handleProjectNavigate = useCallback(
    (slug: string) => {
      navigate(`/project/${slug}`);
    },
    [navigate]
  );

  return (
    <>
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<PortfolioHome onProjectNavigate={handleProjectNavigate} />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  const [loaderDone, setLoaderDone] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoaderComplete} />
      <LenisProvider enabled={loaderDone}>
        <AppInner />
      </LenisProvider>
    </>
  );
};

export default App;

