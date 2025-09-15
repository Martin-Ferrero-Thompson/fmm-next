// src/components/Footer.tsx
import packageJson from '../../package.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const version = packageJson.version; // Synced from package.json

  return (
    <footer className="bg-gray-800 text-gray-400">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>Copyright &copy; {currentYear} Fleet Mucky Mayhem | v{version} Designed & Built by The Spanish Mucky - All Rights Reserved.</p>
        <div className="mt-2">
          {/* Replace with your actual social media links */}
          <a href="#" className="hover:text-white mx-2">Facebook</a>
          <a href="#" className="hover:text-white mx-2">Instagram</a>
        </div>
      </div>
    </footer>
  );
}