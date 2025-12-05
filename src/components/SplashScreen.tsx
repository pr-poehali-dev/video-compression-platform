import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-scale-in">
        <img 
          src="https://cdn.poehali.dev/files/3bfbda8c-413c-4adb-875d-168cc6f06635.png" 
          alt="Vitanet Logo"
          className="w-48 h-48 object-contain"
        />
      </div>
    </div>
  );
};

export default SplashScreen;