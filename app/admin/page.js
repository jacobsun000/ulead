export default function AdminHomePage() {
  const managers = [
    { name: "联系表单", link: "/admin/contact" },
    { name: "Offer 管理", link: "/admin/offer" },
    { name: "合作院校", link: "/admin/partner" },
    { name: "能力标签", link: "/admin/ability" },
    { name: "校友故事", link: "/admin/alumni" },
    { name: "导师团队", link: "/admin/mentor" },
    { name: "成功案例", link: "/admin/success-story" },
    { name: "团队成员", link: "/admin/team-member" },
    { name: "暑校项目", link: "/admin/summer-school" },
    { name: "新闻文章", link: "/admin/news" },
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
