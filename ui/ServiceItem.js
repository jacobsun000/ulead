import Image from 'next/image';

export default function ServiceItem({ title, icon }) {
  return (
    <div className={`border-b py-4 flex gap-4 flex-row`}>
      <div className="relative lg:w-8 lg:h-8 w-6 h-6 flex items-center justify-center">
        <Image src={icon} alt={title} className="object-cover" fill />
      </div>
      <span className="font-semibold text-left">{title}</span>
    </div>
  );
};
