export default function Contacts() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="col-span-1 bg-gray-200 h-40 border-2 border-blue-500"></div>
        <div className="col-span-1 bg-gray-200 h-40"></div>
        <div className="col-span-1 bg-gray-200 h-40"></div>
        <div className="col-span-1 bg-gray-200 h-40"></div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Pictures of your offices</h2>
      <div className="border-t border-b py-6">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="text-red-500 mr-2" />
              <span>Beijing, Chaoyang District, Wang Jing Jia Mei Center</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-blue-800 mr-2" />
              <span>+86-10-53505008</span>
            </div>
            <div className="flex items-center">
              <Building className="text-red-500 mr-2" />
              <span>Offices in Beijing, Guangzhou, New York, Boston</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="text-red-500 mr-2" />
              <span>Christina.wang@ulead-edu.com</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-blue-800 mr-2" />
              <span>Beijing, Tuesday–Saturday 9AM–8PM, Sunday 10AM–5PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}