// app/events/page.tsx
import HeroEvents from './components/HeroEvents';
import Tabs from './components/Tabs';


export default function EventsPage() {
  return (
    <div>
      <HeroEvents />
      <div className="container mx-auto px-4 py-12">
        <Tabs />
      </div>
    
    </div>
  );
}
