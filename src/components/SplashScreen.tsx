import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 400);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 300);
    }, 2500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(hideTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-center gap-0 overflow-hidden">
        <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-2xl animate-scale-in">
          <span className="text-white text-6xl font-bold">V</span>
        </div>
        <div 
          className={`text-5xl font-bold transition-all duration-700 ease-out ${
            showText ? 'ml-3 opacity-100 translate-x-0' : 'ml-0 opacity-0 -translate-x-8'
          }`}
        >
          <span className="text-blue-500">ita</span>
          <span className="text-foreground">net</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;