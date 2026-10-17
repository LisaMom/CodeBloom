import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-blue-600 dark:bg-slate-900 text-white border-t border-blue-500/40 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <div className="flex items-center">
              <img
                src="/images/logo-dark.png"
                alt="Dev Tech Logo"
                className="h-32 w-auto object-contain drop-shadow-md"
              />
            </div>
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed">
              We are a leading company dedicated to products and services to
              cater to your needs.
            </p>
          </div>

          {/* Column 2: Quick Links 1 */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold uppercase tracking-widest text-white">
              QUICK LINK
            </h4>
            <ul className="space-y-2 text-base sm:text-lg text-blue-100">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("home")}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("lessons")}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Roadmaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("roadmaps")}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Lessons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("about")}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Quizzes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("about")}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links 2 */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold uppercase tracking-widest text-white">
              LEGAL & POLICIES
            </h4>
            <ul className="space-y-2 text-base sm:text-lg text-blue-100">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("home")}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("about")}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Address & Contact */}
          <div className="space-y-3 sm:col-span-2 md:col-span-1">
            <h4 className="text-base font-extrabold uppercase tracking-widest text-white">
              ADDRESS &amp; CONTACT
            </h4>
            <div className="space-y-2.5 text-base text-blue-100 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-300 shrink-0 mt-1" />
                <span>
                  #40, St 273, Sangkat Boeung Kak II, Khan Toul Kork, Phnom
                  Penh, Cambodia
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                <span>(+855) 95-990-910</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                <span>info.istad@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column 5: Our Sponsors */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold uppercase tracking-widest text-white">
              OUR SPONSORS
            </h4>
            <div className="pt-1">
              <a
                href="https://www.istad.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block group transition-transform hover:scale-105"
                title="Institute of Science and Technology Advanced Development"
              >
                <img
                  src="/images/istad-logo.png"
                  alt="ISTAD Institute of Science and Technology Advanced Development"
                  className="h-32 sm:h-32 w-auto object-contain drop-shadow-md"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-blue-500/40 dark:border-slate-800 text-center text-base text-blue-200 dark:text-slate-400">
          © {new Date().getFullYear()} Dev Tech. In partnership with ISTAD. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};
