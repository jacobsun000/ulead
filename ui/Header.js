function NavItem({ children, href, selected }) {
  return (
    <div className="h-full flex items-center">
      <a
        href={href}
        className={`text-white pt-2 border-b-[6px] ${selected ? 'border-primary' : 'border-transparent'} h-full flex items-center`}
      >
        {children}
      </a>
    </div>
  );
}


export default function Header() {
  return (
    <header className="bg-secondary flex justify-between items-center px-16 h-16">
      <div className="flex flex-col py-2 mr-4">
        <div>
          <span className="text-primary text-xl font-semibold">U</span>
          <span className="text-white text-xl font-semibold">LEAD</span>
        </div>
        <span className="text-white font-semibold">合领教育</span>
      </div>
      <NavItem selected>Home</NavItem>
      <NavItem>About Us</NavItem>
      <NavItem>Highschool</NavItem>
      <NavItem>University</NavItem>
      <NavItem>Lead Program</NavItem>
      <NavItem>Partners</NavItem>
      <button className="bg-primary text-white ml-4 p-2 rounded-sm">Contact Us</button>
    </header>
  );
}
