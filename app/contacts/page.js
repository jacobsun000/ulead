import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import BackButton from "@/ui/Back";
import SectionHeader from "@/ui/SectionHeader";
import Image from 'next/image';
import Button from "@/ui/Button";

const ContactItem = ({ src, alt, text }) => (
  <div className="flex items-center mb-6">
    <Image
      src={src}
      width={50}
      height={50}
      alt={alt}
      className="mr-5 flex-shrink-0"
    />
    <span className="flex-grow text-sm md:text-lg">{text}</span>
  </div>
);

export default function Contacts() {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div>
      <Header currentPath="/contacts" />

      <div className="py-6">
        <SectionHeader title="Contact Us" style='mt-0 mb-8 md:my-8' />
        <div className="p-4 mx-[8vw]">
          <div className="flex flex-col md:flex-row justify-between md:space-x-12">
            <div className="md:w-1/2">
              <ContactItem
                src="/img/contacts/add.png"
                alt="Address"
                text="Beijing, Chaoyang District, Wang Jing Jia Mei Center"
              />
              <ContactItem
                src="/img/contacts/phone.png"
                alt="Phone"
                text="+86-10-53505008"
              />
              <ContactItem
                src="/img/contacts/world.png"
                alt="Offices"
                text="Offices in Beijing, Guangzhou, New York, Boston"
              />
            </div>
            <div className="md:w-1/2">
              <ContactItem
                src="/img/contacts/email.png"
                alt="Email"
                text="Christina.wang@ulead-edu.com"
              />
              <ContactItem
                src="/img/contacts/date.png"
                alt="Working Hours"
                text="Beijing, Tuesday-Saturday 9AM-8PM; Sunday 10AM-5PM"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto p-4 rounded-lg">
        <h2 className="text-xl font-bold text-center mb-6">Fill this form and we will get back to you ASAP</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-[8vw]">
          <div>
            <label htmlFor="name" className="block mb-1 text-lg">Your Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 border border-gray-500 rounded"
            />
          </div>
          <div>
            <label htmlFor="contact" className="block mb-1 text-lg">Email/Mobile/Wechat*</label>
            <input
              type="text"
              id="contact"
              name="contact"
              required
              className="w-full p-2 border border-gray-500 rounded"
            />
          </div>
          <div>
            <label htmlFor="source" className="block mb-1 text-lg">How you get to know us</label>
            <input
              type="text"
              id="source"
              name="source"
              className="w-full p-2 border border-gray-500 rounded"
            />
          </div>
          <div>
            <label htmlFor="questions" className="block mb-1 text-lg">Your concerns and questions</label>
            <input
              type="text"
              id="questions"
              name="questions"
              className="w-full p-2 border border-gray-500 rounded"
            />
          </div>
          <div className="md:col-span-2 mt-4 mb-4 flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 rounded bg-primary hover:bg-primaryLight text-white text-xl font-semibold transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="mx-auto p-4 mb-4">
        <SectionHeader title="Our Offices" style='mt-0 mb-8 md:my-8' />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-[8vw]">
          <div className="col-span-1 text-center">
            <Image
              src={"/img/contacts/ny.png"}
              alt="New York"
              width={800}
              height={600}
            />
            <span className="font-bold text-secondary mt-3 block">New York, USA</span>
          </div>
          <div className="col-span-1 text-center">
            <Image
              src={"/img/contacts/bs.png"}
              alt="New York"
              width={800}
              height={600}
            />
            <span className="font-bold text-primary mt-3 block">Boston, USA</span>
          </div>
          <div className="col-span-1 text-center">
            <Image
              src={"/img/contacts/bj.png"}
              alt="New York"
              width={800}
              height={600}
            />
            <span className="font-bold text-secondary mt-3 block">Beijing, China</span>
          </div>
          <div className="col-span-1 text-center">
            <Image
              src={"/img/contacts/gz.png"}
              alt="New York"
              width={800}
              height={600}
            />
            <span className="font-bold text-primary mt-3 block">Guangzhou, China</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <Button text="More Details" href="/contacts" />
      </div>

      <BackButton />
      <Footer />
    </div>
  );
}
