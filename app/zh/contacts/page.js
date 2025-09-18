'use client'

import { useState } from 'react';
import Image from 'next/image';
import DecorativeShapes from "@/ui/zh/DecorativeShapes";
import clsx from "clsx";

const ContactItem = ({ src, alt, text }) => (
  <div className="flex items-center mb-6">
    <Image
      src={src}
      width={50}
      height={50}
      alt={alt}
      className="mr-5 flex-shrink-0"
    />
    <div>
      {text.split("*").map((part, i) => (
        <div key={i} className="flex-grow text-sm md:text-lg">{part}</div>
      ))}
    </div>
  </div>
);

const SuccessModal = ({ message }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-1/3">
      <h2 className="text-xl font-bold mb-4 text-center">提交成功</h2>
      <p className="text-center mb-6">{message}</p>
      <div className="flex justify-center">
        <button
          onClick={() => (window.location.href = '/zh')}
          className="px-6 py-2 bg-ulead-gradient text-white font-semibold rounded hover:bg-primaryLight transition duration-300"
        >
          返回首页
        </button>
      </div>
    </div>
  </div>
);

export default function Contacts() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      contact: e.target.contact.value,
      source: e.target.source.value,
      questions: e.target.questions.value,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('我们已收到您的信息，会尽快与您联系！');
        setShowSuccess(true);
      } else {
        setSuccessMessage('提交信息时出错，请稍后再试。');
        setShowSuccess(true);
      }
    } catch (error) {
      setSuccessMessage('提交信息时出错，请稍后再试。');
      setShowSuccess(true);
    }
  };

  return (
    <div>
      <HeroSection />
      <h1 className="text-2xl text-center text-black mt-8">欢迎前来我们的全球办公室</h1>
      <div className="mx-auto p-4 m-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-[8vw]">
          <div className="col-span-1 text-center">
            <Image
              src={"/img/contacts/ny.png"}
              alt="New York"
              width={800}
              height={600}
            />
            <span className="bg-ulead-gradient bg-clip-text text-transparent font-semibold mt-3 block">纽约，美国</span>
          </div>
          <div className="col-span-1 text-center">
            <Image
              src={"/img/contacts/bs.png"}
              alt="New York"
              width={800}
              height={600}
            />
            <span className="bg-ulead-gradient bg-clip-text text-transparent font-semibold mt-3 block">波士顿，美国</span>
          </div>
          <div className="col-span-1 text-center">
            <Image
              src={"/img/contacts/bj.png"}
              alt="New York"
              width={800}
              height={600}
            />
            <span className="bg-ulead-gradient bg-clip-text text-transparent font-semibold mt-3 block">北京，中国</span>
          </div>
          <div className="col-span-1 text-center">
            <Image
              src={"/img/contacts/gz.png"}
              alt="New York"
              width={800}
              height={600}
            />
            <span className="bg-ulead-gradient bg-clip-text text-transparent font-semibold mt-3 block">广州，中国</span>
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="p-4 mx-[8vw]">
          <div className="flex flex-col md:flex-row justify-between md:space-x-12">
            <div className="md:w-1/2">
              <ContactItem
                src="/img/contacts/add.svg"
                alt="Address"
                text="北京，朝阳区，望京佳美中心"
              />
              <ContactItem
                src="/img/contacts/phone.svg"
                alt="Phone"
                text="+86-10-53350508"
              />
              <ContactItem
                src="/img/contacts/world.svg"
                alt="Offices"
                text="办公室分别位于纽约，波士顿，北京，广州"
              />
            </div>
            <div className="md:w-1/2">
              <ContactItem
                src="/img/contacts/email.svg"
                alt="Email"
                text="program@ulead-edu.com"
              />
              <ContactItem
                src="/img/contacts/date.svg"
                alt="Working Hours"
                text="北京办公室: *周二-周六 早9点-晚8点；*周日 早10点-晚5点"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto p-4 rounded-lg">
        <h2 className="text-xl font-bold text-center mb-6">请填写表格信息，我们会尽快联系您</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-[8vw]">
          <div>
            <label htmlFor="name" className="block mb-1 text-lg">您的名字*</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 border border-gray-500 rounded"
            />
          </div>
          <div>
            <label htmlFor="contact" className="block mb-1 text-lg">邮箱/手机号/微信号*</label>
            <input
              type="text"
              id="contact"
              name="contact"
              required
              className="w-full p-2 border border-gray-500 rounded"
            />
          </div>
          <div>
            <label htmlFor="source" className="block mb-1 text-lg">您的了解渠道</label>
            <input
              type="text"
              id="source"
              name="source"
              className="w-full p-2 border border-gray-500 rounded"
            />
          </div>
          <div>
            <label htmlFor="questions" className="block mb-1 text-lg">咨询内容</label>
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
              className="px-12 py-2 bg-ulead-gradient rounded-full hover:opacity-80 text-white text-xl font-semibold transition duration-300"
            >
              提交表格
            </button>
          </div>
        </form>

      </div>

      {showSuccess && <SuccessModal message={successMessage} onClose={() => setShowSuccess(false)} />}
    </div>
  );
}


function HeroSection() {
  return (
    <section
      className={clsx(
        "relative isolate w-full overflow-hidden",
        "bg-ulead-gradient text-white",
        "px-4 lg:px-16 xl:px-20 xl:min-h-[420px] md:min-h-[360px] min-h-[300px]"
      )}
    >
      {/* Put shapes in a lower layer */}
      <DecorativeShapes className="z-0" />

      {/* Lift content above shapes */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[300px] md:min-h-[360px] xl:min-h-[480px]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-center">
          联系我们
        </h1>
      </div>
    </section>
  );
}
