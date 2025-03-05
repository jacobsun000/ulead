import Image from 'next/image';

export default function ServiceItem({ title, icon }) {
  return (
    <div className={`border-b py-4 flex gap-4 flex-row`}>
      <div className="lg:w-8 lg:h-8">
        <Image src={icon} alt={title} width={40} height={40} />
      </div>
      <span className="font-semibold text-left">{title}</span>
    </div>
  );
};
