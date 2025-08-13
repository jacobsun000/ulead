import ServiceItem from '@/ui/en/ServiceItem';
import Button from '@/ui/en/Button';

export default function Services({ services }) {
  return (
    <div className="max-w-fit mx-8 md:mx-auto py-4 md:py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            title={service.title}
            icon={service.icon}
          />
        ))}
      </div>
      <div className="text-center">
        <Button text="More Details" href="/contacts" />
      </div>
    </div>
  );
}
