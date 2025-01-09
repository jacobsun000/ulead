export default function Layout({ children }) {
  return (
    <div>
      <h1 className="text-center pt-8">
        <a className="text-4xl font-bold text-primary hover:text-primaryLight no-underline" href="/admin">
          Admin Home
        </a>
      </h1>
      {children}
    </div>
  );
}
