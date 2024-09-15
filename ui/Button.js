export default function Button({ text, href }) {
  return (
    <a href={href} className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primaryLight transition duration-300">
      {text}
    </a>
  );
}
