import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const boxThemes = [
  { id: 1, name: 'Сладкий рай', emoji: '🍬', description: 'Конфеты, шоколад и десерты со всего мира', price: '1500₽' },
  { id: 2, name: 'Острые ощущения', emoji: '🌶️', description: 'Чипсы, соусы и снеки с перцем', price: '1200₽' },
  { id: 3, name: 'Азиатские истории', emoji: '🍜', description: 'Лапша, приправы и закуски из Азии', price: '1800₽' },
  { id: 4, name: 'Семейный вечер', emoji: '🎬', description: 'Попкорн, чипсы и снеки для просмотра', price: '2000₽' },
];

const menuItems = [
  { category: 'Лапша быстрого приготовления', items: ['Острая корейская', 'Японская удон', 'Тайский том ям'], price: '250-350₽' },
  { category: 'Напитки', items: ['Матча латте', 'Bubble tea', 'Рамуне'], price: '200-300₽' },
  { category: 'Снеки', items: ['Чипсы из морских водорослей', 'Моти', 'Покки'], price: '150-250₽' },
];

const cafeFeatures = [
  { icon: 'Wifi', title: 'Бесплатный Wi-Fi', description: 'Для работы и отдыха' },
  { icon: 'Users', title: 'Уютные столики', description: 'На 2-6 человек' },
  { icon: 'Coffee', title: 'Кухня со всем необходимым', description: 'Кипяток, микроволновка, посуда' },
  { icon: 'BookOpen', title: 'Настольные игры', description: 'Библиотека игр бесплатно' },
];

const galleryImages = [
  'https://cdn.poehali.dev/projects/0af3dce6-c981-465c-8e7a-e684707ec66f/files/8c6de12b-a8e7-449e-b4b2-f6d64b03c202.jpg',
  'https://cdn.poehali.dev/projects/0af3dce6-c981-465c-8e7a-e684707ec66f/files/6017eac6-03d9-499a-8a18-b4c5599d0acd.jpg',
  'https://cdn.poehali.dev/projects/0af3dce6-c981-465c-8e7a-e684707ec66f/files/bcba40a7-3653-4d82-92d9-07b2756e1087.jpg',
];

export default function Index() {
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const toggleBox = (id: number) => {
    setSelectedBoxes(prev => 
      prev.includes(id) ? prev.filter(boxId => boxId !== id) : [...prev, id]
    );
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-3xl">🌍</span>
              SnackWorld
            </h1>
            <div className="hidden md:flex gap-6">
              {['Главная', 'Боксы', 'Меню', 'О кафе', 'Галерея', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.toLowerCase().replace(' ', '-') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="главная" className="py-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Вкусы со всего мира<br />в одном месте
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Магазин заграничных снеков и уютное кафе, где можно собрать свой уникальный бокс 
            или насладиться лапшой быстрого приготовления
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => scrollToSection('боксы')} className="gap-2">
              <Icon name="Package" size={20} />
              Собрать бокс
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('меню')} className="gap-2">
              <Icon name="UtensilsCrossed" size={20} />
              Посмотреть меню
            </Button>
          </div>
        </div>
      </section>

      <section id="боксы" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Конструктор тематических боксов</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Выберите готовую тематику или соберите свой уникальный набор снеков. 
            Идеально для подарка или вечеринки!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {boxThemes.map((box) => (
              <Card 
                key={box.id} 
                className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                  selectedBoxes.includes(box.id) ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => toggleBox(box.id)}
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{box.emoji}</div>
                  <CardTitle className="text-xl">{box.name}</CardTitle>
                  <CardDescription>{box.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-primary mb-4">{box.price}</p>
                  {selectedBoxes.includes(box.id) && (
                    <Badge className="bg-primary">Выбран</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedBoxes.length > 0 && (
            <div className="text-center animate-scale-in">
              <p className="text-lg mb-4">Выбрано боксов: {selectedBoxes.length}</p>
              <Button size="lg" className="gap-2">
                <Icon name="ShoppingCart" size={20} />
                Оформить заказ
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="меню" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Меню кафе</h2>
          <p className="text-center text-muted-foreground mb-12">
            Приходите к нам попробовать лапшу, напитки и снеки прямо на месте
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems.map((menu, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{menu.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {menu.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-lg font-semibold text-primary">{menu.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="о-кафе" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">О нашем кафе</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Уютное пространство, где можно не только купить снеки, но и провести время с друзьями
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cafeFeatures.map((feature, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={feature.icon as any} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="галерея" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Фотогалерея</h2>
          <p className="text-center text-muted-foreground mb-12">
            Загляните в атмосферу нашего кафе
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <img 
                  src={img} 
                  alt={`Фото ${idx + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" size={24} className="text-primary" />
                  Адрес
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">г. Москва, ул. Примерная, д. 1</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" size={24} className="text-primary" />
                  Режим работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">Пн-Вс: 10:00 - 22:00</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Phone" size={24} className="text-primary" />
                  Телефон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">+7 (999) 123-45-67</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Mail" size={24} className="text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">info@snackworld.ru</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 SnackWorld. Вкусы со всего мира в одном месте.</p>
        </div>
      </footer>
    </div>
  );
}
