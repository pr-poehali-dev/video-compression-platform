import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface VideoUploaderProps {
  onUpload?: (url: string) => void;
}

const VideoUploader = ({ onUpload }: VideoUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите видео файл',
        variant: 'destructive',
      });
      return;
    }

    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: 'Файл слишком большой',
        description: 'Максимальный размер видео: 100 МБ',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          
          const response = await fetch('/api/video-upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              video: base64Data,
              filename: file.name,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Ошибка загрузки');
          }

          const localUrl = URL.createObjectURL(file);
          setVideoUrl(localUrl);
          
          if (onUpload) {
            onUpload(localUrl);
          }

          toast({
            title: 'Успешно!',
            description: 'Видео загружено',
          });
        } catch (error) {
          console.error('Upload error:', error);
          toast({
            title: 'Ошибка загрузки',
            description: error instanceof Error ? error.message : 'Попробуйте еще раз',
            variant: 'destructive',
          });
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = () => {
        toast({
          title: 'Ошибка чтения файла',
          description: 'Не удалось прочитать файл',
          variant: 'destructive',
        });
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('File handling error:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обработать файл',
        variant: 'destructive',
      });
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="video/*"
        className="hidden"
      />
      
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="w-full"
      >
        {isUploading ? (
          <>
            <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
            Загрузка...
          </>
        ) : (
          <>
            <Icon name="Upload" className="mr-2 h-4 w-4" />
            Загрузить видео
          </>
        )}
      </Button>

      {videoUrl && (
        <div className="rounded-lg overflow-hidden border bg-card">
          <video
            src={videoUrl}
            controls
            className="w-full aspect-video object-cover"
          >
            Ваш браузер не поддерживает видео
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
