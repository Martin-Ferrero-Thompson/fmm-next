// src/components/Footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-400">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {currentYear} Fleet Mucky Mayhem. All Rights Reserved.</p>
        <div className="mt-2">
          {/* Replace with your actual social media links */}
          <a href="#" className="hover:text-white mx-2">Facebook</a>
          <a href="#" className="hover:text-white mx-2">Instagram</a>
        </div>
      </div>
    </footer>
  );
}