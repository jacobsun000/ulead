export default function AdminHomePage() {
  const managers = [
    { name: "Contact", link: "/admin/contact" },
    { name: "Alumni", link: "/admin/alumni" },
    { name: "Matriculation", link: "/admin/matriculation" },
    { name: "Team", link: "/admin/team" },
    { name: "Offer", link: "/admin/offer" },
    { name: "Partner", link: "/admin/partner" },
    { name: "Abilities", link: "/admin/ability" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 max-w-6xl">
        {managers.map((manager) => (
          <a
            key={manager.name}
            href={manager.link}
            className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-secondary">{manager.name}</h2>
          </a>
        ))}
      </div>
    </div>
  );
}
