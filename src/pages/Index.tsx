import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import SplashScreen from '@/components/SplashScreen';
import VideoPlayer from '@/components/VideoPlayer';

interface Video {
  id: number;
  title: string;
  channel: string;
  views: string;
  time: string;
  thumbnail: string;
  avatar: string;
  duration: string;
  isLive?: boolean;
}

const mockVideos: Video[] = [
  {
    id: 1,
    title: 'Как создать свой стриминговый сервис',
    channel: 'TechStream',
    views: '125K',
    time: '2 часа назад',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
    duration: '15:23',
  },
  {
    id: 2,
    title: 'Live: Разбираем новинки игровой индустрии',
    channel: 'GameWorld',
    views: '8.5K',
    time: 'в эфире',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=game',
    duration: 'LIVE',
    isLive: true,
  },
  {
    id: 3,
    title: 'Топ 10 фильмов 2024 года',
    channel: 'CinemaHub',
    views: '450K',
    time: '1 день назад',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cinema',
    duration: '22:45',
  },
  {
    id: 4,
    title: 'Урок по веб-разработке для начинающих',
    channel: 'CodeMaster',
    views: '89K',
    time: '3 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=code',
    duration: '45:12',
  },
  {
    id: 5,
    title: 'Обзор новых камер Sony 2024',
    channel: 'PhotoPro',
    views: '234K',
    time: '5 дней назад',
    thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=photo',
    duration: '18:30',
  },
  {
    id: 6,
    title: 'Live: Q&A с подписчиками',
    channel: 'StreamerLife',
    views: '3.2K',
    time: 'в эфире',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=streamer',
    duration: 'LIVE',
    isLive: true,
  },
  {
    id: 7,
    title: 'Кулинарный стрим: готовим пасту',
    channel: 'CookingTime',
    views: '67K',
    time: '6 часов назад',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cooking',
    duration: '32:18',
  },
  {
    id: 8,
    title: 'Путешествие по Японии: день 5',
    channel: 'TravelVlog',
    views: '512K',
    time: '2 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel',
    duration: '28:55',
  },
];

const categories = ['Все', 'Игры', 'Музыка', 'Спорт', 'Новости', 'Обучение', 'Развлечения', 'Технологии'];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Icon name="Menu" size={24} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white text-2xl font-bold">V</span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-blue-500">Vita</span>net
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <Input
                type="search"
                placeholder="Поиск видео, стримов..."
                className="pl-4 pr-12 bg-secondary border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Icon name="Upload" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-64 border-r border-border fixed left-0 h-[calc(100vh-73px)] overflow-y-auto">
          <nav className="p-3 space-y-1">
            {[
              { icon: 'Home', label: 'Главная', id: 'home' },
              { icon: 'Video', label: 'Видео', id: 'videos' },
              { icon: 'Radio', label: 'Стримы', id: 'streams' },
              { icon: 'Users', label: 'Подписки', id: 'subscriptions' },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3"
                onClick={() => setActiveTab(item.id)}
              >
                <Icon name={item.icon as any} size={20} />
                {item.label}
              </Button>
            ))}

            <div className="pt-4 pb-2">
              <div className="px-3 text-xs font-medium text-muted-foreground mb-2">
                БИБЛИОТЕКА
              </div>
              {[
                { icon: 'History', label: 'История' },
                { icon: 'Clock', label: 'Смотреть позже' },
                { icon: 'ThumbsUp', label: 'Понравившиеся' },
              ].map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start gap-3"
                >
                  <Icon name={item.icon as any} size={20} />
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="pt-4 pb-2">
              <div className="px-3 text-xs font-medium text-muted-foreground mb-2">
                ПОДПИСКИ
              </div>
              {['TechStream', 'GameWorld', 'CinemaHub'].map((channel) => (
                <Button
                  key={channel}
                  variant="ghost"
                  className="w-full justify-start gap-3"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${channel}`} />
                    <AvatarFallback>{channel[0]}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{channel}</span>
                </Button>
              ))}
            </div>
          </nav>
        </aside>

        <main className="flex-1 lg:ml-64">
          <div className="border-b border-border px-4 py-3 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'secondary'}
                  size="sm"
                  className="rounded-lg"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="p-4 space-y-6">
            <div className="max-w-6xl">
              <VideoPlayer
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                poster="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
                title="Пример видео - Big Buck Bunny"
              />
              <div className="mt-4 space-y-2">
                <h1 className="text-2xl font-bold">Пример видео - Big Buck Bunny</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>125K просмотров</span>
                  <span>2 часа назад</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=demo" />
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Demo Channel</p>
                    <p className="text-sm text-muted-foreground">1.2М подписчиков</p>
                  </div>
                  <Button className="ml-auto">Подписаться</Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Рекомендуемые видео</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mockVideos.map((video) => (
                  <Card
                    key={video.id}
                    className="group cursor-pointer overflow-hidden border-0 bg-transparent hover:bg-card/50 transition-all duration-200"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                      {video.isLive && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-600 hover:bg-red-600 text-white">
                            <Icon name="Radio" size={12} className="mr-1" />
                            LIVE
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 p-3">
                      <Avatar className="h-9 w-9 flex-shrink-0">
                        <AvatarImage src={video.avatar} />
                        <AvatarFallback>{video.channel[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {video.channel}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {video.views} просмотров • {video.time}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background">
        <div className="flex justify-around items-center py-2">
          {[
            { icon: 'Home', label: 'Главная', id: 'home' },
            { icon: 'Video', label: 'Видео', id: 'videos' },
            { icon: 'Radio', label: 'Стримы', id: 'streams' },
            { icon: 'User', label: 'Профиль', id: 'profile' },
          ].map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex-col h-auto py-2 px-4 gap-1 ${
                activeTab === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;